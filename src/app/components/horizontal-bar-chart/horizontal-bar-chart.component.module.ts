import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { HorizontalBarChartComponent } from "./horizontal-bar-chart.component";
import { NgChartsModule } from "ng2-charts";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgChartsModule
  ],
  exports:[
    HorizontalBarChartComponent
  ],
  declarations: [HorizontalBarChartComponent]
})
export class HorizontalBarChartComponentModule {}