import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { AdministrationService } from 'src/app/services/administration.service';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-admin-jour-dash',
  templateUrl: './admin-jour-dash.page.html',
  styleUrls: ['./admin-jour-dash.page.scss'],
})
export class AdminJourDashPage implements OnInit {

  clickEventSubscription:Subscription;


  // start first slider
  public itemsAdmin: any=[]

  // end first slider


  public dmd : any = []
  public dmdNatureLabels = []
  public dmdNatureData = []

  public dmdCycleLabels = []
  public dmdCycleData = []

  public dmdEtatLabels = []
  public dmdEtatData = []

  public dmdListingData = []

  //
  constructor(
    private adminService : AdministrationService,
    private cdr: ChangeDetectorRef,
    public loadingController: LoadingController,
    private sharedService:SharedService,
    private apiService : ApiService
  ) {
    this.clickEventSubscription= this.sharedService.getClickEvent().subscribe((elt)=>{
      if(elt.value=="jour"&&elt.tab=='admin')
      this.presentLoadingWithOptions();
    })
   }

  ionViewWillEnter() {
    this.callApi()
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

//   async presentLoadingWithOptions() {
//     const loading = await this.loadingController.create({
//       spinner: null,
//       duration: 3000,
//       message: '<h3>Loading Data, Please wait...</h3>',
//       translucent: true,
//       cssClass: 'custom-class custom-loading'
//     });
//     return await loading.present();
// }

async presentLoadingWithOptions() {
  const loading = await this.loadingController.create({
    spinner: null,
    message: '<h3>Loading Data, Please wait...</h3>',
    translucent: true,
    cssClass: 'custom-class custom-loading'
  });
  return await loading.present().then(()=>{
    this.callApi();
  }).then(()=>{
    loading.dismiss()
  });
  // loading.dismiss()
}


  public absentsList=[
  ]

  public demandesList=[]
  public messagesList=[]

  public dmdTypeLabels = [];
  public dmdTypeData = [
    {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
  ];

  public msgEtatsLabels = [];
  public msgEtatsData = [
    {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
  ];

  pathList=[
    {vue:"Jour",path:"/tabs/admin-jour-dash",value:"jour"},
    // {vue:"Mois",path:"/tabs/admin-mois-dash",value:"mois"},
    // {vue:"Annee",path:"/tabs/admin-annee-dash",value:"annee"}
  ]
  callApi(){
    const formatedDate = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }

    let date = DateSegmentsComponent.dateValue !== undefined ? DateSegmentsComponent.dateValue : formatedDate();

    this.itemsAdmin=[]

    this.msgEtatsLabels=[]
    this.msgEtatsData[0]["data"]=[]

    this.apiService.get({period: date}, "get_card_infos_admin")
    .subscribe(elt => {
      this.itemsAdmin = elt
    })


    this.dmd = []
    this.dmdNatureLabels = []
    this.dmdNatureData = []

    this.dmdCycleLabels = []
    this.dmdCycleData = []

    this.dmdEtatLabels = []
    this.dmdEtatData = []

    this.dmdListingData = []


    this.apiService.get({period: date, type: "jour"}, "get_demandes_new")
    .subscribe(response =>{
      this.dmd = response
      this.dmdNatureLabels = response?.nature?.labels
      this.dmdNatureData = response?.nature?.data

      this.dmdCycleLabels = response?.cycle?.labels
      this.dmdCycleData = response?.cycle?.data

      this.dmdEtatLabels = response?.etat?.labels
      this.dmdEtatData = response?.etat?.data

      this.dmdListingData = response?.listing?.data

      // this.loader_obj.demande = true
      // this.apiService.loader_dissmis(this.loader_obj)
    })


    this.adminService.getMessages(date).subscribe(response =>{
      const data=response.result
      // let dataVue=data.filter((d)=>{
      //   return d.ViewsID!=null
      // }).map((d) => ({Cycle:d.Cycle}));
      // // Cycle prep
      // let dataDem=data.map((d) => ({Cycle:d.Cycle,Date:d.Date}));
      // this.itemsAdmin.push({title:"Messages",total:dataDem.length,label:"Messages",alias1:"Vues",count1:dataVue.length})

      // let dataMess=
        // data.map((d) => ({
        //   User:d.User,Nature:d.Sujet,Vu:d.ViewsID})).slice(0,10);

      // console.log(dataMess)
      // this.messagesList=[]
      // dataMess.map((d)=>{
      //   if(d.Vu!=null){
      //     this.messagesList.push({user:d.User,categorie:d.Nature,Statut:"Vu"})
      //   }else{
      //     this.messagesList.push({user:d.User,categorie:d.Nature,Statut:"Non Vue"})
      //   }
      // })
      // console.log("messages list: ",this.messagesList);
      // let tmpTable = this.groupArrayOfObjects(
      //   this.messagesList,
      //   "Statut"
      // );
      // console.log("tmp messages list: ",dataMess);
      // console.log("tmp messages list: ",tmpTable);

      // let tmpData=[]
      // let tmpLabels=[]
      // const msgEtat = [];
      // for (const [key1, value1] of Object.entries(tmpTable)) {
      //   let total=0
      //   // console.log("here: ",Object.keys(value1).length)
      //   // Object.values(value1).map(v =>{total+=parseFloat(v.Count)})
      //   msgEtat.push({
      //     Etat: key1,
      //     total: Object.values(value1).length,
      //   });
      //   total=0
      // }
      // msgEtat.map((d)=>{
      //   tmpLabels.push(d.Etat)
      //   tmpData.push(d.total)
      // })
      // this.msgEtatsLabels=tmpLabels
      // this.msgEtatsData[0]["data"]=tmpData
      console.log(data);


      this.msgEtatsLabels = ["vu", "Non vu"]
      this.msgEtatsData[0]["data"]=[0, 0]
      let i = 0
      data.forEach((element, i) => {
        console.log(element);
        console.log(i);
        if(JSON.parse(element.ViewsID)!=null) {
          if(this.messagesList.length < 10) {
            this.messagesList.push({user:element.User,categorie:element.Nature,Statut:"Vu"})
          }
          i = 0
        } else {
          console.log("not vu");
          if(this.messagesList.length < 10) {
            this.messagesList.push({user:element.User,categorie:element.Nature,Statut:"Non Vu"})
          }
          i = 1
        }
        this.msgEtatsData[0]["data"][i] += 1


      });

    })

    this.adminService.getDemandes(date).subscribe(response =>{
      const data=response.result
      console.log("demandes data: ",data)
      let dataEnCours=data.filter((d)=>{
        return d.Statut=="En Cours"
      }).map((d) => ({Cycle:d.Cycle}));
      // Cycle prep
      let dataDem=data.map((d) => ({Cycle:d.Cycle,Date:d.Date}));
      // this.itemsAdmin.push({
      //   title:"Demandes & Réclamations",
      //   total:dataDem.length,
      //   label:"Demandes",
      //   alias1:"En cours",
      //   count1:dataEnCours.length
      // })
      // Etat prep
      let dataEtat=data.filter((d)=>{
        return d.Statut!=null
      }).map((d) => ({Etat:d.Statut,Count:1}));
      let tmpTable = this.groupArrayOfObjects(
        dataEtat,
        "Etat"
      );
      // console.log(dataEtat)
      const dictEtat = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total=0
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v =>{total+=parseFloat(v.Count)})
        dictEtat.push({
          Etat: key1,
          total: total,
        });
        total=0
      }
      console.log(dictEtat)
      let tmpData=[]
      let tmpLabels=[]
      dictEtat.map((d)=>{
        tmpLabels.push(d.Etat)
        tmpData.push(d.total)
      })
      this.dmdTypeLabels=tmpLabels
      this.dmdTypeData[0]["data"]=tmpData

      //Dernier demandes Reçus
      let dataDer=data.map((d) => ({User:d.User,Nature:d.Nature,Statut:d.Statut})).slice(0,10);
      console.log(dataDer)
      this.demandesList=[]
      dataDer.map((d)=>{
        this.demandesList.push({
          user:d.User,
          categorie:d.Nature,
          Statut:d.Statut
        })
      })
    })

    this.adminService.getAbsencesPerso(date).subscribe(response =>{
      const data=response.result
      // Cycle prep
      let dataAbs=data.map((d) => ({User:d.User,Role:d.Role}));
      this.absentsList=[]
      dataAbs.map((a)=>{
        this.absentsList.push({User:a.User,Role:a.Role})
      })
    })

  }

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

  ngOnInit() {


  }

}
