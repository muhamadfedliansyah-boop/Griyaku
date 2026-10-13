import { ProductItem } from "@/types/ecommerce";
import { INITIAL_PRODUCTS } from "./products-data";

export interface AuthResponse {
  success: boolean;
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role: string;
  };
  token: string;
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch("/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Gagal masuk. Periksa kembali email dan kata sandi Anda.");
  }

  if (typeof window !== "undefined" && data.token) {
    localStorage.setItem("griyaku_token", data.token);
    localStorage.setItem("griyaku_user", JSON.stringify(data.user));
  }

  return data;
}

export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}): Promise<AuthResponse> {
  const res = await fetch("/api/v1/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Gagal mendaftar. Silakan coba kembali.");
  }

  if (typeof window !== "undefined" && data.token) {
    localStorage.setItem("griyaku_token", data.token);
    localStorage.setItem("griyaku_user", JSON.stringify(data.user));
  }

  return data;
}

export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("griyaku_user");
  return user ? JSON.parse(user) : null;
}

export function logoutUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("griyaku_token");
    localStorage.removeItem("griyaku_user");
  }
}

export async function fetchLiveProducts(categoryId?: number): Promise<ProductItem[]> {
  try {
    const url = categoryId
      ? `/api/v1/products?categoryId=${categoryId}`
      : "/api/v1/products";
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Backend response error");
    const data = await res.json();

    if (Array.isArray(data) && data.length > 0) {
      // Map API schema to Frontend ProductItem interface
      return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        price: item.price,
        originalPrice: item.originalPrice,
        discountPercent: item.discountPercent,
        stock: item.stock,
        description: item.description,
        imageUrl: item.imageUrl,
        galleryUrls: item.galleryUrls || [item.imageUrl],
        rating: Number(item.rating) || 4.9,
        reviewCount: item.reviewCount || 100,
        soldCount: item.soldCount || 500,
        isFreeShipping: item.isFreeShipping ?? true,
        category: {
          id: item.categoryId || 1,
          name: item.categoryId === 1 ? "Dapur & Memasak" : "Kebersihan Rumah",
          slug: item.categoryId === 1 ? "dapur-memasak" : "kebersihan-rumah",
        },
        merchant: {
          id: item.merchantId || 1,
          name: item.merchantId === 1 ? "Griyaku Official Store" : "Homeware Nusantara",
          city: item.merchantId === 1 ? "Jakarta Selatan" : "Bandung",
          isOfficial: true,
          rating: 4.95,
        },
      }));
    }
  } catch (err) {
    console.warn("Menggunakan fallback produk lokal:", err);
  }

  return INITIAL_PRODUCTS;
}
