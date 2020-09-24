import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterRecordService {
  baseUrl = 'http://teczire.com:65530/api/v1/';
  httpOptions: any;

  constructor(private http: HttpClient) {
  }

  /* get master record list
  * As of now using dummy json to get data. 
  **/

  getMasterRecordLists(): Observable<any> {
    return this.http.get('assets/master-record-list.json');
  }

  getCropMasterRecordLists(): Observable<any> {
    return this.http.get('assets/crop-master-record-list.json');
  }

  fetchActivityMasterRecord(data): Observable<any> {
    return this.http.post('http://teczire.com:65530/api/v1/fetch_records', data, this.httpOptions);
  }

  fetchPlantationRecords(data): Observable<any> {
    return this.http.post('http://teczire.com:65530/api/v1/fetch_records', data, this.httpOptions);
  }

  addActivityMasterRecord(data): Observable<any> {
    return this.http.post(this.baseUrl + 'add_master_activity', data, this.httpOptions);
  }

  addCommonRecords(data): Observable<any> {
    return this.http.post('http://teczire.com:65530/api/v1/add_records_common', data, this.httpOptions);
  }

  addPlantationRecords(data): Observable<any> {
    return this.http.post('http://teczire.com:65530/api/v1/add_master_plantation', data, this.httpOptions);
  }

  updateRecordStatus(data): Observable<any> {
    return this.http.post('http://teczire.com:65530/api/v1/change_record_status', data, this.httpOptions);
  }

  updateRecord(data): Observable<any> {
    return this.http.post('http://teczire.com:65530/api/v1/change_record_status', data, this.httpOptions);
  }

}
