import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Article } from 'src/app/types/article';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent implements OnInit {
  itemsList: Article[] = [];
  isLoading: boolean = true;

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getAllItems('').subscribe({
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

  search(input: string) {
    this.apiService.getAllItems(input).subscribe({
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
