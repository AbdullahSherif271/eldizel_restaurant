import { Component, inject } from '@angular/core';
import { PRODUCTS } from '../../data/products';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-spin-section',
  standalone: true,
  templateUrl: './spin-section.component.html',
  styleUrl: './spin-section.component.scss',
})
export class SpinSectionComponent {
  readonly cart = inject(CartService);
  readonly product = PRODUCTS.find(p => p.id === 'p13')!;
}
