import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { DetailsComponent } from './details/details.component';
import { AuthActivate } from '../core/guards/router.guards';
import { MakeComponent } from './make/make.component';
import { LikedComponent } from './liked/liked.component';
import { CompleteOrderComponent } from './complete-order/complete-order.component';

const routes: Routes = [
  {
    path: 'catalogue',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CatalogueComponent,
      },
      {
        path: ':articleId',
        component: DetailsComponent,
      },
    ],
  },
  {
    path: 'make',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MakeComponent,
        canActivate: [AuthActivate],
      },
      {
        path: 'complete',
        component: CompleteOrderComponent,
        canActivate: [AuthActivate],
      },
    ],
  },
  {
    path: 'liked',
    component: LikedComponent,
    canActivate: [AuthActivate],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
