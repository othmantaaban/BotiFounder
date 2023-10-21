import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { FinanceService } from 'src/app/finance.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-finance-annee-dash',
  templateUrl: './finance-annee-dash.page.html',
  styleUrls: ['./finance-annee-dash.page.scss'],
})
export class FinanceAnneeDashPage implements OnInit {

  ionViewWillEnter() {
    this.callApi()

    console.log(this.barChartData1)
  }


  public itemsEncaissement=[
  
  ]
  
  //combochart1
  public barChartLabels1 : any = [];
  public barChartType1 : ChartType = 'line';
  public barChartData1 : any = [
        {data: [], label: 'CA',backgroundColor:"#EE386E",type:"bar"},
        {data: [], label: 'Encaissements',backgroundColor:"#2B2A64",type:"bar"},
        {data: [], label: 'Retards',backgroundColor:"#F7643B",type:"line"},
      ];
      

  //combochart2
  public barChartLabels2 : any = [];
  public barChartType2 : ChartType = 'line';
  public barChartData2  : any= [
            {data: [], label: 'Trésorerie',backgroundColor:"#EE386E",type:"line"},
            {data: [], label: 'Encaissement',backgroundColor:"#2B2A64",type:"bar"},
            {data: [], label: 'Dépenses',backgroundColor:"#F7643B",type:"bar"},
          ];

  //combochart3
  public barChartLabels3 : any = [];
  public barChartType3 : ChartType = 'line';
  public barChartData3 : any= [
              {data: [], label: 'Encaissement Cumulé',backgroundColor:"#EE386E",type:"line"},
              {data: [], label: 'Encaissement',backgroundColor:"#2B2A64",type:"bar"},
      ];

  //combochart4
  public barChartLabels4 : any = [];
  public barChartType4 : ChartType = 'line';
  public barChartData4 : any= [
                {data: [], label: 'Retards Cumulés',backgroundColor:"#EE386E",type:"line"},
                {data: [], label: 'Retards',backgroundColor:"#2B2A64",type:"bar"},
        ];
  pathList=[
          {vue:"Jour",path:"/tabs/finance-jour-dash",value:"jour"},
          {vue:"Mois",path:"/tabs/finance-mois-dash",value:"mois"},
          // {vue:"Annee",path:"/tabs/finance-annee-dash",value:"annee"},
        ]


  // Group By Function
  groupArrayOfObjects = (list, key) => {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  numFormatter(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    }else if(num > 1000000){
        return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
  }
  clickEventSubscription:Subscription;
  constructor(
    private financeService : FinanceService,private sharedService:SharedService
  ) {
    this.clickEventSubscription= this.sharedService.getClickEvent().subscribe((elt)=>{
      console.log(elt);
      
      if(elt.value == "annee") { 
        this.callApi();
      }
    })
   }

   callApi(){
    console.log(DateSegmentsComponent.dateValue);
    
    let date=DateSegmentsComponent.dateValue !== undefined ? DateSegmentsComponent.dateValue : new Date().getFullYear() + 1 
    console.log(date);
    
    this.financeService.getEncaissementsAnnuelList(date)
    .subscribe(response => {
      const data=response.result.slice(0,8)
      let labels = []
      let datas = []
      let lastIndex = 0
      data.forEach(element => {
        let index = labels.indexOf(element.Month)

        if(index == -1) {
          labels.push(element.Month)
          datas.push(0)
          lastIndex = datas.length - 1
        }

        datas[index != -1 ? index: lastIndex] += element.Montant
      });

      this.barChartLabels1 = labels
      this.barChartLabels2 = labels
      this.barChartLabels3 = labels
      this.barChartData1[1].data= datas
      this.barChartData2[1].data= datas
      this.barChartData3[1].data= datas
      this.barChartData3[1].data.reduce((prev, current) => {
        this.barChartData3[0].data.push(+current + +prev)
        return +current + +prev
      }, 0)
    })

    this.financeService.getCAList(date)
    .subscribe(response => {
      const data = response.result
      console.log(data);
      
      data.forEach(element => {
        
      });

      // Cycle prep
      let dataEnc=data.map((d) => ({Mois:d.Month,Montant:d.Montant}));
      let tmpTable = this.groupArrayOfObjects(
        dataEnc,
        "Mois"
      );
      // console.log(dataEnc)
      const dictEnc = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total=0
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v =>{total+=parseFloat(v.Montant)})
        dictEnc.push({
          Mois: key1,
          total: total,
        });
        total=0
      }
      let tmpData=[]
      let tmpLabels=[]
      dictEnc.map((d)=>{
        tmpLabels.push(d.Mois)
        tmpData.push(d.total)
      })
      this.barChartData1[0].data=tmpData
    })

