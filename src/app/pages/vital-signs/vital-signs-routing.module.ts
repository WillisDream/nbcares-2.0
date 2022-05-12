import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VitalSignsPage } from './vital-signs.page';

const routes: Routes = [
  {
    path: '',
    component: VitalSignsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VitalSignsPageRoutingModule {}
