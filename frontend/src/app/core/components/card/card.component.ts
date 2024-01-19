import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  standalone: true
})
export class CardComponent {
  @Input() movie: any = {};
  ngOnInit() : void {
  }
  ngOnChanges() : void {
  }

}
