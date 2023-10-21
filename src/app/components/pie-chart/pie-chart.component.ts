import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartData } from 'chart.js';

import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexTheme,
  ChartType
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  theme: ApexTheme;
  colors: any[];
};

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() data: any = {
    labels : [''],
    datasets: [100]
  };

  public pieChartType: ChartType = 'pie'
  public pieChartData: ChartData<'pie'>;

  constructor() {
    
  }

  ngOnInit() {
    this.chartOptions = {
      series: this.data.datasets,
      chart: {
        width: 300,
        type: "pie"
      },
      colors: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
      labels: this.data.labels,
      theme: {
        mode: 'light',
        monochrome: {
          color: "#2B2A64",
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

}
