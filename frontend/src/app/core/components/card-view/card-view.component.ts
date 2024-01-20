import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from '../details/details.component';
import { Card } from '../card/card.interface';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.css',
  standalone: true,
  imports : [ CardComponent, CommonModule, DetailsComponent ],
})
export class CardViewComponent {
  @Input() movieData: any = {};
  selectedCard: any
  page = 1;
  cards: Card[];
  @Output() dataEvent = new EventEmitter<number>();

  movieList : any = [];
  ngOnInit() : void {
  }
  ngOnChanges() : void {
    this.movieList = this.movieData.docs;
  }

  constructor() {
    this.cards = this.movieList
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.dataEvent.emit(this.page);
    }
  }

  showDetails(selectedCard: Card): void {
      // Handle details for the selected card
      console.log('Show details for:', selectedCard);
      this.selectedCard = selectedCard
  }

  closeDetails() {
    console.log('Close details for');
    this.selectedCard.showDetails = false;
    this.selectedCard = null;
  }

  nextPage(): void {
    this.page++;
    this.dataEvent.emit(this.page);
  }
}
