import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OlympicService } from './olympic.service';
import {Olympic} from "../models/Olympic";
import {Participation} from "../models/Participation";

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private olympicService: OlympicService) {}

  // Récupérer le nombre total de JO
  getTotalOlympics(): Observable<number> {
    return this.olympicService.getOlympics().pipe(
      map((data) => {
        //The set type is here to guarantee the element's unicity, but it's not necessary here
        const years = new Set<number>();
        data.forEach((country: any) => {
          country.participations.forEach((participation: any) => {
            years.add(participation.year);
          });
        });
        return years.size;
      })
    );
  }

  // Récupérer le nombre total de pays participants
  getTotalCountries(): Observable<number> {
    return this.olympicService.getOlympics().pipe(
      map((data) => data.length)
    );
  }

  // Récupérer le nombre de participations par pays
  getCountryParticipationDetails(countryName: string): Observable<{ label: string, y: number }[]> {
    return this.olympicService.getOlympics().pipe(
      map((data: Olympic[]) => {
        const country = data.find(c => c.country === countryName);
        return country ? country.participations.map((participation: Participation) => ({
          label: participation.year.toString(),
          y: participation.medalsCount
        })) : [];
      })
    );
  }

  // Récupérer le nombre total d'athlètes par pays
  getCountryTotalAthletes(): Observable<{ country: string, athletes: number }[]> {
    return this.olympicService.getOlympics().pipe(
      map((data: Olympic[]) => {
        return data.map(country => {
          const totalAthletes = country.participations.reduce((sum: number, participation: Participation) => sum + participation.athleteCount, 0);
          return {
            country: country.country,
            athletes: totalAthletes
          };
        });
      })
    );
  }
}
