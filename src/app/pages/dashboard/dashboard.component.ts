import {Component, OnInit, OnDestroy} from '@angular/core';
import {OlympicService} from "../../core/services/olympic.service";
import {PieChartComponent} from "./pie-chart/pie-chart.component";
import {Subscription} from "rxjs";
import {Olympic} from "../../core/models/Olympic";
import {SharedService} from "../../core/services/shared.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    PieChartComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
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
    private sharedService: SharedService) {
  }

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

    const country = this.sharedService.currentDescription.subscribe(countryName => {
      console.log(countryName);
      this.countryName = countryName;
    });
    this.subscriptions.push(country);

    const athletes = this.sharedService.currentAthletesNumber.subscribe(athletesNumber => {
      console.log(athletesNumber);
      this.athletesNumber = athletesNumber; // Modification ici
    });
    this.subscriptions.push(athletes);

    const medals = this.sharedService.currentMedalsNumber.subscribe(medalsNumber => {
      console.log(medalsNumber);
      this.medalsNumber = medalsNumber; // Ajout ici
    });
    this.subscriptions.push(medals);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
