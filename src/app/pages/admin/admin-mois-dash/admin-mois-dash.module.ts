import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminMoisDashPageRoutingModule } from './admin-mois-dash-routing.module';

import { AdminMoisDashPage } from './admin-mois-dash.page';
// import { DonutChartComponent } from '../../components/donut-chart/donut-chart.component';
import { NgChartsModule } from 'ng2-charts';
// import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ParentModule } from 'src/app/parent/parent.module';
// import { HorizontalBarChartComponentModule } from 'src/app/components/horizontal-bar-chart/horizontal-bar-chart.component.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminMoisDashPageRoutingModule,
    NgChartsModule,
    ScrollingModule,
    ParentModule
    // HorizontalBarChartComponentModule
  ],
  declarations: [
    AdminMoisDashPage
  ]
})
export class AdminMoisDashPageModule {}
