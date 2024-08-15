import { BehaviorSubject, map, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ITreeItem, KinshipEnum } from '../genealogy-tree/interfaces';
import { TreeItemComponent } from './tree-item/tree-item.component';

@Component({
  selector: 'app-tree-items',
  standalone: true,
  imports: [TreeItemComponent, CommonModule],
  templateUrl: './tree-items.component.html',
  styleUrl: './tree-items.component.scss',
})
export class TreeItemsComponent {
  @Input() treeData: BehaviorSubject<ITreeItem> =
    new BehaviorSubject<ITreeItem>(null!);

  get sortedTreeData(): BehaviorSubject<ITreeItem> {
    return this.treeData.pipe(
      map((data) => this.sortTreeData(data))
    ) as BehaviorSubject<ITreeItem>;
  }

  private sortTreeData(treeItem: ITreeItem): ITreeItem {
    if (!treeItem || !treeItem.children) {
      return treeItem;
    }

    const youItemIndex = treeItem.children.findIndex(
      (item) => item.kinship === KinshipEnum.YOU
    );

    if (youItemIndex !== -1) {
      const youItem = treeItem.children.splice(youItemIndex, 1)[0];

      const parents = treeItem.children.filter(
        (item) =>
          item.kinship === KinshipEnum.MOTHER ||
          item.kinship === KinshipEnum.FATHER
      );
      const siblings = treeItem.children.filter(
        (item) =>
          item.kinship === KinshipEnum.BROTHER ||
          item.kinship === KinshipEnum.SISTER
      );
      const partners = treeItem.children.filter(
        (item) =>
          item.kinship === KinshipEnum.WIFE ||
          item.kinship === KinshipEnum.HUSBAND
      );
      const children = treeItem.children.filter(
        (item) =>
          item.kinship === KinshipEnum.DAUGHTER ||
          item.kinship === KinshipEnum.SON
      );

      treeItem.children = [
        ...parents,
        youItem,
        ...partners,
        ...siblings,
        ...children,
      ];
    }

    // Рекурсивно сортируем вложенные элементы
    treeItem.children = treeItem.children.map((child) =>
      this.sortTreeData(child)
    );

    return treeItem;
  }
}
