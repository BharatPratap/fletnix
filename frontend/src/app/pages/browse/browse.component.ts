import { Component,inject, OnInit, Output, OnChanges } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieService } from '../../_services/movie.service';
import { CardViewComponent } from '../../core/components/card-view/card-view.component';
import { StorageService } from '../../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
  standalone: true,
  imports : [ HeaderComponent,BannerComponent, CardViewComponent ]
})
export class BrowseComponent implements OnInit {
  currentUser: any =  {}

  constructor(private storageService: StorageService, private router: Router) { }

  movieData: any = {};
  page = 1;

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    if(!this.currentUser?.email) { 
      console.log("No current user");
      this.router.navigate(['/login'])
      return;
    }
    this.movieService.getMovies(this.page,'','').subscribe( res=> {
      this.movieData = res;
    })
  }

  ngOnChanges() : void {
  }

  receiveData(data: number) {
    console.log("Receive data");
    this.page = data;
    console.log(this.page);
    this.movieService.getMovies(this.page,'','').subscribe( res=> {
      this.movieData = res;
    })
  }

  movieService = inject(MovieService);

}
