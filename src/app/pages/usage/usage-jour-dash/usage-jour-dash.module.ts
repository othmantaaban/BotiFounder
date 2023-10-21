import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsageJourDashPageRoutingModule } from './usage-jour-dash-routing.module';

import { UsageJourDashPage } from './usage-jour-dash.page';
import { NgChartsModule } from 'ng2-charts';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ParentModule } from 'src/app/parent/parent.module';
// import { HorizontalBarChartComponentModule } from 'src/app/components/horizontal-bar-chart/horizontal-bar-chart.component.module';
// import { VerticalBarChartComponent } from 'src/app/components/vertical-bar-chart/vertical-bar-chart.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsageJourDashPageRoutingModule,
    NgChartsModule,
    ScrollingModule,
    ParentModule
  ],
  declarations: [
    UsageJourDashPage,
  ]

})
export class UsageJourDashPageModule {}
