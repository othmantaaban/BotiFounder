import { Component, OnInit } from '@angular/core';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { AdministrationService } from 'src/app/services/administration.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-admin-annee-dash',
  templateUrl: './admin-annee-dash.page.html',
  styleUrls: ['./admin-annee-dash.page.scss'],
})
export class AdminAnneeDashPage implements OnInit {
  clickEventSubscription
  constructor(
    private adminService:AdministrationService,
    private sharedService: SharedService
  ) {
    this.clickEventSubscription= this.sharedService.getClickEvent().subscribe(()=>{
      this.callApi()
      // this.presentLoadingWithOptions();
    })
  }

  pathList=[
    {vue:"Jour",path:"/tabs/admin-jour-dash",value:"jour"},
    {vue:"Mois",path:"/tabs/admin-mois-dash",value:"mois"},
    // {vue:"Annee",path:"/tabs/admin-annee-dash",value:"annee"}
  ]

  //Absences
  public absPersoLabels = ['Janvier', 'Février', 'Mars', 'Avril'];
  public absPersoData = [
    {data: [65, 59, 80, 81], label: 'Enseignants',stack:"a",backgroundColor:"#2B2A64"},
    {data: [25, 39, 90, 81], label: 'Administratifs',stack:"a",backgroundColor:"#F7643B"},
    {data: [20, 30, 40, 81], label: 'Aides',stack:"a",backgroundColor:"#EE386E"},
    {data: [15, 29, 53, 21], label: 'Chauffeurs',stack:"a",backgroundColor:"#E3386E"},

  ];

  public absCycleLabels = [];
  public absCycleData : any = [
    {data: [], label: '',stack:"a",backgroundColor:"#2B2A64"},
    {data: [], label: '',stack:"a",backgroundColor:"#F7643B"},
    {data: [], label: '',stack:"a",backgroundColor:"#EE386E"},
    {data: [], label: '',stack:"a",backgroundColor:"#E3386E"},
    {data: [], label: '',stack:"a",backgroundColor:"#E3386E"},
  ];

  //Messages
  public msgCycleLabels = [];
  public msgCycleData : any = [
    {data: [], label: '',stack:"a",backgroundColor:"#2B2A64"},
    {data: [], label: '',stack:"a",backgroundColor:"#F7643B"},
    {data: [], label: '',stack:"a",backgroundColor:"#EE386E"},
    {data: [], label: '',stack:"a",backgroundColor:"#E3306E"},
    {data: [], label: '',stack:"a",backgroundColor:"#2B0A64"}

  ];

    //Demandes
    public dmdCycleLabels = [];
    public dmdCycleData : any = [
      {data: [], label: '',stack:"a",backgroundColor:"#2B2A64"},
      {data: [], label: '',stack:"a",backgroundColor:"#F7643B"},
      {data: [], label: '',stack:"a",backgroundColor:"#EE386E"},
      {data: [], label: '',stack:"a",backgroundColor:"#A3306E"},
      {data: [], label: '',stack:"a",backgroundColor:"#2B2AA4"},
  
    ];

    public dmdNatureLabels = [];
    public dmdNatureData : any = [
      {data: [], label: '',stack:"a",backgroundColor:"#2B2A64"},
      {data: [], label: '',stack:"a",backgroundColor:"#F7643B"},
      {data: [], label: '',stack:"a",backgroundColor:"#EE386E"},
      {data: [], label: '',stack:"a",backgroundColor:"#A3306E"},
      {data: [], label: '',stack:"a",backgroundColor:"#2B2AA4"},
    ];

  public topAbsencesList=[
    // {user:"Taha EL ALJ",nb_connexions:"17",unite:""},
    // {user:"Mohammed Benomar",nb_connexions:"11",unite:""},
    // {user:"Jalal EL Monnif",nb_connexions:"10",unite:""},
    // {user:"Karim Souhaili",nb_connexions:"9",unite:""},
  ]

   // Group By Function
   groupArrayOfObjects = (list, key) => {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  // let date=DateSegmentsComponent.dateValue !== undefined ? DateSegmentsComponent.dateValue : new Date().getFullYear() + 1 
  // console.log(date);
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.callApi()
  }

