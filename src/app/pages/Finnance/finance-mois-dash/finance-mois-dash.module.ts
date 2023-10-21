import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinanceMoisDashPageRoutingModule } from './finance-mois-dash-routing.module';

import { FinanceMoisDashPage } from './finance-mois-dash.page';
import { NgChartsModule } from 'ng2-charts';
import { DonutChartComponent } from '../../../components/donut-chart/donut-chart.component';
import { CardsFinanceComponent } from '../../../components/cards-finance/cards-finance.component';
import { ListingFinanceComponent } from '../../../components/listing-finance/listing-finance.component';
import { PieChartComponent } from '../../../components/pie-chart/pie-chart.component';
import { HorizontalBarChartComponent } from '../../../components/horizontal-bar-chart/horizontal-bar-chart.component';
import { ListingAdministrationComponent } from '../../../components/listing-administration/listing-administration.component';
import { ListingFinanceDepenseComponent } from 'src/app/components/listing-finance-depense/listing-finance-depense.component';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { ParentModule } from 'src/app/parent/parent.module';
// import { HorizontalBarChartComponentModule } from 'src/app/components/horizontal-bar-chart/horizontal-bar-chart.component.module';
// import { ComboChartComponent } from 'src/app/components/combo-chart/combo-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinanceMoisDashPageRoutingModule,
    NgChartsModule,
    ScrollingModule,
    HttpClientModule,
    ParentModule
    // HorizontalBarChartComponentModule
  ],
  declarations: [
    FinanceMoisDashPage,
  ]
})
export class FinanceMoisDashPageModule {}
