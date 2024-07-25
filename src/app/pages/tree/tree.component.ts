import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import panzoom from 'panzoom';

import { ContentComponent } from '../../components/content/content.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TreeItemComponent } from '../../components/tree-item/tree-item.component';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, ContentComponent, TreeItemComponent],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements AfterViewInit {
  private panzoomInstance: any;
  private maxZoom = 1;
  private minZoom = 0.1;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const element = document.getElementById('board');

    if (element) {
      this.panzoomInstance = panzoom(element, {
        maxZoom: this.maxZoom, // Максимальное увеличение
        minZoom: this.minZoom, // Минимальное уменьшение (можете настроить под свои нужды)
        bounds: true,
        boundsPadding: 0.1,
        smoothScroll: false,
      });

      // Ограничения на масштабирование
      this.panzoomInstance.on('zoom', (e: any) => {
        const transform = this.panzoomInstance.getTransform();
        if (transform.scale < this.minZoom) {
          // Минимальный зум
          this.panzoomInstance.zoomAbs(transform.x, transform.y, this.minZoom);
        } else if (transform.scale > this.maxZoom) {
          // Максимальный зум
          this.panzoomInstance.zoomAbs(transform.x, transform.y, this.maxZoom);
        }

        // Обновление Angular при изменении масштаба
        this.cdr.detectChanges();
      });

      // Обновление Angular при любом изменении трансформации
      this.panzoomInstance.on('transform', () => {
        this.cdr.detectChanges();
      });

      // Обработчики для перемещения элементов
      element.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', this.onMouseMove);
      });

      element.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', this.onMouseMove);
      });
    }
  }

  onMouseMove = () => {
    this.cdr.detectChanges();
  };

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent) {
    this.cdr.detectChanges();
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    this.cdr.detectChanges();
  }

  @HostListener('window:touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.cdr.detectChanges();
  }
}
