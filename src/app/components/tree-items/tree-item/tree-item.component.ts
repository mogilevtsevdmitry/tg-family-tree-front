import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ITreeItem, KinshipEnum } from '../../genealogy-tree/interfaces';

@Component({
  selector: 'app-tree-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatBadgeModule, MatButtonModule, MatIconModule],
  templateUrl: './tree-item.component.html',
  styleUrl: './tree-item.component.scss',
})
export class TreeItemComponent {
  @Input() item!: ITreeItem;

  get avatarUrl(): string {
    return this.item.avatar ? this.item.avatar : 'svg/avatar-default.svg';
  }

  get relationClass(): string {
    switch (this.item.kinship) {
      case KinshipEnum.MOTHER:
      case KinshipEnum.FATHER:
        return 'parent';
      case KinshipEnum.WIFE:
      case KinshipEnum.HUSBAND:
        return 'partner';
      case KinshipEnum.BROTHER:
      case KinshipEnum.SISTER:
        return 'sibling';
      case KinshipEnum.DAUGHTER:
      case KinshipEnum.SON:
        return 'child';
      default:
        return '';
    }
  }

  get badge() {
    switch (this.item.kinship) {
      case KinshipEnum.MOTHER:
        return 'мать';
      case KinshipEnum.FATHER:
        return 'отец';
      case KinshipEnum.HUSBAND:
        return 'муж';
      case KinshipEnum.WIFE:
        return 'жена';
      case KinshipEnum.BROTHER:
        return 'брат';
      case KinshipEnum.SISTER:
        return 'сестра';
      default:
        return '';
    }
  }
}
