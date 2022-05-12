import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareerPage } from './career.page';

const routes: Routes = [
  {
    path: '',
    component: CareerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerPageRoutingModule {}
