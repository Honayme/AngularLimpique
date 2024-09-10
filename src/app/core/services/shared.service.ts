import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {SharedData} from "../models/SharedData";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // Un seul BehaviorSubject pour toutes les données partagées
  private sharedDataSource: BehaviorSubject<SharedData> = new BehaviorSubject<SharedData>({
    description: '',
    medalsNumber: '',
    athletesNumber: ''
  });

  // Observable pour permettre aux composants de s'abonner aux données partagées
  sharedData$ = this.sharedDataSource.asObservable();

  // Méthode pour mettre à jour les données partagées
  updateSharedData(sharedData: SharedData): void {
    this.sharedDataSource.next(sharedData);
  }

  // Méthode pour réinitialiser les données partagées
  resetSharedData(): void {
    this.sharedDataSource.next({
      description: '',
      medalsNumber: '',
      athletesNumber: ''
    });
  }
}
