import { Component, signal } from '@angular/core';
import { CATEGORIES } from '../../data/categories';

@Component({
  selector: 'app-categories',
  standalone: true,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  readonly categories = CATEGORIES;
  readonly active = signal<string | null>(null);

  scrollTo(id: string): void {
    this.active.set(id);
    document.getElementById('cat-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
