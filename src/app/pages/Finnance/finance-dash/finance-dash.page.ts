import { ChangeDetectorRef, Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { FinanceService } from 'src/app/finance.service';
import { SharedService } from 'src/app/services/shared.service';
import { FinanceJourDashPage } from '../finance-jour-dash/finance-jour-dash.page';
import { FinanceJourDashPageModule } from '../finance-jour-dash/finance-jour-dash.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finance-dash',
  templateUrl: './finance-dash.page.html',
  styleUrls: ['./finance-dash.page.scss'],
})
export class FinanceDashPage implements OnInit {
  // @ViewChild("jour") jourRef: any;
  // @ViewChild("mois") moisRef: any;
  // @ViewChild("annes") anneeRef: any;
  @ViewChild('datesegment') datesegment : DateSegmentsComponent;

  public pathList=[
    {vue:'Jour', path:'/tabs/admin-jour-dash',value:'jour'},
    {vue:'Mois', path:'/tabs/admin-mois-dash',value:'mois'},
    // {vue:'Annee',path:'/tabs/admin-annee-dash',value:'annee'}
  ];

  public active : string = "jour";

// : ComponentRef
  constructor(
    // private segmentCmp : DateSegmentsComponent, 
    private sharedService: SharedService,
    private navigation : NavController,
    private route : Router
    ) {
      this.sharedService.getClickEvent().subscribe((x)=>{
        let checkIsActive = route.isActive("tabs/finance-dash/jour", true) || route.isActive("tabs/finance-dash/mois", true) || route.isActive("tabs/finance-dash/annee", true)
        
        if(checkIsActive) {
          this.active = x !== null ? x : this.active;
          console.log(this.active);
            switch (this.active) {
              case 'jour':
                navigation.navigateRoot("tabs/finance-dash/jour")
                break;
              case 'mois':
                navigation.navigateRoot("tabs/finance-dash/mois")
                break;
              case 'annee':
                navigation.navigateRoot("tabs/finance-dash/annee")
                break;
              default:
                break;
            }
        }
        // console.log(this.moisRef);
        // console.log(this.anneeRef);
    });
  }

  ngOnInit(): void {
    // this.jourRef.callApi();
  }

  ionViewWillEnter() {
    // this.jourRef.callApi();
  }

  ionViewWillLeave() {
    // this.segmentCmp.ngOnDestroy()
    this.datesegment.ngOnDestroy()
  }

  

}

