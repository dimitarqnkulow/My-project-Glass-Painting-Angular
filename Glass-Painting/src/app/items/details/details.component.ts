import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Article } from 'src/app/types/article';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  article: Article | undefined;
  isLoading: boolean = true;

  private authenticationSub: Subscription | undefined;

  isAuthenticated = false;
  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private userService: UserService
  ) {}

  ngOnDestroy(): void {
    this.authenticationSub?.unsubscribe();
  }
  ngOnInit(): void {
    this.fetchArticle();
    this.authenticationSub = this.userService
      .getAuthenticated()
      .subscribe((status) => {
        this.isAuthenticated = status;
      });

    this.isAuthenticated = this.userService.getIsAuthenticated();
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
