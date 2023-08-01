import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { DetailsComponent } from './details/details.component';
import { AuthActivate } from '../core/guards/router.guards';

const routes: Routes = [
  {
    path: 'catalogue',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CatalogueComponent,
        canActivate: [AuthActivate],
      },
      {
        path: ':articleId',
        component: DetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
