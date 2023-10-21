import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { SharedService } from 'src/app/services/shared.service';
import { UsageService } from 'src/app/services/usage.service';

@Component({
  selector: 'app-usage-jour-dash',
  templateUrl: './usage-jour-dash.page.html',
  styleUrls: ['./usage-jour-dash.page.scss'],
})
export class UsageJourDashPage implements OnInit {

  loading: any;

  clickEventSubscription: Subscription;
  constructor(
    private usageService: UsageService, private cdr: ChangeDetectorRef, public loadingController: LoadingController, private sharedService: SharedService
  ) {
    this.clickEventSubscription = this.sharedService.getClickEvent().subscribe((elt) => {
      if(elt.value=="jour"&&elt.tab=='usage')
      this.presentLoadingWithOptions()
      // this.callApi();
    })
  }


  ionViewWillEnter() {
    this.callApi()
  }

  pathList = [
    // {vue:"Jour",path:"/tabs/usage-jour-dash",value:"jour"},
    // { vue: "Mois", path: "/tabs/usage-jour-dash", value: "mois" },
  ]

  public loaders = [false, false, false, false, false, false, false]

  //Bar Parents
  public barParentsLabels = [];
  public barParentsData = [
    { data: [], label: '', backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"] },
  ];

  //Bar Admins
  public barAdminsLabels = [];
  public barAdminsData = [
    { data: [], label: '', backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"] },
  ];

  //Bar Admins
  public barEnseignantsLabels = [];
  public barEnseignantsData = [
    { data: [], label: '', backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"] },
  ];


  //Horizontal Bar Cycle
  public barCycleLabels = [];
  public barCycleData = [
    { data: [], label: '', backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"] },
  ];



  //Connexions
  // List Parents
  public parentsCnxList = []

  // List Admins
  public adminsCnxList = []

  // List Enseignants
  public enseignantsCnxList = []

  // List Admins
  public adminsAbsList = []

  // List Enseignants
  public enseignantsAbsList = []

  // List non connectés
  public nonCnxListProf = []
  public nonCnxListAdmin = []
  public nonCnxListParent = []
  // Group By Function
  groupArrayOfObjects = (list, key) => {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  async callApi() {
    const formatedDate = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }

    // let date = DateSegmentsComponent.dateValue !== undefined ? DateSegmentsComponent.dateValue : formatedDate();
    let date = DateSegmentsComponent.dateValue !== undefined ? DateSegmentsComponent.dateValue : new Date().getMonth() + 1;

    console.log(date);
    
    this.parentsCnxList = []
    this.adminsCnxList = []
    this.enseignantsCnxList = []
    this.adminsAbsList = []
    this.enseignantsAbsList = []

    this.usageService.getConnexions(date).subscribe(response => {
      const data = response.result

      // ! ------------------- GET CONNXIONS OF ROLE PARENT AND COUNT THE COUNT OF EACH DAY 
      // Parents prep
      let dataParents = data.filter((d) => { return d.Role == "Parent" }).map(
        (d) => ({ Date: d.Date.slice(5, 10), Role: d.Role, Count: 1 })
      );

      let tmpTable = this.groupArrayOfObjects(
        dataParents,
        "Date"
      );
      const dictParents = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total = 0
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v => { total += parseFloat(v.Count) })
        dictParents.push({
          Date: key1,
          total: total,
        });
        total = 0
      }
      let tmpData = []
      let tmpLabels = []
      dictParents.map((d) => {
        tmpLabels.push(d.Date)
        tmpData.push(d.total)
      })
      console.log("data parents: ", dictParents)
      this.barParentsLabels = tmpLabels
      this.barParentsData[0]["data"] = tmpData

      // ! ------------------- END OF THE ROLE PARENT


      // ! ------------------- GET CONNXIONS OF ROLE ADMIN AND COUNT THE COUNT OF EACH DAY 
      // Admin prep
      let dataAdmin = data.filter((d) => { return d.Role == "Administrateur" }).map((d) => ({ Date: d.Date.slice(5, 10), Role: d.Role, Count: 1 }));
      // console.log("admins data: ",dataAdmin)

      tmpTable = this.groupArrayOfObjects(
        dataAdmin,
        "Date"
      );
      const dictAdmin = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total = 0
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v => { total += v.Count })
        dictAdmin.push({
          Date: key1,
          total: total,
        });
        total = 0
      }
      tmpData = []
      tmpLabels = []
      dictAdmin.map((d) => {
        tmpLabels.push(d.Date)
        tmpData.push(d.total)
      })
      // console.log("admins data: ",dictAdmin)

      this.barAdminsLabels = tmpLabels
      this.barAdminsData[0]["data"] = tmpData
      // console.log("admins data: ",this.barAdminsData[0]["data"])
      // ! ------------------- END OF THE ROLE ADMIN

      // ! ------------------- GET CONNXIONS OF ROLE COACH AND COUNT THE COUNT OF EACH DAY 
      // Prof prep
      let dataProf = data.filter((d) => { return d.Role == "Professeur" }).map((d) => ({ Date: d.Date.slice(5, 10), Role: d.Role, Count: 1 }));
      tmpTable = this.groupArrayOfObjects(
        dataProf,
        "Date"
      );
      const dictProf = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total = 0
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v => { total += parseFloat(v.Count) })
        dictProf.push({
          Date: key1,
          total: total,
        });
        total = 0
      }
      tmpData = []
      tmpLabels = []
      dictProf.map((d) => {
        tmpLabels.push(d.Date)
        tmpData.push(d.total)
      })
      this.barEnseignantsLabels = tmpLabels
      this.barEnseignantsData[0]["data"] = tmpData
      // console.log("data profs: ",dictProf)
      // ! ------------------- END OF THE ROLE COACH


      // top connexions Admin prep
      let dataConnAdmin = data.filter((d) => { return d.Role == "Administrateur" }).map((d) => ({ User: d.User != null ? d.User : d.Tel, Role: d.Role, Count: 1 }));
      tmpTable = this.groupArrayOfObjects(
        dataConnAdmin,
        "User"
      );

      let dictCnxAdmin = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total = 0
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v => { total += parseFloat(v.Count) })
        dictCnxAdmin.push({
          User: key1,
          total: total,
        });

