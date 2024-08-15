import { BehaviorSubject } from 'rxjs';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import panzoom from 'panzoom';

import { CommonModule } from '@angular/common';
import { CircleButtonComponent } from '../../components/buttons/circle-button/circle-button.component';
import { ContentComponent } from '../../components/content/content.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { GenealogyTreeComponent } from '../../components/genealogy-tree/genealogy-tree.component';
import { ITreeItem } from '../../components/genealogy-tree/interfaces';
import { treeItems } from './data';
import { TreeItemsComponent } from '../../components/tree-items/tree-items.component';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    ContentComponent,
    CircleButtonComponent,
    CommonModule,
    GenealogyTreeComponent,
    TreeItemsComponent,
  ],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements AfterViewInit {
  @Input() treeData: BehaviorSubject<ITreeItem> = new BehaviorSubject(treeItems);
  treeItems!: QueryList<ElementRef>;
  private panzoomInstance: any;
  private maxZoom = 1;
  private minZoom = 0.1;
  screen = 'fullscreen';

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const element = document.getElementById('board');
    const currentItem = document.getElementById('current-item');

    if (element) {
      this.panzoomInstance = panzoom(element, {
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        bounds: true,
        boundsPadding: 0.1,
        smoothScroll: false,
      });

      // Центрирование текущего элемента и смещение вниз
      if (currentItem) {
        const container = document.getElementById('board-container');
        if (container) {
          const containerRect = container.getBoundingClientRect();
          currentItem.style.top = `calc(50% + ${containerRect.height * 0.2}px)`;
          currentItem.style.left = '50%';
          currentItem.style.transform = 'translate(-50%, -50%)';
        }
      }

      // Обновление Angular при любом изменении трансформации
      this.panzoomInstance.on('transform', () => {
        this.cdr.detectChanges();
      });
    }
  }

  fitToScreen() {
    this.screen =
      this.screen === 'fullscreen' ? 'fullscreen_exit' : 'fullscreen';
    const board = document.getElementById('board');
    if (board) {
      const container = document.getElementById('board-container');
      if (container) {
        const boardRect = board.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const scaleX = containerRect.width / boardRect.width;
        const scaleY = containerRect.height / boardRect.height;
        const scale = Math.min(scaleX, scaleY);

        this.panzoomInstance.zoomTo(
          boardRect.width / 2,
          boardRect.height / 2,
          scale
        );
      }
    }
  }
}