  callApi() {
    let date=DateSegmentsComponent.dateValue !== undefined ? DateSegmentsComponent.dateValue : new Date().getFullYear() + 1 
    console.log(date);
    

    this.adminService.getMessages(date)
    .subscribe(response =>{
      const data=response.result
      // Cycle prep
      let dataCycle=data.map((d) => ({Mois:d.Month,Cycle:d.Cycle}));
      let tmpTable = this.groupArrayOfObjects(
        dataCycle,
        "Mois"
      );
      const dictCycle = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let count_pre = 0;
        let count_pri = 0;
        let count_m = 0;
        let count_col = 0;
        let count_lyc = 0;
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v =>{
          if(v.Cycle==="Maternelle"){
            console.log("maternelle")
            count_m=count_m+1
          }else if(v.Cycle==="Préscolaire"){
            console.log("préscolaire")
            count_pre=count_pre+1
          }else if(v.Cycle==="Primaire"){
            console.log("primaire")
            count_pri=count_pri+1
          } else if(v.Cycle==="Lycée"){
            console.log("lycée")
            count_lyc=count_lyc+1
          }else{
            count_col=count_col+1
          }
        })
        dictCycle.push({
          Mois: key1,
          total: [count_m,count_pre,count_pri,count_lyc,count_col],
        });
        count_pre = 0;
        count_pri = 0;
        count_m = 0;
        count_col = 0;
        count_lyc = 0;
      }
      let tmpData1=[]
      let tmpData2=[]
      let tmpData3=[]
      let tmpData4=[]
      let tmpData5=[]
      let tmpLabels=[]
      dictCycle.map((d)=>{
        tmpLabels.push(d.Mois)
        tmpData1.push(d.total[0])
        tmpData2.push(d.total[1])
        tmpData3.push(d.total[2])
        tmpData4.push(d.total[3])
        tmpData5.push(d.total[4])
      })
      this.msgCycleLabels=tmpLabels
      this.msgCycleData[0]["data"]=tmpData1
      this.msgCycleData[0]["label"]="Maternelle"
      this.msgCycleData[1]["data"]=tmpData2
      this.msgCycleData[1]["label"]="Préscolaire"
      this.msgCycleData[2]["data"]=tmpData3
      this.msgCycleData[2]["label"]="Primaire"
      this.msgCycleData[3]["data"]=tmpData4
      this.msgCycleData[3]["label"]="Lycée"
      this.msgCycleData[4]["data"]=tmpData5
      this.msgCycleData[4]["label"]="Collége"
    })

    this.adminService.getDemandes(date).subscribe(response =>{
      const data=response.result
      // Cycle prep
      let dataCycle=data.map((d) => ({Mois:d.Month,Cycle:d.Cycle}));
      let tmpTable = this.groupArrayOfObjects(
        dataCycle,
        "Mois"
      );

      const dictCycle = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let count_pre = 0;
        let count_pri = 0;
        let count_m = 0;
        let count_col = 0;
        let count_lyc = 0;
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v =>{
          if(v.Cycle==="Maternelle"){
            
            count_m=count_m+1
          }else if(v.Cycle==="Préscolaire"){
            
            count_pre=count_pre+1
          }else if(v.Cycle==="Primaire"){
            
            count_pri=count_pri+1
          } else if(v.Cycle==="Lycée"){
            
            count_lyc=count_lyc+1
          }else{
            count_col=count_col+1
          }
        })
        dictCycle.push({
          Mois: key1,
          total: [count_m,count_pre,count_pri,count_lyc,count_col],
        });
        count_pre = 0;
        count_pri = 0;
        count_m = 0;
        count_col = 0;
        count_lyc = 0;
      }

      let tmpData1=[]
      let tmpData2=[]
      let tmpData3=[]
      let tmpData4=[]
      let tmpData5=[]
      let tmpLabels=[]
      dictCycle.map((d)=>{
        tmpLabels.push(d.Mois)
        tmpData1.push(d.total[0])
        tmpData2.push(d.total[1])
        tmpData3.push(d.total[2])
        tmpData4.push(d.total[3])
        tmpData5.push(d.total[4])
      })
      this.dmdCycleLabels=tmpLabels
      this.dmdCycleData[0]["data"]=tmpData1
      this.dmdCycleData[0]["label"]="Maternelle"
      this.dmdCycleData[1]["data"]=tmpData2
      this.dmdCycleData[1]["label"]="Préscolaire"
      this.dmdCycleData[2]["data"]=tmpData3
      this.dmdCycleData[2]["label"]="Primaire"
      this.dmdCycleData[3]["data"]=tmpData4
      this.dmdCycleData[3]["label"]="Lycée"
      this.dmdCycleData[4]["data"]=tmpData5
      this.dmdCycleData[4]["label"]="Collége"


      // Nature

            let dataNature=data.map((d) => ({Mois:d.Month,Nature:d.Nature}));
            tmpTable = this.groupArrayOfObjects(
              dataNature,
              "Mois"
            );
            
            console.log(dataNature)
            const dictNature = [];
            for (const [key1, value1] of Object.entries(tmpTable)) {
              let count_as = 0;
              let count_ai = 0;
              let count_rn = 0;
              let count_rp = 0;
              let count_re = 0;
              // console.log("here: ",Object.keys(value1).length)
              Object.values(value1).map(v =>{
                if(v.Nature==="Attestation de scolarité"){
                  count_as=count_as+1
                }else if(v.Nature==="Attestation d'inscription"){
                  count_ai=count_ai+1
                }else if(v.Nature==="Relevé de notes"){
                  count_rn=count_rn+1
                } else if(v.Nature==="Réunion pédagogique"){
                  count_rp=count_rp+1
                }else{
                  count_re=count_re+1
                }
              })
              dictNature.push({
                Mois: key1,
                total: [count_as,count_ai,count_rn,count_rp,count_re],
              });
              count_as = 0;
              count_ai = 0;
              count_rn = 0;
              count_rp = 0;
              count_re = 0;
            }
      
            tmpData1=[]
            tmpData2=[]
            tmpData3=[]
            tmpData4=[]
            tmpData5=[]
            tmpLabels=[]
            dictNature.map((d)=>{
              tmpLabels.push(d.Mois)
              tmpData1.push(d.total[0])
              tmpData2.push(d.total[1])
              tmpData3.push(d.total[2])
              tmpData4.push(d.total[3])
              tmpData5.push(d.total[4])
            })
            this.dmdNatureLabels=tmpLabels
            this.dmdNatureData[0]["data"]=tmpData1
            this.dmdNatureData[0]["label"]="Attestation de scolarité"
            this.dmdNatureData[1]["data"]=tmpData2
            this.dmdNatureData[1]["label"]="Attestation d'inscription"
            this.dmdNatureData[2]["data"]=tmpData3
            this.dmdNatureData[2]["label"]="Relevé de notes"
            this.dmdNatureData[3]["data"]=tmpData4
            this.dmdNatureData[3]["label"]="Réunion pédagogique"
            this.dmdNatureData[4]["data"]=tmpData5
            this.dmdNatureData[4]["label"]="Réclamations"

            console.log(this.dmdNatureData)
    })

    this.adminService.getAbsences(date).subscribe(response=>{
      const data=response.result
      // Cycle prep
      let dataCycle=data.map((d) => ({Mois:d.Month,Cycle:d.Cycle}));
      let tmpTable = this.groupArrayOfObjects(
        dataCycle,
        "Mois"
      );

      const dictCycle = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let count_pre = 0;
        let count_pri = 0;
        let count_m = 0;
        let count_col = 0;
        let count_lyc = 0;
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v =>{
          if(v.Cycle==="Maternelle"){
            
            count_m=count_m+1
          }else if(v.Cycle==="Préscolaire"){
            
            count_pre=count_pre+1
          }else if(v.Cycle==="Primaire"){
            
            count_pri=count_pri+1
          } else if(v.Cycle==="Lycée"){
            
            count_lyc=count_lyc+1
          }else{
            count_col=count_col+1
          }
        })
        dictCycle.push({
          Mois: key1,
          total: [count_m,count_pre,count_pri,count_lyc,count_col],
        });
        count_pre = 0;
        count_pri = 0;
        count_m = 0;
        count_col = 0;
        count_lyc = 0;
      }

      let tmpData1=[]
      let tmpData2=[]
      let tmpData3=[]
      let tmpData4=[]
      let tmpData5=[]
      let tmpLabels=[]
      dictCycle.map((d)=>{
        tmpLabels.push(d.Mois)
        tmpData1.push(d.total[0])
        tmpData2.push(d.total[1])
        tmpData3.push(d.total[2])
        tmpData4.push(d.total[3])
        tmpData5.push(d.total[4])
      })
      this.absCycleLabels=tmpLabels
      this.absCycleData[0]["data"]=tmpData1
      this.absCycleData[0]["label"]="Maternelle"
      this.absCycleData[1]["data"]=tmpData2
      this.absCycleData[1]["label"]="Préscolaire"
      this.absCycleData[2]["data"]=tmpData3
      this.absCycleData[2]["label"]="Primaire"
      this.absCycleData[3]["data"]=tmpData4
      this.absCycleData[3]["label"]="Lycée"
      this.absCycleData[4]["data"]=tmpData5
      this.absCycleData[4]["label"]="Collége"
    })
    console.log(this.absCycleLabels);
    console.log(this.absCycleData);
  }

}
