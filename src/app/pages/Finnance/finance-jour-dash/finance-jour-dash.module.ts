import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinanceJourDashPageRoutingModule } from './finance-jour-dash-routing.module';

import { FinanceJourDashPage } from './finance-jour-dash.page';
// import { NgChartsModule } from 'ng2-charts';
import { ScrollingModule } from '@angular/cdk/scrolling';
// import { ParentModule } from 'src/app/parent/parent.module';
import { NgChartsModule } from 'ng2-charts';
import { ParentModule } from 'src/app/parent/parent.module';
// import { HorizontalBarChartComponentModule } from 'src/app/components/horizontal-bar-chart/horizontal-bar-chart.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinanceJourDashPageRoutingModule,
    NgChartsModule,
    ScrollingModule,
    ParentModule
    // HorizontalBarChartComponentModule
  ],
  declarations: [
    FinanceJourDashPage,
  ]
})
export class FinanceJourDashPageModule {}
