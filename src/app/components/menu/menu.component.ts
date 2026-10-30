import { Component, computed, inject } from '@angular/core';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/products';
import { SearchService } from '../../services/search.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  readonly search = inject(SearchService);

  // الأقسام بالأصناف اللي بتطابق البحث (لو مفيش بحث بتظهر كلها)
  readonly groups = computed(() =>
    CATEGORIES.map((c) => ({
      ...c,
      products: PRODUCTS.filter((p) => p.categoryId === c.id && this.search.matches(p)),
    })).filter((g) => g.products.length)
  );

  scrollTo(id: string): void {
    document.getElementById('cat-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
