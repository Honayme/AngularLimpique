import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OlympicService } from './olympic.service';

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
}
