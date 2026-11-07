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
  /** true = الشريط ثابت وصغير */
  readonly compact = signal(false);
  private readonly DURATION = 350; // لازم يساوي --dur في الـ SCSS
  private raf = 0;

  private readonly sentinel = viewChild.required<ElementRef<HTMLElement>>('sentinel');
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
      let io: IntersectionObserver | undefined;
      const rowEl = this.row().nativeElement;
      // لو المستخدم مسك الشريط بإيده نوقف التوسيط التلقائي عشان منتخانقش معاه
      const stop = () => cancelAnimationFrame(this.raf);

      const observe = () => {
        io?.disconnect();
        const navH = this.readNavH();
        io = new IntersectionObserver(
          ([e]) => {
            // العلامة عدّت تحت الناف بار => الشريط ثبت => صغّر
            const next = !e.isIntersecting && e.boundingClientRect.top < navH;
            if (next === this.compact()) return;
            this.compact.set(next);
            // نثبّت مكان الدايرة المفتوحة طول مدة الانتقال
            this.chase(this.DURATION + 100);
          },
          { rootMargin: `-${navH}px 0px 0px 0px` },
        );
        io.observe(this.sentinel().nativeElement);
      };

      observe();
      this.centerActive();
      window.addEventListener('resize', observe);
      rowEl.addEventListener('pointerdown', stop, { passive: true });
      rowEl.addEventListener('wheel', stop, { passive: true });
      this.destroyRef.onDestroy(() => {
        io?.disconnect();
        cancelAnimationFrame(this.raf);
        window.removeEventListener('resize', observe);
        rowEl.removeEventListener('pointerdown', stop);
        rowEl.removeEventListener('wheel', stop);
      });
    });
  }

  /** دوسة على قسم: يتفتح، البحث يتلغي، وننزل لأول المنتجات */
  pick(id: string, ev: Event): void {
    this.search.clear();
    this.active.set(id);
    // بنتابع الزرار اللي اتداس عليه نفسه (الكلاس active لسه ماتحطش على الـ DOM)
    this.chase(1000, ev.currentTarget as HTMLElement, true);
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /** ارتفاع الناف بار (بيتقرا مرة واحدة وبيتحدث مع تغيير حجم الشاشة) */
  private readNavH(): number {
    return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0;
  }

  /** المسافة الأفقية بين الدايرة المفتوحة ونص الشريط */
  private offset(el?: HTMLElement | null): number {
    const row = this.row().nativeElement;
    const btn = el ?? row.querySelector<HTMLElement>('.cat.active');
    if (!btn) return 0;
    const r = row.getBoundingClientRect();
    const b = btn.getBoundingClientRect();
    return b.left + b.width / 2 - (r.left + r.width / 2);
  }

  /** توسيط فوري (للتحميل الأول بس) */
  private centerActive(): void {
    this.row().nativeElement.scrollBy({ left: this.offset(), behavior: 'instant' });
  }

  /**
   * بيثبّت مكان الدايرة المفتوحة على الشاشة لمدة `ms` وهي بتصغر/تكبر:
   *  - كل فريم بنحسب قد إيه الدايرة اتزحزحت بسبب تغيّر الأحجام ونلغي الزحزحة دي بالكامل (من غير تأخير).
   *  - لو `settle` = true، بنقرّب كمان الدايرة من نص الشريط تدريجياً (وقت اختيار قسم).
   */
  private chase(ms: number, el?: HTMLElement | null, settle = false): void {
    cancelAnimationFrame(this.raf);
    const row = this.row().nativeElement;
    const end = performance.now() + ms;
    let prev = this.offset(el);
    const step = () => {
      const drift = this.offset(el) - prev;
      const move = drift + (settle ? prev * 0.2 : 0);
      if (Math.abs(move) >= 0.5) row.scrollBy({ left: move, behavior: 'instant' });
      prev = this.offset(el);
      if (performance.now() < end) this.raf = requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  }
}