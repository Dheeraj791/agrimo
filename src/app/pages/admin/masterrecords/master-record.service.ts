import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterRecordService {

  constructor(private http: HttpClient) { }

  /* get master record list
  * As of now using dummy json to get data. 
  **/

  getMasterRecordLists(): Observable<any> {
    return this.http.get('assets/master-record-list.json');
  }

  getCropMasterRecordLists(): Observable<any> {
    return this.http.get('assets/crop-master-record-list.json');
  }

}
