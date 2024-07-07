import {Component, OnInit} from '@angular/core';
import {StatisticsService} from "../../core/services/statistics.service";
import {OlympicService} from "../../core/services/olympic.service";
import {PieChartComponent} from "./pie-chart/pie-chart.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    PieChartComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {
  olympicsData: any;
  totalOlympics: number = 0;
  totalCountries: number = 0;

  constructor(
    private statisticsService: StatisticsService,
    private olympicService: OlympicService) {
  }

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe(data => {
      this.olympicsData = data;
      console.log('Olympic Data:', data); // Vérifiez les données dans la console
    });


    this.statisticsService.getTotalOlympics().subscribe(total => {
      this.totalOlympics = total;
    });

    this.statisticsService.getTotalCountries().subscribe(total => {
      this.totalCountries = total;
    });
  }
}
