import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../models';
import { CartService } from '../../services/cart.service';
import { RESTAURANT } from '../../config';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  host: { '[class.row-mobile]': 'rowOnMobile()' },
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  /** على الموبايل يتحول لكارد أفقي (الصورة جنب البيانات) - مستخدم في المنيو */
  readonly rowOnMobile = input(false);
  readonly available = computed(() => this.product().available !== false);

  readonly cart = inject(CartService);
  readonly currency = RESTAURANT.currency;

  /** الحجم المختار (null = أول حجم) */
  private readonly pickedId = signal<string | null>(null);

  readonly selectedVariant = computed(() => {
    const vs = this.product().variants;
    if (!vs?.length) return null;
    return vs.find((v) => v.id === this.pickedId()) ?? vs[0];
  });

  /** المنتج اللي هيتضاف للسلة فعلاً (id مركب واسم وسعر الحجم) */
  readonly effective = computed<Product>(() => {
    const p = this.product();
    const v = this.selectedVariant();
    if (!v) return p;
    return { ...p, id: `${p.id}-${v.id}`, name: `${p.name} (${v.label})`, price: v.price };
  });

  selectVariant(id: string): void {
    this.pickedId.set(id);
  }

  addToCart(ev: Event): void {
    if (!this.available()) return;
    this.fly(ev.currentTarget as HTMLElement); // لازم قبل الإضافة لأن الزرار بيتبدل بعداد
    this.cart.add(this.effective());
  }

  /** صورة الصنف بتطير من الزرار لحد زرار السلة، وبعدين السلة "تنبض" */
  private fly(from: HTMLElement): void {
    const target = document.getElementById('cart-fab');
    if (!target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const a = from.getBoundingClientRect();
    const b = target.getBoundingClientRect();
    const size = 56;
    const sx = a.left + a.width / 2;
    const sy = a.top + a.height / 2;
    const dx = b.left + b.width / 2 - sx;
    const dy = b.top + b.height / 2 - sy;

    const dot = document.createElement('img');
    dot.src = this.product().image;
    Object.assign(dot.style, {
      position: 'fixed', zIndex: '2000', pointerEvents: 'none',
      width: size + 'px', height: size + 'px', left: sx - size / 2 + 'px', top: sy - size / 2 + 'px',
      borderRadius: '50%', objectFit: 'cover', border: '3px solid #f45302', background: '#fff',
      boxShadow: '0 8px 20px rgba(0,0,0,.35)',
    });
    document.body.appendChild(dot);

    const anim = dot.animate(
      [
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 90}px) scale(.85)`, opacity: 1, offset: 0.45 },
        { transform: `translate(${dx}px, ${dy}px) scale(.25)`, opacity: 0.5 },
      ],
      { duration: 750, easing: 'cubic-bezier(.45, 0, .25, 1)' }
    );
    anim.onfinish = () => {
      dot.remove();
      target.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.25) rotate(-6deg)' }, { transform: 'scale(1)' }],
        { duration: 350, easing: 'ease-out' }
      );
    };
  }
}