-- Add weekend_price column to pricing table
ALTER TABLE pricing ADD COLUMN IF NOT EXISTS weekend_price NUMERIC;

-- Create pricing_overrides table for per-day price overrides
CREATE TABLE IF NOT EXISTS pricing_overrides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id TEXT NOT NULL,
  room TEXT,
  date DATE NOT NULL,
  price NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(property_id, room, date)
);

-- Index for fast lookups by property + date range
CREATE INDEX IF NOT EXISTS idx_pricing_overrides_lookup
  ON pricing_overrides (property_id, date);

-- Enable RLS
ALTER TABLE pricing_overrides ENABLE ROW LEVEL SECURITY;

-- Allow all operations for authenticated users
CREATE POLICY "Allow all for authenticated" ON pricing_overrides
  FOR ALL USING (true);
