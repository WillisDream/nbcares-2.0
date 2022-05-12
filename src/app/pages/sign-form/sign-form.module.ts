import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignFormPageRoutingModule } from './sign-form-routing.module';

import { SignFormPage } from './sign-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SignFormPageRoutingModule
  ],
  declarations: [SignFormPage]
})
export class SignFormPageModule {}
