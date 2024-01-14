// search.component.ts
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../_services/search.service';

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
})

export class SearchComponent implements OnInit {
  query: string = '';
  page: number = 1;
  pageSize: number = 10;
  results?: Result;
  type?: Array<string> = [];
  title?: string = "";
  director?: "";
  country?: Array<string> = [];
  rating?: Array<string> = [];
  listedIn?: Array<string> = [];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.searchService.fetchDefault().subscribe({
      next: data => {
        this.type = data.type;
        this.country = data.country;
        this.rating = data.rating;
        this.listedIn = data.listedIn;
      },
      error: err => {
        console.log(err)
        if (err.error) {
          this.results = JSON.parse(err.error).message;
        } else {
          this.results = JSON.parse("Error with status: " + err.status);
        }
      }
    });
  }

  search(): void {
    this.searchService.search(this.query, this.page, this.pageSize).subscribe({
      next: data => {
        this.results = data;
      },
      error: err => {
        console.log(err)
        if (err.error) {
          this.results = JSON.parse(err.error).message;
        } else {
          this.results = JSON.parse("Error with status: " + err.status);
        }
      }
    });
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.search();
    }
  }

  nextPage(): void {
    this.page++;
    this.search();
  }
}
