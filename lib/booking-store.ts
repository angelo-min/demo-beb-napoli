import { create } from "zustand";
import { supabase } from "./supabase";
import type { Database } from "./database.types";

export type PropertyId = "alegria" | "casamomi";
export type Room = "gold" | "silver" | "whole";
export type BookingSource = "airbnb" | "booking" | "privato";

export interface Booking {
  id: string;
  propertyId: PropertyId;
  room: Room | null; // null for Alegria (whole property), "gold" or "silver" for Casa Momi
  guestName: string;
  checkIn: string;
  checkOut: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  parkingSpot: string | null;
  amount: number | null;
  amountDue: number | null;
  touristTax: string | null;
  notes: string;
  source: BookingSource;
}

interface BookingRow {
  id: string;
  property_id: string;
  room: string | null;
  guest_name: string;
  check_in: string;
  check_out: string;
  check_in_time: string | null;
  check_out_time: string | null;
  parking_spot: string | null;
  amount: number | null;
  amount_due: number | null;
  tourist_tax: string | null;
  notes: string;
  source: string;
  created_at: string;
}

function rowToBooking(row: BookingRow): Booking {
  return {
    id: row.id,
    propertyId: row.property_id as PropertyId,
    room: row.room as Room | null,
    guestName: row.guest_name,
    checkIn: row.check_in,
    checkOut: row.check_out,
    checkInTime: row.check_in_time,
    checkOutTime: row.check_out_time,
    parkingSpot: row.parking_spot,
    amount: row.amount,
    amountDue: row.amount_due,
    touristTax: row.tourist_tax,
    notes: row.notes,
    source: (row.source as BookingSource) || "privato",
  };
}

interface BookingStore {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  fetchBookings: () => Promise<void>;
  addBooking: (booking: Omit<Booking, "id">) => Promise<void>;
  removeBooking: (id: string) => Promise<void>;
  updateBooking: (id: string, booking: Partial<Omit<Booking, "id">>) => Promise<void>;
  getBookingsForProperty: (propertyId: PropertyId, room?: Room | null) => Booking[];
}

export const useBookingStore = create<BookingStore>()((set, get) => ({
  bookings: [],
  loading: false,
  error: null,

  fetchBookings: async () => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("check_in", { ascending: true });

    if (error) {
      set({ error: error.message, loading: false });
      return;
    }
    set({ bookings: (data ?? []).map(rowToBooking), loading: false });
  },

  addBooking: async (booking) => {
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        property_id: booking.propertyId,
        room: booking.room,
        guest_name: booking.guestName,
        check_in: booking.checkIn,
        check_out: booking.checkOut,
        check_in_time: booking.checkInTime,
        check_out_time: booking.checkOutTime,
        parking_spot: booking.parkingSpot,
        amount: booking.amount,
        amount_due: booking.amountDue,
        tourist_tax: booking.touristTax,
        notes: booking.notes,
        source: booking.source,
      })
      .select()
      .single();

    if (error) {
      set({ error: error.message });
      return;
    }
    set((state) => ({
      bookings: [...state.bookings, rowToBooking(data)],
    }));
  },

  removeBooking: async (id) => {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) {
      set({ error: error.message });
      return;
    }
    set((state) => ({
      bookings: state.bookings.filter((b) => b.id !== id),
    }));
  },

  updateBooking: async (id, updates) => {
    const dbUpdates: Database["public"]["Tables"]["bookings"]["Update"] = {};
    if (updates.propertyId !== undefined) dbUpdates.property_id = updates.propertyId;
    if (updates.room !== undefined) dbUpdates.room = updates.room;
    if (updates.guestName !== undefined) dbUpdates.guest_name = updates.guestName;
    if (updates.checkIn !== undefined) dbUpdates.check_in = updates.checkIn;
    if (updates.checkOut !== undefined) dbUpdates.check_out = updates.checkOut;
    if (updates.checkInTime !== undefined) dbUpdates.check_in_time = updates.checkInTime;
    if (updates.checkOutTime !== undefined) dbUpdates.check_out_time = updates.checkOutTime;
    if (updates.parkingSpot !== undefined) dbUpdates.parking_spot = updates.parkingSpot;
    if (updates.amount !== undefined) dbUpdates.amount = updates.amount;
    if (updates.amountDue !== undefined) dbUpdates.amount_due = updates.amountDue;
    if (updates.touristTax !== undefined) dbUpdates.tourist_tax = updates.touristTax;
    if (updates.notes !== undefined) dbUpdates.notes = updates.notes;
    if (updates.source !== undefined) dbUpdates.source = updates.source;

    const { error } = await supabase.from("bookings").update(dbUpdates).eq("id", id);
    if (error) {
      set({ error: error.message });
      return;
    }
    set((state) => ({
      bookings: state.bookings.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    }));
  },

  getBookingsForProperty: (propertyId, room) => {
    const bookings = get().bookings.filter((b) => b.propertyId === propertyId);
    if (room !== undefined && room !== null) {
      return bookings.filter((b) => b.room === room);
    }
    return bookings;
  },
}));
