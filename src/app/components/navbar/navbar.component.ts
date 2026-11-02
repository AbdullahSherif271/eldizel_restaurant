import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { RESTAURANT } from '../../config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly search = inject(SearchService);
  readonly r = RESTAURANT;

  readonly promos = [
    { icon: 'flame', text: 'كريب رقم 1 في العياط' },
    { icon: 'burger', text: 'ساندوتشات بيف وتشيكن بجودة عالية' },
    { icon: 'star', text: 'جرب الأصناف الجديدة' },
    { icon: 'delivery', text: 'توصيل سريع لحد باب البيت' },
  ];

  private readonly hints = ['ابحث في المنيو...', 'ابحث عن برجر...', 'جرّب بيج ديزل...', 'كريب، بوكس، وجبات...'];
  private readonly hintIdx = signal(0);
  readonly placeholder = computed(() => this.hints[this.hintIdx()]);

  constructor() {
    const id = setInterval(() => this.hintIdx.update(i => (i + 1) % this.hints.length), 3000);
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => clearInterval(id));

    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    afterNextRender(() => {
      const header = host.querySelector<HTMLElement>('.nb');
      if (!header) return;
      const update = () => document.documentElement.style.setProperty('--nav-h', header.offsetHeight + 'px');
      update();
      const ro = new ResizeObserver(update);
      ro.observe(header);
      destroyRef.onDestroy(() => ro.disconnect());
    });
  }

  home(): void {
    this.search.clear();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onInput(value: string): void {
    const wasActive = this.search.active();
    this.search.query.set(value);
    if (!wasActive && this.search.active()) window.scrollTo({ top: 0 });
  }
}