import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, switchMap} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Olympic} from "../models/Olympic";
import {Participation} from "../models/Participation";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.loadInitialData().subscribe();
  }


  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getParticipationData(): Observable<{ y: number, name: string }[]> {
    return this.getOlympics().pipe(
      map((data: Olympic[]) => {
        return data.map(country => {
          const totalMedals = country.participations.reduce((sum: number, participation: Participation) => sum + participation.medalsCount, 0);
          return {
            y: totalMedals,
            name: country.country
          };
        });
      })
    );
  }

  getOlympics(): Observable<any> {
    // Ensure data is loaded before returning observable
    if (this.olympics$.value) {
      //of is an operator of creation for observable in RXJS
      return of(this.olympics$.value);
    } else {
      //if no data we're calling the initializer
      return this.loadInitialData().pipe(
        switchMap(() => this.olympics$.asObservable())
      );
    }
  }

  getTotalOlympics(): Observable<number> {
    return this.getOlympics().pipe(
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
    return this.getOlympics().pipe(
      map((data) => data.length)
    );
  }

  // Récupérer le nombre de participations par pays
  getCountryParticipationDetails(countryName: string): Observable<{ label: string, y: number }[]> {
    return this.getOlympics().pipe(
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
    return this.getOlympics().pipe(
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
