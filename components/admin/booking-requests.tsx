"use client";

import { useState, useEffect, useMemo } from "react";
import { useLanguage } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";
import type { PropertyId } from "@/lib/booking-store";
import { Button } from "@/components/ui/button";
import { Check, X, Mail, Phone, Users, Calendar, Euro, Clock } from "lucide-react";

interface BookingRequest {
  id: string;
  propertyId: PropertyId;
  room: string | null;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  notes: string;
  totalPrice: number | null;
  status: "pending" | "confirmed" | "rejected";
  createdAt: string;
}

interface BookingRequestsProps {
  propertyId: PropertyId;
}

export function BookingRequests({ propertyId }: BookingRequestsProps) {
  const { t } = useLanguage();
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("booking_requests")
      .select("*")
      .eq("property_id", propertyId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRequests(
        data.map((r) => ({
          id: r.id,
          propertyId: r.property_id as PropertyId,
          room: r.room,
          guestName: r.guest_name,
          guestEmail: r.guest_email,
          guestPhone: r.guest_phone,
          checkIn: r.check_in,
          checkOut: r.check_out,
          guestsCount: r.guests_count,
          notes: r.notes,
          totalPrice: r.total_price ? Number(r.total_price) : null,
          status: r.status as BookingRequest["status"],
          createdAt: r.created_at,
        }))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId]);

  const updateStatus = async (id: string, status: "confirmed" | "rejected") => {
    const { error } = await supabase
      .from("booking_requests")
      .update({ status })
      .eq("id", id);

    if (!error) {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    }
  };

  const pendingRequests = useMemo(
    () => requests.filter((r) => r.status === "pending"),
    [requests]
  );
  const otherRequests = useMemo(
    () => requests.filter((r) => r.status !== "pending"),
    [requests]
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("it-IT", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const statusBadge = (status: BookingRequest["status"]) => {
    const colors = {
      pending: "bg-amber-100 text-amber-800",
      confirmed: "bg-emerald-100 text-emerald-800",
      rejected: "bg-red-100 text-red-800",
    };
    return (
      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors[status]}`}>
        {t(`admin.requests.${status}`)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="rounded-sm bg-card p-6 text-center text-sm text-muted-foreground">
        ...
      </div>
    );
  }

  const renderRequest = (request: BookingRequest) => (
    <div
      key={request.id}
      className="rounded-sm border border-border bg-card p-4 transition-colors hover:bg-secondary/20"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-foreground">{request.guestName}</h4>
            {statusBadge(request.status)}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(request.checkIn)} → {formatDate(request.checkOut)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {request.guestsCount} {t("admin.requests.guests")}
            </span>
            {request.totalPrice && (
              <span className="flex items-center gap-1">
                <Euro className="h-3 w-3" />
                €{request.totalPrice}
              </span>
            )}
            {request.room && (
              <span>{t(`admin.room.${request.room}`)}</span>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <a href={`mailto:${request.guestEmail}`} className="flex items-center gap-1 hover:text-foreground">
              <Mail className="h-3 w-3" />
              {request.guestEmail}
            </a>
            <a href={`tel:${request.guestPhone}`} className="flex items-center gap-1 hover:text-foreground">
              <Phone className="h-3 w-3" />
              {request.guestPhone}
            </a>
          </div>
          {request.notes && (
            <p className="mt-2 text-xs italic text-muted-foreground">
              {request.notes}
            </p>
          )}
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground/60">
            <Clock className="h-3 w-3" />
            {new Date(request.createdAt).toLocaleString("it-IT")}
          </p>
        </div>

        {request.status === "pending" && (
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
              onClick={() => updateStatus(request.id, "confirmed")}
              title={t("admin.requests.confirm")}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => updateStatus(request.id, "rejected")}
              title={t("admin.requests.reject")}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {pendingRequests.length === 0 && otherRequests.length === 0 && (
        <div className="rounded-sm bg-card p-6 text-center text-sm text-muted-foreground">
          {t("admin.requests.noRequests")}
        </div>
      )}

      {pendingRequests.length > 0 && (
        <div className="space-y-2">
          {pendingRequests.map(renderRequest)}
        </div>
      )}

      {otherRequests.length > 0 && (
        <div className="space-y-2">
          {otherRequests.slice(0, 10).map(renderRequest)}
        </div>
      )}
    </div>
  );
}
