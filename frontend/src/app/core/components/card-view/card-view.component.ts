import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.css',
  imports : [ CardComponent, CommonModule ],
  standalone: true
})
export class CardViewComponent {
  @Input() movieData: any = {};
  page = 1;
  @Output() dataEvent = new EventEmitter<number>();
  movieList : any = [];
  ngOnInit() : void {
  }
  ngOnChanges() : void {
    this.movieList = this.movieData.docs;
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.dataEvent.emit(this.page);
    }
  }

  nextPage(): void {
    this.page++;
    this.dataEvent.emit(this.page);
  }

}
