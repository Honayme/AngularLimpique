import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {MedalsService} from "../../../core/services/medals.service";


@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CanvasJSAngularChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})

export class PieChartComponent implements OnInit{
  chartOptions: any;

  constructor(private participationService: MedalsService) {}

  ngOnInit(): void {
    this.participationService.getParticipationData().subscribe(dataPoints => {
      console.log(dataPoints);
      this.chartOptions = {
        animationEnabled: true,
        title: {
          text: "Medals per Country"
        },
        data: [{
          type: "pie",
          startAngle: -90,
          indexLabel: " {name}",
          yValueFormatString: "#,###.##'%'",
          dataPoints: dataPoints
        }]
      };
    });
  }

/*  chartOptions = {
    animationEnabled: true,
    title: {
      text: "Sales by Department"
    },
    data: [{
      type: "pie",
      startAngle: -90,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###.##'%'",
      dataPoints: [
        { y: 14.1, name: "Toys" },
        { y: 28.2, name: "Electronics" },
        { y: 14.4, name: "Groceries" },
        { y: 43.3, name: "Furniture" }
      ]
    }]
  }*/
}
