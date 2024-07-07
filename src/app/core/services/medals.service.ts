import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OlympicService } from './olympic.service';
import {Olympic} from "../models/Olympic";


@Injectable({
  providedIn: 'root'
})
export class MedalsService {
  constructor(private olympicService: OlympicService) {}

  getParticipationData(): Observable<{ y: number, name: string }[]> {
    return this.olympicService.getOlympics().pipe(
      map((data: Olympic[]) => {
        return data.map(country => ({
          y: country.participations.length,
          name: country.country
        }));
      })
    );
  }
}
