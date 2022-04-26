import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CareerPageRoutingModule } from './career-routing.module';

import { CareerPage } from './career.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CareerPageRoutingModule
  ],
  declarations: [CareerPage]
})
export class CareerPageModule {}
