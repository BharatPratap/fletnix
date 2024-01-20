import { Component, Input, EventEmitter, Output } from '@angular/core';
import { DetailsComponent } from '../details/details.component';
import { Card } from './card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  standalone: true,
  imports : [DetailsComponent]
})
export class CardComponent {
  @Output() showDetailsClick = new EventEmitter<any>();


  @Input() movie: any = {};
  ngOnInit() : void {
  }
  ngOnChanges() : void {
  }

  toggleDetails(): void {
    this.showDetailsClick.emit();
  }

}
