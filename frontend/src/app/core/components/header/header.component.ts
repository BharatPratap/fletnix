import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from  '../../../_services/storage.service'
import { AuthService } from '../../../_services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [
    CommonModule
  ],
})
export class HeaderComponent {

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router) { }

  navList = ["Home", "TV Shows", "Popular", "My List", "Search"];

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);

        this.router.navigate(['/login'])
      },
      error: err => {
        console.log(err);
      }
    });
  }


}
