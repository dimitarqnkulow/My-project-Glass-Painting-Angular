import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Article } from '../types/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  itemsList: Article[] = [];
  isLoading: boolean = true;

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getTrending().subscribe({
      next: (items) => {
        this.itemsList = items;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error(`Error: ${err}`);
      },
    });
  }
}
