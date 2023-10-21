import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.scss'],
})
export class VerticalBarChartComponent implements OnInit {

  constructor() { }
  
      //BarChart
      public barChartOptions = {
        scaleShowVerticalLines: true,
        responsive: true,
        indexAxis: 'x',
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
      @Input() barChartLabels : string[];
      @Input() barChartData=[
        {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]}
      ];
      public barChartType : any = 'bar';
      @Input() barChartLegend:boolean;
      // public barChartLegend = false;
  ngOnInit() {}

}
