import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VitalSignsPageRoutingModule } from './vital-signs-routing.module';

import { VitalSignsPage } from './vital-signs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    VitalSignsPageRoutingModule
  ],
  declarations: [VitalSignsPage]
})
export class VitalSignsPageModule {}
