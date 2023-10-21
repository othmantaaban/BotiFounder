import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  @ViewChild("datasegment") datesegment : DateSegmentsComponent


  public  pathList=[
    {vue:'Jour',path:'/tabs/admin',value:'jour'},
    {vue:'Mois',path:'/tabs/admin',value:'mois'},
    // {vue:'Annee',path:'/tabs/admin',value:'annee'}
  ];

  active 
  constructor(
    private sharedService: SharedService,
    private navigation : NavController,
    private route : Router,
    ) {
      this.sharedService.getClickEvent().subscribe((x)=>{
        let checkIsActive = route.isActive("tabs/finance-dash/jour", true) || route.isActive("tabs/finance-dash/mois", true) || route.isActive("tabs/finance-dash/annee", true)
        
        if(checkIsActive) {
          console.log(this.active);
            switch (this.active) {
              case 'jour':
                navigation.navigateRoot("tabs/admin/jour")
                break;
              case 'mois':
                navigation.navigateRoot("tabs/admin/mois")
                break;
              case 'annee':
                navigation.navigateRoot("tabs/admin/annee")
                break;
              default:
                break;
            }
        }
        // console.log(this.moisRef);
        // console.log(this.anneeRef);
    });
  }

  ngOnInit() {
  }

  ionViewWillLeave() {
    
    this.datesegment.ngOnDestroy()
  }


}
