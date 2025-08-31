import {
  Component,
  inject,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

// Reusable UI components
import { HeroSplitComponent } from '../../shared/ui/hero-split/hero-split';
import {
  PricingPlansComponent,
  Plan,
} from '../../shared/ui/pricing-plans/pricing-plans/pricing-plans';
import {
  WorkGridComponent,
  WorkCategory,
  WorkItem,
} from '../../shared/ui/work-grid/work-grid';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    HeroSplitComponent,
    PricingPlansComponent,
    WorkGridComponent,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements AfterViewInit {
  /* ------------ Hero (top background) ------------ */
  bgUrl: string = '/images/hero.jpg';

  /* ------------ Contact form ------------ */
  private fb = inject(FormBuilder);
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{7,}$/)]],
    email: ['', [Validators.required, Validators.email]],
    address: [''],
    message: [''],
  });
  isInvalid(control: string) {
    const c = this.form.get(control);
    return !!c && c.invalid && (c.dirty || c.touched);
  }
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Submitted form:', this.form.value);
    alert('Submitted!');
    this.form.reset();
  }

  /* ------------ Services (icons grid) ------------ */
  faPrefix = 'fa';
  services = [
    {
      title: 'Plumbing Installation',
      desc: 'Pellentesque lorem enim, porta quis orci a, maximus varius lorem. Suspendisse suscipit, lacus in',
      icon: 'fa-wrench',
      link: '/services/installation',
    },
    {
      title: 'Plumbing Maintenance',
      desc: 'Pellentesque lorem enim, porta quis orci a, maximus varius lorem. Suspendisse suscipit, lacus in',
      icon: 'fa-toolbox',
      link: '/services/maintenance',
    },
    {
      title: 'Plumbing Line Consultation',
      desc: 'Pellentesque lorem enim, porta quis orci a, maximus varius lorem. Suspendisse suscipit, lacus in',
      icon: 'fa-comments',
      link: '/services/line-consultation',
    },
    {
      title: 'General Plumbing',
      desc: 'Pellentesque lorem enim, porta quis orci a, maximus varius lorem. Suspendisse suscipit, lacus in',
      icon: 'fa-cog',
      link: '/services/general',
    },
    {
      title: 'Fixing Pipes',
      desc: 'Pellentesque lorem enim, porta quis orci a, maximus varius lorem. Suspendisse suscipit, lacus in',
      icon: 'fa-wrench',
      link: '/services/fixing-pipes',
    },
    {
      title: 'Drain Cleaning',
      desc: 'Pellentesque lorem enim, porta quis orci a, maximus varius lorem. Suspendisse suscipit, lacus in',
      icon: 'fa-shower',
      link: '/services/drain-cleaning',
    },
  ];

  /* ------------ About / Benefits (HeroSplit component) ------------ */
  about = {
    title: 'Taking regular plumbing care will save you time and money',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    imageSrc: '/images/waterandcup.jpg',
    imageAlt: 'Plumbing care',
    bullets: [
      { text: 'Praesent Sodales Orci' },
      { text: 'Curabitur Dignissim' },
      { text: 'Nulla Condimentum' },
    ],
    primaryCta: { label: 'More About Us', link: '/about' },
    reverse: false, // الصورة يسار والنص يمين (زي عندك)
  };

  /* ------------ Pricing (with monthly/yearly toggle) ------------ */
  plansData: Plan[] = [
    {
      name: 'Residential Plumbing',
      priceMonthly: 199,
      priceYearly: 1990,
      features: [
        'Free Diagnostics & Consultation',
        'Plumbing Repairs',
        'Emergency Plumbing',
        'Sewer & Drain Cleaning',
        'Trenchless Sewer Replacement',
        'Heater Installation & Replacement, Repair',
      ],
      cta: { label: 'Get Started', link: '/checkout?plan=residential' },
    },
    {
      name: 'Commercial Plumbing',
      priceMonthly: 499,
      priceYearly: 4990,
      features: [
        'Installations, Repairs, And Replacements',
        'Leak Detection And Repair',
        'Water & Gas Piping',
        'Drain Cleaning & Sewer Service',
        'Plumbing Inspections & Maintenance',
        'Heater Installation & Replacement, Repair',
      ],
      cta: { label: 'Get Started', link: '/checkout?plan=commercial' },
      highlighted: true,
    },
    {
      name: 'Service & Repair',
      priceMonthly: 399,
      priceYearly: 3990,
      features: [
        'Replace Spare Parts',
        'Maintenance Services',
        'Water Heater Repair Services',
        'Free Diagnostics & Consultation',
        'Toilet Repair, Sewer Repair & Leak Repair',
        'Heater Installation & Replacement, Repair',
      ],
      cta: { label: 'Get Started', link: '/checkout?plan=service' },
    },
  ];

  /* ------------ Recent Works (WorkGrid component) ------------ */
  workCategories: WorkCategory[] = [
    { id: 'commercial', label: 'Commercial Services' },
    { id: 'residential', label: 'Residential Services' },
    { id: 'emergency', label: 'Emergency Services' },
  ];
  workItems: WorkItem[] = [
    {
      id: 1,
      title: 'Water Line Repair',
      image: '/images/RecentWorks1.jpg',
      category: 'commercial',
    },
    {
      id: 2,
      title: 'Leak Fix & Piping',
      image: '/images/05 - Image-Containerr.png',
      category: 'residential',
    },
    {
      id: 3,
      title: 'Drain Cleaning',
      image: '/images/thirdone.jpg',
      category: 'commercial',
    },
  ];

  /* ------------ Stats (animated counters on viewport) ------------ */
  @ViewChild('statsSection', { static: false })
  statsSection!: ElementRef<HTMLDivElement>;
  statsAnimated = false;

  stats = [
    {
      label: 'Happy Customers',
      value: 1200,
      icon: 'fa-people-group',
      display: 0,
    },
    { label: '5-Star Reviews', value: 8714, icon: 'fa-star', display: 0 },
    { label: 'Projects Served', value: 1600, icon: 'fa-building', display: 0 },
    { label: 'Professionals', value: 500, icon: 'fa-user-gear', display: 0 },
  ];

  ngAfterViewInit() {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !this.statsAnimated) {
          this.statsAnimated = true;
          this.animateStats();
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (this.statsSection?.nativeElement) {
      obs.observe(this.statsSection.nativeElement);
    }
  }

  private animateStats() {
    const duration = 1200; // ms
    const frames = Math.round(duration / 16);
    this.stats.forEach((stat) => {
      let frame = 0;
      const step = () => {
        frame++;
        stat.display = Math.round((frame / frames) * stat.value);
        if (frame < frames) requestAnimationFrame(step);
        else stat.display = stat.value;
      };
      requestAnimationFrame(step);
    });
  }

  /* ------------ Testimonials (keep as is) ------------ */
  testimonials = [
    {
      img: '/images/06 -Image containerrr.png',
      name: 'Alex',
      role: 'Home Owner',
      text: 'Lorem ipsum dolor sit amet consectetur. Eget non auctor laoreet mauris id proin tincidunt tristique nam. Amet luctus vel tincidunt vulputate et purus feugiat.',
    },
  ];
  tIndex = 0;
  prevTest() {
    this.tIndex =
      (this.tIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }
  nextTest() {
    this.tIndex = (this.tIndex + 1) % this.testimonials.length;
  }
  currentTest() {
    return this.testimonials[this.tIndex];
  }

  /* ------------ FAQ ------------ */
  faqs: Array<{ q: string; a: string }> = [
    {
      q: 'How much does plumbing repair cost?',
      a: 'Pricing depends on issue complexity, parts, and time. We give up-front estimates after a quick inspection.',
    },
    {
      q: 'How do I prevent my pipes from freezing?',
      a: 'Insulate exposed pipes, keep a small drip in extreme cold, and maintain indoor temps above 12°C.',
    },
    {
      q: 'How do I unclog my drain?',
      a: 'Start with hot water + mild detergent, then a plunger. Avoid harsh chemicals; call us if it persists.',
    },
    {
      q: 'What size HVAC system do I need?',
      a: 'It depends on home size, insulation, and climate. A proper load calc is required for accuracy.',
    },
    {
      q: 'What size HVAC system do I need?',
      a: 'Different rooms may require zoning; we’ll size equipment based on a site visit.',
    },
    {
      q: 'How long a new installation will take?',
      a: 'Simple installs finish same day. Larger systems may take 1–2 days.',
    },
    {
      q: 'What do HVAC contractors do?',
      a: 'Licensed pros who install, maintain, and repair heating, cooling, and ventilation systems. We troubleshoot, replace parts, and optimize efficiency.',
    },
    {
      q: '7 different kinds of career paths in plumbing',
      a: 'Residential/Commercial tech, pipefitter, service plumber, estimator, project manager, inspector, and business owner.',
    },
    {
      q: 'What is the cost of emergency plumbing jobs',
      a: 'Emergency rates reflect priority scheduling outside normal hours; we still provide a clear quote before work.',
    },
  ];
  openFaqIndex: number | null = 6;
  toggleFaq(i: number) {
    this.openFaqIndex = this.openFaqIndex === i ? null : i;
  }
  isOpen(i: number) {
    return this.openFaqIndex === i;
  }

  /* ------------ Newsletter ------------ */
  newsletterForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  subscribe() {
    if (this.newsletterForm.invalid) {
      this.newsletterForm.markAllAsTouched();
      return;
    }
    console.log('Newsletter:', this.newsletterForm.value.email);
    alert('Subscribed!');
    this.newsletterForm.reset();
  }
}
