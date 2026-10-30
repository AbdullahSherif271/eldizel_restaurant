import { Component } from '@angular/core';
import { RESTAURANT } from '../../config';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly r = RESTAURANT;

  /** 01xxxxxxxxx -> https://wa.me/201xxxxxxxxx */
  waLink(number: string): string {
    return 'https://wa.me/20' + number.replace(/^0/, '');
  }
}
