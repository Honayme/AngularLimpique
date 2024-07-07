import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MedalsService } from '../../../core/services/medals.service';
import { Subscription } from 'rxjs';

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
  chartOptions: any;
  private subscription: Subscription | undefined;

  constructor(private medalsService: MedalsService) {}

  ngOnInit(): void {
    this.subscription = this.medalsService.getParticipationData().subscribe(dataPoints => {
      console.log(dataPoints);
      this.chartOptions = {
        animationEnabled: true,
        title: {
          text: "Medals per Country"
        },
        data: [{
          type: "pie",
          startAngle: -90,
          indexLabel: "{name}",
          yValueFormatString: "#,###.##'%'",
          dataPoints: dataPoints
        }]
      };
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
