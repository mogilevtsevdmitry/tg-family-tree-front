import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ITreeItem, KinshipEnum } from '../../pages/tree/interfaces';

@Component({
  selector: 'app-tree-item',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './tree-item.component.html',
  styleUrl: './tree-item.component.scss'
})
export class TreeItemComponent {
  @Input() name: string = ''
  @Input() avatar: string = ''
  @Input() alive: boolean = true
  @Input() birthday: Date | null = null
  @Input() kinship: KinshipEnum | null = null
  @Input() relations: ITreeItem[] = []
}
