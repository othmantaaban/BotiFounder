import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { DateSegmentsComponent } from "./date-segments.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports:[
    DateSegmentsComponent
  ],
  declarations: [DateSegmentsComponent]
})
export class DateSegmentsComponentModule {}