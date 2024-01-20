import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const apiUrl = 'http://localhost:3000/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient, private storageService: StorageService) {}
  

  getMovies(currPage: number,query: string, type: string) {
    const user = this.storageService.getUser();
    return this.http.post(
      apiUrl+'search/',
      {
        query: query,
        page: currPage,
        type: type,
        age: user.age
      },
      httpOptions
    );
  }

}
