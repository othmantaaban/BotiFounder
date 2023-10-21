import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-pedag-dash',
  templateUrl: './pedag-dash.page.html',
  styleUrls: ['./pedag-dash.page.scss'],
})
export class PedagDashPage implements OnInit {
  @ViewChild("datesegment") datesegment : DateSegmentsComponent

  public pathList=[
    {vue:'Jour', path:'/tabs/admin-jour-dash',value:'jour'},
    {vue:'Mois', path:'/tabs/admin-mois-dash',value:'mois'},
    // {vue:'Annee',path:'/tabs/admin-annee-dash',value:'annee'}
  ];

  active

  constructor(
    private sharedService: SharedService,
    private navigation : NavController,
    private route : Router
    ) {
      this.sharedService.getClickEvent().subscribe((x)=>{
        let checkIsActive = route.isActive("tabs/finance-dash/jour", true) || route.isActive("tabs/finance-dash/mois", true);
        
        if(checkIsActive) {
          this.active = x !== null ? x : this.active;
          console.log(this.active);
            switch (this.active) {
              case 'jour':
                navigation.navigateRoot("tabs/pedag-dash/jour")
                break;
              case 'mois':
                navigation.navigateRoot("tabs/pedag-dash/mois")
                break;
              default:
                break;
            }
        }
    });
  }
  ngOnInit() {
  }

  ionViewWillLeave() {
    this.datesegment.ngOnDestroy()
  }

}
