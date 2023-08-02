import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ItemsRoutingModule } from './items-routing.module';
import { MakeComponent } from './make/make.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DetailsComponent, CatalogueComponent, MakeComponent],
  imports: [CommonModule, ItemsRoutingModule, ReactiveFormsModule],
})
export class ItemsModule {}
