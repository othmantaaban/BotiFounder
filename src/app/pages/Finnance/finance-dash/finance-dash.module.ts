import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinanceDashPageRoutingModule } from './finance-dash-routing.module';

import { FinanceDashPage } from './finance-dash.page';
import { AdminJourDashPageRoutingModule } from '../../admin/admin-jour-dash/admin-jour-dash-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { ParentModule } from 'src/app/parent/parent.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinanceDashPageRoutingModule,
    NgChartsModule,
    ScrollingModule,
    HttpClientModule,
    ParentModule
  ],
  declarations: [
    FinanceDashPage,
  ],
  schemas : [
      NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class FinanceDashPageModule {}
