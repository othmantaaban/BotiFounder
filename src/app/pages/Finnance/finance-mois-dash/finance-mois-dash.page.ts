import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ChartType } from 'chart.js';
// import { element } from 'protractor';
import { Subscription } from 'rxjs';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { FinanceService } from 'src/app/finance.service';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-finance-mois-dash',
  templateUrl: './finance-mois-dash.page.html',
  styleUrls: ['./finance-mois-dash.page.scss'],
})
export class FinanceMoisDashPage implements OnInit {

  loader_obj : any = {
    card_infos : false,
    ca_prevu : false,
    encaiss : false,
    retard : false,
    depense : false,
    bar_ca_encaiss: false
  }

  // bar ca encaiss variables

  public barChartData1 : any = [
    {
      data: [], 
      label: 'CA',
      backgroundColor:"#EE386E",
      type:"bar"
    },
    {
      data: [], 
      label: 'Encaissements',
      backgroundColor:"#2B2A64",
      type:"bar"
    },
  ];

  public barChartLabels1 : any = []

  public barChartType1 : ChartType = 'line';

  public barChartData2 : any = [
    {
      data: [], 
      label: 'CA',
      backgroundColor:"#EE386E",
      type:"bar"
    },
    {
      data: [], 
      label: 'Encaissements',
      backgroundColor:"#2B2A64",
      type:"bar"
    },
  ];

  public barChartLabels2 : any = []

  public barChartType2 : ChartType = 'line';

  public bar_title1 = ""
  public bar_title2 = ""

  // bar ca encaiss variables

