"use client";

import { useMemo } from "react";
import { useLanguage } from "@/lib/i18n";
import { useBookingStore, type Room, type Booking } from "@/lib/booking-store";
import { Trash2, Pencil, Calendar, Clock, Car, Euro, Receipt, CreditCard } from "lucide-react";
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
          <div className="flex-1 min-w-0">
            {/* Header: name + source */}
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-foreground">{booking.guestName}</h4>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${SOURCE_COLORS[booking.source] || SOURCE_COLORS.privato}`}
              >
                {booking.source === "booking" ? "Booking.com" : booking.source.charAt(0).toUpperCase() + booking.source.slice(1)}
              </span>
            </div>

            {/* Date row */}
            <p className="mt-1 text-sm text-muted-foreground">
              {formatDate(booking.checkIn)} — {formatDate(booking.checkOut)}
            </p>

            {/* Detail grid */}
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                <span>In: <span className={`font-medium ${booking.checkInTime ? "text-foreground" : "text-muted-foreground/40"}`}>{booking.checkInTime || "—"}</span></span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                <span>Out: <span className={`font-medium ${booking.checkOutTime ? "text-foreground" : "text-muted-foreground/40"}`}>{booking.checkOutTime || "—"}</span></span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Euro className="h-3.5 w-3.5 shrink-0" />
                <span>Importo: <span className={`font-medium ${booking.amount != null ? "text-foreground" : "text-muted-foreground/40"}`}>{booking.amount != null ? `€ ${booking.amount}` : "—"}</span></span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <CreditCard className="h-3.5 w-3.5 shrink-0" />
                <span>Da pagare: <span className={`font-medium ${booking.amountDue != null ? "text-foreground" : "text-muted-foreground/40"}`}>{booking.amountDue != null ? `€ ${booking.amountDue}` : "—"}</span></span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Receipt className="h-3.5 w-3.5 shrink-0" />
                <span>TS: <span className={`font-medium ${booking.touristTax ? "text-foreground" : "text-muted-foreground/40"}`}>{booking.touristTax || "—"}</span></span>
              </div>
              <div className="col-span-2 flex items-center gap-1.5 text-muted-foreground">
                <Car className="h-3.5 w-3.5 shrink-0" />
                <span>Posto auto: <span className={`font-medium ${booking.parkingSpot ? "text-foreground" : "text-muted-foreground/40"}`}>{booking.parkingSpot || "—"}</span></span>
              </div>
            </div>

            {/* Notes */}
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
