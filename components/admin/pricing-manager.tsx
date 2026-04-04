"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";
import type { PropertyId, Room } from "@/lib/booking-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Euro } from "lucide-react";

interface PricingRule {
  id: string;
  propertyId: PropertyId;
  room: Room | null;
  seasonName: string;
  startDate: string;
  endDate: string;
  pricePerNight: number;
  minNights: number;
}

interface PricingManagerProps {
  propertyId: PropertyId;
  room: Room | null;
}

export function PricingManager({ propertyId, room }: PricingManagerProps) {
  const { t } = useLanguage();
  const [rules, setRules] = useState<PricingRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [seasonName, setSeasonName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [minNights, setMinNights] = useState("1");

  const fetchPricing = async () => {
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
          minNights: r.min_nights,
        }))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPricing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId, room]);

  const addRule = async () => {
    if (!seasonName || !startDate || !endDate || !pricePerNight) return;

    const { data, error } = await supabase
      .from("pricing")
      .insert({
        property_id: propertyId,
        room: room,
        season_name: seasonName,
        start_date: startDate,
        end_date: endDate,
        price_per_night: parseFloat(pricePerNight.replace(",", ".")),
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
          minNights: data.min_nights,
        },
      ]);
      setSeasonName("");
      setStartDate("");
      setEndDate("");
      setPricePerNight("");
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

  if (loading) {
    return (
      <div className="rounded-sm bg-card p-6 text-center text-sm text-muted-foreground">
        ...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rules.length === 0 && !showForm && (
        <div className="rounded-sm bg-card p-6 text-center text-sm text-muted-foreground">
          {t("admin.pricing.noPricing")}
        </div>
      )}

      {/* Existing rules */}
      {rules.map((rule) => (
        <div
          key={rule.id}
          className="flex items-center justify-between rounded-sm border border-border bg-card p-3"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="font-medium text-foreground">{rule.seasonName}</span>
            <span className="text-muted-foreground">
              {new Date(rule.startDate).toLocaleDateString("it-IT", { day: "numeric", month: "short" })}
              {" → "}
              {new Date(rule.endDate).toLocaleDateString("it-IT", { day: "numeric", month: "short" })}
            </span>
            <span className="flex items-center gap-1 font-medium text-foreground">
              <Euro className="h-3 w-3" />
              €{rule.pricePerNight}/{t("booking.night")}
            </span>
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
          <div className="grid gap-3 sm:grid-cols-3">
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
          <div className="flex gap-2">
            <Button size="sm" onClick={addRule}>
              {t("admin.save")}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>
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
  );
}
