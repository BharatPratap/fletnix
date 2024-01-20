import { Component, Input, EventEmitter, Output } from '@angular/core';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  standalone: true,
  imports : [DetailsComponent]
})
export class CardComponent {

  @Output() showDetailsClick = new EventEmitter<void>();

  @Input() movie: any = {};
  ngOnInit() : void {
  }
  ngOnChanges() : void {
  }

  detailsVisible = false;

  showDetails(): void {
    console.log('show details called');
    
  }

  closeDetails(): void {
    console.log('close details called');
    this.detailsVisible = false;
  }

}
