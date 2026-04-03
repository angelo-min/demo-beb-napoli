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
          notes?: string;
          source?: "airbnb" | "booking" | "privato";
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
