import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { MasterRecordService } from '../master-record.service';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
@Component({
  selector: 'app-seasonmaster',
  templateUrl: './seasonmaster.component.html',
  styleUrls: ['./seasonmaster.component.scss']
})
export class SeasonmasterComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  persons: [];
  closeResult = '';
  landMeasurementName: any;
  landMeasurementRecords: any = [];
  activityType = 'mr_season_master';
  singleActivity: any;
  userData = JSON.parse(localStorage.getItem('user_data'));
  statusType = 0;
  statusId = 0;
  mr_com_name = "";
  mr_com_id = "0";
  seasonType = [{
    "name":"Starting",
    "id":"1"
  },{
    "name":"Peak",
    "id":"2"
  },{
    "name":"Closing",
    "id":"3"
  }]
  seasonData  = {
    "season_name":"",
    "start_date":"",
    "end_date":"",
    "season_type":"",
    "status":"1",
    "mr_com_added_by":"1"
  };
  constructor(
    private modalService: NgbModal,
    private backendService: MasterRecordService,
    public spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.fetchData();
  }
  ngAfterViewInit(): void { this.dtTrigger.next(); }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  fetchData() {
    const data = {
      record_type: this.activityType,
      admin_id: '1',
    };
    
    this.backendService.fetchRecords(data).subscribe((res) => {
      if (res.status === true) {
        this.landMeasurementRecords = res.result;
        this.rerender();
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }
  open(content, data) {
    this.landMeasurementName = data.mr_com_name;
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        windowClass: 'myCustomModalClass',
        size: 'lg',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  editModal(content, data) {
    this.singleActivity = data;
    
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        windowClass: 'myCustomModalClass',
        size: 'lg',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  statusModal(content, status, id) {

    this.statusType = status;
    this.statusId = id;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          console.log(reason);
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }


  onAddRecord(form: NgForm) {
    if (form.invalid) {
      return;
    }
   
    const data = new FormData();
    data.append('season_name', this.seasonData.season_name);
    data.append('season_type', this.seasonData.season_type);
    data.append('start_date', moment(this.seasonData.start_date).format('YYYY-MM-DD'));
    data.append('end_date', moment(this.seasonData.end_date).format('YYYY-MM-DD'));
    data.append('status', '1');
    data.append('mr_com_added_by', this.userData[0].user_id);
    this.spinner.show();
    this.backendService.addSeasonMaster(data).subscribe(
      res => {
        if (res.status === true) {
          this.modalService.dismissAll();
          this.seasonData  = {
            "season_name":"",
            "start_date":"",
            "end_date":"",
            "season_type":"",
            "status":"1",
            "mr_com_added_by":"1"
          };
          this.toastr.success(res.message);
          this.fetchData();
        } else {
          this.toastr.error(res.message);
        }
      }
    )
  }

  onUpdateStatus(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      return;
    }
    const data = new FormData();
    data.append('season_id',this.singleActivity.season_id);
    data.append('season_name', this.singleActivity.season_name);
    data.append('season_type', this.singleActivity.season_type);
    data.append('start_date', moment(this.singleActivity.start_date).format('YYYY-MM-DD'));
    data.append('end_date', moment(this.singleActivity.end_date).format('YYYY-MM-DD'));
    data.append('status', '1');
    data.append('mr_com_added_by', this.userData[0].user_id);
    this.spinner.show();
    this.backendService.updateSeasonMaster(data).subscribe(
      res => {
        if (res.status === true) {
          this.modalService.dismissAll();
          this.mr_com_name = "";
          this.toastr.success(res.message);
          this.fetchData();
        } else {
          this.toastr.error(res.message);
        }
      }
    )
  }

  onChangeStatus() {
    let data = this.singleActivity;
    var params = {
      "status": this.statusType,
      "season_id": this.statusId
    }
    this.modalService.dismissAll();
    this.spinner.show();
    this.backendService.updateSeasonStatus(params).subscribe(
      res => {
        if (res.status === true) {
          this.toastr.success(res.message);
          this.fetchData();
        } else {
          this.toastr.success(res.message);
          this.fetchData();
        }
      }
    )
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