    this.financeService.getRetardsAnnuelList(date).subscribe(response => {
      const data=response.result

      data.forEach(element => {
            
      });

      // // Cycle prep
      // let dataEnc=data.map((d) => ({Mois:d.Month,Montant:d.Montant}));
      // let tmpTable = this.groupArrayOfObjects(
      //   dataEnc,
      //   "Mois"
      // );
      // const dictEnc = [];
      // for (const [key1, value1] of Object.entries(tmpTable)) {
      //   let total=0
      //   // console.log("here: ",Object.keys(value1).length)
      //   Object.values(value1).map(v =>{total+=parseFloat(v.Montant)})
      //   dictEnc.push({
      //     Mois: key1,
      //     total: total,
      //   });
      //   total=0
      // }
      // let tmpData=[]
      // let tmpLabels=[]
      // dictEnc.map((d)=>{
      //   tmpLabels.push(d.Mois)
      //   tmpData.push(d.total)
      // })
      // this.barChartData1[2].data=tmpData
      // // Encaissement cumulé
      // this.barChartData4[1].data=tmpData
      // this.barChartLabels4=tmpLabels
      // let prev=0
      // for(let i=0;i<this.barChartData4[1].data.length;i++){
      //   this.barChartData4[0].data.push(this.barChartData4[1].data[i]+prev)
      //   prev=this.barChartData4[1].data[i]+prev
      //   // console.log(prev)
      // }
    })

    this.financeService.getDepensesAnnuelList(date).subscribe(response => {
      const data=response.result
      // Cycle prep
      let dataEnc=data.map((d) => ({Mois:d.Month,Montant:d.Montant}));
      let tmpTable = this.groupArrayOfObjects(
        dataEnc,
        "Mois"
      );
      // console.log(dataEnc)
      const dictEnc = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total=0
        Object.values(value1).map(v =>{total+=parseFloat(v.Montant)})
        dictEnc.push({
          Mois: key1,
          total: total,
        });
        total=0
      }
      let tmpData=[]
      let tmpLabels=[]
      dictEnc.map((d)=>{
        // console.log(d.Mois)
        this.barChartLabels2.push(d.Mois)
        tmpData.push(-d.total)
      })
      // this.barChartLabels2=tmpData
      this.barChartData2[2].data=tmpData
      // console.log(this.barChartLabels2)
      for(let i=0;i<this.barChartData2[2].data.length;i++){
        this.barChartData2[0].data.push(this.barChartData2[1].data[i]-this.barChartData2[2].data[i])
        // console.log(this.barChartData2[1].data[i]-this.barChartData2[2].data[i])
      }
      // console.log(this.barChartData2[0].data)
    })

    // this.financeService.getEncaissementCardsAnneeList(date).subscribe(response => {
    //       const data=response
    //       console.log("cards data: ",data)
    //       // Cycle prep
    //       this.itemsEncaissement=[] //vider la liste
    //       data.map((c,index)=>{
    //         if(c.result.length!=0){
    //           // console.log(c.result[0])
    //           this.itemsEncaissement.push({alias:"élèves",title:c.title,montant:this.numFormatter(parseInt(c.result[0].Montant)),count:c.result[0].nbEleves,unite:"MAD"})
    //         }
    //       })
    //      // console.log("cards data: ",this.itemsEncaissement)
    // });

  }

  ngOnInit() {
    this.callApi()

    
    
  }

}
