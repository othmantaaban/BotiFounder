import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedagDashPageRoutingModule } from './pedag-dash-routing.module';

import { PedagDashPage } from './pedag-dash.page';
import { ParentModule } from 'src/app/parent/parent.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedagDashPageRoutingModule,
    ParentModule
    // DateSegmentsComponentModule
  ],
  declarations: [
    PedagDashPage,
  ]
})
export class PedagDashPageModule {}
