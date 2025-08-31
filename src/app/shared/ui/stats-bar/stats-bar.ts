import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type Stat = {
  value: number;
  label: string;
  icon?: string;
  suffix?: string;
  display?: number;
};

@Component({
  selector: 'app-stats-bar',
  standalone: true,
  imports: [CommonModule],
  /**
   * Single-file StatsBar:
   * - Background image + dark overlay
   * - Center heading
   * - 4 counters animated on intersection
   */
  template: `
    <section #statsSection class="relative isolate">
      <!-- background image -->
      <div class="absolute inset-0 -z-10">
        <img
          [src]="bgUrl"
          alt="Stats background"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-blue-900/70"></div>
      </div>

      <div class="mx-auto max-w-7xl px-4 py-16 text-white">
        <h3 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          {{ heading }}
        </h3>

        <div class="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            *ngFor="let s of stats; trackBy: trackByIdx"
            class="flex flex-col items-center text-center"
          >
            <i
              *ngIf="s.icon"
              class="text-3xl md:text-4xl"
              [class]="iconPrefix + ' ' + s.icon"
            ></i>
            <div class="mt-3 text-3xl font-bold">
              {{ s.display ?? 0 }}{{ s.suffix || '+' }}
            </div>
            <div class="text-sm opacity-90">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class StatsBarComponent implements AfterViewInit {
  @Input() heading = 'Providing excellent services for the last 25 years';
  @Input() bgUrl = '/images/05 - Image-Containerr.png';
  @Input() durationMs = 1200;
  @Input() stats: Stat[] = [
    {
      value: 1200,
      label: 'Happy Customers',
      icon: 'fa-people-group',
      suffix: '+',
    },
    { value: 8714, label: '5-Star Reviews', icon: 'fa-star', suffix: '+' },
    { value: 1600, label: 'Projects Served', icon: 'fa-building', suffix: '+' },
    { value: 500, label: 'Professionals', icon: 'fa-user-gear', suffix: '+' },
  ];

  iconPrefix = 'fa'; // Font Awesome prefix; change to 'fa-solid' if needed

  @ViewChild('statsSection', { static: true })
  statsSection!: ElementRef<HTMLElement>;
  private animated = false;

  ngAfterViewInit() {
    // Animate when the section enters viewport
    const obs = new IntersectionObserver(
      (entries) => {
        if (!this.animated && entries.some((e) => e.isIntersecting)) {
          this.animated = true;
          this.animate();
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(this.statsSection.nativeElement);
  }

  private animate() {
    const frames = Math.max(1, Math.round(this.durationMs / 16));
    this.stats.forEach((s) => {
      let frame = 0;
      const step = () => {
        frame++;
        (s as any).display = Math.round((frame / frames) * s.value);
        if (frame < frames) requestAnimationFrame(step);
        else (s as any).display = s.value;
      };
      requestAnimationFrame(step);
    });
  }

  trackByIdx = (i: number) => i;
}
