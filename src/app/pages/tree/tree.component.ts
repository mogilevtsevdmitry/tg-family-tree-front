import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentComponent } from '../../components/content/content.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, ContentComponent],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss'
})
export class TreeComponent {

}
