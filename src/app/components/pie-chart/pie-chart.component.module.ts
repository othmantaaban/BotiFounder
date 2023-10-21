import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgApexchartsModule
  ],
  exports:[
    PieChartComponent
  ],
  declarations: [PieChartComponent]
})
export class PieChartComponentModule {}
