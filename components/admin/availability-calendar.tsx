"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useBookingStore, type Room } from "@/lib/booking-store";
import { Button } from "@/components/ui/button";

interface AvailabilityCalendarProps {
  propertyId: "alegria" | "casamomi";
  room: Room | null;
}

const monthKeys = [
  "month.january",
  "month.february",
  "month.march",
  "month.april",
  "month.may",
  "month.june",
  "month.july",
  "month.august",
  "month.september",
  "month.october",
  "month.november",
  "month.december",
];

const dayKeys = [
  "day.mon",
  "day.tue",
  "day.wed",
  "day.thu",
  "day.fri",
  "day.sat",
  "day.sun",
];

type DayStatus = "available" | "booked" | "checkin" | "checkout";

export function AvailabilityCalendar({
  propertyId,
  room,
}: AvailabilityCalendarProps) {
  const { t } = useLanguage();
  const allBookings = useBookingStore((state) => state.bookings);
  const bookings = useMemo(
    () =>
      allBookings.filter(
        (b) =>
          b.propertyId === propertyId &&
          (room === null
            ? true
            : b.room === room || b.room === "whole")
      ),
    [allBookings, propertyId, room]
  );

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectionStart, setSelectionStart] = useState<string | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // Adjust for Monday start (0 = Monday, 6 = Sunday)
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const getDayStatus = (dateStr: string): DayStatus => {
    for (const booking of bookings) {
      if (dateStr === booking.checkIn) return "checkin";
      if (dateStr === booking.checkOut) return "checkout";
      if (dateStr > booking.checkIn && dateStr < booking.checkOut)
        return "booked";
    }
    return "available";
  };

  const isDateInSelection = (dateStr: string): boolean => {
    if (!selectionStart) return false;
    if (!selectionEnd) return dateStr === selectionStart;
    const start = selectionStart < selectionEnd ? selectionStart : selectionEnd;
    const end = selectionStart < selectionEnd ? selectionEnd : selectionStart;
    return dateStr >= start && dateStr <= end;
  };

  const days = useMemo(() => {
    const result: { day: number; dateStr: string; status: DayStatus }[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      result.push({
        day: i,
        dateStr,
        status: getDayStatus(dateStr),
      });
    }
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, bookings]);

  const handleDateClick = (dateStr: string) => {
    if (!selectionStart) {
      setSelectionStart(dateStr);
      setSelectionEnd(null);
    } else if (!selectionEnd) {
      setSelectionEnd(dateStr);
    } else {
      setSelectionStart(dateStr);
      setSelectionEnd(null);
    }
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getStatusColor = (status: DayStatus, isSelected: boolean) => {
    if (isSelected) return "bg-primary/20 ring-2 ring-primary";
    switch (status) {
      case "available":
        return "bg-emerald-100 text-emerald-900 hover:bg-emerald-200";
      case "booked":
        return "bg-red-100 text-red-900";
      case "checkin":
      case "checkout":
        return "bg-amber-100 text-amber-900";
    }
  };

  return (
    <div className="rounded-sm bg-card p-4 md:p-6">
      {/* Calendar Header */}
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h3 className="font-serif text-xl font-medium text-foreground">
          {t(monthKeys[month])} {year}
        </h3>
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Day Headers */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {dayKeys.map((dayKey) => (
          <div
            key={dayKey}
            className="py-2 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground"
          >
            {t(dayKey)}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for offset */}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="h-10 md:h-12" />
        ))}

        {/* Day cells */}
        {days.map(({ day, dateStr, status }) => {
          const isSelected = isDateInSelection(dateStr);
          return (
            <button
              key={dateStr}
              onClick={() => handleDateClick(dateStr)}
              className={`flex h-10 items-center justify-center rounded-sm text-sm font-medium transition-all md:h-12 ${getStatusColor(status, isSelected)}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-sm bg-emerald-100" />
          <span className="text-muted-foreground">{t("legend.available")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-sm bg-red-100" />
          <span className="text-muted-foreground">{t("legend.booked")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-sm bg-amber-100" />
          <span className="text-muted-foreground">
            {t("legend.transition")}
          </span>
        </div>
      </div>

      {/* Selection Info */}
      {selectionStart && (
        <div className="mt-4 rounded-sm bg-secondary/50 p-3 text-center text-sm">
          <span className="text-muted-foreground">
            {selectionEnd ? (
              <>
                {t("admin.checkin")}: <strong>{selectionStart}</strong> —{" "}
                {t("admin.checkout")}: <strong>{selectionEnd}</strong>
              </>
            ) : (
              <>
                {t("admin.checkin")}: <strong>{selectionStart}</strong> (
                {t("admin.checkout")}?)
              </>
            )}
          </span>
        </div>
      )}
    </div>
  );
}
