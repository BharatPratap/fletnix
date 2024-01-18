import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
  standalone: true,
  imports : [ HeaderComponent ]
})
export class BrowseComponent {

}
