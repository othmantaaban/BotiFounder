import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { AdministrationService } from 'src/app/services/administration.service';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-admin-mois-dash',
  templateUrl: './admin-mois-dash.page.html',
  styleUrls: ['./admin-mois-dash.page.scss'],
})
export class AdminMoisDashPage implements OnInit {
  clickEventSubscription:Subscription;

  public loader_obj = {
    demande: false,
    message: false,
  }


  public msgCycleData: any = [
    {data: [], label: '',backgroundColor:"#2B2A64"},
  ];

  public msgCycleLabels: string[] = [];


  public msgEtatData:any = [
    {data: [], label: '',backgroundColor:"#2B2A64"},
  ];
  public msgEtatLabels = [];

  public msgInfos: any = []
// -----------------message-------------------------------

  public dmdNatureLabels: string[] = [];

  public dmdNatureData = [
    {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
  ];

  public dmdEtatLabels: string[] = [];

  public dmdEtatData = [
    {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
  ];

  public dmdCycleLabels: string[] = [];

  public dmdCycleData = [
    {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
  ];

  public dmd: any = []
// -----------------demande-------------------------------



  constructor(
    private adminService:AdministrationService,
    private sharedService:SharedService,
    private apiService: ApiService,

    ) {
    this.clickEventSubscription= this.sharedService.getClickEvent().subscribe((elt)=>{
      if (elt.value == "mois" && elt.tab=='admin') {
        this.callApi();
      }
    })
   }

  ionViewWillEnter() {
    this.callApi()
  }


  pathList=[
    {vue:"Jour",path:"/tabs/admin-jour-dash",value:"jour"},
    {vue:"Mois",path:"/tabs/admin-mois-dash",value:"mois"},
    // {vue:"Annee",path:"/tabs/admin-annee-dash",value:"annee"}
  ]

  //Absences personnel
  public absPersoLabels: string[] = ['Enseignants', 'Administratifs', 'Aides',"Transport"];
  public absPersoData: ChartData<'doughnut'> = {
    labels: this.absPersoLabels,
    datasets: [
      {
        data: [13, 18, 10,20],
        backgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
        hoverBackgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
        hoverBorderColor: ["grey"]
      }
    ]
  };

  public absCycleLabels: string[] = ['Maternelle', 'Primaire', 'Collége',"Lycée"];
  public absCycleData: ChartData<'doughnut'> = {
    labels: this.absCycleLabels,
    datasets: [
      {
        data: [20, 22, 10,10],
        backgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
        hoverBackgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
        hoverBorderColor: ["grey"]
      }
    ]
  };

  public absMatiereLabels: string[] = ['Arabe', 'Français', 'Anglais',"Mathématiques"];
  public absMatiereData: ChartData<'doughnut'> = {
    labels: this.absMatiereLabels,
    datasets: [
      {
        data: [23, 11, 20,24],
        backgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
        hoverBackgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
        hoverBorderColor: ["grey"]
      }
    ]
  };


    //Messges personnel

    // public msgCycleData: ChartData<'bar'> = {
    //   labels: this.msgCycleLabels,
    //   datasets: [
    //     {
    //       data: [],
    //       backgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
    //       hoverBackgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
    //       hoverBorderColor: ["grey"]
    //     }
    //   ]
    // };



    public msgDelaisLabels: string[] = ['> 2H', '> 3H', '> 4H'];
    public msgDelaisData: ChartData<'bar'> = {
      labels: this.msgDelaisLabels,
      datasets: [
        {
          data: [33, 18, 10,],
          backgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
          hoverBackgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
          hoverBorderColor: ["grey"]
        }
      ]
    };

        //Demandes personnel





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

    callApi(){
      this.apiService.loader()
      this.loader_obj = {
        demande: false,
        message: false,
      }

      let d = new Date()
      let val = d.getMonth() + 1
      if(DateSegmentsComponent.dateValue !== undefined) {
        let dateVal = new Date(DateSegmentsComponent.dateValue); 
        val = dateVal.getMonth() + 1
      }
      let date = val;
      this.apiService.get({period: date, type: "mois"}, "get_messages_new")
      .subscribe(response =>{
        console.log(response);

        this.msgCycleData = response?.cycle?.data;
        this.msgCycleLabels = response?.cycle?.labels;
  
        this.msgEtatData = response?.etat?.data;
        this.msgEtatLabels = response?.etat?.labels;
  
        this.msgInfos = response

        this.loader_obj.message = true

        this.apiService.loader_dissmis(this.loader_obj)
      })
      
      this.dmd = []
      this.dmdNatureLabels = []
      this.dmdNatureData = []

      this.dmdCycleLabels = []
      this.dmdCycleData = []

      this.dmdEtatLabels = []
      this.dmdEtatData = []

      this.apiService.get({period: date, type: "mois"}, "get_demandes_new")
      .subscribe(response =>{
        this.dmd = response
        this.dmdNatureLabels = response?.nature?.labels
        this.dmdNatureData = response?.nature?.data

        this.dmdCycleLabels = response?.cycle?.labels
        this.dmdCycleData = response?.cycle?.data

        this.dmdEtatLabels = response?.etat?.labels
        this.dmdEtatData = response?.etat?.data

        this.loader_obj.demande = true
        this.apiService.loader_dissmis(this.loader_obj)
      })


    }


    ngOnInit() {

      // this.clickEventSubscription= this.sharedService.getClickEvent().subscribe(()=>{
      //   this.callApi();
      // })

    }

}
