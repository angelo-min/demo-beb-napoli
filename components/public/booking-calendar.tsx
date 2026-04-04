"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { usePublicBookingStore } from "@/lib/public-booking-store";
import type { PropertyId, Room } from "@/lib/booking-store";
import { Button } from "@/components/ui/button";

interface BookingCalendarProps {
  propertyId: PropertyId;
  room: Room | null;
  onDateSelect: (checkIn: string, checkOut: string | null) => void;
  selectedCheckIn: string | null;
  selectedCheckOut: string | null;
}

const monthKeys = [
  "month.january", "month.february", "month.march", "month.april",
  "month.may", "month.june", "month.july", "month.august",
  "month.september", "month.october", "month.november", "month.december",
];

const dayKeys = [
  "day.mon", "day.tue", "day.wed", "day.thu",
  "day.fri", "day.sat", "day.sun",
];

export function BookingCalendar({
  propertyId,
  room,
  onDateSelect,
  selectedCheckIn,
  selectedCheckOut,
}: BookingCalendarProps) {
  const { t } = useLanguage();
  const { isDateAvailable } = usePublicBookingStore();

  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const today = new Date().toISOString().split("T")[0];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // Second month
  const secondMonth = new Date(year, month + 1, 1);
  const year2 = secondMonth.getFullYear();
  const month2 = secondMonth.getMonth();
  const daysInMonth2 = new Date(year2, month2 + 1, 0).getDate();
  const firstDayOfMonth2 = new Date(year2, month2, 1).getDay();
  const startOffset2 = firstDayOfMonth2 === 0 ? 6 : firstDayOfMonth2 - 1;

  const isInRange = (dateStr: string) => {
    if (!selectedCheckIn || !selectedCheckOut) return false;
    return dateStr > selectedCheckIn && dateStr < selectedCheckOut;
  };

  const handleDateClick = (dateStr: string) => {
    if (dateStr < today) return;
    if (!isDateAvailable(dateStr, propertyId, room)) return;

    if (!selectedCheckIn || selectedCheckOut) {
      // Start new selection
      onDateSelect(dateStr, null);
    } else {
      // Complete selection
      if (dateStr <= selectedCheckIn) {
        onDateSelect(dateStr, null);
      } else {
        // Check all dates in range are available
        const start = new Date(selectedCheckIn);
        const end = new Date(dateStr);
        let allAvailable = true;
        const cursor = new Date(start);
        cursor.setDate(cursor.getDate() + 1);
        while (cursor < end) {
          const curStr = cursor.toISOString().split("T")[0];
          if (!isDateAvailable(curStr, propertyId, room)) {
            allAvailable = false;
            break;
          }
          cursor.setDate(cursor.getDate() + 1);
        }
        if (allAvailable) {
          onDateSelect(selectedCheckIn, dateStr);
        } else {
          onDateSelect(dateStr, null);
        }
      }
    }
  };

  const renderMonth = (y: number, m: number, daysCount: number, offset: number) => {
    const days = [];
    for (let i = 1; i <= daysCount; i++) {
      const dateStr = `${y}-${String(m + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      const isPast = dateStr < today;
      const available = isDateAvailable(dateStr, propertyId, room);
      const isCheckIn = dateStr === selectedCheckIn;
      const isCheckOut = dateStr === selectedCheckOut;
      const inRange = isInRange(dateStr);
      const isDisabled = isPast || !available;

      let className =
        "flex h-10 w-full items-center justify-center rounded-sm text-sm font-medium transition-all md:h-11";

      if (isCheckIn || isCheckOut) {
        className += " bg-primary text-primary-foreground";
      } else if (inRange) {
        className += " bg-primary/10 text-foreground";
      } else if (isDisabled) {
        className += " text-muted-foreground/30 cursor-not-allowed line-through";
      } else {
        className += " text-foreground hover:bg-primary/10 cursor-pointer";
      }

      days.push(
        <button
          key={dateStr}
          disabled={isDisabled}
          onClick={() => handleDateClick(dateStr)}
          className={className}
        >
          {i}
        </button>
      );
    }

    return (
      <div>
        <h4 className="mb-3 text-center font-serif text-lg font-medium text-foreground">
          {t(monthKeys[m])} {y}
        </h4>
        <div className="mb-1 grid grid-cols-7 gap-1">
          {dayKeys.map((dk) => (
            <div key={dk} className="py-1 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t(dk)}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: offset }).map((_, i) => (
            <div key={`e-${i}`} className="h-10 md:h-11" />
          ))}
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-sm bg-card p-4 md:p-6">
      {/* Navigation */}
      <div className="mb-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
          disabled={`${year}-${String(month + 1).padStart(2, "0")}` <= today.substring(0, 7)}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Two-month grid */}
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {renderMonth(year, month, daysInMonth, startOffset)}
        {renderMonth(year2, month2, daysInMonth2, startOffset2)}
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-primary" />
          <span className="text-muted-foreground">{t("booking.selected")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-primary/10" />
          <span className="text-muted-foreground">{t("booking.yourStay")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm border border-muted-foreground/20 line-through" />
          <span className="text-muted-foreground">{t("booking.unavailable")}</span>
        </div>
      </div>
    </div>
  );
}
