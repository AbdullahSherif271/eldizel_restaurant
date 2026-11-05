import { Injectable, computed, signal } from '@angular/core';
import { CartItem, CustomerInfo, Product } from '../models';
import { RESTAURANT, DELIVERY_AREAS } from '../config';
import { PRODUCTS } from '../data/products';

const STORAGE_KEY = 'diesel-cart-v3';
const OLD_STORAGE_KEY = 'diesel-cart-v2';
const AREA_KEY = 'diesel-area-v1';
const CART_TTL = 2 * 60 * 60 * 1000;

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>(this.load());
  readonly isOpen = signal(false);
  readonly areaId = signal<string>(this.loadArea());
  readonly area = computed(() => DELIVERY_AREAS.find((a) => a.id === this.areaId()) ?? null);
  readonly deliveryFee = computed(() => this.area()?.fee ?? 0);

  readonly count = computed(() => this.items().reduce((s, i) => s + i.qty, 0));
  readonly total = computed(() => this.items().reduce((s, i) => s + i.qty * i.product.price, 0));
  readonly grandTotal = computed(() => this.total() + this.deliveryFee());

  constructor() {
    try { localStorage.removeItem(OLD_STORAGE_KEY); } catch {}
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') this.items.set(this.load());
      });
    }
  }

  add(product: Product): void {
    if (product.available === false) return; 
    this.commit((list) => {
      const found = list.find((i) => i.product.id === product.id);
      return found
        ? list.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...list, { product, qty: 1 }];
    });
  }

  changeQty(productId: string, delta: number): void {
    this.commit((list) =>
      list
        .map((i) => (i.product.id === productId ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }

  remove(productId: string): void {
    this.commit((list) => list.filter((i) => i.product.id !== productId));
  }

  clear(): void {
    this.commit(() => []);
  }

  qtyOf(productId: string): number {
    return this.items().find((i) => i.product.id === productId)?.qty ?? 0;
  }

  setArea(id: string): void {
    this.areaId.set(id);
    try { localStorage.setItem(AREA_KEY, id); } catch {}
  }

  open(): void { this.isOpen.set(true); }
  close(): void { this.isOpen.set(false); }

  buildWhatsAppUrl(customer: CustomerInfo): string {
    const c = RESTAURANT.currency;
    const lines = this.items().map(
      (i, idx) => `${idx + 1}) ${i.product.name} × ${i.qty} = ${i.qty * i.product.price} ${c}`
    );
    const area = this.area();
    const text = [
      `السلام عليكم`,
      `*طلب جديد - ${RESTAURANT.name}*`,
      '',
      ...lines,
      '',
      `إجمالي الطلب: ${this.total()} ${c}`,
      `التوصيل (${area?.name ?? '-'}): ${this.deliveryFee()} ${c}`,
      `*الإجمالي الكلي: ${this.grandTotal()} ${c}*`,
      '',
      `اسم العميل: ${customer.name}`,
      `رقم التليفون: ${customer.phone}`,
      `المنطقة: ${area?.name ?? '-'}`,
      `العنوان: ${customer.address}`,
      customer.notes ? `ملاحظات: ${customer.notes}` : '',
    ]
      .filter((l, i, arr) => !(l === '' && arr[i - 1] === ''))
      .join('\n');
    return `https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent(text)}`;
  }

  // بيحدّث السلة ويحفظها مع وقت آخر تعديل
  private commit(fn: (list: CartItem[]) => CartItem[]): void {
    this.items.update(fn);
    try {
      if (this.items().length === 0) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ items: this.items(), savedAt: Date.now() })
        );
      }
    } catch {}
  }

  private load(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const data = JSON.parse(raw) as { items: CartItem[]; savedAt: number };
      if (!data?.savedAt || Date.now() - data.savedAt > CART_TTL) {
        localStorage.removeItem(STORAGE_KEY);
        return [];
      }
      return (data.items ?? [])
        .map((i) => {
          const p = PRODUCTS.find((x) => x.id === i.product.id);
          return p && p.available !== false ? { product: p, qty: i.qty } : null;
        })
        .filter((i): i is CartItem => i !== null);
    } catch {
      return [];
    }
  }

  private loadArea(): string {
    try {
      const id = localStorage.getItem(AREA_KEY) ?? '';
      return DELIVERY_AREAS.some((a) => a.id === id) ? id : '';
    } catch {
      return '';
    }
  }
}