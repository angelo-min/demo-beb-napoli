-- Pricing table: seasonal prices per property/room
CREATE TABLE IF NOT EXISTS pricing (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id TEXT NOT NULL CHECK (property_id IN ('alegria', 'casamomi')),
  room TEXT CHECK (room IN ('gold', 'silver', 'whole')),
  season_name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  price_per_night NUMERIC(10, 2) NOT NULL,
  min_nights INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Booking requests table: public booking form submissions
CREATE TABLE IF NOT EXISTS booking_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id TEXT NOT NULL CHECK (property_id IN ('alegria', 'casamomi')),
  room TEXT CHECK (room IN ('gold', 'silver', 'whole')),
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests_count INTEGER NOT NULL DEFAULT 1,
  notes TEXT DEFAULT '',
  total_price NUMERIC(10, 2),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS policies
ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

-- Pricing: anyone can read, only authenticated can write
CREATE POLICY "Public can read pricing" ON pricing FOR SELECT USING (true);
CREATE POLICY "Auth can manage pricing" ON pricing FOR ALL USING (auth.role() = 'authenticated');

-- Booking requests: anyone can insert, only authenticated can read/update/delete
CREATE POLICY "Public can create requests" ON booking_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth can manage requests" ON booking_requests FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth can update requests" ON booking_requests FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth can delete requests" ON booking_requests FOR DELETE USING (auth.role() = 'authenticated');

-- Allow public to read bookings (only dates, enforced at API level)
-- The existing bookings table should allow public SELECT for availability
CREATE POLICY "Public can read bookings for availability" ON bookings FOR SELECT USING (true);

-- Index for faster lookups
CREATE INDEX idx_pricing_property ON pricing (property_id, start_date, end_date);
CREATE INDEX idx_booking_requests_status ON booking_requests (status, created_at);
CREATE INDEX idx_booking_requests_property ON booking_requests (property_id, check_in);
