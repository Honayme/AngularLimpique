import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private descriptionSource : BehaviorSubject<string> = new BehaviorSubject<string>('');
  private medalsNumberSource: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private athletesNumberSource: BehaviorSubject<string> = new BehaviorSubject<string>('');

  currentDescription = this.descriptionSource.asObservable();
  currentMedalsNumber = this.medalsNumberSource.asObservable();
  currentAthletesNumber = this.athletesNumberSource.asObservable();

  changeDescription(description: string): void {
    this.descriptionSource.next(description);
  }

  getMedalsNumber(medalsNumber: string): void {
    this.medalsNumberSource.next(medalsNumber);
  }

  getAthletesNumber(athletesNumber: string): void {
    this.athletesNumberSource.next(athletesNumber);
  }

  resetDescription() {
    this.descriptionSource.next('');
    this.medalsNumberSource.next('');
    this.athletesNumberSource.next('');
  }
}
