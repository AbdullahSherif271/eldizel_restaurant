import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  templateUrl: './hero-slider.component.html',
  styleUrl: './hero-slider.component.scss',
})
export class HeroSliderComponent implements OnInit, OnDestroy {
  // بدّل الصور بصور البانرات الحقيقية لاحقاً
  readonly slides = [
    { src: 'images/cover.png', alt: 'الديزل فرايد تشيكن - أقطم واحكم' },
    { src: 'images/cover.png', alt: 'عرض 2' },
    { src: 'images/cover.png', alt: 'عرض 3' },
  ];
  // أول صورة متكررة في الآخر عشان اللف يبقى متصل من غير رجوع للخلف
  readonly rendered = [...this.slides, this.slides[0]];

  readonly pos = signal(0);          // مكان التراك (0..n)
  readonly animate = signal(true);   // تشغيل/إيقاف الانتقال
  readonly current = computed(() => this.pos() % this.slides.length); // للنقط

  private busy = false;
  private timer?: ReturnType<typeof setInterval>;
  private startX = 0;

  ngOnInit(): void { this.play(); }
  ngOnDestroy(): void { this.stop(); }

  play(): void {
    this.stop();
    this.timer = setInterval(() => this.next(), 4500);
  }
  stop(): void { if (this.timer) clearInterval(this.timer); }

  next(): void {
    if (this.busy) return;
    this.busy = true;
    this.animate.set(true);
    this.pos.update((p) => p + 1);
  }

  prev(): void {
    if (this.busy) return;
    this.busy = true;
    const n = this.slides.length;
    if (this.pos() === 0) {
      // نقفز للنسخة المكررة من غير حركة، وبعدها نتحرك للصورة الأخيرة
      this.animate.set(false);
      this.pos.set(n);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        this.animate.set(true);
        this.pos.set(n - 1);
      }));
    } else {
      this.animate.set(true);
      this.pos.update((p) => p - 1);
    }
  }

  go(i: number): void {
    if (this.busy) return;
    this.animate.set(true);
    this.pos.set(i);
    this.play();
  }

  onTransitionEnd(): void {
    // وصلنا للنسخة المكررة -> نرجع لأول صورة فوراً من غير حركة
    if (this.pos() === this.slides.length) {
      this.animate.set(false);
      this.pos.set(0);
    }
    this.busy = false;
  }

  onTouchStart(e: TouchEvent): void { this.startX = e.touches[0].clientX; this.stop(); }
  onTouchEnd(e: TouchEvent): void {
    const dx = e.changedTouches[0].clientX - this.startX;
    if (Math.abs(dx) > 40) {
      // السحب لليمين = التالي (الصورة الحالية تروح يمين والتانية تيجي من الشمال)
      dx > 0 ? this.next() : this.prev();
    }
    this.play();
  }
}
