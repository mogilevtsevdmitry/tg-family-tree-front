import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import panzoom from 'panzoom';

import { ContentComponent } from '../../components/content/content.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TreeItemComponent } from '../../components/tree-item/tree-item.component';
import { CircleButtonComponent } from '../../components/buttons/circle-button/circle-button.component';
import { treeItems } from './data';
import { ITreeItem } from './interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    ContentComponent,
    TreeItemComponent,
    CircleButtonComponent,
    CommonModule,
  ],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements AfterViewInit {
  @Input() treeData: ITreeItem = treeItems;
  @ViewChildren(TreeItemComponent, { read: ElementRef })
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

    // Создание линий связей
    this.createConnections();
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

  getVerticalPosition(level: number): string {
    return `${level * 200}px`; // adjust 200px based on the required spacing between levels
  }

  getHorizontalPosition(level: number, item: ITreeItem): string {
    // Logic to calculate horizontal position
    // For simplicity, we'll use the index of the item in its level
    const index = this.treeData.relations.indexOf(item);
    return `${index * 200}px`; // adjust 200px based on the required spacing between items
  }

  createConnections() {
    this.treeItems.forEach((item) => {
      const element = item.nativeElement;
      const parentElement = this.findParentElement(element);
      if (parentElement) {
        const line = document.createElement('div');
        line.className = 'connection-line';
        document.body.appendChild(line);
        this.updateLinePosition(line, parentElement, element);
      }
    });
  }

  findParentElement(element: HTMLElement): HTMLElement | null {
    const elementId = element.getAttribute('data-id');
    if (!elementId) {
      return null;
    }

    // Рекурсивная функция для поиска родителя в структуре данных
    const findParentInTree = (
      node: ITreeItem,
      targetId: string
    ): ITreeItem | null => {
      for (const relation of node.relations) {
        if (relation.id === targetId) {
          return node;
        }
        const found = findParentInTree(relation, targetId);
        if (found) {
          return found;
        }
      }
      return null;
    };

    const parentData = findParentInTree(this.treeData, elementId);
    if (parentData) {
      return document.querySelector(`[data-id="${parentData.id}"]`);
    }
    return null;
  }

  updateLinePosition(
    line: HTMLDivElement,
    fromElement: HTMLElement,
    toElement: HTMLElement
  ) {
    const fromRect = fromElement.getBoundingClientRect();
    const toRect = toElement.getBoundingClientRect();
    const fromX = fromRect.left + fromRect.width / 2;
    const fromY = fromRect.top + fromRect.height / 2;
    const toX = toRect.left + toRect.width / 2;
    const toY = toRect.top + toRect.height / 2;
    const length = Math.sqrt((toX - fromX) ** 2 + (toY - fromY) ** 2);
    const angle = (Math.atan2(toY - fromY, toX - fromX) * 180) / Math.PI;

    line.style.width = `${length}px`;
    line.style.transform = `translate(${fromX}px, ${fromY}px) rotate(${angle}deg)`;
    line.style.backgroundColor = 'green';
  }
}
