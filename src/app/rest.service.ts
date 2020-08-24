import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  // endpoint = "http://localhost:3100/";
  endpoint = 'http://teczire.com:65528/';
  httpOptions : any;
  constructor(public http : HttpClient) { 

  }

  roomList(params) : Observable<any> {
    return this.http.get<any>(this.endpoint + 'fetch_room_meta_data', params).pipe(
      tap((roomList) => console.log()),
      catchError(this.handleError<any>('roomList'))
    );
  }
  fetch_room_sub_type(params) : Observable<any> { 
    return this.http.get<any>(this.endpoint + 'fetch_room_sub_type/' + params).pipe(
      tap((fetch_room_sub_type) => console.log()),
      catchError(this.handleError<any>('fetch_room_sub_type'))
    );
  }
  fetch_hotel_details(params) : Observable<any> { 
    return this.http.get<any>(this.endpoint + 'fetch_hotel_details/' + params).pipe(
      tap((basic_info) => console.log()),
      catchError(this.handleError<any>('basic_info'))
    );
  }
  fetch_booking_list(params) : Observable<any> {
    return this.http.get<any>(this.endpoint + 'fetch_booking_list', params).pipe(
      tap((fetch_booking_list) => console.log()),
      catchError(this.handleError<any>('fetch_booking_list'))
    );
  }
  fetch_booking(bookingid) : Observable<any> {
    return this.http.get<any>(this.endpoint + 'fetch_booking/'+bookingid).pipe(
      tap((fetch_booking) => console.log()),
      catchError(this.handleError<any>('fetch_booking'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
