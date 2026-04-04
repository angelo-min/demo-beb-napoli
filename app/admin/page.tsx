"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Home, LogOut, CalendarDays, Inbox, Euro } from "lucide-react";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { useAuthStore } from "@/lib/auth-store";
import { useBookingStore, type Room, type Booking } from "@/lib/booking-store";
import { AuthGuard } from "@/components/admin/auth-guard";
import { AvailabilityCalendar } from "@/components/admin/availability-calendar";
import { BookingList } from "@/components/admin/booking-list";
import { BookingModal } from "@/components/admin/booking-modal";
import { BookingRequests } from "@/components/admin/booking-requests";
import { PricingManager } from "@/components/admin/pricing-manager";
import { Button } from "@/components/ui/button";

type PropertyId = "alegria" | "casamomi";

function AdminContent() {
  const { t, language, setLanguage } = useLanguage();
  const signOut = useAuthStore((s) => s.signOut);
  const fetchBookings = useBookingStore((s) => s.fetchBookings);

  const [activeProperty, setActiveProperty] = useState<PropertyId>("alegria");
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [activeTab, setActiveTab] = useState<"bookings" | "requests" | "pricing">("bookings");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const toggleLanguage = () => {
    setLanguage(language === "it" ? "en" : "it");
  };

  const properties: { id: PropertyId; name: string; location: string }[] = [
    { id: "alegria", name: "Alegria — Nido degli Dei", location: "Agerola" },
    { id: "casamomi", name: "Casa Momi Mergellina", location: "Napoli" },
  ];

  const rooms: { id: Room; label: string }[] = [
    { id: "gold", label: "Gold" },
    { id: "silver", label: "Silver" },
    { id: "whole", label: t("admin.room.whole") },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">{t("nav.home")}</span>
            </Link>
            <h1 className="font-serif text-xl font-medium text-foreground md:text-2xl">
              {t("admin.title")}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {language === "it" ? "EN" : "IT"}
            </button>
            <button
              onClick={signOut}
              className="flex h-9 items-center gap-2 rounded-full border border-border px-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">{t("admin.logout")}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Property Tabs */}
      <div className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex gap-1">
            {properties.map((property) => (
              <button
                key={property.id}
                onClick={() => {
                  setActiveProperty(property.id);
                  setActiveRoom(property.id === "casamomi" ? "gold" : null);
                }}
                className={`relative px-4 py-3 text-sm font-medium transition-colors md:px-6 md:py-4 ${
                  activeProperty === property.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="hidden md:inline">{property.name}</span>
                <span className="md:hidden">{property.location}</span>
                {activeProperty === property.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Room Tabs (only for Casa Momi) */}
      {activeProperty === "casamomi" && (
        <div className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="flex gap-1">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room.id)}
                  className={`relative px-4 py-2.5 text-sm font-medium transition-colors md:px-6 md:py-3 ${
                    activeRoom === room.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(`admin.room.${room.id}`)}
                  {activeRoom === room.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section Tabs */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex gap-1">
            {([
              { id: "bookings" as const, icon: CalendarDays, label: t("admin.bookings") },
              { id: "requests" as const, icon: Inbox, label: t("admin.requests") },
              { id: "pricing" as const, icon: Euro, label: t("admin.pricing") },
            ]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors md:px-5 md:py-3 ${
                  activeTab === tab.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
        {activeTab === "bookings" && (
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Calendar Section */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-lg font-medium text-foreground">
                  {t("admin.calendar")}
                </h2>
              </div>
              <AvailabilityCalendar propertyId={activeProperty} room={activeRoom} />
            </div>

            {/* Bookings Section */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-lg font-medium text-foreground">
                  {t("admin.upcoming")}
                </h2>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  {t("admin.add")}
                </Button>
              </div>
              <BookingList
                propertyId={activeProperty}
                room={activeRoom}
                onEdit={(booking) => {
                  setEditingBooking(booking);
                  setIsModalOpen(true);
                }}
              />
            </div>
          </div>
        )}

        {activeTab === "requests" && (
          <div>
            <div className="mb-4">
              <h2 className="font-serif text-lg font-medium text-foreground">
                {t("admin.requests.title")}
              </h2>
            </div>
            <BookingRequests propertyId={activeProperty} />
          </div>
        )}

        {activeTab === "pricing" && (
          <div>
            <div className="mb-4">
              <h2 className="font-serif text-lg font-medium text-foreground">
                {t("admin.pricing.title")}
              </h2>
            </div>
            <PricingManager propertyId={activeProperty} room={activeRoom} />
          </div>
        )}
      </main>

      {/* Booking Modal */}
      <BookingModal
        propertyId={activeProperty}
        room={activeRoom}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBooking(null);
        }}
        editBooking={editingBooking}
      />
    </div>
  );
}

export default function AdminPage() {
  return (
    <LanguageProvider>
      <AuthGuard>
        <AdminContent />
      </AuthGuard>
    </LanguageProvider>
  );
}
