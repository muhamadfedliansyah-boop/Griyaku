-- =========================================================================
-- V3__seed_initial_data.sql
-- Data Awal (Seed Data) untuk Griyaku Marketplace
-- =========================================================================

-- Seed Users
INSERT INTO users (user_id, name, email, password, phone, role)
VALUES 
(1, 'Budi Santoso', 'budi@griyaku.id', '$2a$10$7vM6cE97W.2b/mockhashedpass', '081234567890', 'buyer'),
(2, 'Griya Official Store', 'seller@griyaku.id', '$2a$10$7vM6cE97W.2b/mockhashedpass', '081298765432', 'merchant')
ON CONFLICT (user_id) DO NOTHING;

-- Seed Categories
INSERT INTO categories (category_id, category_name, slug, icon, parent_id)
VALUES 
(1, 'Dapur & Memasak', 'dapur-memasak', '🍳', NULL),
(2, 'Kebersihan Rumah', 'kebersihan-rumah', '🧹', NULL),
(3, 'Elektronik Rumah', 'elektronik-rumah', '⚡', NULL),
(4, 'Perabot & Dekorasi', 'perabot-dekorasi', '🛋️', NULL),
(5, 'Kamar Mandi', 'kamar-mandi', '🚿', NULL)
ON CONFLICT (category_id) DO NOTHING;

-- Seed Merchants
INSERT INTO merchants (merchant_id, user_id, store_name, slug, city, address, is_official, rating)
VALUES 
(1, 2, 'Griyaku Official Store', 'griyaku-official-store', 'Jakarta Selatan', 'Jl. Sudirman No. 45, Jakarta Selatan', TRUE, 4.95),
(2, 2, 'Homeware Nusantara', 'homeware-nusantara', 'Bandung', 'Jl. Riau No. 12, Bandung', TRUE, 4.88)
ON CONFLICT (merchant_id) DO NOTHING;

-- Seed Products
INSERT INTO products (
    product_id, merchant_id, category_id, product_name, slug, price, original_price, 
    discount_percent, stock, description, image_url, gallery_urls, rating, review_count, sold_count, is_free_shipping
)
VALUES 
(
    1, 1, 1, 'Digital Air Fryer 4L Touch Screen - Eco Series', 'digital-air-fryer-4l-touch-screen',
    349000, 459000, 24, 85,
    'Air Fryer hemat listrik dengan kapasitas 4 Liter dan panel kontrol layar sentuh LED. Dilengkapi 8 menu masak otomatis, lapisan anti lengket Food Grade bebas PFOA, dan sirkulasi udara 360 derajat.',
    'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80',
    ARRAY['https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80'],
    4.9, 128, 1240, TRUE
),
(
    2, 1, 1, 'Blender Multifungsi 6 Pisau Baja Tahan Karat', 'blender-multifungsi-6-pisau-baja',
    219000, 289000, 24, 120,
    'Blender bertenaga tinggi untuk jus buah, smoothies, dan bumbu dapur. Mata pisau 6 bilah stainless steel 304 ekstra tajam dengan motor bertenaga 350W.',
    'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80',
    ARRAY['https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80'],
    4.8, 95, 870, TRUE
),
(
    3, 1, 1, 'Smart Rice Cooker Low Carbo Digital 1.8L', 'smart-rice-cooker-low-carbo-digital',
    499000, 699000, 28, 42,
    'Penanak nasi pintar dengan teknologi pengurangan kadar gula karbohidrat hingga 45%. Panci keramik tebal 5 lapis tahan gores dan anti lengket.',
    'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=800&q=80',
    ARRAY['https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=800&q=80'],
    4.9, 210, 2150, TRUE
),
(
    4, 2, 2, 'Robot Vacuum Cleaner Pembersih Otomatis 3-in-1', 'robot-vacuum-cleaner-pembersih-otomatis',
    899000, 1250000, 28, 30,
    'Pembersih lantai otomatis dengan fungsi sapu, sedot, dan pel basah. Dilengkapi sensor anti-tabrak cerdas dan baterai lithium tahan hingga 90 menit.',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    ARRAY['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'],
    4.7, 74, 530, TRUE
),
(
    5, 2, 1, 'Wajan Penggorengan Granit Anti Lengket 28cm', 'wajan-penggorengan-granit-anti-lengket-28cm',
    189000, 249000, 24, 150,
    'Wajan penggorengan lapisan granit Jerman bebas timbal & PFOA. Cocok untuk semua jenis kompor termasuk kompor induksi. Gagang motif kayu ergonomis.',
    'https://images.unsplash.com/photo-1584990347449-39b56f8f5533?auto=format&fit=crop&w=800&q=80',
    ARRAY['https://images.unsplash.com/photo-1584990347449-39b56f8f5533?auto=format&fit=crop&w=800&q=80'],
    4.9, 340, 3100, TRUE
),
(
    6, 1, 2, 'Alat Pel Putar Otomatis Double Drive Stainless', 'alat-pel-putar-otomatis-double-drive',
    139000, 199000, 30, 95,
    'Satu set ember pel berputar dengan keranjang peras stainless steel anti karat. Kepala pel microfiber ekstra menyerap air dan debu.',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    ARRAY['https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'],
    4.8, 88, 920, TRUE
)
ON CONFLICT (product_id) DO NOTHING;

-- Reset sequence primary key
SELECT setval('products_product_id_seq', (SELECT MAX(product_id) FROM products));
SELECT setval('categories_category_id_seq', (SELECT MAX(category_id) FROM categories));
SELECT setval('merchants_merchant_id_seq', (SELECT MAX(merchant_id) FROM merchants));
SELECT setval('users_user_id_seq', (SELECT MAX(user_id) FROM users));
