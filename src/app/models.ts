export interface Category {
  id: string;
  name: string;
  image: string;
}
export interface ProductVariant {
  id: string;     // 'single' | 'double'
  label: string;  // 'سنجل' | 'دبل'
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  categoryId: string;
  bestSeller?: boolean;
  badge?: 'جديد' | 'مميز';
  available?: boolean;
  variants?: ProductVariant[];  // جديد

}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  notes: string;
}
