import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.scss'],
})
export class HorizontalBarChartComponent implements OnInit {

    //BarChart
    public barChartOptions = {
      scaleShowVerticalLines: true,
      responsive: true,
      indexAxis: 'y',
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            display: false
          }
        }
      }
    };
    // public barChartLabels = ['2006', '2007', '2008', '2009'];
    // public barChartData = [
    //   {data: [65, 59, 80, 81], label: 'Series A',backgroundColor:"#2B2A64"},
    // ];
    @Input() barChartLabels : any = [];
    @Input() barChartData = [
      {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]}
    ];
    public barChartType = 'bar';
  // @ts-ignore
    @Input() barChartLegend:boolean;
    @Input() loader=false;
    // public barChartLegend = false;
  constructor() { }

  ngOnInit() {
    console.log('bar data', this.barChartData)
  }

  NotOnlyZero(array) {
    if(Array.isArray(array)) {
      for (let i = 0; i < array.length; i++) {
        if(array[i] > 0) {
          return true
        }      
      }
    }
    return false;
  }

}
