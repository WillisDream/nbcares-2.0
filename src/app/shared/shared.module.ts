import { SignaturePadComponent } from './../components/signature-pad/signature-pad.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [CommonModule, RouterModule, CoreModule, ReactiveFormsModule],
  declarations: [SignaturePadComponent],
  exports: [ReactiveFormsModule, SignaturePadComponent],
  providers: [],
  entryComponents: [],
})
export class SharedModule {}
 