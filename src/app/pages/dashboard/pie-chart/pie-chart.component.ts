// @ts-ignore

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {CanvasJSAngularChartsModule} from '@canvasjs/angular-charts';
import { Subscription } from 'rxjs';
import {CanvasChart} from "../../../core/models/Charts/CanvasChart";
import {ChartOptions} from "../../../core/models/Charts/ChartOptions";
import {isCanvasChart} from "../../../core/models/Charts/typeGuards";
import {SharedService} from "../../../core/services/shared.service";
import {OlympicService} from "../../../core/services/olympic.service";
import {SharedData} from "../../../core/models/SharedData";


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
    private olympicService: OlympicService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.subscription = this.olympicService.getParticipationData().subscribe(dataPoints => {
      this.initialChartOptions = {
        animationEnabled: false,
        explodeOnClick: false,
        toolTip: {
          content: "{name} 🏅 {y}",
          backgroundColor: "#04838F",
          fontColor: "#FFF",
          cornerRadius: 5,
          fontWeight: "light",
        },
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

  /**
   * @description Gère le clic sur un élément du graphique.
   * @param e
   */
  drillDownHandler(e: any) {
    console.log(e);
    if (!this.isDrillDown) {
      this.isDrillDown = true;
      const country = e.dataPoint.name;
      const medals = e.dataPoint.y;

      // Mettre à jour les données partagées via le service
      this.subscription = this.olympicService.getCountryParticipationDetails(country).subscribe(details => {
        this.chartOptions = {
          animationEnabled: true,
          explodeOnClick: false,
          toolTip: { enabled: false },
          data: [{ type: "column", dataPoints: details }]
        };
        this.renderChart(this.chartOptions);

        this.olympicService.getCountryTotalAthletes().subscribe(athleteData => {
          const countryAthletes = athleteData.find(item => item.country === country);
          if (countryAthletes) {
            const sharedData: SharedData = {
              description: country,
              medalsNumber: `${medals}`,
              athletesNumber: `${countryAthletes.athletes}`
            };
            this.sharedService.updateSharedData(sharedData); // Mise à jour avec toutes les données
          }
        });
      });
    }
  }

  /**
   * @description Réinitialise le graphique et les données partagées.
   */
  handleBackClick() {
    this.isDrillDown = false;
    this.chartOptions = { ...this.initialChartOptions }; // Reset to initial options
    this.sharedService.resetSharedData();
    this.renderChart(this.chartOptions);
  }
}

