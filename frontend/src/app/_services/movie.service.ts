import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:3000/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {}
  

  getMovies(currPage: number,query: string) {
    return this.http.post(
      apiUrl+'search/',
      {
        query: query,
        page: currPage
      },
      httpOptions
    );
  }

}
