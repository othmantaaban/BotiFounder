import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, IonSegment, ModalController, NavController } from '@ionic/angular';
// import { ChartData } from 'chart.js';
import {FinanceService} from 'src/app/finance.service';
import { SharedService } from 'src/app/services/shared.service';
import { GlobalConstantesComponent } from '../global-constantes/global-constantes.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-date-segments',
  templateUrl: './date-segments.component.html',
  styleUrls: ['./date-segments.component.scss'],
})

export class DateSegmentsComponent implements OnInit {


  
  @ViewChild("datetime") datetime : IonDatetime

  // @ts-ignore
  @ViewChild("segment") seg : IonSegment

  @Input('path') path:string = '';
  public Select:string = '';
  
  public itemsList: any=[];
  @Input('listPaths') listPaths:any[] = [];
  // @ts-ignore
  public static dateValue:any;
  
  @Input('selectedValue') selectedValue:string = "mois";
  // @ts-ignore
  public selectedDate:string;

  // @ts-ignore
  @Input('defaultValue') defaultValue:string;
  // @ts-ignore
  @Input('active') active:any;
  
  @Input('tab') tab:any;
  

  public selected=0

  displayVal : string = "" 

  constructor(
    private financeService : FinanceService,
    private sharedService:SharedService,
    private router: Router,
    private navCtrl : NavController,
    private modalCtrl : ModalController
  ) {
  }
  


  clickMe(){
    this.sharedService.sendClickEvent(this.selectedValue);
  }

  public selectedIndex=0

  leftDate(){
    let date : Date | number = null
    console.log("enter");
    
    if(this.selectedValue==="jour"){
      console.log(DateSegmentsComponent.dateValue);
      
      date = new Date(DateSegmentsComponent.dateValue)
      date.setDate(date.getDate() - 1)

      // this.formatDate(date)

    } else if(this.selectedValue==="mois") {
      let v = DateSegmentsComponent.dateValue - 1

      date = v == 0 ? 12: v
      console.log(date);
      
    }
    this.formatDate(date)


  this.sharedService.sendClickEvent({value : this.selectedValue,tab: this.tab , selectedDate: this.selectedDate});

}

  rightDate(){
    console.log("enter");
    let date : Date | number = null
    
    if(this.selectedValue==="jour"){
      date = new Date(DateSegmentsComponent.dateValue)
      date.setDate(date.getDate() + 1)

    } else if(this.selectedValue==="mois") {
      console.log(DateSegmentsComponent.dateValue);
      
      date = +DateSegmentsComponent.dateValue + 1
    }
    this.formatDate(date)
    
    this.sharedService.sendClickEvent({value : this.selectedValue,tab: this.tab , selectedDate: this.selectedDate});
  }

  groupArrayOfObjects = (list, key) => {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };


  // onDisplay(item: any){
  //   DateSegmentsComponent.dateValue=item
  // }

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

  public moisList=[]
  public jourList=[]
  public anneeList=[]

  public dateTimeType = "month"

  segmentChanged(ev: any) {
    // ev.preventDefault();
    this.selectedValue = ev.detail.value;

    DateSegmentsComponent.dateValue = undefined

    this.dateTimeType = this.selectedValue == "jour" ? "date": "month"
    this.initialize();

    
    this.selected = 0
    // this.sharedService.sendClickEvent(this.selectedValue);
    this.navCtrl.navigateRoot(`${this.path}/${ev.detail.value}`)
  }

  test(ev: any) {
    ev.preventDefault();
  }

  sousSegmentChanged(ev: any) {
  }

  numFormatter(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    }else if(num > 1000000){
        return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
  }

  

   days = (date_1, date_2) =>{
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
}

  get getStaticDate() {
    return GlobalConstantesComponent.dateValue;
  }

  ngOnInit() {
    // console.log(this.router.getCurrentNavigation().finalUrl.toString());
    
    // this.selectedValue = this.router.getCurrentNavigation().finalUrl.toString().split("/").pop()
    this.selectedValue = "mois"
    
    
    this.initialize();
  }

  ngOnDestroy() {
    this.selectedValue = "mois"
    
  }

  initialize() {
    // this.selectedValue = "jour"

    if(this.selectedValue==="jour"){
      // this.itemsList=this.jourList.reverse()
      let now = Date.now()

      this.formatDate(now)
      
    }else if(this.selectedValue=== "mois"){
      let now = new Date().getMonth() + 1
      console.log(now);
      
      this.formatDate(now)
    }else if(this.selectedValue=== "annee"){
    this.itemsList=this.anneeList.reverse()
    }
    
  }


  formatDate(date) {
    console.log(this.selectedValue);
    
    if(this.selectedValue==="jour"){
      let selectedDate = new Date(date)

      // let x =new Intl.Intl.
      let dateenFr = new Intl.DateTimeFormat("fr", 
        // @ts-ignore
        { dateStyle: 'full'}
      )
      let inArr = ["day", "month", "year"]
      const dateFr = dateenFr.formatToParts(selectedDate).filter(elt => {
        return inArr.includes(elt.type) ? elt.value : false
      }).map(elt => {
        return elt.value
      }).join(" ")
            
      let year = selectedDate.getFullYear()
      let mois : number | string = selectedDate.getMonth() + 1 
      let day : number | string = selectedDate.getDate() 
      // @ts-ignore
      mois = `${mois}`.length == 1 ? `0${mois}` : mois
      // @ts-ignore
      day = `${day}`.length == 1 ? `0${day}` : day
      
      console.log(day);
      console.log(mois);
      console.log(year);
      
      console.log(`${year}-${mois}-${day}`);
      
      DateSegmentsComponent.dateValue = `${year}-${mois}-${day}`
      this.defaultValue = `${year}-${mois}-${day}`
      this.displayVal = dateFr;

    }else if(this.selectedValue=== "mois"){
      // this.itemsList=this.moisList.reverse()
      DateSegmentsComponent.dateValue = `${date}`;
      // this.defaultValue = `${date}`
      this.defaultValue = ""
      

      let d =  new Date()
      d.setMonth(date - 1);

      // @ts-ignore
      this.displayVal = d.toLocaleString('fr', {month: 'long'});

    }else if(this.selectedValue=== "annee"){
      this.itemsList=this.anneeList.reverse()
    }
  }


  async cancelDateTime() {
    console.log("cancel");
    let modal = await this.modalCtrl.getTop()
    await this.datetime.cancel()
    await modal.dismiss()
  }

  cancel(event) {
    console.log(event);    
  }

  async confirmDateTime() {
    console.log(event);
    
    let modal = await this.modalCtrl.getTop()

    await this.datetime.confirm()
    
    await modal.dismiss()

  }

  confirm(event) { 
    let d : number | Date = null
    if(this.selectedValue === "jour") {
      d = new Date(event.target.value)
      console.log(d);
      
    } else {
      d =  new Date(event.target.value).getMonth() + 1
      // console.log(d);
      this.defaultValue = ""
    }
    this.formatDate(d)  

    this.sharedService.sendClickEvent({value : this.selectedValue,tab: this.tab , selectedDate: this.selectedDate});
  }
}
