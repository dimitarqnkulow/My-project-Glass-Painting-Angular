import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ItemsRoutingModule } from './items-routing.module';

@NgModule({
  declarations: [DetailsComponent, CatalogueComponent],
  imports: [CommonModule, ItemsRoutingModule],
})
export class ItemsModule {}
