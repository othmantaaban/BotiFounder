import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ComboChartComponent } from "./combo-chart.component";
import { NgChartsModule } from "ng2-charts";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgChartsModule
  ],
  exports:[
    ComboChartComponent
  ],
  declarations: [ComboChartComponent]
})
export class ComboChartComponentModule {}