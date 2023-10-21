import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminJourDashPageRoutingModule } from './admin-jour-dash-routing.module';

import { AdminJourDashPage } from './admin-jour-dash.page';
// import { CardsFinanceComponent } from 'src/app/components/cards-finance/cards-finance.component';
import { NgChartsModule } from 'ng2-charts';
// import { ListingAdministrationComponent } from 'src/app/components/listing-administration/listing-administration.component';
// import { StackedBarChartComponent } from 'src/app/components/stacked-bar-chart/stacked-bar-chart.component';
// import { ListingFinanceDepenseComponent } from 'src/app/components/listing-finance-depense/listing-finance-depense.component';
// import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
// import { CardsAdminComponent } from 'src/app/components/cards-admin/cards-admin.component';
// import { HorizontalBarChartComponent } from 'src/app/components/horizontal-bar-chart/horizontal-bar-chart.component';
// import { ListingAdminComponent } from 'src/app/components/listing-admin/listing-admin.component';
import { ParentModule } from 'src/app/parent/parent.module';
// import { ParentModule } from 'src/app/parent/parent.module';
// import { HorizontalBarChartComponentModule } from 'src/app/components/horizontal-bar-chart/horizontal-bar-chart.component.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminJourDashPageRoutingModule,
    NgChartsModule,
    ScrollingModule,
    HttpClientModule,
    ParentModule
  ],
  declarations: [
    AdminJourDashPage,
  ]
})
export class AdminJourDashPageModule {}
