import {Component, OnInit, OnDestroy} from '@angular/core';
import {StatisticsService} from "../../core/services/statistics.service";
import {OlympicService} from "../../core/services/olympic.service";
import {PieChartComponent} from "./pie-chart/pie-chart.component";
import {Subscription} from "rxjs";
import {Olympic} from "../../core/models/Olympic";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    PieChartComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit, OnDestroy {
  olympicsData: Olympic | undefined;
  totalOlympics: number = 0;
  totalCountries: number = 0;
  private subscriptions: Subscription[] = [];


  constructor(
    private statisticsService: StatisticsService,
    private olympicService: OlympicService) {
  }

  ngOnInit(): void {
    const olympicsSub = this.olympicService.getOlympics().subscribe(data => {
      this.olympicsData = data;
      console.log('Olympic Data:', data);
    });
    this.subscriptions.push(olympicsSub);

    const totalOlympicsSub = this.statisticsService.getTotalOlympics().subscribe(total => {
      this.totalOlympics = total;
    });
    this.subscriptions.push(totalOlympicsSub);

    const totalCountriesSub = this.statisticsService.getTotalCountries().subscribe(total => {
      this.totalCountries = total;
    });
    this.subscriptions.push(totalCountriesSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
