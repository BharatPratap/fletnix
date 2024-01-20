import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  standalone: true,
  imports: [CommonModule]
})

export class DetailsComponent {
  @Input() movie: any = {}

  @Output() closeDetailsClick = new EventEmitter<void>();

  ngOnInit ():  void {
    console.log(this.movie);
  }

  closeDetails(): void {
    console.log(this.movie)
    this.closeDetailsClick.emit();
  }
}
