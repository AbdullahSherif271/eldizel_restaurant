import { Component, inject } from '@angular/core';
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

  home(): void {
    this.search.clear();
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }

  onInput(value: string): void {
    const wasActive = this.search.active();
    this.search.query.set(value);
    // أول حرف: نطلع لفوق عشان النتايج تبان (باقي السكاشن بتختفي وقت البحث)
    if (!wasActive && this.search.active()) window.scrollTo({ top: 0 });
  }
}
