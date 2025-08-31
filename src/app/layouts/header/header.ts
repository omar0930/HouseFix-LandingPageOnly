import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  homeMenuOpen = false;

  constructor(private host: ElementRef<HTMLElement>) {}

  toggleHomeMenu() {
    this.homeMenuOpen = !this.homeMenuOpen;
  }
  closeHomeMenu() {
    this.homeMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    if (!this.host.nativeElement.contains(e.target as Node)) {
      this.homeMenuOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.homeMenuOpen = false;
  }
}
