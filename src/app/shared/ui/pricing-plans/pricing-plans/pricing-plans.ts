import { Component, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

export type Plan = {
  name: string;
  priceMonthly: number | string;
  priceYearly?: number | string;
  features: string[];
  cta: { label: string; link: string };
  highlighted?: boolean;
};

type BillingCycle = 'monthly' | 'yearly';

@Component({
  selector: 'app-pricing-plans',
  standalone: true,
  imports: [CommonModule, RouterLink, NgClass],
  template: `
    <section class="bg-blue-50/60">
      <div class="mx-auto max-w-7xl px-4 py-20">
        <!-- Heading -->
        <div class="text-center">
          <span
            class="inline-flex items-center gap-3 text-blue-600 font-medium"
          >
            Pricing Plans
            <span class="inline-block h-px w-10 bg-blue-500"></span>
          </span>
          <h2
            class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900"
          >
            {{ heading }}
          </h2>

          <!-- Toggle -->
          <div class="mt-6 inline-flex items-center gap-3 text-slate-700">
            <span [class.text-blue-700]="billing === 'monthly'">Monthly</span>
            <label class="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                class="peer sr-only"
                (change)="
                  billing = $any($event.target).checked ? 'yearly' : 'monthly'
                "
              />
              <div
                class="h-6 w-11 rounded-full bg-slate-300 peer-checked:bg-blue-600 transition"
              ></div>
              <div
                class="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5"
              ></div>
            </label>
            <span [class.text-blue-700]="billing === 'yearly'">Annual</span>
          </div>
        </div>

        <!-- Cards -->
        <div class="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <article
            *ngFor="let p of plans; trackBy: trackByIndex"
            class="group rounded-2xl border shadow-sm overflow-hidden transition"
            [ngClass]="{
              'bg-blue-600 text-white border-blue-600': p.highlighted,
              'bg-white text-slate-900 border-blue-200 hover:shadow-md':
                !p.highlighted
            }"
          >
            <div class="p-8 sm:p-10 flex h-full flex-col">
              <!-- Title -->
              <h3
                class="text-2xl font-semibold"
                [ngClass]="{
                  'text-white': p.highlighted,
                  'text-slate-900': !p.highlighted
                }"
              >
                {{ p.name }}
              </h3>

              <!-- Price -->
              <div class="mt-6 flex items-end gap-2">
                <div
                  class="text-5xl font-bold leading-none"
                  [ngClass]="{
                    'text-white': p.highlighted,
                    'text-blue-600': !p.highlighted
                  }"
                >
                  {{ getPrice(p) }}
                </div>
                <div class="pb-1 font-semibold opacity-80">
                  {{ priceSuffix }}
                </div>
              </div>

              <!-- Features -->
              <ul class="mt-6 space-y-4 flex-grow">
                <li
                  *ngFor="let f of p.features"
                  class="flex items-start gap-3"
                  [ngClass]="{
                    'text-white/90': p.highlighted,
                    'text-slate-700': !p.highlighted
                  }"
                >
                  <i
                    class="fa-regular fa-circle-check text-lg mt-0.5"
                    [ngClass]="{
                      'text-white': p.highlighted,
                      'text-blue-600': !p.highlighted
                    }"
                  ></i>
                  <span>{{ f }}</span>
                </li>
              </ul>

              <!-- CTA -->
              <div class="mt-8 pt-2">
                <a
                  [routerLink]="p.cta.link"
                  class="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition w-full"
                  [ngClass]="{
                    'bg-white text-blue-600 hover:bg-blue-50': p.highlighted,
                    'bg-blue-600 text-white hover:bg-blue-700': !p.highlighted
                  }"
                >
                  {{ p.cta.label }}
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
})
export class PricingPlansComponent {
  @Input() heading = 'Affordable Pricing Plans';
  @Input() plans: Plan[] = [];
  @Input() yearlyDiscount = 0.2; // 20% discount

  billing: BillingCycle = 'monthly';

  trackByIndex = (index: number, _: Plan) => index;

  get priceSuffix(): string {
    return this.billing === 'monthly' ? '/month' : '/year';
  }

  getPrice(p: Plan): string {
    const price =
      this.billing === 'monthly'
        ? p.priceMonthly
        : p.priceYearly ?? this.calcYearly(p.priceMonthly);

    return typeof price === 'number'
      ? '$' + price.toString()
      : price.toString();
  }

  private calcYearly(monthly: number | string): number {
    const m =
      typeof monthly === 'number'
        ? monthly
        : parseFloat(monthly.toString().replace(/[^\d.]/g, ''));
    return Math.round(m * 12 * (1 - this.yearlyDiscount));
  }
}
