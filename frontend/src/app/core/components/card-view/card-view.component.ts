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
    console.log("Child Component");
    console.log(this.movieData);
  }
  ngOnChanges() : void {
    console.log("Child Component reloaded");
    this.movieList = this.movieData.docs;
    console.log(this.movieList);
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.dataEvent.emit(this.page);
    }
  }

  nextPage(): void {
    console.log("Child Component Next clicked");
    this.page++;
    this.dataEvent.emit(this.page);
  }

}
