import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/products';
import { SearchService } from '../../services/search.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  readonly search = inject(SearchService);
  readonly categories = CATEGORIES;
  readonly active = signal(CATEGORIES[0].id);
  private readonly RANGE = 140;

  private readonly sentinel = viewChild.required<ElementRef<HTMLElement>>('sentinel');
  private readonly bar = viewChild.required<ElementRef<HTMLElement>>('bar');
  private readonly row = viewChild.required<ElementRef<HTMLElement>>('row');
  private readonly destroyRef = inject(DestroyRef);
  readonly visible = computed(() => {
    const searching = this.search.active();
    return CATEGORIES
      .filter((c) => searching || c.id === this.active())
      .map((c) => ({ ...c, products: PRODUCTS.filter((p) => p.categoryId === c.id && this.search.matches(p)) }))
      .filter((g) => g.products.length);
  });

  constructor() {
    afterNextRender(() => {
      let navH = this.readNavH();
      let last = -1;
      let ticking = false;

      // بيحسب نسبة التصغير (0 = كبير، 1 = صغير) ويكتبها على الشريط كـ CSS variable
      const apply = () => {
        ticking = false;
        const top = this.sentinel().nativeElement.getBoundingClientRect().top;
        const p = Math.min(1, Math.max(0, (navH - top) / this.RANGE));
        if (p === last) return;
        last = p;
        this.bar().nativeElement.style.setProperty('--p', p.toFixed(3));
        this.centerActive(); // بس وقت ما الحجم بيتغير فعلاً
      };

      // مرة واحدة كل فريم بدل كل حدث سكرول
      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(apply);
        }
      };
      const onResize = () => {
        navH = this.readNavH();
        apply();
      };

      apply();
      this.centerActive();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
      });
    });
  }

  /** دوسة على قسم: يتفتح، البحث يتلغي، وننزل لأول المنتجات */
  pick(id: string, ev: Event): void {
    this.search.clear();
    this.active.set(id);
    this.centerActive(ev.currentTarget as HTMLElement, 'smooth');
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /** ارتفاع الناف بار (بيتقرا مرة واحدة وبيتحدث مع تغيير حجم الشاشة) */
  private readNavH(): number {
    return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0;
  }

  /** يحرك الشريط أفقياً لحد ما الدايرة المفتوحة تبقى في النص */
  private centerActive(el?: HTMLElement | null, behavior: ScrollBehavior = 'instant'): void {
    const row = this.row().nativeElement;
    const btn = el ?? row.querySelector<HTMLElement>('.cat.active');
    if (!btn) return;
    const r = row.getBoundingClientRect();
    const b = btn.getBoundingClientRect();
    row.scrollBy({ left: b.left + b.width / 2 - (r.left + r.width / 2), behavior });
  }
}