        total = 0
      }
      tmpData = []
      tmpLabels = []
      dictCnxAdmin = dictCnxAdmin.sort((a, b) => {
        return a.total - b.total;
      });
      dictCnxAdmin.reverse().slice(0, 10).map((d) => {
        this.adminsCnxList.push({ user: d.User, nb_connexions: d.total, unite: "connexions" })
      })

      // top connexions Professeur prep
      let dataConnProf = data.filter((d) => { return d.Role == "Professeur" }).map((d) => ({ User: d.User != null ? d.User : d.Tel, Date: d.Date, Count: 1 }));
      tmpTable = this.groupArrayOfObjects(
        dataConnProf,
        "User"
      );
      let dictCnxProf = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total = 0
        Object.values(value1).map(v => {
          total += parseFloat(v.Count)
          // console.log(v)
        })
        dictCnxProf.push({
          User: key1,
          total: total,
        });
        total = 0
      }


      tmpData = []
      tmpLabels = []
      dictCnxProf = dictCnxProf.sort((a, b) => {
        return a.total - b.total;
      });
      dictCnxProf.reverse().slice(0, 10).map((d) => {
        this.enseignantsCnxList.push({ user: d.User, nb_connexions: d.total, unite: "connexions" })
      })

      // top connexions Parents prep
      let dataConnPar = data.filter((d) => { return d.Role == "Parent" }).map((d) => ({ User: d.User != null ? d.User : d.Tel, Role: d.Role, Count: 1 }));
      tmpTable = this.groupArrayOfObjects(
        dataConnPar,
        "User"
      );

      console.log("parent conn: ", dataConnPar)

      let dictPar = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total = 0
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v => { total += parseFloat(v.Count) })
        dictPar.push({
          User: key1,
          total: total,
        });
        total = 0
      }
      tmpData = []
      tmpLabels = []
      console.log("dictPar :", dictPar);

      dictPar = dictPar.sort((a, b) => {
        return a.total - b.total;
      });
      dictPar.reverse().map((d) => {
        this.enseignantsCnxList.map((p) => {
          if (p.User == d.User) {
            return
          }
        })
        this.parentsCnxList.push({ user: d.User, nb_connexions: d.total, unite: "connexions" })
      })

      console.log(this.parentsCnxList.length);

    })

    this.usageService.getNonConnecte(date).subscribe(response => {
      const data = response.result
      // NON connectés Parents prep
      let dataNonConnParent = data.filter((d) => {
        return d.Role == "Parent"
      }).map((d) => ({ User: d.User != null ? d.User : d.Tel, Role: d.Role }));
      dataNonConnParent.map((c) => {
        this.nonCnxListParent.push({
          user: c.User,
          nb_connexions: c.Role,
        });
      })

      // NON connectés Admin prep
      let dataNonConnAdmin = data.filter((d) => {
        return d.Role == "Administrateur"
      }).map((d) => ({ User: d.User != null ? d.User : d.Tel, Role: d.Role }));
      this.nonCnxListAdmin = []
      dataNonConnAdmin.map((c) => {
        this.nonCnxListAdmin.push({
          user: c.User,
          nb_connexions: c.Role,
        });
      })
      //  console.log("non connectes: ",this.nonCnxListAdmin)

      // NON connectés Prof prep
      let dataNonConnProf = data.filter((d) => {
        return d.Role == "Professeur"
      }).map((d) => ({ User: d.User != null ? d.User : d.Tel, Role: d.Role }));
      this.nonCnxListProf = []
      dataNonConnProf.map((c) => {
        this.nonCnxListProf.push({
          user: c.User,
          nb_connexions: c.Role,
        });
      })

      // 

    })

    this.usageService.getConnexionsCycle(date).subscribe(response => {
      // Cycle prep
      const data = response.result
      let dataCycle = data.map((d) => ({ Cycle: d.Cycle, Count: 1 }));
      let tmpTable = this.groupArrayOfObjects(
        dataCycle,
        "Cycle"
      );
      const dictCycle = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total = 0
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v => { total += parseFloat(v.Count) })
        dictCycle.push({
          Cycle: key1,
          total: total,
        });
        total = 0
      }
      let tmpData = []
      let tmpLabels = []
      dictCycle.map((d) => {
        tmpLabels.push(d.Cycle)
        tmpData.push(d.total)
      })
      this.barCycleLabels = tmpLabels
      this.barCycleData[0]["data"] = tmpData
    })

    // console.log("cards 2: ",this.itemsPedag2)

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hellooo',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      spinner: null,
      message: '<h3>Loading Data, Please wait...</h3>',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return this.loading.present().then(() => {
      this.callApi();
    }).then(()=>{
      this.loading.dismiss();
    });
    // loading.dismiss()
  }



  ngOnInit() {
    // this.presentLoadingWithOptions() 
    this.cdr.markForCheck();
  }

}
