-- =========================================================================
-- V2__init_ecommerce_schema.sql
-- Relasi Database E-Commerce Griyaku (PostgreSQL 16)
-- Sesuai spesifikasi: users, merchants, categories, products, cart_items,
-- orders, order_items, payments, reviews, topup_bills
-- =========================================================================

-- 1. Tabel Users (Pengguna / Pembeli & Penjual)
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50) NOT NULL DEFAULT 'buyer', -- 'buyer', 'merchant', 'admin'
    avatar_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel Categories (Kategori dengan hierarki parent_id)
CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(50),
    parent_id INT REFERENCES categories(category_id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabel Merchants (Toko / Penjual)
CREATE TABLE IF NOT EXISTS merchants (
    merchant_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    store_name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    city VARCHAR(100) NOT NULL DEFAULT 'Jakarta Selatan',
    address TEXT,
    logo_url VARCHAR(255),
    is_official BOOLEAN NOT NULL DEFAULT FALSE,
    rating NUMERIC(3, 2) DEFAULT 4.90,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabel Products (Produk)
CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    merchant_id INT NOT NULL REFERENCES merchants(merchant_id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(category_id) ON DELETE SET NULL,
    product_name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    price BIGINT NOT NULL, -- Bilangan bulat Rupiah (sesuai aturan uang)
    original_price BIGINT,
    discount_percent INT DEFAULT 0,
    stock INT NOT NULL DEFAULT 0,
    description TEXT,
    image_url VARCHAR(255) NOT NULL,
    gallery_urls TEXT[], -- Array gambar tambahan
    rating NUMERIC(3, 2) DEFAULT 5.0,
    review_count INT DEFAULT 0,
    sold_count INT DEFAULT 0,
    weight_grams INT DEFAULT 500,
    is_free_shipping BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabel Carts & Cart Items (Keranjang Belanja)
CREATE TABLE IF NOT EXISTS cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    notes VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_product UNIQUE (user_id, product_id)
);

-- 6. Tabel Orders (Pesanan / Transaksi)
CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    order_code VARCHAR(50) UNIQUE NOT NULL,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    total_amount BIGINT NOT NULL,
    shipping_fee BIGINT NOT NULL DEFAULT 0,
    discount_amount BIGINT NOT NULL DEFAULT 0,
    grand_total BIGINT NOT NULL,
    order_status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'shipped', 'completed', 'cancelled'
    shipping_courier VARCHAR(50),
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Tabel Order Items (Detail Pesanan)
CREATE TABLE IF NOT EXISTS order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(product_id) ON DELETE RESTRICT,
    quantity INT NOT NULL CHECK (quantity > 0),
    price_at_purchase BIGINT NOT NULL,
    subtotal BIGINT NOT NULL
);

-- 8. Tabel Payments (Pembayaran)
CREATE TABLE IF NOT EXISTS payments (
    payment_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL UNIQUE REFERENCES orders(order_id) ON DELETE CASCADE,
    payment_method VARCHAR(50) NOT NULL, -- 'bca_va', 'mandiri_va', 'qris', 'gopay', 'cod'
    payment_status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'success', 'failed'
    amount BIGINT NOT NULL,
    va_number VARCHAR(100),
    qr_code_url TEXT,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Tabel Reviews (Ulasan & Rating Pembeli)
CREATE TABLE IF NOT EXISTS reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_verified_buyer BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Tabel Top-Up & Bills (PPOB / Digital Goods)
CREATE TABLE IF NOT EXISTS topup_bills (
    bill_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    bill_type VARCHAR(50) NOT NULL, -- 'pulsa', 'data', 'pln', 'pdam', 'bpjs'
    target_number VARCHAR(50) NOT NULL,
    amount BIGINT NOT NULL,
    admin_fee BIGINT NOT NULL DEFAULT 1500,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indeks untuk Performa Query
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_merchant ON products(merchant_id);
CREATE INDEX IF NOT EXISTS idx_cart_user ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
