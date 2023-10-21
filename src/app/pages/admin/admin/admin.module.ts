import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { ParentModule } from 'src/app/parent/parent.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    ParentModule
    // DateSegmentsComponentModule
  ],
  declarations: [
    AdminPage
  ]
})
export class AdminPageModule {}
