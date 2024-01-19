import { Component,inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieService } from '../../_services/movie.service';
import { CardViewComponent } from '../../core/components/card-view/card-view.component';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
  standalone: true,
  imports : [ HeaderComponent,BannerComponent, CardViewComponent ]
})
export class BrowseComponent implements OnInit {

  movieData: any = {};

  ngOnInit(): void {
    this.movieService.getMovies().subscribe( res=> {
      this.movieData = res;
      console.log("Parent component");
      console.log(this.movieData);
    })
  }

  movieService = inject(MovieService);

}
