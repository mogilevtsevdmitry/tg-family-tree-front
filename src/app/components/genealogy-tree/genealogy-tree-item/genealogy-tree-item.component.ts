import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ITreeItem } from '../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genealogy-tree-item',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './genealogy-tree-item.component.html',
  styleUrl: './genealogy-tree-item.component.scss'
})
export class GenealogyTreeItemComponent {
  @Input() item: ITreeItem | null = null;
}
