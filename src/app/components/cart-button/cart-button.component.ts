import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RESTAURANT } from '../../config';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.scss',
})
export class CartButtonComponent {
  readonly cart = inject(CartService);
  readonly currency = RESTAURANT.currency;
}
