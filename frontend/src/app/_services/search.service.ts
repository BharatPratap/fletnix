// search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



const apiUrl = 'https://fletnix-backend-erp9.onrender.com/api/';

@Injectable({
  providedIn: 'root',
})

export class SearchService {

  constructor(private http: HttpClient) {}

  search(query: string, page: number, pageSize: number): Observable<any> {
      return this.http.post(
        apiUrl+'search/',
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
      apiUrl+'fetchDefaults/',
      {},
      httpOptions
    );
  
}
}
