import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabButton, IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-finance-tabs',
  templateUrl: './finance-tabs.page.html',
  styleUrls: ['./finance-tabs.page.scss'],
})
export class FinanceTabsPage implements OnInit {
  @ViewChild('financetabs', { static: false }) tabs: IonTabs;
  public selectedTab:string;
  public itemsList:string[];

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: false,
    centeredSlides: true,
    slidesPerView: 3,
    pagination:false,
    // spaceBetween: 20,
    // autoplay: true
  };
  
  moisList=["Janvier","Février","Mars","Avril","Mai"]
  jourList=["Avant Hier","Hier","Aujourd'hui"]
  anneeList=["2018","2019","2020","2021","2022"]
  constructor() { }

  ngOnInit() {
  }

  doSomething(){
    this.selectedTab = this.tabs.getSelected();
    this.itemsList=[]
    if(this.selectedTab==="jour"){
      this.itemsList=this.jourList
    }else if(this.selectedTab==="mois"){
      this.itemsList=this.moisList
    }else{
      this.itemsList=this.anneeList
    }
    console.log("you clicked me !!!", this.selectedTab)
  }

}
