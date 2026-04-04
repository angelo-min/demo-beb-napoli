"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { usePublicBookingStore } from "@/lib/public-booking-store";
import type { PropertyId, Room } from "@/lib/booking-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, Calendar, Users, Euro } from "lucide-react";

interface BookingFormProps {
  propertyId: PropertyId;
  room: Room | null;
  checkIn: string | null;
  checkOut: string | null;
  onEditDates: () => void;
}

export function BookingForm({
  propertyId,
  room,
  checkIn,
  checkOut,
  onEditDates,
}: BookingFormProps) {
  const { t } = useLanguage();
  const { calculatePrice, submitRequest, submitting, success, error, resetSuccess } =
    usePublicBookingStore();

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestsCount, setGuestsCount] = useState(2);
  const [notes, setNotes] = useState("");

  const priceInfo =
    checkIn && checkOut ? calculatePrice(propertyId, room, checkIn, checkOut) : null;

  const nights =
    checkIn && checkOut
      ? Math.round(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("it-IT", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return;

    await submitRequest({
      propertyId,
      room,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guestsCount,
      notes,
      totalPrice: priceInfo?.total ?? null,
    });
  };

  if (success) {
    return (
      <div className="rounded-sm bg-card p-6 text-center md:p-8">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
        <h3 className="mt-4 font-serif text-xl font-medium text-foreground">
          {t("booking.success.title")}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("booking.success.message")}
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            resetSuccess();
            setGuestName("");
            setGuestEmail("");
            setGuestPhone("");
            setNotes("");
          }}
        >
          {t("booking.success.newRequest")}
        </Button>
      </div>
    );
  }

  if (!checkIn || !checkOut) {
    return (
      <div className="rounded-sm bg-card p-6 text-center md:p-8">
        <Calendar className="mx-auto h-10 w-10 text-muted-foreground/50" />
        <p className="mt-4 text-sm text-muted-foreground">
          {t("booking.selectDatesPrompt")}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-sm bg-card p-4 md:p-6">
      {/* Date Summary */}
      <div className="mb-6 rounded-sm bg-secondary/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {t("booking.checkin")}
              </p>
              <p className="mt-1 font-medium text-foreground">
                {formatDate(checkIn)}
              </p>
            </div>
            <div className="text-muted-foreground">→</div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {t("booking.checkout")}
              </p>
              <p className="mt-1 font-medium text-foreground">
                {formatDate(checkOut)}
              </p>
            </div>
          </div>
          <button
            onClick={onEditDates}
            className="text-xs font-medium text-primary hover:underline"
          >
            {t("booking.editDates")}
          </button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {nights} {nights === 1 ? t("booking.night") : t("booking.nights")}
        </p>
      </div>

      {/* Price */}
      {priceInfo && (
        <div className="mb-6 flex items-center justify-between rounded-sm border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-center gap-2">
            <Euro className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">
                €{priceInfo.perNight}/{t("booking.perNight")}
                {" × "}
                {priceInfo.nights} {t("booking.nights")}
              </p>
            </div>
          </div>
          <p className="text-xl font-semibold text-foreground">
            €{priceInfo.total}
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("booking.guestName")} *
          </label>
          <Input
            required
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder={t("booking.guestNamePlaceholder")}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t("booking.email")} *
            </label>
            <Input
              type="email"
              required
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              placeholder={t("booking.emailPlaceholder")}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t("booking.phone")} *
            </label>
            <Input
              type="tel"
              required
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              placeholder={t("booking.phonePlaceholder")}
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
            <Users className="mr-1 inline-block h-3 w-3" />
            {t("booking.guests")}
          </label>
          <Input
            type="number"
            min={1}
            max={10}
            value={guestsCount}
            onChange={(e) => setGuestsCount(parseInt(e.target.value) || 1)}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("booking.notes")}
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder={t("booking.notesPlaceholder")}
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button
          type="submit"
          disabled={submitting}
          className="w-full rounded-sm bg-primary py-3 text-sm font-medium uppercase tracking-widest text-primary-foreground"
        >
          {submitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {submitting ? t("booking.submitting") : t("booking.submit")}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          {t("booking.disclaimer")}
        </p>
      </form>
    </div>
  );
}
