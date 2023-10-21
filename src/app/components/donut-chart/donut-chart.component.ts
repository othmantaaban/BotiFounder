import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ChartData, ChartType } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from 'chart.js';
// Chart.register(ChartDataLabels);

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
})
export class DonutChartComponent implements OnInit {
   //DonutChart
   
   public doughnutChartType: ChartType = 'pie'
  //  public doughnutChartLabels: string[] = ['Paused', 'Completed', 'Expired'];
  //  public doughnutChartData: ChartData<'doughnut'> = {
    //   labels: this.doughnutChartLabels,
    //   datasets: [
      //     {
        //       data: [3, 8, 1],
        //       backgroundColor: ["#2B2A64", "#F7643B", "#EE386E"],
        //       hoverBackgroundColor: ["#2B2A64", "#F7643B", "#EE386E"],
        //       hoverBorderColor: ["grey"]
        //     }
        //   ]
        // };
  @Input() doughnutChartLabels: string[] = [];
  // @ts-ignore
  @Input() doughnutChartData: ChartData<'pie'>;
  
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    // plugins: {
    //   datalabels: {
    //     display: true,
    //     anchor: 'center',
    //     align: 'center',
    //     font: {
    //       size: 20,
    //     },
    //     color: "#000000"
    //   },
    //   tooltip: {
    //     enabled: true,
    //   },
    //   title: {
    //     display: true,
    //     text: 'Macros'
    //   },
    //   legend: {
    //     display: true,
    //   },
    // },
  };

  constructor() { }

//   public chartColors() {
//     return [{
//       backgroundColor: "#FF7360",
//       borderColor: 'rgba(225,10,24,0.2)',
//       pointBackgroundColor: 'rgba(225,10,24,0.2)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(225,10,24,0.2)'
//   }]
// }

  ngOnInit() {

    setTimeout(()=>{
      
    },300)
  }

}
