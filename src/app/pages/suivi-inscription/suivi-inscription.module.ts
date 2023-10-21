import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuiviInscriptionPageRoutingModule } from './suivi-inscription-routing.module';

import { SuiviInscriptionPage } from './suivi-inscription.page';
import { NgApexchartsModule } from "ng-apexcharts";
import { NgChartsModule } from 'ng2-charts';
import { ParentModule } from 'src/app/parent/parent.module';
import { PieChartComponentModule } from 'src/app/components/pie-chart/pie-chart.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuiviInscriptionPageRoutingModule,
    NgApexchartsModule,
    NgChartsModule,
    ParentModule,
    PieChartComponentModule
  ],
  declarations: [
    SuiviInscriptionPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SuiviInscriptionPageModule {}
