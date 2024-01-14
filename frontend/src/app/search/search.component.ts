// search.component.ts
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../_services/search.service';

interface Title {
  id: string;
  name: string;
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

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
  }

  search(): void {
    this.searchService.search(this.query, this.page, this.pageSize).subscribe({
      next: data => {
        this.results = data;
      },
      error: err => {console.log(err)
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
