// search.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { SearchService } from '../../_services/search.service';
import { HeaderComponent } from '../../core/components/header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../_services/movie.service';
import { CardViewComponent } from '../../core/components/card-view/card-view.component';

interface Title {
  type: string;
  title: string;
  releaseYear: string;
  duration: string;
  description: string;
}

interface Result {
  items: Array<Title>;
  page: number,
  totalPages: number
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule, CardViewComponent]
})

export class SearchComponent implements OnInit {
  query: string = '';
  type: string = '';
  movieData: any = {};
  page = 1;


  ngOnInit(): void {
  }

  search(): void {
    console.log(this.query);
    this.movieService.getMovies(this.page,this.query, this.type).subscribe( res=> {
      this.movieData = res;
    })
  }
  movieService = inject(MovieService);

  receiveData(data: number) {
    this.page = data;
    this.movieService.getMovies(this.page,this.query,'').subscribe( res=> {
      this.movieData = res;
    })
  }
}
