import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, switchMap} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
}
