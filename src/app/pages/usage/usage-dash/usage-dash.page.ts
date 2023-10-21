import { Component, OnInit, ViewChild } from '@angular/core';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';

@Component({
  selector: 'app-usage-dash',
  templateUrl: './usage-dash.page.html',
  styleUrls: ['./usage-dash.page.scss'],
})
export class UsageDashPage implements OnInit {
  @ViewChild("datasegment") datasegment : DateSegmentsComponent
 

  pathList = [
    // {vue:"Jour",path:"/tabs/usage-jour-dash",value:"jour"},
    // { vue: "Mois", path: "/tabs/usage-jour-dash", value: "mois" },
  ]

  constructor() { }

  ngOnInit() {
  }

  ionViewWillLeave() {
    this.datasegment.ngOnDestroy()
  }


}
