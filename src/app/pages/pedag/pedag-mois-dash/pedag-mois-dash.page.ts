import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { ApiService } from 'src/app/services/api/api.service';
import { PedagServiceService } from 'src/app/services/pedag-service.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-pedag-mois-dash',
  templateUrl: './pedag-mois-dash.page.html',
  styleUrls: ['./pedag-mois-dash.page.scss'],
})
export class PedagMoisDashPage implements OnInit {

  public itemsPedag1 = [
    // {title:"Retards",total:0,label:"élèves",alias1:"min",count1:0},
    // {title:"Absences",total:0,label:"élèves",alias1:"séances",count1:0}
    // {alias:"négatifs",title:"Actions disciplinaire",count:0,montant:0,unite:"positives"},
  ]
  public itemsPedag2 = [
    { title: "Cahiers de texte Partagés", total: 0, label: "Partagés" },
    { title: "Devoirs envoyés", total: 0, label: "Partagés" },
    { title: "Ressources Partagés", total: 0, label: "Partagés" },
  ]

  pathList = [
    { vue: "Jour", path: "/tabs/pedag-jour-dash", value: "jour" },
    { vue: "Mois", path: "/tabs/pedag-mois-dash", value: "mois" }
  ]

  public absCycleLabels: string[] = ['M', 'P', 'C', 'L'];

  public absCycleData = [
    { data: [], label: '', backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"] },
  ];

  public absJourLabels = ['J', 'J+1', 'J+2', 'J+3', 'J+4'];
  public absJourData = [
    { data: [65, 59, 80, 81, 30], label: 'M', stack: "a", backgroundColor: "#2B2A64" },
    { data: [25, 39, 90, 81, 98], label: 'P', stack: "a", backgroundColor: "#F7643B" },
    { data: [20, 30, 40, 81, 54], label: 'C', stack: "a", backgroundColor: "#EE386E" },
    { data: [20, 30, 40, 81, 54], label: 'L', stack: "a", backgroundColor: "#E0386E" },

  ];

  public devCycleLabels: string[] = ['M', 'P', 'C', 'L'];

  public devCycleData = [
    { data: [], label: '', backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"] },
  ];
  public resCycleLabels: string[] = ['M', 'P', 'C', 'L'];
  //  public resCycleData: ChartData<'doughnut'> = {
  //          labels: this.absCycleLabels,
  //          datasets: [
  //              {
  //                  data: [103, 108, 101,200],
  //                  backgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
  //                  hoverBackgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
  //                  hoverBorderColor: ["grey"]
  //                }
  //              ]
  //       };
  public resCycleData = [
    { data: [], label: '', backgroundColor: "#2B2A64" },
  ];
  public apCycleLabels: string[] = ['M', 'P', 'C', 'L'];
  //  public apCycleData: ChartData<'doughnut'> = {
  //               labels: this.absCycleLabels,
  //               datasets: [
  //                   {
  //                       data: [103, 108, 101,200],
  //                       backgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
  //                       hoverBackgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
  //                       hoverBorderColor: ["grey"]
  //                     }
  //                   ]
  //       };
  public apCycleData = [
    { data: [], label: '', backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"] },
  ];

  clickEventSubscription: Subscription;
  constructor(
    private pedagService: PedagServiceService, 
    public loadingController: LoadingController, 
    private sharedService: SharedService,
    private apiService: ApiService
  ) {
    this.clickEventSubscription = this.sharedService.getClickEvent().subscribe((elt) => {
      if(elt.value == "mois" && elt.tab == 'pedag-dash'){
        this.presentLoadingWithOptions();
      }
    })
  }

  
  ionViewWillEnter() {
    this.presentLoadingWithOptions()
  }


  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      message: 'Loading Data, Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present().then(() => {
      this.callApi();
    }).then(() => {
      loading.dismiss()
    }).catch(() => {
      loading.dismiss()
    });
    // loading.dismiss()
  }
  // Group By Function
  groupArrayOfObjects = (list, key) => {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  loaderObj = {
    abscences: false,   
    devoirs: false,   
    chtext: false,   
    ressource: false,   
  }

  callApi() {
    // this.apiService.loader()

    console.log(DateSegmentsComponent.dateValue)
    let dateM : Date = DateSegmentsComponent.dateValue !== undefined ? new Date(DateSegmentsComponent.dateValue) : new Date();

    let date = dateM.getMonth() + 1 
    console.log(date);
    this.loaderObj = {
      abscences: false,   
      devoirs: false,   
      chtext: false,   
      ressource: false,   
    }

    this.pedagService.getAbsencesMois(date).subscribe(response => {
      const data = response?.result
      console.log("ret data: ", data)
      let dataRet = data.map((d) => (d.Retards));
      let totalRet = 0
      for (const value1 of dataRet) {
        // console.log("here: ",Object.keys(value1).length)
        // console.log(value1)
        if (value1 != null) {
          totalRet += parseInt(value1)
        } else {
          totalRet += 0
        }
      }
      // console.log(totalRet)
      let dataElvRet = data.filter((d) => {
        return d.Retards != null
      }).map((d) => ({ ret: d.Retards, User: d.Eleve }));
      // console.log("dtret1",dataElvRet)

      let dataElv = data.filter((d) => {
        return d.Retard == null
      }).map((d) => ({ ret: d.Retards, User: d.Eleve, Seance: d.Cours, Count: 1 }));


      let tmpTableElv = this.groupArrayOfObjects(
        dataElv,
        "Seance"
      );
      console.log("nb absences: ", tmpTableElv.length)

      let tmpTableElvRet = this.groupArrayOfObjects(
        dataElvRet,
        "User"
      );

      let dataAbs = data.filter((d) => {
        return d.Retards == null
      }).map((d) => ({ User: d.Eleve, Cycle: d.Cycle, Classe: d.Classe, Count: 1 }));
      console.log("abs here:", dataAbs)
      let tmpTableAbs = this.groupArrayOfObjects(
        dataAbs,
        "User"
      );
      let dictAbs = []
      for (const [key1, value1] of Object.entries(tmpTableAbs)) {
        let total = 0
        let cycle = ""
        let classe = ""
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v => {
          total += parseFloat(v.Count)
          cycle = v.Cycle
          classe = v.Classe
        })
        dictAbs.push({
          User: key1,
          total: total,
          Cycle: cycle,
          Classe: classe,
          Count: 1
        });
        total = 0
        cycle = ""
        classe = ""
      }

      let dictSce = []
      for (const [key1, value1] of Object.entries(tmpTableElv)) {
        let total = 0
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v => { total += parseFloat(v.Count) })
        dictSce.push({
          Classe: key1,
          total: total,
        });
        total = 0
      }
      console.log("bsences: ", dictAbs)
      this.itemsPedag1 = []
      this.itemsPedag1.push({ title: "Absences", total: Object.keys(dictAbs).length, label: "élèves", alias1: "séances", count1: Object.keys(dictSce).length })
      this.itemsPedag1.push({ title: "Retards", total: Object.keys(tmpTableElvRet).length, label: "élèves", alias1: "min", count1: totalRet })

      // Cycle prep
      let dataCycle = data.filter((d) => {
        return d.Retard == null
      }).map((d) => ({ Retard: d.Retard, Cycle: d.Cycle, Count: 1 }));
      console.log("cycle dta:", dataCycle.length)
      let tmpTable = this.groupArrayOfObjects(
        dictAbs,
        "Cycle"
      );
      console.log("data cycle: ", dataCycle)
      const dictCycle = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        console.log(key1, value1)
        let total = 0
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v => { total += parseInt(v.Count) })
        dictCycle.push({
          Cycle: key1,
          total: total,
        });
      }
      let tmpData = []
      let tmpLabels = []
      dictCycle.map((d) => {
        tmpLabels.push(d.Cycle)
        tmpData.push(d.total)
      })
      this.absCycleLabels = tmpLabels
      this.absCycleData[0]["data"] = tmpData

