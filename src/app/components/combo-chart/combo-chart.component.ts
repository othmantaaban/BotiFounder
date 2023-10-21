import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-combo-chart',
  templateUrl: './combo-chart.component.html',
  styleUrls: ['./combo-chart.component.scss'],
})
export class ComboChartComponent implements OnInit {

  constructor() { }

      //BarChart
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
      public barChartLegend = true;
      // public barChartLabels = ['2006', '2007', '2008', '2009'];
      // public barChartType = 'line';
      // public barChartData = [
      //   {data: [45, 44, 56, 91], label: 'Series B',backgroundColor:"#EE386E",type:"line"},
      //   {data: [65, 59, 80, 81], label: 'Series A',backgroundColor:"#2B2A64",type:"bar"},
      //   {data: [45, 44, 56, 91], label: 'Series B',backgroundColor:"#F7643B",type:"bar"},
      // ];

      @Input() barChartData:[];
      @Input() barChartType:ChartType;
      @Input() barChartLabels:[];
      @Input() Title:string;

  ngOnInit() {}

}
