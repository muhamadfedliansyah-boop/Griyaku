import { ProductItem } from "@/types/ecommerce";

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 1,
    name: "Digital Air Fryer 4L Touch Screen - Eco Series",
    slug: "digital-air-fryer-4l-touch-screen",
    price: 349000,
    originalPrice: 459000,
    discountPercent: 24,
    stock: 85,
    description:
      "Air Fryer hemat listrik dengan kapasitas 4 Liter dan panel kontrol layar sentuh LED interaktif. Dilengkapi 8 menu masak otomatis, lapisan anti lengket Food Grade bebas PFOA, dan sirkulasi udara panas 360 derajat untuk makanan renyah tanpa minyak berlebih.",
    imageUrl:
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 128,
    soldCount: 1240,
    isFreeShipping: true,
    category: {
      id: 1,
      name: "Dapur & Memasak",
      slug: "dapur-memasak",
    },
    merchant: {
      id: 1,
      name: "Griyaku Official Store",
      city: "Jakarta Selatan",
      isOfficial: true,
      rating: 4.95,
    },
  },
  {
    id: 2,
    name: "Blender Multifungsi 6 Pisau Baja Tahan Karat 350W",
    slug: "blender-multifungsi-6-pisau-baja",
    price: 219000,
    originalPrice: 289000,
    discountPercent: 24,
    stock: 120,
    description:
      "Blender bertenaga tinggi untuk jus buah, smoothies, dan bumbu dapur. Mata pisau 6 bilah stainless steel 304 ekstra tajam dengan motor tembaga bertenaga 350W. Tabung kaca tebal tahan panas dan anti pecah.",
    imageUrl:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 95,
    soldCount: 870,
    isFreeShipping: true,
    category: {
      id: 1,
      name: "Dapur & Memasak",
      slug: "dapur-memasak",
    },
    merchant: {
      id: 1,
      name: "Griyaku Official Store",
      city: "Jakarta Selatan",
      isOfficial: true,
      rating: 4.95,
    },
  },
  {
    id: 3,
    name: "Smart Rice Cooker Low Carbo Digital 1.8L",
    slug: "smart-rice-cooker-low-carbo-digital",
    price: 499000,
    originalPrice: 699000,
    discountPercent: 28,
    stock: 42,
    description:
      "Penanak nasi pintar dengan teknologi pengurangan kadar gula karbohidrat hingga 45%. Panci keramik tebal 5 lapis tahan gores dan anti lengket, dengan kontrol suhu presisi untuk nasi pulen sempurna setiap saat.",
    imageUrl:
      "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 210,
    soldCount: 2150,
    isFreeShipping: true,
    category: {
      id: 1,
      name: "Dapur & Memasak",
      slug: "dapur-memasak",
    },
    merchant: {
      id: 1,
      name: "Griyaku Official Store",
      city: "Jakarta Selatan",
      isOfficial: true,
      rating: 4.95,
    },
  },
  {
    id: 4,
    name: "Robot Vacuum Cleaner Pembersih Otomatis 3-in-1",
    slug: "robot-vacuum-cleaner-pembersih-otomatis",
    price: 899000,
    originalPrice: 1250000,
    discountPercent: 28,
    stock: 30,
    description:
      "Pembersih lantai otomatis dengan fungsi sapu, sedot, dan pel basah. Dilengkapi sensor anti-tabrak dan anti-jatuh cerdas, daya hisap turbin 2000Pa, dan baterai lithium tahan hingga 90 menit beroperasi.",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 74,
    soldCount: 530,
    isFreeShipping: true,
    category: {
      id: 2,
      name: "Kebersihan Rumah",
      slug: "kebersihan-rumah",
    },
    merchant: {
      id: 2,
      name: "Homeware Nusantara",
      city: "Bandung",
      isOfficial: true,
      rating: 4.88,
    },
  },
  {
    id: 5,
    name: "Wajan Penggorengan Granit Anti Lengket 28cm Induction",
    slug: "wajan-penggorengan-granit-anti-lengket-28cm",
    price: 189000,
    originalPrice: 249000,
    discountPercent: 24,
    stock: 150,
    description:
      "Wajan penggorengan lapisan granit Jerman bebas timbal & PFOA. Cocok untuk semua jenis kompor termasuk kompor induksi. Gagang motif kayu ergonomis tahan panas dan mudah dibersihkan.",
    imageUrl:
      "https://images.unsplash.com/photo-1584990347449-39b56f8f5533?auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1584990347449-39b56f8f5533?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 340,
    soldCount: 3100,
    isFreeShipping: true,
    category: {
      id: 1,
      name: "Dapur & Memasak",
      slug: "dapur-memasak",
    },
    merchant: {
      id: 2,
      name: "Homeware Nusantara",
      city: "Bandung",
      isOfficial: true,
      rating: 4.88,
    },
  },
  {
    id: 6,
    name: "Alat Pel Putar Otomatis Double Drive Stainless Steel",
    slug: "alat-pel-putar-otomatis-double-drive",
    price: 139000,
    originalPrice: 199000,
    discountPercent: 30,
    stock: 95,
    description:
      "Satu set ember pel berputar dengan keranjang peras stainless steel anti karat. Kepala pel microfiber ekstra menyerap air dan debu, dengan gagang teleskopik yang dapat disesuaikan panjangnya.",
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 88,
    soldCount: 920,
    isFreeShipping: true,
    category: {
      id: 2,
      name: "Kebersihan Rumah",
      slug: "kebersihan-rumah",
    },
    merchant: {
      id: 1,
      name: "Griyaku Official Store",
      city: "Jakarta Selatan",
      isOfficial: true,
      rating: 4.95,
    },
  },
];

export const DEFAULT_PRODUCT: ProductItem = INITIAL_PRODUCTS[0]!;

export function getProductById(id: number): ProductItem {
  const found = INITIAL_PRODUCTS.find((p) => p.id === id);
  if (found) return found;
  return DEFAULT_PRODUCT;
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}
