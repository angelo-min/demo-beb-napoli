export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          property_id: "alegria" | "casamomi";
          room: "gold" | "silver" | "whole" | null;
          guest_name: string;
          check_in: string;
          check_out: string;
          check_in_time: string | null;
          check_out_time: string | null;
          parking_spot: string | null;
          amount: number | null;
          amount_due: number | null;
          tourist_tax: string | null;
          notes: string;
          source: "airbnb" | "booking" | "privato";
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id: "alegria" | "casamomi";
          room?: "gold" | "silver" | "whole" | null;
          guest_name: string;
          check_in: string;
          check_out: string;
          check_in_time?: string | null;
          check_out_time?: string | null;
          parking_spot?: string | null;
          amount?: number | null;
          amount_due?: number | null;
          tourist_tax?: string | null;
          notes?: string;
          source?: "airbnb" | "booking" | "privato";
          created_at?: string;
        };
        Update: {
          id?: string;
          property_id?: "alegria" | "casamomi";
          room?: "gold" | "silver" | "whole" | null;
          guest_name?: string;
          check_in?: string;
          check_out?: string;
          check_in_time?: string | null;
          check_out_time?: string | null;
          parking_spot?: string | null;
          amount?: number | null;
          amount_due?: number | null;
          tourist_tax?: string | null;
          notes?: string;
          source?: "airbnb" | "booking" | "privato";
          created_at?: string;
        };
        Relationships: [];
      };
      pricing: {
        Row: {
          id: string;
          property_id: "alegria" | "casamomi";
          room: "gold" | "silver" | "whole" | null;
          season_name: string;
          start_date: string;
          end_date: string;
          price_per_night: number;
          min_nights: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id: "alegria" | "casamomi";
          room?: "gold" | "silver" | "whole" | null;
          season_name: string;
          start_date: string;
          end_date: string;
          price_per_night: number;
          min_nights?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          property_id?: "alegria" | "casamomi";
          room?: "gold" | "silver" | "whole" | null;
          season_name?: string;
          start_date?: string;
          end_date?: string;
          price_per_night?: number;
          min_nights?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      booking_requests: {
        Row: {
          id: string;
          property_id: "alegria" | "casamomi";
          room: "gold" | "silver" | "whole" | null;
          guest_name: string;
          guest_email: string;
          guest_phone: string;
          check_in: string;
          check_out: string;
          guests_count: number;
          notes: string;
          total_price: number | null;
          status: "pending" | "confirmed" | "rejected";
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id: "alegria" | "casamomi";
          room?: "gold" | "silver" | "whole" | null;
          guest_name: string;
          guest_email: string;
          guest_phone: string;
          check_in: string;
          check_out: string;
          guests_count?: number;
          notes?: string;
          total_price?: number | null;
          status?: "pending" | "confirmed" | "rejected";
          created_at?: string;
        };
        Update: {
          id?: string;
          property_id?: "alegria" | "casamomi";
          room?: "gold" | "silver" | "whole" | null;
          guest_name?: string;
          guest_email?: string;
          guest_phone?: string;
          check_in?: string;
          check_out?: string;
          guests_count?: number;
          notes?: string;
          total_price?: number | null;
          status?: "pending" | "confirmed" | "rejected";
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
