"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useBookingStore, type Room, type Booking, type BookingSource } from "@/lib/booking-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BookingModalProps {
  propertyId: "alegria" | "casamomi";
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  editBooking?: Booking | null;
}

const SOURCE_OPTIONS: { value: BookingSource; label: string }[] = [
  { value: "privato", label: "Privato" },
  { value: "airbnb", label: "Airbnb" },
  { value: "booking", label: "Booking.com" },
];

export function BookingModal({
  propertyId,
  room,
  isOpen,
  onClose,
  editBooking,
}: BookingModalProps) {
  const { t } = useLanguage();
  const addBooking = useBookingStore((state) => state.addBooking);
  const updateBooking = useBookingStore((state) => state.updateBooking);

  const [guestName, setGuestName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [parkingSpot, setParkingSpot] = useState("");
  const [amount, setAmount] = useState("");
  const [amountDue, setAmountDue] = useState("");
  const [touristTax, setTouristTax] = useState("");
  const [notes, setNotes] = useState("");
  const [source, setSource] = useState<BookingSource>("privato");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(room);
  const [submitting, setSubmitting] = useState(false);

  const isEditing = !!editBooking;

  useEffect(() => {
    if (editBooking) {
      setGuestName(editBooking.guestName);
      setCheckIn(editBooking.checkIn);
      setCheckOut(editBooking.checkOut);
      setCheckInTime(editBooking.checkInTime || "");
      setCheckOutTime(editBooking.checkOutTime || "");
      setParkingSpot(editBooking.parkingSpot || "");
      setAmount(editBooking.amount != null ? String(editBooking.amount) : "");
      setAmountDue(editBooking.amountDue != null ? String(editBooking.amountDue) : "");
      setTouristTax(editBooking.touristTax || "");
      setNotes(editBooking.notes);
      setSource(editBooking.source);
      setSelectedRoom(editBooking.room);
    } else {
      setGuestName("");
      setCheckIn("");
      setCheckOut("");
      setCheckInTime("");
      setCheckOutTime("");
      setParkingSpot("");
      setAmount("");
      setAmountDue("");
      setTouristTax("");
      setNotes("");
      setSource("privato");
      setSelectedRoom(room);
    }
  }, [editBooking, room]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !checkIn || !checkOut) return;

    setSubmitting(true);

    const parsedAmount = amount ? parseFloat(amount.replace(",", ".")) : null;
    const parsedAmountDue = amountDue ? parseFloat(amountDue.replace(",", ".")) : null;
    const bookingData = {
      guestName,
      checkIn,
      checkOut,
      checkInTime: checkInTime || null,
      checkOutTime: checkOutTime || null,
      parkingSpot: parkingSpot || null,
      amount: parsedAmount,
      amountDue: parsedAmountDue,
      touristTax: touristTax || null,
      notes,
      source,
    };

    if (isEditing) {
      await updateBooking(editBooking.id, {
        ...bookingData,
        room: propertyId === "casamomi" ? selectedRoom : null,
      });
    } else {
      await addBooking({
        ...bookingData,
        propertyId,
        room: propertyId === "casamomi" ? selectedRoom : room,
      });
    }

    setSubmitting(false);
    setGuestName("");
    setCheckIn("");
    setCheckOut("");
    setCheckInTime("");
    setCheckOutTime("");
    setParkingSpot("");
    setAmount("");
    setAmountDue("");
    setTouristTax("");
    setNotes("");
    setSource("privato");
    setSelectedRoom(room);
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
          {isEditing ? t("admin.edit") : t("admin.add")}
        </h2>
        {propertyId === "casamomi" && !isEditing && room && (
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="checkInTime"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                {t("admin.checkinTime")}
              </label>
              <Input
                id="checkInTime"
                type="text"
                placeholder="es. 20:30"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="checkOutTime"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                {t("admin.checkoutTime")}
              </label>
              <Input
                id="checkOutTime"
                type="text"
                placeholder="es. 10:00"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                {t("admin.amount")}
              </label>
              <Input
                id="amount"
                type="text"
                placeholder="es. 352,41"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="amountDue"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                {t("admin.amountDue")}
              </label>
              <Input
                id="amountDue"
                type="text"
                placeholder="es. 1155,00"
                value={amountDue}
                onChange={(e) => setAmountDue(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="touristTax"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                {t("admin.touristTax")}
              </label>
              <Input
                id="touristTax"
                type="text"
                placeholder="es. € 30 IN CONTANTI"
                value={touristTax}
                onChange={(e) => setTouristTax(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="parkingSpot"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                {t("admin.parkingSpot")}
              </label>
              <Input
                id="parkingSpot"
                type="text"
                placeholder="es. € 45 IN CONTANTI"
                value={parkingSpot}
                onChange={(e) => setParkingSpot(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Source selector */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              {t("admin.source")}
            </label>
            <div className="flex gap-2">
              {SOURCE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSource(opt.value)}
                  className={`flex-1 rounded-sm border px-3 py-2 text-sm font-medium transition-colors ${
                    source === opt.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Room selector for Casa Momi when editing */}
          {propertyId === "casamomi" && isEditing && (
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                {t("admin.room")}
              </label>
              <div className="flex gap-2">
                {(["gold", "silver", "whole"] as Room[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRoom(r)}
                    className={`flex-1 rounded-sm border px-3 py-2 text-sm font-medium transition-colors ${
                      selectedRoom === r
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input bg-background text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {t(`admin.room.${r}`)}
                  </button>
                ))}
              </div>
            </div>
          )}

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
