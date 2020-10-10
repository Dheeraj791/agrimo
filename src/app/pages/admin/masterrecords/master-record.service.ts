import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterRecordService {
  baseUrl = 'http://teczire.com:65530/api/v1/';
  // baseUrl = 'http://localhost:3001/api/v1/'
  httpOptions = {};

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
    return this.http.post(this.baseUrl+'fetch_records', data, this.httpOptions);
  }

  fetchRecords(data): Observable<any> {
    return this.http.post(this.baseUrl+'fetch_records', data, this.httpOptions);
  }

  addSeasonMaster(data) :Observable<any> {
    return this.http.post(this.baseUrl+'add_season_master', data, this.httpOptions);
  } 
  
  updateCommonStatus(data): Observable<any> {
    return this.http.post(this.baseUrl+'change_status_common', data, this.httpOptions);
  }

  updateSeasonMaster(data): Observable<any> {
    return this.http.put(this.baseUrl+'update_season_master', data, this.httpOptions);
  }

  updateSeasonStatus(data): Observable<any> {
    return this.http.put(this.baseUrl+'change_season_status', data, this.httpOptions);
  }

  addQaMaster(data): Observable<any> {
    return this.http.post(this.baseUrl+'add_qa_master', data, this.httpOptions);
  }

  updateQaMaster(data): Observable<any> {
    return this.http.put(this.baseUrl+'update_qa_master', data, this.httpOptions);
  }

  updateQaStatus(data): Observable<any> {
    return this.http.put(this.baseUrl+'change_qa_status', data, this.httpOptions);
  }

  updatePlantationStatus(data): Observable<any> {
    return this.http.put(this.baseUrl+'change_plantation_status', data, this.httpOptions);
  }

  updateCommonRecords(data): Observable<any> {
    return this.http.put(this.baseUrl+'update_common_records', data, this.httpOptions);
  }

  updatePlantationRecords(data): Observable<any> {
    return this.http.put(this.baseUrl+'update_plantation_records', data, this.httpOptions);
  }

  
  fetchPlantationMaster(data): Observable<any> {
    return this.http.post(this.baseUrl+'fetch_records', data, this.httpOptions);
  }

  fetchPlantationRecords(data): Observable<any> {
    return this.http.post(this.baseUrl+'fetch_records', data, this.httpOptions);
  }

  addActivityMasterRecord(data): Observable<any> {
    return this.http.post(this.baseUrl + 'add_master_activity', data, this.httpOptions);
  }

  addCommonRecords(data): Observable<any> {
    return this.http.post(this.baseUrl + 'add_records_common', data, this.httpOptions);
  }

  addCropFamily(data): Observable<any> {
    return this.http.post(this.baseUrl + 'add_crop_family', data, this.httpOptions);
  }

  updateCropFamily(data): Observable<any> {
    return this.http.put(this.baseUrl+'update_crop_family', data, this.httpOptions);
  }
  
  chageFamilyStatus(data): Observable<any> {
    return this.http.put(this.baseUrl+'change_crop_family_status', data, this.httpOptions);
  }

  addCropStage(data): Observable<any> {
    return this.http.post(this.baseUrl + 'add_crop_stage', data, this.httpOptions);
  }

  updateCropStage(data): Observable<any> {
    return this.http.put(this.baseUrl+'update_crop_stage', data, this.httpOptions);
  }
  
  chageCropStageStatus(data): Observable<any> {
    return this.http.put(this.baseUrl+'change_crop_stage_status', data, this.httpOptions);
  }

  
  addCropCategory(data): Observable<any> {
    return this.http.post(this.baseUrl + 'add_crop_category', data, this.httpOptions);
  }

  updateCropCategory(data): Observable<any> {
    return this.http.put(this.baseUrl+'update_crop_category', data, this.httpOptions);
  }
  
  chageCropCategoryStatus(data): Observable<any> {
    return this.http.put(this.baseUrl+'change_crop_category_status', data, this.httpOptions);
  }

  addPlantationRecords(data): Observable<any> {
    return this.http.post(this.baseUrl+'add_master_plantation', data, this.httpOptions);
  }

  updateRecordStatus(data): Observable<any> {
    return this.http.post('http://teczire.com:65530/api/v1/change_record_status', data, this.httpOptions);
  }

  updateRecord(data): Observable<any> {
    return this.http.post('http://teczire.com:65530/api/v1/change_record_status', data, this.httpOptions);
  }

}
