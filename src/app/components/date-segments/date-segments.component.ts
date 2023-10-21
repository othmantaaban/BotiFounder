import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSegment, NavController } from '@ionic/angular';
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

  public selected=0

  constructor(
    private financeService : FinanceService,
    private sharedService:SharedService,
    private router: Router,
    private navCtrl : NavController
  ) { 
  }
  


  clickMe(){
    this.sharedService.sendClickEvent(this.selectedValue);
  }

  public selectedIndex=0

  rightDate(){

    if(this.selected<this.itemsList.length-1){
      // this.selectedIndex=GlobalConstantesComponent.dateValue
      this.selected+=1
      console.log(this.selected);
      console.log(this.itemsList);
      
      
      // DateSegmentsComponent.dateValue=this.itemsList[this.selectedIndex].anglais
      // GlobalConstantesComponent.dateValue=this.itemsList[this.selectedIndex].
      // GlobalConstantesComponent.dateValue=this.selectedIndex
      // this.selectedDate=this.itemsList[GlobalConstantesComponent.dateValue].francais
      DateSegmentsComponent.dateValue=this.itemsList[this.selected].anglais
      // GlobalConstantesComponent.dateValue=this.selectedIndex
    } else if (this.selectedValue == "mois") {
      this.selected = 0
      console.log(this.selected);

      DateSegmentsComponent.dateValue=this.itemsList[this.selected].anglais
    }
   this.sharedService.sendClickEvent({value : this.selectedValue, selectedDate: this.selectedDate});
  }

  leftDate(){
    
    if(this.selected!=0){
      // this.selectedIndex=GlobalConstantesComponent.dateValue
      this.selected-=1
      // DateSegmentsComponent.dateValue=this.itemsList[this.selectedIndex].anglais
      // GlobalConstantesComponent.dateValue=this.selectedIndex
      // this.selectedDate=this.itemsList[GlobalConstantesComponent.dateValue].francais
      DateSegmentsComponent.dateValue=this.itemsList[this.selected].anglais
    // this.itemsList[this.selectedIndex].anglais

    } else if (this.selectedValue == "mois") {
      this.selected = this.itemsList.length - 1
      console.log(this.selected);
      DateSegmentsComponent.dateValue=this.itemsList[this.selected].anglais
    }
    
    this.sharedService.sendClickEvent({value : this.selectedValue, selectedDate: this.selectedDate});
  }

  groupArrayOfObjects = (list, key) => {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };


  onDisplay(item: any){
    DateSegmentsComponent.dateValue=item
  }

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

  segmentChanged(ev: any) {
    // ev.preventDefault();
    console.log(ev.detail.value);
    this.selectedValue = ev.detail.value;
    console.log(this.itemsList);
    this.initialize();
    console.log(this.itemsList);

    
    DateSegmentsComponent.dateValue = undefined
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
    console.log(this.selectedValue);
    
    
    this.initialize();
  }

  ngOnDestroy() {
    this.selectedValue = "mois"
    console.log(this.selectedValue);
    
  }

  initialize() {
    // this.seg.value = "jour"f
    const c = new Date();
    let prior = new Date().setDate(c.getDate() - 30);
    let k=30
    let daysList=[]
    while(k>=0){
      let prior = new Date().setDate(c.getDate() - k);
      const sf = new Date(prior).toLocaleDateString('fr-FR',{year: 'numeric', month: 'long', day: 'numeric' });
      const s = new Date(prior).toLocaleDateString('fr-FR');
      let splitedDate=s.split("/")
      daysList.push({francais:sf,anglais:splitedDate[2]+"-"+splitedDate[1]+"-"+splitedDate[0]})
      k-=1
    }
    this.jourList=daysList


    // Define a list of years
    let j=5
    while(j>=0){
      let currentYear=new Date().getFullYear()+1
      this.anneeList.push({francais:""+(currentYear-j),anglais:""+(currentYear-j)})
      j-=1
    }

    // Define list of months
    let m=0
    let suivi=0
    // const months = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8];
    const months = [10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const monthsDict = {10:9, 9:10, 8:11, 7:12, 6:1, 5:2, 4:3, 3:4, 2:5, 1:6, 0:7};
    // const mois = ["Septembre", "Octobre", "Novembre", "Decembre","Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août"];
    
    const mois = ["Octobre", "Novembre", "Decembre","Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre"];
    // const mois = ["Octobre", "Novembre", "Decembre","Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Septembre"];
    let currentMonth : number = new Date().getMonth() + 1
    
    // const indexOfMonth : boolean = months.indexOf((elt: any) => { return +elt === +currentMonth})
    const indexOfMonth = months.indexOf(currentMonth)
    months.splice(indexOfMonth, 1)
    let currentMois = mois[indexOfMonth]
    mois.splice(indexOfMonth, 1)
    months.push(currentMonth)
    mois.push(currentMois)
    

    for(let i=0;i<mois.length;i++){
        this.moisList.push({francais:mois[i],anglais:months[i]})
    }


 

    
    // this.selectedValue=this.listPaths[parseInt(this.active)].value
    // this.itemsList=this.jourList.reverse()


    if(this.selectedValue==="jour"){
    this.itemsList=this.jourList.reverse()
    }else if(this.selectedValue=== "mois"){
      this.itemsList=this.moisList.reverse()
    }else if(this.selectedValue=== "annee"){
    this.itemsList=this.anneeList.reverse()
    }
    // GlobalConstantesComponent.dateValue = this.itemsList[0].francais;
    
    // if(this.selectedValue==="jour"){
    // this.itemsList=this.jourList.reverse()
    // }else if(this.selectedValue==="mois"){
    // this.itemsList=this.moisList
    // }else if(this.selectedValue==="annee"){
    // this.itemsList=this.anneeList.reverse()
    // }

    if(this.selectedValue==="mois"){
      // GlobalConstantesComponent.dateValue=parseInt(Object.keys(monthsDict).find(key => monthsDict[key] === (currentMonth+1))) 
    }
    // else{
    //     GlobalConstantesComponent.dateValue=0
    //   }
    // this.selectedDate=this.itemsList[GlobalConstantesComponent.dateValue].francais
    // DateSegmentsComponent.dateValue=this.itemsList[GlobalConstantesComponent.dateValue].anglais
    // this.sharedService.sendClickEvent();

    
  }
}
