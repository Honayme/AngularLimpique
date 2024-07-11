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
import {SharedService} from "../../../core/services/shared.service";


@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CanvasJSAngularChartsModule
  ],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnDestroy {
  chart!: CanvasChart;
  chartOptions!: ChartOptions;
  initialChartOptions!: ChartOptions;
  protected isDrillDown: boolean = false;
  private subscription: Subscription | undefined;

  constructor(
    private medalsService: MedalsService,
    private statisticsService: StatisticsService,
    private sharedService: SharedService) {
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
          click: this.drillDownHandler.bind(this)
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

  drillDownHandler(e: any) {
    console.log(e);
    if (!this.isDrillDown) {
      this.isDrillDown = true;
      const country = e.dataPoint.name;

      this.sharedService.changeDescription(`Detailed stats for ${country}`);

      this.subscription = this.statisticsService.getCountryParticipationDetails(country).subscribe(details => {
        this.chartOptions = {
          animationEnabled: true,
          explodeOnClick: false,
          title: {
            text: `${country}`
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

  /**
   * @description Get the previous pie chart infos as the descriptions and render it again.
   */
  handleBackClick() {
    this.isDrillDown = false;
    this.chartOptions = { ...this.initialChartOptions }; // Reset to initial options
    this.sharedService.resetDescription();
    this.renderChart(this.chartOptions);
  }

}
