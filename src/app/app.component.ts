import { Component, inject } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchService } from './services/search.service';
import { HeroSliderComponent } from './components/hero-slider/hero-slider.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BestSellersComponent } from './components/best-sellers/best-sellers.component';
import { SpinSectionComponent } from './components/spin-section/spin-section.component';
import { CartButtonComponent } from './components/cart-button/cart-button.component';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent, HeroSliderComponent, CategoriesComponent, BestSellersComponent, SpinSectionComponent,
    CartButtonComponent, CartDrawerComponent, FooterComponent, ScrollTopComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly search = inject(SearchService);
}
