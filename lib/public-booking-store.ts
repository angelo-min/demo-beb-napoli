import { create } from "zustand";
import { supabase } from "./supabase";
import type { PropertyId, Room } from "./booking-store";

export interface PricingRule {
  id: string;
  propertyId: PropertyId;
  room: Room | null;
  seasonName: string;
  startDate: string;
  endDate: string;
  pricePerNight: number;
  minNights: number;
}

export interface BookedDateRange {
  checkIn: string;
  checkOut: string;
  room: Room | null;
}

export interface BookingRequestData {
  propertyId: PropertyId;
  room: Room | null;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  notes: string;
  totalPrice: number | null;
}

interface PublicBookingStore {
  bookedDates: BookedDateRange[];
  pricing: PricingRule[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
  success: boolean;

  fetchAvailability: (propertyId: PropertyId) => Promise<void>;
  fetchPricing: (propertyId: PropertyId) => Promise<void>;
  submitRequest: (data: BookingRequestData) => Promise<boolean>;
  calculatePrice: (
    propertyId: PropertyId,
    room: Room | null,
    checkIn: string,
    checkOut: string
  ) => { total: number; perNight: number; nights: number } | null;
  isDateAvailable: (
    dateStr: string,
    propertyId: PropertyId,
    room: Room | null
  ) => boolean;
  resetSuccess: () => void;
}

export const usePublicBookingStore = create<PublicBookingStore>()((set, get) => ({
  bookedDates: [],
  pricing: [],
  loading: false,
  submitting: false,
  error: null,
  success: false,

  fetchAvailability: async (propertyId) => {
    set({ loading: true, error: null });
    const today = new Date().toISOString().split("T")[0];
    const { data, error } = await supabase
      .from("bookings")
      .select("check_in, check_out, room")
      .eq("property_id", propertyId)
      .gte("check_out", today);

    if (error) {
      set({ error: error.message, loading: false });
      return;
    }
    set({
      bookedDates: (data ?? []).map((row) => ({
        checkIn: row.check_in,
        checkOut: row.check_out,
        room: row.room as Room | null,
      })),
      loading: false,
    });
  },

  fetchPricing: async (propertyId) => {
    const { data, error } = await supabase
      .from("pricing")
      .select("*")
      .eq("property_id", propertyId)
      .order("start_date", { ascending: true });

    if (error) {
      set({ error: error.message });
      return;
    }
    set({
      pricing: (data ?? []).map((row) => ({
        id: row.id,
        propertyId: row.property_id as PropertyId,
        room: row.room as Room | null,
        seasonName: row.season_name,
        startDate: row.start_date,
        endDate: row.end_date,
        pricePerNight: Number(row.price_per_night),
        minNights: row.min_nights,
      })),
    });
  },

  submitRequest: async (data) => {
    set({ submitting: true, error: null, success: false });
    const { error } = await supabase.from("booking_requests").insert({
      property_id: data.propertyId,
      room: data.room,
      guest_name: data.guestName,
      guest_email: data.guestEmail,
      guest_phone: data.guestPhone,
      check_in: data.checkIn,
      check_out: data.checkOut,
      guests_count: data.guestsCount,
      notes: data.notes,
      total_price: data.totalPrice,
    });

    if (error) {
      set({ error: error.message, submitting: false });
      return false;
    }
    set({ submitting: false, success: true });
    return true;
  },

  calculatePrice: (propertyId, room, checkIn, checkOut) => {
    const { pricing } = get();
    if (!checkIn || !checkOut) return null;

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.round(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (nights <= 0) return null;

    let total = 0;
    let foundPricing = false;

    // Calculate price for each night
    for (let i = 0; i < nights; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];

      // Find matching pricing rule
      const rule = pricing.find(
        (p) =>
          p.propertyId === propertyId &&
          (p.room === room || p.room === null) &&
          dateStr >= p.startDate &&
          dateStr <= p.endDate
      );

      if (rule) {
        total += rule.pricePerNight;
        foundPricing = true;
      }
    }

    if (!foundPricing) return null;

    return {
      total,
      perNight: Math.round(total / nights),
      nights,
    };
  },

  isDateAvailable: (dateStr, propertyId, room) => {
    const { bookedDates } = get();
    const relevant = bookedDates.filter(
      (b) => room === null || b.room === room || b.room === "whole"
    );
    for (const booking of relevant) {
      if (dateStr >= booking.checkIn && dateStr < booking.checkOut) {
        return false;
      }
    }
    return true;
  },

  resetSuccess: () => set({ success: false }),
}));
