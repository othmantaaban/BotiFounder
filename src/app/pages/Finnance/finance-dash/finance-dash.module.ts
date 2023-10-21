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
// import { ParentModule } from 'src/app/parent/parent.module';
import { FinanceJourDashPageModule } from '../finance-jour-dash/finance-jour-dash.module';
import { FinanceJourDashPage } from '../finance-jour-dash/finance-jour-dash.page';
import { FinanceAnneeDashPage } from '../finance-annee-dash/finance-annee-dash.page';
import { FinanceMoisDashPage } from '../finance-mois-dash/finance-mois-dash.page';
import { CardsFinanceComponent } from '../../../components/cards-finance/cards-finance.component';
// import { ComboChartComponent } from '../../../components/combo-chart/combo-chart.component';
// import { DateSegmentsComponentModule } from 'src/app/components/date-segments/date-segment.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinanceDashPageRoutingModule,
    NgChartsModule,
    ScrollingModule,
    HttpClientModule,
    // DateSegmentsComponentModule
    // NgChartsModule
    // ParentModule
  ],
  declarations: [
    FinanceDashPage,
    // DateSegmentsComponent

    // FinanceJourDashPage,
    // FinanceMoisDashPage,
    // FinanceAnneeDashPage,
  ],
  schemas : [
      NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class FinanceDashPageModule {}
