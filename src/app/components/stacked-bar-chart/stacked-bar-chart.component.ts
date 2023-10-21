import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss'],
})
export class StackedBarChartComponent implements OnInit {

  constructor() { }

      //Stacked BarChart
      public barChartOptions: ChartOptions = {
        // scaleShowVerticalLines: true,
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
      public barChartType: ChartType = 'bar';
      public barChartLegend = true;
      @Input() barChartLabels:string[];
      @Input() barChartData:[];
      @Input() Title:string;
      // public barChartLabels = ['2006', '2007', '2008', '2009'];
      // public barChartData = [
      //   {data: [65, 59, 80, 81], label: 'Series A',stack:"a",backgroundColor:"#2B2A64"},
      //   {data: [25, 39, 90, 81], label: 'Series B',stack:"a",backgroundColor:"#EE386E"},
      // ];

  ngOnInit() {}

}
