import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { PedagServiceService } from 'src/app/services/pedag-service.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-pedag-jour-dash',
  templateUrl: './pedag-jour-dash.page.html',
  styleUrls: ['./pedag-jour-dash.page.scss'],
})
export class PedagJourDashPage implements OnInit {

  public itemsPedag1=[]

  public itemsPedag2=[]

  //Repartition absences cycle
    public cycleLabels = [];
    public cycleData = [
      {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
    ];

    //Repartition absences classe
    public classeLabels = [];
    public classeData = [
      {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
    ];
    pathList=[
      {vue:"Jour",path:"/tabs/pedag-jour-dash",value:"jour"},
      // {vue:"Mois",path:"/tabs/pedag-mois-dash",value:"mois"}
    ]
  clickEventSubscription:Subscription;
  constructor(
    private pedagService: PedagServiceService,private cdr: ChangeDetectorRef,public loadingController: LoadingController,private sharedService:SharedService
  ) {
    this.clickEventSubscription= this.sharedService.getClickEvent().subscribe(()=>{
      // this.callApi();
      this.presentLoadingWithOptions()
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
     // Group By Function
     groupArrayOfObjects = (list, key) => {
      return list.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };

    callApi(){
      const formatedDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
  
        return `${year}-${month}-${day}`;
      }
  
      let date = DateSegmentsComponent.dateValue !== undefined ? DateSegmentsComponent.dateValue : formatedDate();
      console.log(date);
      
      this.pedagService.getAbsences(date).subscribe(response =>{
        const data=response.result
        console.log("ret data: ",data)
        let dataRet=data.map((d) => (d.Retards));
        let totalRet=0
        for (const value1 of dataRet) {
          // console.log("here: ",Object.keys(value1).length)
          // console.log(value1)
          if(value1!=null){
            totalRet+=parseInt(value1)
          }else{
            totalRet+=0
          }
        }
        // console.log(totalRet)
        let dataElvRet=data.filter((d)=>{
          return d.Retards!=null
        }).map((d) => ({ret:d.Retards,User:d.Eleve}));
        // console.log("dtret1",dataElvRet)
        
        let dataElv=data.filter((d)=>{
          return d.Retard==null
        }).map((d) => ({ret:d.Retards,User:d.Eleve,Seance:d.Cours,Count:1}));
        
        
        let tmpTableElv = this.groupArrayOfObjects(
          dataElv,
          "Seance"
        );
        console.log("nb absences: ",tmpTableElv.length)

        let tmpTableElvRet = this.groupArrayOfObjects(
          dataElvRet,
          "User"
        );

        let dataAbs=data.filter((d)=>{
          return d.Retards==null
        }).map((d) => ({User:d.Eleve,Cycle:d.Cycle,Classe:d.Classe,Count:1}));
        console.log("abs here:",dataAbs)
        let tmpTableAbs = this.groupArrayOfObjects(
          dataAbs,
          "User"
        );
        let dictAbs=[]
        for (const [key1, value1] of Object.entries(tmpTableAbs)) {
          let total=0
          let cycle=""
          let classe=""
          // console.log("here: ",Object.keys(value1).length)
          Object.values(value1).map(v =>{
            total+=parseFloat(v.Count)
            cycle=v.Cycle
            classe=v.Classe
          })
          dictAbs.push({
            User: key1,
            total: total,
            Cycle:cycle,
            Classe:classe,
            Count:1
          });
          total=0
          cycle=""
          classe=""
        }

        let dictSce=[]
        for (const [key1, value1] of Object.entries(tmpTableElv)) {
          let total=0
          // console.log("here: ",Object.keys(value1).length)
          Object.values(value1).map(v =>{total+=parseFloat(v.Count)})
          dictSce.push({
            Classe: key1,
            total: total,
          });
          total=0
        }
        console.log("bsences: ",dictAbs)
        this.itemsPedag1=[]
        this.itemsPedag1.push({title:"Absences",total:Object.keys(dictAbs).length,label:"élèves",alias1:"séances",count1:Object.keys(dictSce).length})
        this.itemsPedag1.push({title:"Retards",total:Object.keys(tmpTableElvRet).length,label:"élèves",alias1:"min",count1:totalRet})
        
        // Cycle prep
        let dataCycle=data.filter((d)=>{
          return d.Retard==null
        }).map((d) => ({Retard:d.Retard,Cycle:d.Cycle,Count:1}));
        console.log("cycle dta:",dataCycle.length)
        let tmpTable = this.groupArrayOfObjects(
          dictAbs,
          "Cycle"
        );
        console.log("data cycle: ",dataCycle)
        const dictCycle = [];
        for (const [key1, value1] of Object.entries(tmpTable)) {
          console.log(key1,value1)
          let total=0
          // console.log("here: ",Object.keys(value1).length)
          Object.values(value1).map(v =>{total+=parseInt(v.Count)})
          dictCycle.push({
            Cycle: key1,
            total: total,
          });
        }
        let tmpData=[]
        let tmpLabels=[]
        dictCycle.map((d)=>{
          tmpLabels.push(d.Cycle)
          tmpData.push(d.total)
        })
        this.cycleLabels=tmpLabels
        this.cycleData[0]["data"]=tmpData
  
      // Classe prep
      let dataClasse=data.filter((d)=>{
        return d.Retard==null
      }).map((d) => ({Classe:d.Classe,Retard:d.Retard,Count:1}));
      console.log("classe dta:",dataClasse.length)
      tmpTable = this.groupArrayOfObjects(
        dictAbs,
        "Classe"
      );
              // console.log("data cycle: ",dataCycle)
        const dictClasse = [];
        for (const [key1, value1] of Object.entries(tmpTable)) {
          let total=0
          // console.log("here: ",Object.keys(value1).length)
          Object.values(value1).map(v =>{total+=parseFloat(v.Count)})
          dictClasse.push({
            Classe: key1,
            total: total,
          });
          total=0
        }
        tmpData=[]
        tmpLabels=[]
        dictClasse.map((d)=>{
          tmpLabels.push(d.Classe)
          tmpData.push(d.total)
        })
        this.classeLabels=tmpLabels
        this.classeData[0]["data"]=tmpData
      })
  
      this.itemsPedag2=[]
      this.pedagService.getDevoirs(date).subscribe(response =>{
        const count=response.count
        this.itemsPedag2.push({title:"Devoirs Partagés",total:count,label:""})
      })
      
      this.pedagService.getCahierTexte(date).subscribe(response =>{
        const count=response.count
        this.itemsPedag2.push({title:"Cahiers de texte Partagés",total:count,label:"Partagés"})
      })
  
      this.pedagService.getRessources(date).subscribe(response =>{
        const count=response.count
        this.itemsPedag2.push({title:"Ressources Partagées",total:count,label:"Partagées"})
      })
  

      // console.log("cards 2: ",this.itemsPedag2)
  
    }


    
  ngOnInit() {

    // this.presentLoadingWithOptions();
    // this.itemsPedag2=[]
    // this.clickEventSubscription= this.sharedService.getClickEvent().subscribe(()=>{
    //   this.callApi();
    // })


    this.cdr.markForCheck();

  }

  

}
