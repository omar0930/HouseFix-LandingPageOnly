import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type WorkCategory = { id: string; label: string };
export type WorkItem = {
  id: string | number;
  title: string;
  image: string;
  category: string;
};

@Component({
  selector: 'app-work-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="max-w-7xl mx-auto px-4 py-12">
      <header class="text-center mb-6">
        <p *ngIf="eyebrow" class="text-blue-600 font-medium mb-1">
          {{ eyebrow }}
        </p>
        <h2 class="text-2xl md:text-4xl font-bold">{{ heading }}</h2>
      </header>

      <div class="flex flex-wrap justify-center gap-3 mb-6">
        <button
          class="px-4 py-2 rounded-xl border"
          [class.bg-blue-600]="active === 'all'"
          [class.text-white]="active === 'all'"
          (click)="active = 'all'"
        >
          All Projects
        </button>
        <button
          *ngFor="let c of categories; trackBy: trackByCat"
          class="px-4 py-2 rounded-xl border"
          [class.bg-blue-600]="active === c.id"
          [class.text-white]="active === c.id"
          (click)="active = c.id"
        >
          {{ c.label }}
        </button>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <figure
          *ngFor="let w of filtered; trackBy: trackByWork"
          class="relative overflow-hidden rounded-2xl group"
        >
          <img
            [src]="w.image"
            [alt]="w.title"
            class="w-full h-64 object-cover"
          />
          <figcaption
            class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition grid place-content-center"
          >
            <span
              class="text-white text-lg font-semibold px-3 py-1 bg-black/40 rounded"
              >{{ w.title }}</span
            >
          </figcaption>
        </figure>
      </div>
    </section>
  `,
})
export class WorkGridComponent {
  @Input() heading = 'Our Recent Works';
  @Input() eyebrow?: string;
  @Input() categories: WorkCategory[] = [];
  @Input() items: WorkItem[] = [];

  active: string = 'all';
  get filtered() {
    return this.active === 'all'
      ? this.items
      : this.items.filter((i) => i.category === this.active);
  }

  trackByCat = (_: number, c: WorkCategory) => c.id;
  trackByWork = (_: number, w: WorkItem) => w.id;
}