  // CA prevus variable
  public cs_prevus : any = []
  public caCycleLabels : any = [];
  public caCycleData : any = [
    {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
  ];
  public caServiceLabels : any = [];
  public caServiceData : any = [
    {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
  ];

  // CA prevus variable


  // encaissements variables
  public encaiss : any = []
  public cycleLabels : any = [];
  public cycleData : any = [
    {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
  ];
  public serviceLabels : any = [];
  public serviceData : any = [
    {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
  ]
  
  public modeLabels = [];
  public modeData = [
    {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
  ];

  // encaissements variables

  // retard variables
  public retards : any = []
  public cycleRetLabels = [];
  public cycleRetData = [
    {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
  ];

  public serviceRetLabels = [];
  public serviceRetData = [
    {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
  ];

  public retardsList=[]

  // retard variables

  // depense variables
  public depensesCategLabels = []
  public depensesCategData = []
    
  public depensesPrestataireLabels = []
  public depensesPrestataireData = []
    
  public listDepenses = []

  depenses : any = [];

  // depense variables



    
  public itemsEncaissement=[]


  clickEventSubscription:Subscription;

  constructor(
    private financeService : FinanceService,
    private cdr: ChangeDetectorRef,
    private sharedService:SharedService, 
    private api : ApiService,
    private loadingController : LoadingController

  ) {
    this.clickEventSubscription= this.sharedService.getClickEvent().subscribe((elt)=>{
      if (elt.value == "mois"&&elt.tab=='fin') {
        this.callApi();
      }
    })
   }

  ionViewWillEnter() {
    this.callApi()
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

  // getRetardsMoisList : etat_impayes_parents

  async callApi(){ 
    this.loader()
    this.itemsEncaissement=[]
  
    let date = DateSegmentsComponent.dateValue !== undefined ? DateSegmentsComponent.dateValue : new Date().getMonth() + 1;

    this.itemsEncaissement = []
    this.financeService.getEncaissementCardsList(JSON.stringify({date: date, type: "mois"}))
    .subscribe(response => {
      
      response.forEach(element => {
          let item = {
            title: element.title,
            montant: element.result.montant,
            alias: element.note,
            unite: "MAD",
            count: element.result.countEleves
          }
          this.itemsEncaissement.push(item)
      });

      this.loader_obj.card_infos = true;

      this.loader_dissmis()

    })

    this.caServiceData = [];
    this.caServiceLabels = [];
    this.caCycleData = [];
    this.caCycleLabels = [];
    this.cs_prevus= []

    this.financeService.getCAList(date)
    .subscribe(response => {
      this.cs_prevus = response

      this.caServiceData = response.service.data;
      this.caServiceLabels = response.service.labels;

      this.caCycleData = response.cycle.data;
      this.caCycleLabels = response.cycle.labels;


      this.loader_obj.ca_prevu = true
      this.loader_dissmis()
    }) 
    
    this.cycleLabels = []
    this.cycleData = []

          
    this.modeLabels = []
    this.modeData = []

    
    this.serviceLabels = []
    this.serviceData = []

    this.encaiss = []

    this.api.get({period: date, type: "mois"}, "get_encaissements_data")
    .subscribe(response => {
      this.encaiss = response
      this.cycleLabels = response?.cycle?.labels
      this.cycleData = response?.cycle?.data

            
      this.modeLabels = response?.paiement?.labels
      this.modeData = response?.paiement?.data 

      this.serviceLabels = response?.service?.labels
      this.serviceData = response?.service?.data

      this.loader_obj.encaiss = true

      this.loader_dissmis()
    })

    this.cycleRetData = []
    this.cycleRetLabels = []
    
    this.serviceRetData = []
    this.serviceRetLabels = []

    this.retardsList = []

    this.retards = []

    this.financeService.getRetardsMoisList(date)
    .subscribe(response=>{

      this.retards = response

      this.cycleRetData = response.cycle.data
      this.cycleRetLabels = response.cycle.labels
      
      this.serviceRetData = response.service.data
      this.serviceRetLabels = response.service.labels

      this.retardsList = response.list.data

      this.loader_obj.retard = true

      this.loader_dissmis()
    })

    this.depenses = []
    this.depensesCategLabels = [];
    this.depensesCategData = [];

    this.depensesPrestataireLabels = [];
    this.depensesPrestataireData = [];

    this.listDepenses = [];

    this.api.get({period: date, type: "mois"}, "get_depenses_data")
    .subscribe(response => {
      this.depenses = response
      this.depensesCategLabels = response.category.labels
      this.depensesCategData = response.category.data

      this.depensesPrestataireLabels = response.prestataire.labels
      this.depensesPrestataireData = response.prestataire.data

      this.listDepenses = response.listDepense.list

      this.loader_obj.depense = true
      this.loader_dissmis()
    })


    this.api.get({period: date}, "bar_ca_encaissement")
    .subscribe(elt => {
      this.barChartData1 = elt?.data1
      this.barChartLabels1 = elt?.labels

      this.barChartData2 = elt?.data2
      this.barChartLabels2 = elt?.labels


      this.bar_title1 = elt.title1
      this.bar_title2 = elt.title1

      this.loader_obj.bar_ca_encaiss = true
      this.loader_dissmis()
    })

    

  }

   // Group By Function


  ngOnInit() {  
  }


  async loader_dissmis() {
    console.log(this.loader_obj);
    
    if(
      this.loader_obj.ca_prevu == true && 
      this.loader_obj.retard == true && 
      this.loader_obj.encaiss == true && 
      this.loader_obj.depense == true && 
      this.loader_obj.card_infos == true &&
      this.loader_obj.bar_ca_encaiss == true
    ) {
      const loading = await this.loadingController.getTop();
      console.log("cwfcewfwe");
      
      await loading.dismiss()
    }
  }

  async loader() {
    this.loader_obj = {
      card_infos : false,
      ca_prevu : false,
      encaiss : false,
      retard : false,
      depense : false,
      bar_ca_encaiss: false
    }
    const top = await this.loadingController.getTop()
    console.log(top)
    if(top == undefined) {
      const loading = await this.loadingController.create({
        spinner: null,
        message: '<h3>Loading Data, Please wait...</h3>',
        translucent: true,
        cssClass: 'custom-class custom-loading'
      });
  
      await loading.present();
    }

  }
}
