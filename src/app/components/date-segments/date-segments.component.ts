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
  public static dateValue:Date | number | null;

  @Input('selectedValue') selectedValue:string = "mois";
  // @ts-ignore
  public selectedDate:string;

  // @ts-ignore
  @Input('defaultValue') defaultValue:string;
  // @ts-ignore
  @Input('active') active:any;

  @Input('tab') tab:any;


  public selected=0

  displayVal : Date | string = new Date()

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
  };

  public moisList=[]
  public jourList=[]
  public anneeList=[]

  public dateTimeType = "month"
  formatType = "MMMM"
  segmentChanged(ev: any) {
    // ev.preventDefault();
    this.selectedValue = ev.detail.value;

    DateSegmentsComponent.dateValue = undefined

    this.dateTimeType = this.selectedValue == "jour" ? "date": "month"
    this.formatType = this.selectedValue == "jour" ? "d MMMM YYYY" : "MMMM"
    this.initialize();
    // 
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
    let tab = this.router.url.split("/")[3];

    this.selectedValue = tab
    this.dateTimeType = tab == "jour" ? "date": "month"
    this.formatType = tab == "jour" ? "d MMMM YYYY" : "MMMM"

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


  // formatDate(date) {
  //   console.log(this.selectedValue);

  //   if(this.selectedValue==="jour"){
  //     let selectedDate = new Date(date)

  //     // let x =new Intl.Intl.
  //     let dateenFr = new Intl.DateTimeFormat("fr",
  //       // @ts-ignore
  //       { dateStyle: 'full'}
  //     )
  //     // let inArr = ["day", "month", "year"]
  //     // const dateFr = dateenFr.formatToParts(selectedDate).filter(elt => {
  //     //   return inArr.includes(elt.type) ? elt.value : false
  //     // }).map(elt => {
  //     //   return elt.value
  //     // }).join(" ")

  //     let year = selectedDate.getFullYear()
  //     let mois : number | string = selectedDate.getMonth() + 1
  //     let day : number | string = selectedDate.getDate()
  //     // @ts-ignore
  //     mois = `${mois}`.length == 1 ? `0${mois}` : mois
  //     // @ts-ignore
  //     day = `${day}`.length == 1 ? `0${day}` : day

  //     console.log(day);
  //     console.log(mois);
  //     console.log(year);

  //     console.log(`${year}-${mois}-${day}`);

  //     DateSegmentsComponent.dateValue = `${year}-${mois}-${day}`
  //     this.defaultValue = `${year}-${mois}-${day}`
  //     // this.displayVal = dateFr;
  //     // this.displayVal = 

  //   }else if(this.selectedValue=== "mois"){
  //     // this.itemsList=this.moisList.reverse()
  //     DateSegmentsComponent.dateValue = `${date}`;
  //     // this.defaultValue = `${date}`
  //     this.defaultValue = ""


  //     let d =  new Date()
  //     d.setMonth(date - 1);

  //     // @ts-ignore
  //     this.displayVal = d.toLocaleString('fr', {month: 'long'});

  //   }else if(this.selectedValue=== "annee"){
  //     this.itemsList=this.anneeList.reverse()
  //   }
  // }
  // leftDate(){
  //   let date : Date | number = null
  //   console.log("enter");

  //   if(this.selectedValue==="jour"){
  //     console.log(DateSegmentsComponent.dateValue);

  //     date = new Date(DateSegmentsComponent.dateValue)
  //     date.setDate(date.getDate() - 1)

  //     // this.formatDate(date)

  //   } else if(this.selectedValue==="mois") {
  //     let tab = this.router.url.split("/")[2];
  //     let condition = true
  //     if(tab == "finance-dash") {
  //       let checkDate = new Date()
  //       if(DateSegmentsComponent.dateValue != undefined) {
  //         checkDate.setMonth(DateSegmentsComponent.dateValue)
  //       }
  //       console.log(checkDate.getMonth());
  //       condition = checkDate.getMonth() != 9
  //     }

  //     if(condition) {
  //       let v = DateSegmentsComponent.dateValue == -1 ? 8 : DateSegmentsComponent.dateValue -1
  //       date = v == 0 ? 12: v
  //       console.log(date);
        
  //     } else{
  //       DateSegmentsComponent.dateValue = -1
  //       this.displayVal = "Frais Annuel"
  //       date = null
  //     }
  //     console.log("hello");
      

  //   }
  //   console.log(date);
    
  //   if(date) {
  //     this.formatDate(date)
  //   }


  // this.sharedService.sendClickEvent({value : this.selectedValue,tab: this.tab , selectedDate: this.selectedDate});

  // }

  // rightDate(){
  //   console.log("enter");
  //   let date : Date | number = null

  //   if(this.selectedValue==="jour"){
  //     date = new Date(DateSegmentsComponent.dateValue)
  //     date.setDate(date.getDate() + 1)

  //   } else if(this.selectedValue==="mois") {
  //     console.log(DateSegmentsComponent.dateValue);
  //     let checkDate = new Date()
  //     if(DateSegmentsComponent.dateValue != undefined) {
  //       checkDate.setMonth(DateSegmentsComponent.dateValue)
  //     }
  //     console.log(checkDate.getMonth());
  //     // checkDate.setMonth(DateSegmentsComponent.dateValue)

  //     if(checkDate.getMonth() != 8) {
  //       date = DateSegmentsComponent.dateValue == -1 ? 9 : +DateSegmentsComponent.dateValue + 1
  //       // date = v == 0 ? 12: v
  //       console.log(date);
  //     } else{
  //       DateSegmentsComponent.dateValue = -1
  //       this.displayVal = "Frais Annuel"
  //       date = null
  //     }
  //     // console.log(DateSegmentsComponent.dateValue);

  //     // date = +DateSegmentsComponent.dateValue + 1
  //   }

  //   if(date) {
  //     this.formatDate(date)
  //   }

  //   this.sharedService.sendClickEvent({value : this.selectedValue,tab: this.tab , selectedDate: this.selectedDate});
  // }

  leftDate() {
    switch (this.selectedValue) {
      case "jour":
        let dateJ : Date = DateSegmentsComponent.dateValue ? new Date(DateSegmentsComponent.dateValue) : new Date();
        dateJ.setDate(dateJ.getDate() - 1)
        DateSegmentsComponent.dateValue = dateJ
        console.log(dateJ);
        this.displayVal = dateJ;
        this.formatType = "d MMMM YYYY"
        break;
    
      default:
        
        
        let dateM : Date = DateSegmentsComponent.dateValue ? new Date(DateSegmentsComponent.dateValue) : new Date();
        if(DateSegmentsComponent.dateValue != 1) {
          dateM.setDate(1)
        }
        let tab = this.router.url.split("/")[2];
        let condition = true
        if(tab == "finance-dash" && DateSegmentsComponent.dateValue != -1) {
          let checkDate = new Date(dateM)
          checkDate.setMonth(dateM.getMonth() - 1);
          condition = checkDate.getMonth() != 7        
        }

        
        if(condition) {
          if(DateSegmentsComponent.dateValue == -1) {
            dateM.setMonth(7)
          } else {
            dateM.setMonth(dateM.getMonth() - 1);
          }
          DateSegmentsComponent.dateValue = dateM
          this.displayVal = dateM;
          this.formatType = "MMMM"
        } else{
          
          DateSegmentsComponent.dateValue = -1
          this.displayVal = "Frais Annuel"
          this.formatType = null
        }
        break;
    }
    let tab = this.router.url.split("/")[2];
    this.sharedService.sendClickEvent({ tab: tab, value: this.selectedValue });
  }

  rightDate() {
    switch (this.selectedValue) {
      case "jour":
        let dateJ : Date = DateSegmentsComponent.dateValue ? new Date(DateSegmentsComponent.dateValue) : new Date();
        dateJ.setDate(dateJ.getDate() + 1)
        DateSegmentsComponent.dateValue = dateJ
        this.displayVal = dateJ;
        this.formatType = "d MMMM YYYY"
        break;
    
      default:
        let dateM : Date  = DateSegmentsComponent.dateValue ? new Date(DateSegmentsComponent.dateValue) : new Date();
        if(DateSegmentsComponent.dateValue != 1) {
          dateM.setDate(1)
        }
        let tab = this.router.url.split("/")[2];
        let condition = true
        if(tab == "finance-dash" && DateSegmentsComponent.dateValue != -1) {
          let checkDate = new Date(dateM)
          checkDate.setMonth(dateM.getMonth() + 1);
          console.log(checkDate.getMonth());
          
          condition = checkDate.getMonth() != 8
          console.log(condition);
          
        }

        
        if(condition || DateSegmentsComponent.dateValue == -1) {
          if(DateSegmentsComponent.dateValue == -1) {
            dateM.setMonth(8)
          } else {
            dateM.setMonth(dateM.getMonth() + 1);
          }
          DateSegmentsComponent.dateValue = dateM
          this.displayVal = dateM;
          this.formatType = "MMMM"
        } else{
          DateSegmentsComponent.dateValue = -1

          this.displayVal = "Frais Annuel"
          this.formatType = null
        }
        break;
    }
    
    console.log(this.displayVal);
    console.log(DateSegmentsComponent.dateValue);
    
    let tab = this.router.url.split("/")[2];
    this.sharedService.sendClickEvent({ tab: tab, value: this.selectedValue });

  }

  formatDate(date) {
    console.log(this.selectedValue);
    switch (this.selectedValue) {
      case 'jour':
        this.displayVal = new Date(date)
        // DateSegmentsComponent.dateValue = this.displayVal.toDateString();
        console.log(DateSegmentsComponent.dateValue);
        console.log(this.displayVal);
        

        

        break;
      case 'annee':

        break;
    
      default:
        
        break;
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
