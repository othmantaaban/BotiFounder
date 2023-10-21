import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminAnneeDashPageRoutingModule } from './admin-annee-dash-routing.module';

import { NgChartsModule } from 'ng2-charts';
import { AdminAnneeDashPage } from './admin-annee-dash.page';
import { StackedBarChartComponent } from '../../../components/stacked-bar-chart/stacked-bar-chart.component';
import { ListingUsageComponent } from '../../../components/listing-usage/listing-usage.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ParentModule } from 'src/app/parent/parent.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminAnneeDashPageRoutingModule,
    NgChartsModule,
    ScrollingModule,
    ParentModule
  ],
  declarations: [
    AdminAnneeDashPage,
  ]
})
export class AdminAnneeDashPageModule {}
