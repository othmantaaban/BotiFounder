import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HorizontalBarChartComponent } from '../components/horizontal-bar-chart/horizontal-bar-chart.component';
import { DateSegmentsComponent } from '../components/date-segments/date-segments.component';
import { CardsFinanceComponent } from '../components/cards-finance/cards-finance.component';
import { ListingAdministrationComponent } from '../components/listing-administration/listing-administration.component';
import { StackedBarChartComponent } from '../components/stacked-bar-chart/stacked-bar-chart.component';
import { ListingFinanceDepenseComponent } from '../components/listing-finance-depense/listing-finance-depense.component';
import { CardsAdminComponent } from '../components/cards-admin/cards-admin.component';
import { ListingAdminComponent } from '../components/listing-admin/listing-admin.component';
import { DonutChartComponent } from '../components/donut-chart/donut-chart.component';
import { ListingFinanceComponent } from '../components/listing-finance/listing-finance.component';
// import { PieChartComponent } from '../components/pie-chart/pie-chart.component';
import { ListingDiscountComponent } from '../components/listing-discount/listing-discount.component';
import { CardsPedgComponent } from '../components/cards-pedg/cards-pedg.component';
import { CardsPedagv2Component } from '../components/cards-pedagv2/cards-pedagv2.component';
import { ListingUsageComponent } from '../components/listing-usage/listing-usage.component';
import { VerticalBarChartComponent } from '../components/vertical-bar-chart/vertical-bar-chart.component';
import { ListingAdmin2Component } from '../components/listing-admin2/listing-admin2.component';
import { TabSolutionComponent } from '../components/tab-solution/tab-solution.component';
import { DateFilterComponent } from '../components/date-filter/date-filter.component';
import { ListingFinanceAvoirsComponent } from '../components/listing-finance-avoirs/listing-finance-avoirs.component';
import { ListingRecouvrementsComponent } from '../components/listing-recouvrements/listing-recouvrements.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgChartsModule } from 'ng2-charts';
import { IonicModule } from '@ionic/angular';
import { ComboChartComponent } from '../components/combo-chart/combo-chart.component';
import { PieChartComponentModule } from '../components/pie-chart/pie-chart.component.module';
// import { SwiperModule } from 'swiper/angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScrollingModule,
    NgChartsModule,
    PieChartComponentModule
    // SwiperModule
  ],
  declarations: [
    ListingUsageComponent,
    CardsPedagv2Component,
    CardsPedgComponent,
    DateSegmentsComponent,
    HorizontalBarChartComponent,
    ListingFinanceDepenseComponent,
    CardsFinanceComponent,
    ListingAdministrationComponent,
    StackedBarChartComponent,
    CardsAdminComponent,
    ListingAdminComponent,
    DonutChartComponent,
    ListingFinanceComponent,
    // PieChartComponent,
    ListingDiscountComponent,
    VerticalBarChartComponent,
    ListingAdmin2Component,
    TabSolutionComponent,
    DateFilterComponent,
    ListingFinanceAvoirsComponent,
    ListingRecouvrementsComponent,
    ComboChartComponent
  ],
  exports: [
    ListingUsageComponent,
    CardsPedagv2Component,
    CardsPedgComponent,
    DateSegmentsComponent,
    HorizontalBarChartComponent,
    ListingFinanceDepenseComponent,
    CardsFinanceComponent,
    ListingAdministrationComponent,
    StackedBarChartComponent,
    CardsAdminComponent,
    ListingAdminComponent,
    DonutChartComponent,
    ListingFinanceComponent,
    // PieChartComponent,
    ListingDiscountComponent,
    VerticalBarChartComponent,
    ListingAdmin2Component,
    TabSolutionComponent,
    DateFilterComponent,
    ListingFinanceAvoirsComponent,
    ListingRecouvrementsComponent,
    ComboChartComponent
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ParentModule {}
