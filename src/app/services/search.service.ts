import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SearchService {
  readonly query = signal('');
  /** true لما العميل يكتب حاجة في البحث */
  readonly active = computed(() => this.normalize(this.query()).length > 0);

  /** بيتجاهل التشكيل والفرق بين (أ إ آ ا) و (ة ه) و (ى ي) */
  normalize(s: string): string {
    return s
      .toLowerCase()
      .replace(/[ً-ٰٟ]/g, '')
      .replace(/[أإآ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .trim();
  }

  matches(p: { name: string; description: string }): boolean {
    const q = this.normalize(this.query());
    return !q || this.normalize(p.name + ' ' + p.description).includes(q);
  }

  clear(): void { this.query.set(''); }
}
