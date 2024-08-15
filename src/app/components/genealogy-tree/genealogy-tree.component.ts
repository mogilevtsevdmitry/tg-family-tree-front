import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GenealogyTreeItemComponent } from './genealogy-tree-item/genealogy-tree-item.component';
import { ITreeItem } from './interfaces';

@Component({
  standalone: true,
  imports: [CommonModule, GenealogyTreeItemComponent, MatIconModule],
  selector: 'app-genealogy-tree',
  templateUrl: './genealogy-tree.component.html',
  styleUrls: ['./genealogy-tree.component.scss'],
})
export class GenealogyTreeComponent {
  @Input() items: ITreeItem[] = [];

  toggleVisibility(event: Event, member: ITreeItem) {
    event.stopPropagation();
    member.isVisible = !member.isVisible;
  }

  getMemberClass(member: ITreeItem): string {
    return member.kinship.toLowerCase();
  }
}
