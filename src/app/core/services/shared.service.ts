import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private descriptionSource = new BehaviorSubject<string>('');
  currentDescription = this.descriptionSource.asObservable();

  changeDescription(description: string) {
    this.descriptionSource.next(description);
  }

  resetDescription() {
    this.descriptionSource.next(''); // Réinitialiser la description
  }
}
