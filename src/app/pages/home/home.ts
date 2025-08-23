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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements AfterViewInit {
  // ------------ Stats (counters) ------------
  @ViewChild('statsSection', { static: false })
  statsSection!: ElementRef<HTMLDivElement>;
  statsAnimated = false;

  stats = [
    {
      label: 'Happy Customers',
      value: 8714,
      icon: 'fa-people-group',
      display: 0,
    },
    {
      label: 'Installed Units',
      value: 8714,
      icon: 'fa-screwdriver-wrench',
      display: 0,
    },
    { label: 'Home Served', value: 8714, icon: 'fa-building', display: 0 },
    { label: 'Professional', value: 8714, icon: 'fa-user-gear', display: 0 },
  ];

  ngAfterViewInit() {
    // Animate counters when the stats section enters the viewport
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

  // ------------ Testimonials ------------
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

  // Use assets/ not a leading slash
  bgUrl: string = '/images/hero.jpg';

  //section of services.
  //icons
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

  //mothhly / annual
  billing: 'monthly' | 'annual' = 'monthly';

  plans = [
    {
      name: 'Residential Plumbing',
      prices: { monthly: 199, annual: 199 * 10 }, // adjust if you like
      featured: false,
      features: [
        'Free Diagnostics & Consultation',
        'Plumbing Repairs',
        'Emergency Plumbing',
        'Sewer & Drain Cleaning',
        'Trenchless Sewer Replacement',
        'Heater Installation & Replacement, Repair',
      ],
    },
    {
      name: 'Commercial Plumbing',
      prices: { monthly: 499, annual: 499 * 10 },
      featured: true, // center card
      features: [
        'Installations, Repairs, And Replacements',
        'Leak Detection And Repair',
        'Water & Gas Piping',
        'Drain Cleaning & Sewer Service',
        'Plumbing Inspections & Maintenance',
        'Heater Installation & Replacement, Repair',
      ],
    },
    {
      name: 'Service & Repair',
      prices: { monthly: 399, annual: 399 * 10 },
      featured: false,
      features: [
        'Replace Spare Parts',
        'Maintenance Services',
        'Water Heater Repair Services',
        'Free Diagnostics & Consultation',
        'Toilet Repair, Sewer Repair & Leak Repair',
        'Heater Installation & Replacement, Repair',
      ],
    },
  ];

  getPrice(p: any) {
    return this.billing === 'monthly' ? p.prices.monthly : p.prices.annual;
  }
  get priceSuffix() {
    return this.billing === 'monthly' ? '/Month' : '/Year';
  }
  trackByIndex(i: number) {
    return i;
  }

  // Reactive form
  private fb = inject(FormBuilder);
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{7,}$/)]],
    email: ['', [Validators.required, Validators.email]],
    address: [''],
    message: [''],
  });

  // Tabs
  categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'commercial', label: 'Commercial Services' },
    { key: 'residential', label: 'Residential Services' },
    { key: 'emergency', label: 'Emergency Services' },
  ];
  activeCat: 'all' | 'commercial' | 'residential' | 'emergency' = 'all';

  // Projects (use your real images)
  projects = [
    {
      title: 'Water Line Repair',
      tag: 'Plumbing',
      category: 'commercial',
      img: '/images/04 - Image-Container.png',
    },
    {
      title: 'Leak Fix & Piping',
      tag: 'Maintenance',
      category: 'residential',
      img: '/images/05 - Image-Containerr.png',
    },
    {
      title: 'Drain Cleaning',
      tag: 'Plumbing',
      category: 'commercial',
      img: '/images/thirdone.jpg',
    },
  ];

  sliderIndex = 0;

  get filteredProjects() {
    return this.activeCat === 'all'
      ? this.projects
      : this.projects.filter((p) => p.category === this.activeCat);
  }
  get maxIndex() {
    return Math.max(0, this.filteredProjects.length - 3);
  }
  visibleProjects() {
    return this.filteredProjects.slice(this.sliderIndex, this.sliderIndex + 3);
  }
  setCategory(k: string) {
    this.activeCat = k as 'all' | 'commercial' | 'residential' | 'emergency';
    this.sliderIndex = 0; // reset slider on tab change
  }
  prev() {
    this.sliderIndex = Math.max(0, this.sliderIndex - 1);
  }
  next() {
    this.sliderIndex = Math.min(this.maxIndex, this.sliderIndex + 1);
  }
  trackByIdx(i: number) {
    return i;
  }

  // Helper for template validation classes
  isInvalid(control: string) {
    const c = this.form.get(control);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  // Dummy submit (no backend)
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Submitted form:', this.form.value); // no backend
    alert('Submitted!');
    this.form.reset();
  }
  /* ====== FAQ (Q&A) ====== */
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

  // which FAQ is open in the right column (use global index from the array above)
  openFaqIndex: number | null = 6;
  toggleFaq(i: number) {
    this.openFaqIndex = this.openFaqIndex === i ? null : i;
  }
  isOpen(i: number) {
    return this.openFaqIndex === i;
  }

  /* ====== Newsletter (no backend) ====== */
  newsletterForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  subscribe() {
    if (this.newsletterForm.invalid) {
      this.newsletterForm.markAllAsTouched();
      return;
    }
    console.log('Newsletter:', this.newsletterForm.value.email);
    alert('Subscribed!'); // no backend
    this.newsletterForm.reset();
  }
}
