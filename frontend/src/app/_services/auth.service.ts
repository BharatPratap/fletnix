import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageService } from '../_services/storage.service';

const AUTH_API = 'https://fletnix-backend-erp9.onrender.com/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storageService: StorageService, private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  register(email: string, password: string, age: number): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        email,
        password,
        age
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    this.storageService.clean();
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }

}
