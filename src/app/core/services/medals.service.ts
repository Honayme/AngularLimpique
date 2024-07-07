import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OlympicService } from './olympic.service';
import {Olympic} from "../models/Olympic";
import {Participation} from "../models/Participation";


@Injectable({
  providedIn: 'root'
})
export class MedalsService {
  constructor(private olympicService: OlympicService) {}

  getParticipationData(): Observable<{ y: number, name: string }[]> {
    return this.olympicService.getOlympics().pipe(
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
}
