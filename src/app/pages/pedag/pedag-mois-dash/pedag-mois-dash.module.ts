import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedagMoisDashPageRoutingModule } from './pedag-mois-dash-routing.module';

import { PedagMoisDashPage } from './pedag-mois-dash.page';
import { NgChartsModule } from 'ng2-charts';
import { ParentModule } from 'src/app/parent/parent.module';
// import { HorizontalBarChartComponentModule } from 'src/app/components/horizontal-bar-chart/horizontal-bar-chart.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedagMoisDashPageRoutingModule,
    NgChartsModule,
    ParentModule
    // HorizontalBarChartComponentModule,
  ],
  declarations: [
    PedagMoisDashPage,
  ]
})
export class PedagMoisDashPageModule {}
