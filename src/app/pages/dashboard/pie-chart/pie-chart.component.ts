import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {CanvasJSAngularChartsModule} from '@canvasjs/angular-charts';
import { MedalsService } from '../../../core/services/medals.service';
import { Subscription } from 'rxjs';
import {StatisticsService} from "../../../core/services/statistics.service";
import {CanvasChart} from "../../../core/models/Charts/CanvasChart";
import {ChartOptions} from "../../../core/models/Charts/ChartOptions";
import {isCanvasChart} from "../../../core/models/Charts/typeGuards";


@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CanvasJSAngularChartsModule
  ],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'] // Corrected typo from styleUrl to styleUrls
})
export class PieChartComponent implements OnInit, OnDestroy {
  chart!: CanvasChart;
  chartOptions!: ChartOptions;
  initialChartOptions!: ChartOptions;
  protected isDrillDown: boolean = false;
  private subscription: Subscription | undefined;

  constructor(
    private medalsService: MedalsService,
    private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.subscription = this.medalsService.getParticipationData().subscribe(dataPoints => {
      this.initialChartOptions = {
        animationEnabled: false,
        explodeOnClick: false,
        data: [{
          type: "pie",
          startAngle: -90,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###",
          dataPoints: dataPoints,
          click: this.drilldownHandler.bind(this)
        }]
      };
      this.chartOptions = { ...this.initialChartOptions }; // Make a copy of the initial options
      this.renderChart(this.chartOptions);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getChartInstance(chart: unknown) {
    if (isCanvasChart(chart)) {
      this.chart = chart;
    } else {
      console.error('Invalid chart instance:', chart);
    }
  }

  renderChart(options: any) {
    this.chart.options = options;
    this.chart.render();
  }

  drilldownHandler(e: any) {
    console.log(e);
    if (!this.isDrillDown) {
      this.isDrillDown = true;
      const country = e.dataPoint.name;
      this.subscription = this.statisticsService.getCountryParticipationDetails(country).subscribe(details => {
        this.chartOptions = {
          animationEnabled: true,
          title: {
            text: `Medals per Year for ${country}`
          },
          data: [{
            type: "column",
            dataPoints: details
          }]
        };
        this.renderChart(this.chartOptions);
      });
    }
  }

  handleBackClick(event: Event) {
    this.isDrillDown = false;
    this.chartOptions = { ...this.initialChartOptions }; // Reset to initial options
    this.renderChart(this.chartOptions);
  }

}
