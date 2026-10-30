import { Injectable, computed, effect, signal } from '@angular/core';
import { CartItem, CustomerInfo, Product } from '../models';
import { RESTAURANT } from '../config';

const STORAGE_KEY = 'diesel-cart-v2';

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>(this.load());
  readonly isOpen = signal(false);

  readonly count = computed(() => this.items().reduce((s, i) => s + i.qty, 0));
  readonly total = computed(() => this.items().reduce((s, i) => s + i.qty * i.product.price, 0));

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items()));
      } catch {}
    });
  }

  add(product: Product): void {
    if (product.available === false) return; // صنف غير متاح
    this.items.update((list) => {
      const found = list.find((i) => i.product.id === product.id);
      return found
        ? list.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...list, { product, qty: 1 }];
    });
  }

  changeQty(productId: string, delta: number): void {
    this.items.update((list) =>
      list
        .map((i) => (i.product.id === productId ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }

  remove(productId: string): void {
    this.items.update((list) => list.filter((i) => i.product.id !== productId));
  }

  clear(): void {
    this.items.set([]);
  }

  qtyOf(productId: string): number {
    return this.items().find((i) => i.product.id === productId)?.qty ?? 0;
  }

  open(): void { this.isOpen.set(true); }
  close(): void { this.isOpen.set(false); }

  /** يبني رابط واتساب برسالة الطلب */
  buildWhatsAppUrl(customer: CustomerInfo): string {
    const c = RESTAURANT.currency;
    const lines = this.items().map(
      (i, idx) => `${idx + 1}) ${i.product.name} × ${i.qty} = ${i.qty * i.product.price} ${c}`
    );
    const text = [
      `السلام عليكم`,
      `*طلب جديد - ${RESTAURANT.name}*`,
      '',
      ...lines,
      '',
      `*الإجمالي: ${this.total()} ${c}* (غير شامل التوصيل)`,
      '',
      `اسم العميل: ${customer.name}`,
      `رقم التليفون: ${customer.phone}`,
      `العنوان: ${customer.address}`,
      customer.notes ? `ملاحظات: ${customer.notes}` : '',
    ]
      .filter((l, i, arr) => !(l === '' && arr[i - 1] === ''))
      .join('\n');
    return `https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent(text)}`;
  }

  private load(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  }
}
