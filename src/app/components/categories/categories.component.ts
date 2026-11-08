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

  // ===== حالة لوب التتبع (لوب واحد بس شغال في أي وقت) =====
  private raf = 0; // 0 = اللوب واقف
  private end = 0; // وقت نهاية اللوب
  private goal = 0; // الإزاحة المطلوبة للدايرة عن نص الشريط
  private decay = false; // true = الهدف بيقرب من صفر (نص الشريط) تدريجياً
  private target: HTMLElement | null = null; // الزرار اللي بنتابعه (null = الزرار المفتوح)

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
      const rowEl = this.row().nativeElement;
      const sentinelEl = this.sentinel().nativeElement;
      let navH = this.readNavH();
      let ticking = false;
      const stop = () => this.stopChase();

      // hysteresis: بيصغر لما العلامة تعدّي الناف بار، ومبيكبرش غير لما ترجع تبعد عنه شوية.
      // كده مفيش قلب true/false رايح جاي لو الـ scroll واقف جنب الحد.
      const update = () => {
        ticking = false;
        const top = sentinelEl.getBoundingClientRect().top;
        const next = this.compact() ? top < navH + 40 : top < navH - 1;
        if (next === this.compact()) return;
        this.compact.set(next);
        this.chase(this.DURATION + 100);
      };
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      };
      const onResize = () => {
        navH = this.readNavH();
        update();
      };

      update();
      this.centerActive();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);
      rowEl.addEventListener('pointerdown', stop, { passive: true });
      rowEl.addEventListener('wheel', stop, { passive: true });
      this.destroyRef.onDestroy(() => {
        this.stopChase();
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        rowEl.removeEventListener('pointerdown', stop);
        rowEl.removeEventListener('wheel', stop);
      });
    });
  }

  /** دوسة على قسم: يتفتح، البحث يتلغي، وننزل لأول المنتجات */
  pick(id: string, ev: Event): void {
    this.search.clear();
    this.active.set(id);
    
    const btn = ev.currentTarget as HTMLElement;
    const rowEl = this.row().nativeElement;

    // توسيط أفقي سلس ومباشر للزرار جوه الـ row من غير ركض فريمات معقد
    const rowRect = rowEl.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const scrollTarget = rowEl.scrollLeft + (btnRect.left - rowRect.left) - (rowRect.width / 2) + (btnRect.width / 2);
    
    rowEl.scrollTo({ left: scrollTarget, behavior: 'smooth' });

    // النزول لقائمة المنتجات تحت
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

  private stopChase(): void {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.end = 0;
  }

  /**
   * لوب واحد بيخلي إزاحة الدايرة عن نص الشريط = `goal` في كل فريم.
   * بنقيس الخطأ المطلق (الإزاحة الحالية - الهدف) مش الفرق عن الفريم اللي فات،
   * فمفيش feedback loop ومفيش رعشة.
   *  - من غير `settle`: الهدف = مكان الدايرة وقت البداية (تثبيت أثناء تصغير/تكبير الشريط).
   *  - مع `settle`: الهدف بيقرب من صفر تدريجياً (توسيط الدايرة وقت اختيار قسم).
   * لو اللوب شغال أصلاً (مثلاً الشريط صغر وإحنا في نص اختيار قسم) بنمدّ وقته بس
   * ومنبدأش لوب جديد، عشان الهدف ماينعملوش reset.
   */
  private chase(ms: number, el?: HTMLElement | null, settle = false): void {
    this.end = Math.max(this.end, performance.now() + ms);

    if (settle) {
      this.target = el ?? null;
      this.goal = this.offset(this.target);
      this.decay = true;
    } else if (!this.raf) {
      this.target = null;
      this.goal = this.offset();
      this.decay = false;
    }

    if (this.raf) return;

    const row = this.row().nativeElement;
    const step = () => {
      if (this.decay) this.goal *= 0.85;
      const err = this.offset(this.target) - this.goal;
      if (Math.abs(err) >= 0.5) row.scrollBy({ left: err, behavior: 'instant' });
      this.raf = performance.now() < this.end ? requestAnimationFrame(step) : 0;
    };
    this.raf = requestAnimationFrame(step);
  }
}