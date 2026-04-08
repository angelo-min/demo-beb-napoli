"use client";

import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import { usePublicBookingStore } from "@/lib/public-booking-store";
import type { PropertyId, Room } from "@/lib/booking-store";
import { BookingCalendar } from "./booking-calendar";
import { BookingForm } from "./booking-form";
import { MessageCircle, Phone, ExternalLink } from "lucide-react";

interface BookingSectionProps {
  propertyId: PropertyId;
  rooms?: Room[];
  bookingUrl: string;
  airbnbUrl: string;
}

export function BookingSection({
  propertyId,
  rooms,
  bookingUrl,
  airbnbUrl,
}: BookingSectionProps) {
  const { t } = useLanguage();
  const { fetchAvailability, fetchPricing, fetchOverrides, loading } = usePublicBookingStore();

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(
    rooms && rooms.length > 0 ? rooms[0] : null
  );
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAvailability(propertyId);
    fetchPricing(propertyId);
    fetchOverrides(propertyId);
  }, [propertyId, fetchAvailability, fetchPricing, fetchOverrides]);

  const handleDateSelect = (ci: string, co: string | null) => {
    setCheckIn(ci);
    setCheckOut(co);
    // Scroll to form when both dates selected
    if (co && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  return (
    <section id="booking" className="px-6 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
            {t("booking.title")}
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-primary/40" />
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground">
            {t("booking.subtitle")}
          </p>
        </div>

        {/* Room selector for Casa Momi */}
        {rooms && rooms.length > 0 && (
          <div className="mb-8 flex items-center justify-center gap-2">
            {rooms.map((r) => (
              <button
                key={r}
                onClick={() => {
                  setSelectedRoom(r);
                  setCheckIn(null);
                  setCheckOut(null);
                }}
                className={`rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
                  selectedRoom === r
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(`admin.room.${r}`)}
              </button>
            ))}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Calendar - takes 3 columns */}
          <div className="lg:col-span-3">
            <BookingCalendar
              propertyId={propertyId}
              room={selectedRoom}
              onDateSelect={handleDateSelect}
              selectedCheckIn={checkIn}
              selectedCheckOut={checkOut}
            />
          </div>

          {/* Form - takes 2 columns */}
          <div ref={formRef} className="lg:col-span-2">
            <BookingForm
              propertyId={propertyId}
              room={selectedRoom}
              checkIn={checkIn}
              checkOut={checkOut}
              onEditDates={() => {
                setCheckIn(null);
                setCheckOut(null);
              }}
            />

            {/* Alternative booking options */}
            <div className="mt-4 rounded-sm bg-card p-4 text-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {t("booking.orContact")}
              </p>
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 rounded-sm bg-[#25D366] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1fb855]"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
                <a
                  href="tel:+390000000000"
                  className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {t("phone.cta")}
                </a>
              </div>
              <div className="mt-3 flex items-center justify-center gap-3">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Booking.com <ExternalLink className="h-3 w-3" />
                </a>
                <span className="text-border">|</span>
                <a
                  href={airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Airbnb <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
