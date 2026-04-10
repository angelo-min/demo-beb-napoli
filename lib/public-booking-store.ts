import { create } from "zustand";
import type { PropertyId, Room } from "./booking-store";

export interface PricingRule {
  id: string;
  propertyId: PropertyId;
  room: Room | null;
  seasonName: string;
  startDate: string;
  endDate: string;
  pricePerNight: number;
  weekendPrice: number | null;
  minNights: number;
}

export interface PricingOverride {
  date: string;
  price: number;
  room: Room | null;
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

function isWeekend(dateStr: string): boolean {
  const day = new Date(dateStr).getDay();
  return day === 5 || day === 6; // Friday or Saturday
}

// ---------------------------------------------------------------------------
// Mock data — no Supabase connection. All data lives in memory for the demo.
// ---------------------------------------------------------------------------

// Seasonal pricing rules covering 2026 for both properties.
const MOCK_PRICING: PricingRule[] = [
  // Alegria — whole property (room = null)
  {
    id: "ale-low-1",
    propertyId: "alegria",
    room: null,
    seasonName: "Bassa stagione",
    startDate: "2026-01-01",
    endDate: "2026-03-31",
    pricePerNight: 120,
    weekendPrice: 140,
    minNights: 2,
  },
  {
    id: "ale-mid-1",
    propertyId: "alegria",
    room: null,
    seasonName: "Media stagione",
    startDate: "2026-04-01",
    endDate: "2026-05-31",
    pricePerNight: 160,
    weekendPrice: 190,
    minNights: 2,
  },
  {
    id: "ale-high",
    propertyId: "alegria",
    room: null,
    seasonName: "Alta stagione",
    startDate: "2026-06-01",
    endDate: "2026-09-30",
    pricePerNight: 220,
    weekendPrice: 260,
    minNights: 3,
  },
  {
    id: "ale-mid-2",
    propertyId: "alegria",
    room: null,
    seasonName: "Media stagione",
    startDate: "2026-10-01",
    endDate: "2026-10-31",
    pricePerNight: 160,
    weekendPrice: 190,
    minNights: 2,
  },
  {
    id: "ale-low-2",
    propertyId: "alegria",
    room: null,
    seasonName: "Bassa stagione",
    startDate: "2026-11-01",
    endDate: "2026-12-31",
    pricePerNight: 120,
    weekendPrice: 140,
    minNights: 2,
  },

  // Casa Momi — Gold room
  {
    id: "cm-gold-low-1",
    propertyId: "casamomi",
    room: "gold",
    seasonName: "Bassa stagione",
    startDate: "2026-01-01",
    endDate: "2026-03-31",
    pricePerNight: 95,
    weekendPrice: 115,
    minNights: 1,
  },
  {
    id: "cm-gold-mid-1",
    propertyId: "casamomi",
    room: "gold",
    seasonName: "Media stagione",
    startDate: "2026-04-01",
    endDate: "2026-05-31",
    pricePerNight: 130,
    weekendPrice: 155,
    minNights: 1,
  },
  {
    id: "cm-gold-high",
    propertyId: "casamomi",
    room: "gold",
    seasonName: "Alta stagione",
    startDate: "2026-06-01",
    endDate: "2026-09-30",
    pricePerNight: 180,
    weekendPrice: 210,
    minNights: 2,
  },
  {
    id: "cm-gold-mid-2",
    propertyId: "casamomi",
    room: "gold",
    seasonName: "Media stagione",
    startDate: "2026-10-01",
    endDate: "2026-10-31",
    pricePerNight: 130,
    weekendPrice: 155,
    minNights: 1,
  },
  {
    id: "cm-gold-low-2",
    propertyId: "casamomi",
    room: "gold",
    seasonName: "Bassa stagione",
    startDate: "2026-11-01",
    endDate: "2026-12-31",
    pricePerNight: 95,
    weekendPrice: 115,
    minNights: 1,
  },

  // Casa Momi — Silver room
  {
    id: "cm-silver-low-1",
    propertyId: "casamomi",
    room: "silver",
    seasonName: "Bassa stagione",
    startDate: "2026-01-01",
    endDate: "2026-03-31",
    pricePerNight: 75,
    weekendPrice: 90,
    minNights: 1,
  },
  {
    id: "cm-silver-mid-1",
    propertyId: "casamomi",
    room: "silver",
    seasonName: "Media stagione",
    startDate: "2026-04-01",
    endDate: "2026-05-31",
    pricePerNight: 105,
    weekendPrice: 125,
    minNights: 1,
  },
  {
    id: "cm-silver-high",
    propertyId: "casamomi",
    room: "silver",
    seasonName: "Alta stagione",
    startDate: "2026-06-01",
    endDate: "2026-09-30",
    pricePerNight: 150,
    weekendPrice: 175,
    minNights: 2,
  },
  {
    id: "cm-silver-mid-2",
    propertyId: "casamomi",
    room: "silver",
    seasonName: "Media stagione",
    startDate: "2026-10-01",
    endDate: "2026-10-31",
    pricePerNight: 105,
    weekendPrice: 125,
    minNights: 1,
  },
  {
    id: "cm-silver-low-2",
    propertyId: "casamomi",
    room: "silver",
    seasonName: "Bassa stagione",
    startDate: "2026-11-01",
    endDate: "2026-12-31",
    pricePerNight: 75,
    weekendPrice: 90,
    minNights: 1,
  },
];

// A few already-booked ranges so the calendar shows realistic unavailability.
const MOCK_BOOKED_DATES: Record<PropertyId, BookedDateRange[]> = {
  alegria: [
    { checkIn: "2026-04-14", checkOut: "2026-04-17", room: null },
    { checkIn: "2026-04-24", checkOut: "2026-04-27", room: null },
    { checkIn: "2026-05-10", checkOut: "2026-05-14", room: null },
    { checkIn: "2026-06-20", checkOut: "2026-06-28", room: null },
    { checkIn: "2026-07-15", checkOut: "2026-07-22", room: null },
    { checkIn: "2026-08-08", checkOut: "2026-08-20", room: null },
  ],
  casamomi: [
    { checkIn: "2026-04-12", checkOut: "2026-04-15", room: "gold" },
    { checkIn: "2026-04-20", checkOut: "2026-04-23", room: "silver" },
    { checkIn: "2026-05-05", checkOut: "2026-05-09", room: "gold" },
    { checkIn: "2026-05-17", checkOut: "2026-05-20", room: "silver" },
    { checkIn: "2026-06-12", checkOut: "2026-06-18", room: "gold" },
    { checkIn: "2026-07-04", checkOut: "2026-07-11", room: "silver" },
    { checkIn: "2026-08-01", checkOut: "2026-08-15", room: "gold" },
  ],
};

const MOCK_OVERRIDES: Record<PropertyId, PricingOverride[]> = {
  alegria: [],
  casamomi: [],
};

// Simulate network latency so the loading states still exercise.
const simulateLatency = (ms = 250) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

interface PublicBookingStore {
  bookedDates: BookedDateRange[];
  pricing: PricingRule[];
  overrides: PricingOverride[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
  success: boolean;

  fetchAvailability: (propertyId: PropertyId) => Promise<void>;
  fetchPricing: (propertyId: PropertyId) => Promise<void>;
  fetchOverrides: (propertyId: PropertyId) => Promise<void>;
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
  overrides: [],
  loading: false,
  submitting: false,
  error: null,
  success: false,

  fetchAvailability: async (propertyId) => {
    set({ loading: true, error: null });
    await simulateLatency();
    set({
      bookedDates: MOCK_BOOKED_DATES[propertyId] ?? [],
      loading: false,
    });
  },

  fetchPricing: async (propertyId) => {
    await simulateLatency();
    set({
      pricing: MOCK_PRICING.filter((p) => p.propertyId === propertyId),
    });
  },

  fetchOverrides: async (propertyId) => {
    await simulateLatency();
    set({
      overrides: MOCK_OVERRIDES[propertyId] ?? [],
    });
  },

  submitRequest: async (_data) => {
    set({ submitting: true, error: null, success: false });
    // Simulate a backend call.
    await simulateLatency(800);
    set({ submitting: false, success: true });
    return true;
  },

  calculatePrice: (propertyId, room, checkIn, checkOut) => {
    const { pricing, overrides } = get();
    if (!checkIn || !checkOut) return null;

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.round(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (nights <= 0) return null;

    let total = 0;
    let foundPricing = false;

    for (let i = 0; i < nights; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];

      // 1. Check for override (exact room match, then room=null)
      const override = overrides.find(
        (o) => o.date === dateStr && (o.room === room || o.room === null)
      );
      if (override) {
        total += override.price;
        foundPricing = true;
        continue;
      }

      // 2. Find matching season rule
      const rule = pricing.find(
        (p) =>
          p.propertyId === propertyId &&
          (p.room === room || p.room === null) &&
          dateStr >= p.startDate &&
          dateStr <= p.endDate
      );

      if (rule) {
        // Use weekend price if applicable
        if (isWeekend(dateStr) && rule.weekendPrice != null) {
          total += rule.weekendPrice;
        } else {
          total += rule.pricePerNight;
        }
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
