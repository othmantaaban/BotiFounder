import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinanceAnneeDashPageRoutingModule } from './finance-annee-dash-routing.module';

import { FinanceAnneeDashPage } from './finance-annee-dash.page';
import { NgChartsModule } from 'ng2-charts';
import { CardsFinanceComponent } from '../../../components/cards-finance/cards-finance.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { ComboChartComponent } from 'src/app/components/combo-chart/combo-chart.component';
import { ParentModule } from 'src/app/parent/parent.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinanceAnneeDashPageRoutingModule,
    NgChartsModule,
    ScrollingModule,
    HttpClientModule,
    ParentModule
  ],
  declarations: [
    FinanceAnneeDashPage,
  ],
})
export class FinanceAnneeDashPageModule {}
