import { AfterViewInit, Component, ElementRef, ViewChild, signal } from '@angular/core';
import { PRODUCTS } from '../../data/products';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.scss',
})
export class BestSellersComponent implements AfterViewInit {
  readonly products = PRODUCTS.filter((p) => p.bestSeller);
  @ViewChild('row') row!: ElementRef<HTMLElement>;

  readonly canPrev = signal(false); // ناحية اليمين (بداية القائمة في RTL)
  readonly canNext = signal(false); // ناحية الشمال

  ngAfterViewInit(): void {
    setTimeout(() => this.update());
  }

  // في RTL: scrollLeft بيبقى 0 عند البداية (يمين) وسالب كل ما نمشي شمال
  // scrollBy موجب = ناحية اليمين (السابق)، سالب = ناحية الشمال (التالي)
  scroll(dir: 1 | -1): void {
    const el = this.row.nativeElement;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  }

  update(): void {
    const el = this.row.nativeElement;
    const pos = Math.abs(el.scrollLeft);
    this.canPrev.set(pos > 4);
    this.canNext.set(pos + el.clientWidth < el.scrollWidth - 4);
  }
}
