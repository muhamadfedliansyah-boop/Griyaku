-- =========================================================================
-- V4__add_household_specs_and_relations.sql
-- Penyesuaian skema database untuk E-Commerce Peralatan Rumah Tangga
-- =========================================================================

-- 1. Tambah Kolom Spesifikasi Alat Rumah Tangga & Logistik ke tabel products
ALTER TABLE products 
    ADD COLUMN IF NOT EXISTS power_watt INT,
    ADD COLUMN IF NOT EXISTS capacity VARCHAR(50),
    ADD COLUMN IF NOT EXISTS material VARCHAR(100),
    ADD COLUMN IF NOT EXISTS warranty_months INT DEFAULT 12,
    ADD COLUMN IF NOT EXISTS warranty_type VARCHAR(50) DEFAULT 'Garansi Resmi Pabrik',
    ADD COLUMN IF NOT EXISTS is_fragile BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS length_cm INT,
    ADD COLUMN IF NOT EXISTS width_cm INT,
    ADD COLUMN IF NOT EXISTS height_cm INT;

-- 2. Buat Tabel user_addresses (Buku Alamat Rumah Tangga Pembeli)
CREATE TABLE IF NOT EXISTS user_addresses (
    address_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    recipient_name VARCHAR(100) NOT NULL,
    recipient_phone VARCHAR(20) NOT NULL,
    address_label VARCHAR(50) DEFAULT 'Rumah',
    full_address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(10),
    notes VARCHAR(255),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Update data produk rumah tangga yang sudah ada dengan spesifikasi teknis
UPDATE products SET 
    power_watt = 1200, 
    capacity = '4 Liter', 
    material = 'Teflon Food Grade Bebas PFOA', 
    warranty_months = 12, 
    warranty_type = 'Garansi Resmi 1 Tahun',
    weight_grams = 3500
WHERE slug = 'digital-air-fryer-4l-touch-screen';

UPDATE products SET 
    power_watt = 350, 
    capacity = '1.5 Liter', 
    material = 'Stainless Steel 304 & Kaca Tebal', 
    warranty_months = 12, 
    warranty_type = 'Garansi Resmi 1 Tahun',
    weight_grams = 2000,
    is_fragile = TRUE
WHERE slug = 'blender-multifungsi-6-pisau-baja';

UPDATE products SET 
    power_watt = 400, 
    capacity = '1.8 Liter', 
    material = 'Keramik 5 Lapis Anti Lengket', 
    warranty_months = 12, 
    warranty_type = 'Garansi Resmi 1 Tahun',
    weight_grams = 3000
WHERE slug = 'smart-rice-cooker-low-carbo-digital';

UPDATE products SET 
    power_watt = 25, 
    capacity = '350 ml Dust Box', 
    material = 'ABS High-Impact', 
    warranty_months = 12, 
    warranty_type = 'Garansi Resmi 1 Tahun',
    weight_grams = 2800,
    is_fragile = TRUE
WHERE slug = 'robot-vacuum-cleaner-pembersih-otomatis';

UPDATE products SET 
    power_watt = NULL, 
    capacity = '28 cm Diameter', 
    material = 'Granite Coating Jerman Bebas Timbal', 
    warranty_months = 6, 
    warranty_type = 'Garansi Toko',
    weight_grams = 1200
WHERE slug = 'wajan-penggorengan-granit-anti-lengket-28cm';

UPDATE products SET 
    power_watt = NULL, 
    capacity = '8 Liter Bucket', 
    material = 'Stainless Steel & Microfiber', 
    warranty_months = 3, 
    warranty_type = 'Garansi Toko',
    weight_grams = 1800
WHERE slug = 'alat-pel-putar-otomatis-double-drive';

-- Index tambahan untuk user_addresses
CREATE INDEX IF NOT EXISTS idx_addresses_user ON user_addresses(user_id);
