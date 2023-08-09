import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Article } from 'src/app/types/article';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.css'],
})
export class LikedComponent implements OnInit {
  itemsList: Article[] = [];
  isLoading: boolean = true;

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    this.apiService.getLikedArts(userId!).subscribe({
      next: (items) => {
        this.itemsList = items;
        this.isLoading = false;
        console.log(items);
      },
      error: (err) => {
        this.isLoading = false;
        console.error(`Error: ${err}`);
      },
    });
  }
}