import {Component, OnInit, OnDestroy} from '@angular/core';
import {OlympicService} from "../../core/services/olympic.service";
import {PieChartComponent} from "./pie-chart/pie-chart.component";
import {Subscription} from "rxjs";
import {Olympic} from "../../core/models/Olympic";
import {SharedService} from "../../core/services/shared.service";
import {CommonModule} from "@angular/common";
import {SharedData} from "../../core/models/SharedData";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    PieChartComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  olympicsData: Olympic | undefined;
  totalOlympics: number = 0;
  totalCountries: number = 0;
  countryName: string = "";
  medalsNumber: string = "";
  athletesNumber: string = '';
  private subscriptions: Subscription[] = [];

  constructor(
    private olympicService: OlympicService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    const olympicsSub = this.olympicService.getOlympics().subscribe(data => {
      this.olympicsData = data;
      console.log('Olympic Data:', data);
    });
    this.subscriptions.push(olympicsSub);

    const totalOlympicsSub = this.olympicService.getTotalOlympics().subscribe(total => {
      this.totalOlympics = total;
    });
    this.subscriptions.push(totalOlympicsSub);

    const totalCountriesSub = this.olympicService.getTotalCountries().subscribe(total => {
      this.totalCountries = total;
    });
    this.subscriptions.push(totalCountriesSub);

    // Abonnement à un seul observable pour récupérer les données partagées
    const sharedDataSub = this.sharedService.sharedData$.subscribe((sharedData: SharedData) => {
      console.log('Shared Data:', sharedData);
      this.countryName = sharedData.description;
      this.medalsNumber = sharedData.medalsNumber;
      this.athletesNumber = sharedData.athletesNumber;
    });
    this.subscriptions.push(sharedDataSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
