"use client";

import { useMemo } from "react";
import { useLanguage } from "@/lib/i18n";
import { useBookingStore, type Room, type Booking } from "@/lib/booking-store";
import { Trash2, Pencil, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingListProps {
  propertyId: "alegria" | "casamomi";
  room: Room | null;
  onEdit: (booking: Booking) => void;
}

const SOURCE_COLORS: Record<string, string> = {
  airbnb: "bg-rose-100 text-rose-700",
  booking: "bg-blue-100 text-blue-700",
  privato: "bg-emerald-100 text-emerald-700",
};

export function BookingList({ propertyId, room, onEdit }: BookingListProps) {
  const { t } = useLanguage();
  const allBookings = useBookingStore((state) => state.bookings);
  const bookings = useMemo(
    () =>
      allBookings
        .filter(
          (b) =>
            b.propertyId === propertyId &&
            (room === null
              ? true
              : b.room === room || b.room === "whole")
        )
        .filter((b) => new Date(b.checkOut) >= new Date())
        .sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime()),
    [allBookings, propertyId, room]
  );
  const removeBooking = useBookingStore((state) => state.removeBooking);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("it-IT", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (bookings.length === 0) {
    return (
      <div className="rounded-sm bg-card p-6 text-center">
        <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <p className="mt-4 text-muted-foreground">{t("admin.noBookings")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="group flex items-start justify-between rounded-sm bg-card p-4 transition-colors hover:bg-secondary/30"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-foreground">{booking.guestName}</h4>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${SOURCE_COLORS[booking.source] || SOURCE_COLORS.privato}`}
              >
                {booking.source === "booking" ? "Booking.com" : booking.source.charAt(0).toUpperCase() + booking.source.slice(1)}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatDate(booking.checkIn)} — {formatDate(booking.checkOut)}
            </p>
            {booking.notes && (
              <p className="mt-2 text-sm italic text-muted-foreground">
                {booking.notes}
              </p>
            )}
          </div>
          <div className="flex shrink-0 gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(booking)}
              className="text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">{t("admin.edit")}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeBooking(booking.id)}
              className="text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">{t("admin.delete")}</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
