import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-circle-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './circle-button.component.html',
  styleUrl: './circle-button.component.scss',
})
export class CircleButtonComponent {
  @Input() icon = '';
  @Input() size: 's' | 'm' | 'xl' = 'm';
  @Input() route = '';

  constructor(private readonly router: Router) {}

  get iconSize() {
    switch (this.size) {
      case 's':
        return '24px !important';
      case 'm':
        return '32px !important';
      case 'xl':
        return '48px !important';
    }
  }
  get btnSize() {
    switch (this.size) {
      case 's':
        return '2rem';
      case 'm':
        return '3rem';
      case 'xl':
        return '5rem';
    }
  }

  click() {
    this.router.navigate([this.route]);
  }
}
