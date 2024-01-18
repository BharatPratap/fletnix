import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from  '../../../_services/storage.service'
import { AuthService } from '../../../_services/auth.service';


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

  constructor(private storageService: StorageService, private authService: AuthService) { }

  navList = ["Home", "TV Shows", "Popular", "My List", "Browse By Language"];

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
