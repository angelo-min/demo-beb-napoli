"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useLanguage } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";
import type { PropertyId, Room } from "@/lib/booking-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Trash2,
  Euro,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface PricingRule {
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

interface PricingOverride {
  id: string;
  date: string;
  price: number;
}

interface PricingManagerProps {
  propertyId: PropertyId;
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

function isWeekend(dateStr: string): boolean {
  const day = new Date(dateStr).getDay();
  return day === 5 || day === 6; // Friday, Saturday
}

type PriceSource = "base" | "weekend" | "override" | "none";

function resolvePrice(
  dateStr: string,
  rules: PricingRule[],
  overridesMap: Map<string, number>
): { price: number; source: PriceSource } | null {
  // 1. Check override
  const overridePrice = overridesMap.get(dateStr);
  if (overridePrice != null) {
    return { price: overridePrice, source: "override" };
  }
  // 2. Find season rule
  const rule = rules.find(
    (r) => dateStr >= r.startDate && dateStr <= r.endDate
  );
  if (!rule) return null;
  // 3. Weekend price
  if (isWeekend(dateStr) && rule.weekendPrice != null) {
    return { price: rule.weekendPrice, source: "weekend" };
  }
  // 4. Base price
  return { price: rule.pricePerNight, source: "base" };
}

export function PricingManager({ propertyId, room }: PricingManagerProps) {
  const { t } = useLanguage();
  const [rules, setRules] = useState<PricingRule[]>([]);
  const [overrides, setOverrides] = useState<PricingOverride[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [seasonsExpanded, setSeasonsExpanded] = useState(true);

  // Season form state
  const [seasonName, setSeasonName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [weekendPrice, setWeekendPrice] = useState("");
  const [minNights, setMinNights] = useState("1");

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [overridePrice, setOverridePrice] = useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const fetchPricing = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("pricing")
      .select("*")
      .eq("property_id", propertyId)
      .order("start_date", { ascending: true });

    if (room) {
      query = query.or(`room.eq.${room},room.is.null`);
    }

    const { data, error } = await query;

    if (!error && data) {
      setRules(
        data.map((r) => ({
          id: r.id,
          propertyId: r.property_id as PropertyId,
          room: r.room as Room | null,
          seasonName: r.season_name,
          startDate: r.start_date,
          endDate: r.end_date,
          pricePerNight: Number(r.price_per_night),
          weekendPrice:
            r.weekend_price != null ? Number(r.weekend_price) : null,
          minNights: r.min_nights,
        }))
      );
    }
    setLoading(false);
  }, [propertyId, room]);

  const fetchOverrides = useCallback(async () => {
    let query = supabase
      .from("pricing_overrides")
      .select("*")
      .eq("property_id", propertyId);

    if (room) {
      query = query.or(`room.eq.${room},room.is.null`);
    } else {
      query = query.is("room", null);
    }

    const { data, error } = await query;

    if (!error && data) {
      setOverrides(
        data.map((r) => ({
          id: r.id,
          date: r.date,
          price: Number(r.price),
        }))
      );
    }
  }, [propertyId, room]);

  useEffect(() => {
    fetchPricing();
    fetchOverrides();
  }, [fetchPricing, fetchOverrides]);

  const overridesMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const o of overrides) {
      map.set(o.date, o.price);
    }
    return map;
  }, [overrides]);

  // --- Season CRUD ---

  const addRule = async () => {
    if (!seasonName || !startDate || !endDate || !pricePerNight) return;

    const wpValue = weekendPrice.trim()
      ? parseFloat(weekendPrice.replace(",", "."))
      : null;

    const { data, error } = await supabase
      .from("pricing")
      .insert({
        property_id: propertyId,
        room: room,
        season_name: seasonName,
        start_date: startDate,
        end_date: endDate,
        price_per_night: parseFloat(pricePerNight.replace(",", ".")),
        weekend_price: wpValue,
        min_nights: parseInt(minNights) || 1,
      })
      .select()
      .single();

    if (!error && data) {
      setRules((prev) => [
        ...prev,
        {
          id: data.id,
          propertyId: data.property_id as PropertyId,
          room: data.room as Room | null,
          seasonName: data.season_name,
          startDate: data.start_date,
          endDate: data.end_date,
          pricePerNight: Number(data.price_per_night),
          weekendPrice:
            data.weekend_price != null ? Number(data.weekend_price) : null,
          minNights: data.min_nights,
        },
      ]);
      setSeasonName("");
      setStartDate("");
      setEndDate("");
      setPricePerNight("");
      setWeekendPrice("");
      setMinNights("1");
      setShowForm(false);
    }
  };

  const deleteRule = async (id: string) => {
    const { error } = await supabase.from("pricing").delete().eq("id", id);
    if (!error) {
      setRules((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // --- Calendar day data ---

  const days = useMemo(() => {
    const result: {
      day: number;
      dateStr: string;
      resolved: { price: number; source: PriceSource } | null;
    }[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      result.push({
        day: i,
        dateStr,
        resolved: resolvePrice(dateStr, rules, overridesMap),
      });
    }
    return result;
  }, [year, month, daysInMonth, rules, overridesMap]);

  // --- Calendar selection ---

  const handleDayClick = (dateStr: string) => {
    setSelectedDates((prev) => {
      if (prev.length === 0) return [dateStr];
      if (prev.length === 1) {
        const start = prev[0] < dateStr ? prev[0] : dateStr;
        const end = prev[0] < dateStr ? dateStr : prev[0];
        // Build range
        const range: string[] = [];
        const d = new Date(start);
        const endD = new Date(end);
        while (d <= endD) {
          range.push(d.toISOString().split("T")[0]);
          d.setDate(d.getDate() + 1);
        }
        return range;
      }
      // Reset selection
      return [dateStr];
    });
  };

  const isSelected = (dateStr: string) => selectedDates.includes(dateStr);

  // --- Override CRUD ---

  const applyOverride = async () => {
    if (!overridePrice.trim() || selectedDates.length === 0) return;
    const price = parseFloat(overridePrice.replace(",", "."));
    if (isNaN(price)) return;

    const rows = selectedDates.map((date) => ({
      property_id: propertyId,
      room: room,
      date,
      price,
    }));

    const { error } = await supabase
      .from("pricing_overrides")
      .upsert(rows, { onConflict: "property_id,room,date" });

    if (!error) {
      await fetchOverrides();
      setSelectedDates([]);
      setOverridePrice("");
    }
  };

  const removeOverrides = async () => {
    if (selectedDates.length === 0) return;

    let query = supabase
      .from("pricing_overrides")
      .delete()
      .eq("property_id", propertyId)
      .in("date", selectedDates);

    if (room) {
      query = query.eq("room", room);
    } else {
      query = query.is("room", null);
    }

    const { error } = await query;
    if (!error) {
      await fetchOverrides();
      setSelectedDates([]);
    }
  };

  // --- Color helpers ---

  const getSourceColor = (source: PriceSource, selected: boolean) => {
    if (selected) return "ring-2 ring-primary bg-primary/10";
    switch (source) {
      case "base":
        return "bg-blue-50 text-blue-900";
      case "weekend":
        return "bg-violet-50 text-violet-900";
      case "override":
        return "bg-orange-50 text-orange-900";
      case "none":
        return "bg-gray-50 text-gray-400";
    }
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  if (loading) {
    return (
      <div className="rounded-sm bg-card p-6 text-center text-sm text-muted-foreground">
        ...
      </div>
    );
  }

  const hasSelectedOverrides = selectedDates.some((d) => overridesMap.has(d));

  return (
    <div className="space-y-6">
      {/* ===== SECTION 1: Pricing Calendar ===== */}
      <div>
        <h3 className="mb-3 font-serif text-base font-medium text-foreground">
          {t("admin.pricing.calendarTitle")}
        </h3>

        <div className="rounded-sm bg-card p-4 md:p-6">
          {/* Month navigation */}
          <div className="mb-4 flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h4 className="font-serif text-lg font-medium text-foreground">
              {t(monthKeys[month])} {year}
            </h4>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Day headers */}
          <div className="mb-1 grid grid-cols-7 gap-1">
            {dayKeys.map((dayKey) => (
              <div
                key={dayKey}
                className="py-1 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                {t(dayKey)}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="h-14 md:h-16" />
            ))}

            {days.map(({ day, dateStr, resolved }) => {
              const sel = isSelected(dateStr);
              const source = resolved?.source ?? "none";
              return (
                <button
                  key={dateStr}
                  onClick={() => handleDayClick(dateStr)}
                  className={`flex h-14 flex-col items-center justify-center rounded-sm text-xs transition-all md:h-16 ${getSourceColor(source, sel)}`}
                >
                  <span className="font-medium">{day}</span>
                  {resolved ? (
                    <span className="mt-0.5 text-[10px] font-semibold leading-none">
                      €{resolved.price}
                    </span>
                  ) : (
                    <span className="mt-0.5 text-[10px] leading-none opacity-50">
                      —
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-blue-100" />
              <span className="text-muted-foreground">
                {t("admin.pricing.legend.weekday")}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-violet-100" />
              <span className="text-muted-foreground">
                {t("admin.pricing.legend.weekend")}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-orange-100" />
              <span className="text-muted-foreground">
                {t("admin.pricing.legend.custom")}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-gray-100" />
              <span className="text-muted-foreground">
                {t("admin.pricing.legend.noPrice")}
              </span>
            </div>
          </div>

          {/* Selection panel */}
          {selectedDates.length > 0 && (
            <div className="mt-4 rounded-sm border border-border bg-secondary/30 p-3 space-y-3">
              <div className="text-sm text-muted-foreground">
                <strong>{t("admin.pricing.selectedDates")}:</strong>{" "}
                {selectedDates.length === 1
                  ? selectedDates[0]
                  : `${selectedDates[0]} → ${selectedDates[selectedDates.length - 1]} (${selectedDates.length})`}
              </div>
              <div className="flex flex-wrap items-end gap-2">
                <div className="flex-1 min-w-[120px]">
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">
                    {t("admin.pricing.pricePerNight")}
                  </label>
                  <Input
                    value={overridePrice}
                    onChange={(e) => setOverridePrice(e.target.value)}
                    placeholder="150"
                    className="h-8"
                  />
                </div>
                <Button size="sm" onClick={applyOverride} className="h-8">
                  {t("admin.pricing.setPrice")}
                </Button>
                {hasSelectedOverrides && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={removeOverrides}
                    className="h-8"
                  >
                    {t("admin.pricing.removeOverride")}
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedDates([])}
                  className="h-8"
                >
                  {t("admin.cancel")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== SECTION 2: Seasonal Rules ===== */}
      <div>
        <button
          onClick={() => setSeasonsExpanded((v) => !v)}
          className="mb-3 flex w-full items-center gap-2 text-left"
        >
          <h3 className="font-serif text-base font-medium text-foreground">
            {t("admin.pricing.seasonsTitle")}
          </h3>
          {seasonsExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        {seasonsExpanded && (
          <div className="space-y-3">
            {rules.length === 0 && !showForm && (
              <div className="rounded-sm bg-card p-4 text-center text-sm text-muted-foreground">
                {t("admin.pricing.noPricing")}
              </div>
            )}

            {/* Existing rules */}
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center justify-between rounded-sm border border-border bg-card p-3"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <span className="font-medium text-foreground">
                    {rule.seasonName}
                  </span>
                  <span className="text-muted-foreground">
                    {new Date(rule.startDate).toLocaleDateString("it-IT", {
                      day: "numeric",
                      month: "short",
                    })}
                    {" → "}
                    {new Date(rule.endDate).toLocaleDateString("it-IT", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-foreground">
                    <Euro className="h-3 w-3" />€{rule.pricePerNight}/
                    {t("booking.night")}
                  </span>
                  {rule.weekendPrice != null && (
                    <span className="flex items-center gap-1 font-medium text-violet-700">
                      €{rule.weekendPrice}/wknd
                    </span>
                  )}
                  {rule.minNights > 1 && (
                    <span className="text-xs text-muted-foreground">
                      min {rule.minNights} {t("booking.nights")}
                    </span>
                  )}
                  {rule.room && (
                    <span className="rounded bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground">
                      {t(`admin.room.${rule.room}`)}
                    </span>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => deleteRule(rule.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {/* Add form */}
            {showForm ? (
              <div className="rounded-sm border border-border bg-card p-4 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">
                      {t("admin.pricing.season")}
                    </label>
                    <Input
                      value={seasonName}
                      onChange={(e) => setSeasonName(e.target.value)}
                      placeholder="es. Alta Stagione"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">
                      {t("admin.pricing.pricePerNight")}
                    </label>
                    <Input
                      value={pricePerNight}
                      onChange={(e) => setPricePerNight(e.target.value)}
                      placeholder="120"
                    />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">
                      {t("admin.pricing.weekendPrice")}
                    </label>
                    <Input
                      value={weekendPrice}
                      onChange={(e) => setWeekendPrice(e.target.value)}
                      placeholder={t("admin.pricing.weekendPrice")}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">
                      {t("admin.pricing.minNights")}
                    </label>
                    <Input
                      type="number"
                      min={1}
                      value={minNights}
                      onChange={(e) => setMinNights(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">
                      {t("admin.pricing.startDate")}
                    </label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">
                      {t("admin.pricing.endDate")}
                    </label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={addRule}>
                    {t("admin.save")}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowForm(false)}
                  >
                    {t("admin.cancel")}
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowForm(true)}
                className="w-full"
              >
                <Plus className="mr-1 h-4 w-4" />
                {t("admin.pricing.add")}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
