// search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})



export class SearchService {
  private apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  search(query: string, page: number, pageSize: number): Observable<any> {
      return this.http.post(
        this.apiUrl+'search/',
        {
          query,
          page,
          pageSize
        },
        httpOptions
      );
    
  }
  
  fetchDefault(): Observable<any> {
    return this.http.post(
      this.apiUrl+'fetchDefaults/',
      {},
      httpOptions
    );
  
}
}
