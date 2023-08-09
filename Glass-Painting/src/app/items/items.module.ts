import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ItemsRoutingModule } from './items-routing.module';
import { MakeComponent } from './make/make.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LikedComponent } from './liked/liked.component';
import { CompleteOrderComponent } from './complete-order/complete-order.component';

@NgModule({
  declarations: [DetailsComponent, CatalogueComponent, MakeComponent, LikedComponent, CompleteOrderComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ItemsModule {}
