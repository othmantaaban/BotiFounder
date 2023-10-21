import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedagJourDashPageRoutingModule } from './pedag-jour-dash-routing.module';

import { PedagJourDashPage } from './pedag-jour-dash.page';
import { NgChartsModule } from 'ng2-charts';
// import { CardsFinanceComponent } from '../../components/cards-finance/cards-finance.component';
// import { HorizontalBarChartComponent } from 'src/app/components/horizontal-bar-chart/horizontal-bar-chart.component';
// import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
// import { CardsPedgComponent } from 'src/app/components/cards-pedg/cards-pedg.component';
// import { CardsPedagv2Component } from 'src/app/components/cards-pedagv2/cards-pedagv2.component';
import { CardsPedgComponent } from 'src/app/components/cards-pedg/cards-pedg.component';
import { CardsPedagv2Component } from 'src/app/components/cards-pedagv2/cards-pedagv2.component';
import { ParentModule } from 'src/app/parent/parent.module';
// import { HorizontalBarChartComponentModule } from 'src/app/components/horizontal-bar-chart/horizontal-bar-chart.component.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedagJourDashPageRoutingModule,
    NgChartsModule,
    ParentModule
    // HorizontalBarChartComponentModule,
  ],
  declarations: [
    PedagJourDashPage
  ]
})
export class PedagJourDashPageModule {}
