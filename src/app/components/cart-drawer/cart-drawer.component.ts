import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { RESTAURANT } from '../../config';
import { CustomerInfo } from '../../models';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.scss',
})
export class CartDrawerComponent {
  readonly cart = inject(CartService);
  readonly currency = RESTAURANT.currency;
  readonly deliveryNote = RESTAURANT.deliveryNote;

  readonly step = signal<'cart' | 'checkout'>('cart');
  readonly submitted = signal(false);
  readonly confirmClear = signal(false);
  customer: CustomerInfo = this.loadCustomer();

  readonly empty = computed(() => this.cart.items().length === 0);

  close(): void {
    this.cart.close();
    this.step.set('cart');
    this.submitted.set(false);
    this.resetClear();
  }

  confirm(valid: boolean | null): void {
    this.submitted.set(true);
    if (!valid || this.empty()) return;
    this.saveCustomer();
    window.open(this.cart.buildWhatsAppUrl(this.customer), '_blank');
  }

  clearAll(): void {
    this.resetClear();
    this.cart.clear();
  }

  private resetClear(): void {
    this.confirmClear.set(false);
  }

  finish(): void {
    this.cart.clear();
    this.close();
  }

  private loadCustomer(): CustomerInfo {
    try {
      const raw = localStorage.getItem('diesel-customer-v1');
      if (raw) return JSON.parse(raw) as CustomerInfo;
    } catch {}
    return { name: '', phone: '', address: '', notes: '' };
  }
  private saveCustomer(): void {
    try { localStorage.setItem('diesel-customer-v1', JSON.stringify(this.customer)); } catch {}
  }
}