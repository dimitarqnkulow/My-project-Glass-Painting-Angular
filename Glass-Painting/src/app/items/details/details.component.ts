import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Article } from 'src/app/types/article';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  article: Article | undefined;
  isLoading: boolean = true;
  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.fetchArticle();
  }

  goBack(): void {
    this.location.back();
  }
  fetchArticle(): void {
    const id = this.activeRoute.snapshot.params['articleId'];

    this.apiService.getArticle(id).subscribe({
      next: (item) => {
        this.article = item;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(`Error: ${err}`);
      },
    });
  }
}
