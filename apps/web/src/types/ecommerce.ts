export interface ProductItem {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  stock: number;
  description: string;
  imageUrl: string;
  galleryUrls?: string[];
  rating: number;
  reviewCount: number;
  soldCount: number;
  isFreeShipping: boolean;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  merchant: {
    id: number;
    name: string;
    city: string;
    isOfficial: boolean;
    rating: number;
  };
}

export interface CartItem {
  id: number;
  product: ProductItem;
  quantity: number;
  selected: boolean;
  notes?: string;
}

export interface StoreCartGroup {
  merchantId: number;
  merchantName: string;
  merchantCity: string;
  isOfficial: boolean;
  items: CartItem[];
}