      // Classe prep
      let dataClasse = data.filter((d) => {
        return d.Retard == null
      }).map((d) => ({ Classe: d.Classe, Retard: d.Retard, Count: 1 }));
      console.log("classe dta:", dataClasse.length)
      tmpTable = this.groupArrayOfObjects(
        dictAbs,
        "Classe"
      );
      // console.log("data cycle: ",dataCycle)
      const dictClasse = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total = 0
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v => { total += parseFloat(v.Count) })
        dictClasse.push({
          Classe: key1,
          total: total,
        });
        total = 0
      }
      tmpData = []
      tmpLabels = []
      dictClasse.map((d) => {
        tmpLabels.push(d.Classe)
        tmpData.push(d.total)
      })
      // this.classeLabels=tmpLabels
      // this.classeData[0]["data"]=tmpData
      this.loaderObj.abscences = true
      this.apiService.loader_dissmis(this.loaderObj)

    })

    this.itemsPedag2 = []
    this.pedagService.getDevoirsMois(date).subscribe(response => {
      const count = response.count
      this.itemsPedag2.push({ title: "Devoirs Partagés", total: count, label: "" })
      this.loaderObj.devoirs = true
      this.apiService.loader_dissmis(this.loaderObj)

    })

    this.pedagService.getCahierTexteMois(date).subscribe(response => {
      const count = response.count
      this.itemsPedag2.push({ title: "Cahiers de texte Partagés", total: count, label: "Partagés" })
      this.loaderObj.chtext = true
      this.apiService.loader_dissmis(this.loaderObj)

    })

    this.pedagService.getRessourcesMois(date).subscribe(response => {
      const count = response.count
      this.itemsPedag2.push({ title: "Ressources Partagées", total: count, label: "Partagées" })
      this.loaderObj.ressource = true
      this.apiService.loader_dissmis(this.loaderObj)
    })


    this.apiService.get({period: date}, "get_card_infos_pedag")
    .subscribe(elt => {
      console.log(elt);
      
    })

    // console.log("cards 2: ",this.itemsPedag2)

  }
  ngOnInit() {
  }

}
