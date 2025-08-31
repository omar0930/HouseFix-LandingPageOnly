import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type Cta = { label: string; link: string };
type Bullet = { text: string };

@Component({
  selector: 'app-hero-split',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Split (exact layout like the provided reference) -->
    <section class="mx-auto max-w-7xl px-4 py-16 sm:py-20">
      <!-- Use flex so reverse works; on mobile it stacks, on lg it splits -->
      <div
        class="flex flex-col lg:flex-row items-center gap-12"
        [class.lg:flex-row-reverse]="reverse"
      >
        <!-- LEFT: image with blue frame -->
        <div class="relative w-full lg:w-[520px]">
          <!-- Blue frame background -->
          <div
            class="absolute -top-6 -left-6 w-full h-full bg-blue-600 rounded-md"
          ></div>
          <div class="relative">
            <img
              [src]="imageSrc"
              [alt]="imageAlt"
              class="relative z-10 w-full rounded-md object-cover shadow-lg"
            />
          </div>
        </div>

        <!-- RIGHT: text content -->
        <div class="w-full">
          <!-- Eyebrow (optional) -->
          <p *ngIf="eyebrow" class="text-blue-600 font-medium mb-2">
            {{ eyebrow }}
          </p>

          <!-- Title -->
          <h2
            class="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-blue-900"
          >
            {{ title }}
          </h2>

          <!-- Description -->
          <p class="mt-4 text-slate-700 max-w-3xl">
            {{ description }}
          </p>

          <!-- Bullets -->
          <ul *ngIf="bullets?.length" class="mt-6 space-y-4">
            <li
              *ngFor="let b of bullets; trackBy: trackByText"
              class="flex items-start gap-3"
            >
              <!-- Blue check icon (circle with checkmark) -->
              <span
                class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white flex-shrink-0"
              >
                <svg viewBox="0 0 20 20" class="h-3.5 w-3.5 fill-current">
                  <path
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  />
                </svg>
              </span>
              <span class="font-semibold text-blue-900">{{ b.text }}</span>
            </li>
          </ul>

          <!-- CTAs -->
          <div class="mt-8 flex flex-wrap gap-3">
            <a
              *ngIf="primaryCta"
              [routerLink]="primaryCta.link"
              class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              {{ primaryCta.label }}
              <i class="fa-solid fa-arrow-up-right-from-square text-sm"></i>
            </a>
            <a
              *ngIf="secondaryCta"
              [routerLink]="secondaryCta.link"
              class="inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-semibold text-slate-800 hover:bg-slate-50"
            >
              {{ secondaryCta.label }}
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroSplitComponent {
  // Inputs
  @Input() eyebrow?: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) imageSrc = '/images/Container.png';
  @Input() imageAlt = 'image';
  @Input() bullets: Bullet[] = [];
  @Input() primaryCta?: Cta;
  @Input() secondaryCta?: Cta;
  @Input() reverse = false;

  // trackBy for bullet list
  trackByText = (_: number, x: Bullet) => x.text;
}
