import { Component, Input, OnChanges } from '@angular/core';
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

}
