import { Component, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

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
import { StatsBarComponent, Stat } from '../../shared/ui/stats-bar/stats-bar';

export type ServiceProvideItem = {
  title: string;
  desc: string;
  icon: string; // Font Awesome class e.g. "fa-wrench"
  img: string; // image path
  link: string; // router link
  highlight?: boolean; // first card blue variant
};

@Component({
  selector: 'app-home-v2',
  imports: [
    CommonModule,
    RouterLink,
    NgClass,
    HeroSplitComponent,
    PricingPlansComponent,
    WorkGridComponent,
    StatsBarComponent,
  ],
  templateUrl: './home-v2.html',
  styleUrl: './home-v2.css',
})
export class HomeV2 {
  // Background and foreground images
  bgUrl = '/images/home2background.jpg';
  personUrl = '/images/plamer.png';

  // Services section
  @Input() eyebrow = 'Services We Provide';
  @Input() heading = 'The Best Plumbing Service & Maintenance';

  trackByTitle = (_: number, it: ServiceProvideItem) => it.title;

  // Use this as the main services array (remove the empty items input)
  services: ServiceProvideItem[] = [
    {
      title: 'Plumbing Installation',
      desc: 'Lorem ipsum dolor sit amet consectetur. Adipiscing quis ornare hac convallis a diam gravida in.',
      icon: 'fa-faucet-drip',
      img: '/images/ServicesWeProvide1.jpg',
      link: '/services/installation',
      highlight: true,
    },
    {
      title: 'General Plumbing',
      desc: 'Lorem ipsum dolor sit amet consectetur. Cursus viverra est tristique vitae velit odio in.',
      icon: 'fa-screwdriver-wrench',
      img: '/images/ServicesWeProvide2.jpg',
      link: '/services/general',
    },
    {
      title: 'Plumbing Maintenance',
      desc: 'Lorem ipsum dolor sit amet consectetur. Bibendum amet et interdum donec integer volutpat eleifend.',
      icon: 'fa-wrench',
      img: '/images/ServicesWeProvide3.jpg',
      link: '/services/maintenance',
    },
    {
      title: 'Fixing Pipes',
      desc: 'Lorem ipsum dolor sit amet consectetur. Ultricies a libero mattis leo hendrerit nibh dolor.',
      icon: 'fa-pipe',
      img: '/images/ServicesWeProvide4.jpg',
      link: '/services/fixing-pipes',
    },
    {
      title: 'Plumbing Line Consultation',
      desc: 'Lorem ipsum dolor sit amet consectetur. Pulvinar aliquet diam id sed egestas Integer.',
      icon: 'fa-comments',
      img: '/images/ServicesWeProvide5.jpg',
      link: '/services/line-consultation',
    },
    {
      title: 'Drain Cleaning',
      desc: 'Lorem ipsum dolor sit amet consectetur. Et a neque viverra vivamus in vulputate.',
      icon: 'fa-shower',
      img: '/images/ServicesWeProvide6.jpg',
      link: '/services/drain-cleaning',
    },
  ];

  // 1) Hero Split
  hero = {
    eyebrow: 'Plumbing Care',
    title: 'Taking regular plumbing care will save you time and money',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Advanced repair services for residential & commercial needs.',
    imageSrc: '/images/waterandcup.jpg',
    imageAlt: 'Plumbing care',
    bullets: [
      { text: 'Praesent Sodales Orci' },
      { text: 'Curabitur Dignissim' },
      { text: 'Nulla Condimentum' },
    ],
    primaryCta: { label: 'More About Us', link: '/about' },
    reverse: false, // keep image on the left like the reference
  };

  // 2) Pricing Plans (shared component with your identical HTML)
  plans: Plan[] = [
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
      cta: { label: 'Get Started', link: '/contact' },
    },
    {
      name: 'Commercial Plumbing',
      priceMonthly: 499,
      priceYearly: 4990,
      highlighted: true,
      features: [
        'Installations, Repairs, And Replacements',
        'Leak Detection And Repair',
        'Water & Gas Piping',
        'Drain Cleaning & Sewer Service',
        'Plumbing Inspections & Maintenance',
        'Heater Installation & Replacement, Repair',
      ],
      cta: { label: 'Inquire Now', link: '/contact' },
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
      cta: { label: 'Schedule Service', link: '/contact' },
    },
  ];

  // 3) Recent Works Grid
  categories: WorkCategory[] = [
    { id: 'commercial', label: 'Commercial Services' },
    { id: 'residential', label: 'Residential Services' },
    { id: 'emergency', label: 'Emergency Services' },
  ];
  works: WorkItem[] = [
    {
      id: 1,
      title: 'Water Line Repair',
      image: '/images/RecentWorks1.jpg',
      category: 'residential',
    },
    {
      id: 2,
      title: 'Valve Replacement',
      image: '/images/05 - Image-Containerr.png',
      category: 'commercial',
    },
    {
      id: 3,
      title: 'Sink Installation',
      image: '/images/RecentWorks3.jpg',
      category: 'residential',
    },
    {
      id: 4,
      title: 'Pipe Leak Fix',
      image: '/images/RecentWorks4.jpg',
      category: 'emergency',
    },
    {
      id: 5,
      title: 'Kitchen Plumbing',
      image: '/images/RecentWorks5.jpg',
      category: 'residential',
    },
    {
      id: 6,
      title: 'Heater Maintenance',
      image: '/images/thirdone.jpg',
      category: 'commercial',
    },
  ];

  // 4) Stats (animated)
  stats: Stat[] = [
    { value: 1200, label: 'Happy Customers', suffix: '+' },
    { value: 8714, label: '5-Star Reviews', suffix: '+' },
    { value: 1600, label: 'Projects Served', suffix: '+' },
    { value: 500, label: 'Professionals', suffix: '+' },
  ];

  /* ---------- TESTIMONIALS SLIDER ---------- */
  // Using the provided avatar path for now
  reviews = [
    {
      name: 'Michael Adam',
      role: 'Hotel Manager',
      avatar: '/images/review1.png',
      rating: 5,
      text: 'Lorem ipsum dolor sit amet consectetur. Pretium malesuada pulvinar sed feugiat sem et nisl pharetra. Facilisis ridiculus amet commodo aliquet a phasellus malesuada.',
    },
    {
      name: 'Wade Warren',
      role: 'Marketing Coordinator',
      avatar: '/images/review2.png',
      rating: 5,
      text: 'Ac id quam mattis neque. Urna tellus et maecenas interdum. Elitismod egestas scelerisque.',
    },
    {
      name: 'Albert Flores',
      role: 'President of Sales',
      avatar: '/images/review3.png',
      rating: 5,
      text: 'Cras convallis, magna at pretium posuere, mi dolor fermentum lorem, non porttitor justo dui vitae odio.',
    },
  ];
  reviewIndex = 0;
  // Compute the 3 visible cards (wrap-around)
  visibleReviews() {
    const arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push(this.reviews[(this.reviewIndex + i) % this.reviews.length]);
    }
    return arr;
  }
  nextReview() {
    if (this.reviews.length > 0)
      this.reviewIndex = (this.reviewIndex + 1) % this.reviews.length;
  }
  prevReview() {
    if (this.reviews.length > 0)
      this.reviewIndex =
        (this.reviewIndex - 1 + this.reviews.length) % this.reviews.length;
  }
  trackByRev = (_: number, r: any) => r.name;

  /* ---------- PARTNERS (logos) ---------- */
  logos = [
    { name: 'Slack', src: '/images/Slack 2.svg' },
    { name: 'WooCommerce', src: '/images/WooCommerce 1.svg' },
    { name: 'sitepoint', src: '/images/Sitpoint 1.svg' }, // path has "Sitpoint" as provided
    { name: 'PayPal', src: '/images/Paypal 1.png' },
    { name: 'NETFLIX', src: '/images/Netflix 1.svg' },
    { name: 'Medium', src: '/images/Medium 1.svg' },
    { name: 'amazon', src: '/images/Amazon 1.svg' },
    { name: 'Adobe', src: '/images/Adobe 1.svg' },
  ];

  // TrackBy for better perf
  trackByLogo = (_: number, l: { name: string }) => l.name;

  // ===== BLOG (Emergency Tips & Tricks) =====
  posts = [
    {
      title: 'The Do’s and Don’ts of Fixing a Blocked Drain',
      date: 'January 4, 2022',
      img: '/images/ServicesWeProvide4.jpg',
      excerpt:
        'The Do’s and Don’ts of Fixing a Blocked Drain Lorem ipsum dolor sit amet consectetur',
      tag: 'TIPS & TRICKS',
      link: '/blog/blocked-drain',
    },
    {
      title: '8 Most Common Plumbing Problems',
      date: 'January 4, 2022',
      img: '/images/ServicesWeProvide3.jpg',
      excerpt:
        'The Do’s and Don’ts of Fixing a Blocked Drain Lorem ipsum dolor sit amet consectetur',
      tag: 'TIPS & TRICKS',
      link: '/blog/common-problems',
    },
    {
      title: 'The Best Water Filters Of Our Choice',
      date: 'January 4, 2022',
      img: '/images/ServicesWeProvide2.jpg',
      excerpt:
        'The Do’s and Don’ts of Fixing a Blocked Drain Lorem ipsum dolor sit amet consectetur',
      tag: 'TIPS & TRICKS',
      link: '/blog/best-water-filters',
    },
    {
      title: 'General Maintenance For Your Toilet',
      date: 'January 4, 2022',
      img: '/images/ServicesWeProvide1.jpg',
      excerpt:
        'The Do’s and Don’ts of Fixing a Blocked Drain Lorem ipsum dolor sit amet consectetur',
      tag: 'TIPS & TRICKS',
      link: '/blog/toilet-maintenance',
    },
  ];
  trackByPost = (_: number, p: { title: string }) => p.title;
}
