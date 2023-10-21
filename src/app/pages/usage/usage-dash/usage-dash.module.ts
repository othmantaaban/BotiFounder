import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsageDashPageRoutingModule } from './usage-dash-routing.module';

import { UsageDashPage } from './usage-dash.page';
import { ParentModule } from 'src/app/parent/parent.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsageDashPageRoutingModule,
    ParentModule
    // DateSegmentsComponentModule
  ],
  declarations: [
    UsageDashPage
  ]
})
export class UsageDashPageModule {}
