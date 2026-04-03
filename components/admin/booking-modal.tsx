"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useBookingStore, type Room } from "@/lib/booking-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BookingModalProps {
  propertyId: "alegria" | "casamomi";
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({
  propertyId,
  room,
  isOpen,
  onClose,
}: BookingModalProps) {
  const { t } = useLanguage();
  const addBooking = useBookingStore((state) => state.addBooking);

  const [guestName, setGuestName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !checkIn || !checkOut) return;

    setSubmitting(true);
    await addBooking({
      propertyId,
      room,
      guestName,
      checkIn,
      checkOut,
      notes,
    });
    setSubmitting(false);

    setGuestName("");
    setCheckIn("");
    setCheckOut("");
    setNotes("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative mx-4 w-full max-w-md rounded-sm bg-background p-6 md:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">{t("admin.cancel")}</span>
        </button>

        <h2 className="font-serif text-2xl font-medium text-foreground">
          {t("admin.add")}
        </h2>
        {propertyId === "casamomi" && room && (
          <p className="mt-1 text-sm text-muted-foreground">
            {t(`admin.room.${room}`)}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="guestName"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              {t("admin.guest")}
            </label>
            <Input
              id="guestName"
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="checkIn"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                {t("admin.checkin")}
              </label>
              <Input
                id="checkIn"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="checkOut"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                {t("admin.checkout")}
              </label>
              <Input
                id="checkOut"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn}
                required
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              {t("admin.notes")}
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              {t("admin.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {submitting ? "..." : t("admin.save")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
