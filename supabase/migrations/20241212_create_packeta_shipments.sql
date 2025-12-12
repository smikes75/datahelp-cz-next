-- Packeta shipments table for C2B reverse logistics
-- Customers send their devices to DataHelp via Packeta

CREATE TABLE IF NOT EXISTS packeta_shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Customer info
  customer_name TEXT NOT NULL,
  customer_surname TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_street TEXT NOT NULL,
  customer_city TEXT NOT NULL,
  customer_zip TEXT NOT NULL,

  -- Device info
  device_type TEXT NOT NULL,  -- 'hdd', 'ssd', 'raid', 'flash', 'other'
  problem_description TEXT,

  -- Packeta data
  packet_id TEXT,
  barcode TEXT,
  submission_password TEXT,  -- 8-digit password for customer

  -- Status tracking
  status TEXT DEFAULT 'created',  -- created, submitted, in_transit, delivered, cancelled

  -- Internal
  email_sent_at TIMESTAMPTZ,
  notes TEXT
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_packeta_shipments_email ON packeta_shipments(customer_email);
CREATE INDEX IF NOT EXISTS idx_packeta_shipments_status ON packeta_shipments(status);
CREATE INDEX IF NOT EXISTS idx_packeta_shipments_packet_id ON packeta_shipments(packet_id);
CREATE INDEX IF NOT EXISTS idx_packeta_shipments_created_at ON packeta_shipments(created_at DESC);

-- Enable Row Level Security
ALTER TABLE packeta_shipments ENABLE ROW LEVEL SECURITY;

-- Policy: Allow insert from authenticated users and anon (for public form)
CREATE POLICY "Allow public insert" ON packeta_shipments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow select only for authenticated users (admin)
CREATE POLICY "Allow authenticated select" ON packeta_shipments
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow update only for authenticated users (admin)
CREATE POLICY "Allow authenticated update" ON packeta_shipments
  FOR UPDATE
  TO authenticated
  USING (true);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_packeta_shipments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER packeta_shipments_updated_at
  BEFORE UPDATE ON packeta_shipments
  FOR EACH ROW
  EXECUTE FUNCTION update_packeta_shipments_updated_at();
