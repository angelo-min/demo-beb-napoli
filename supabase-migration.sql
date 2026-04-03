-- Add amount_due column
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS amount_due NUMERIC;

-- BRAGARD GIUSEPPINA: amount_due 1155, clear notes
UPDATE bookings SET
  amount_due = 1155,
  notes = ''
WHERE id = 'ba278f45-de63-4463-a2ea-ec5cf02e2462';
