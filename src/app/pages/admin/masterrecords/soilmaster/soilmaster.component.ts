import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { MasterRecordService } from '../master-record.service';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-soilmaster',
  templateUrl: './soilmaster.component.html',
  styleUrls: ['./soilmaster.component.scss']
})
export class SoilmasterComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  persons: [];
  closeResult = '';
  landMeasurementName: any;
  landMeasurementRecords: any = [];
  activityType = 'soilmaster';
  singleActivity: any;
  userData = JSON.parse(localStorage.getItem('user_data'));
  statusType = 0;
  statusId = 0;
  mr_com_name = "";
  mr_com_id = "0";
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
    this.mr_com_name = data.mr_com_name;
    this.mr_com_id = data.mr_com_id;
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


  onAddLandMeasurement(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const data = new FormData();
    data.append('mr_com_type', this.activityType);
    data.append('mr_com_name', this.landMeasurementName);
    data.append('mr_com_desc', '');
    data.append('mr_com_image', '');
    data.append('mr_com_audio', '');
    data.append('mr_com_video', '');
    data.append('mr_com_status', '1');
    data.append('mr_com_added_by', this.userData[0].user_id);
    this.spinner.show();
    this.backendService.addCommonRecords(data).subscribe(
      res => {
        if (res.status === true) {
          this.modalService.dismissAll();
          this.landMeasurementName = "";
          this.toastr.success(res.message);
          this.fetchData();
        } else {
          this.toastr.error(res.message);
        }
      }
    )
  }

  onUpdateLandMeasurement(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      return;
    }
    const data = new FormData();
    data.append('mr_com_id',this.mr_com_id);
    data.append('mr_com_type', this.activityType);
    data.append('mr_com_name', this.mr_com_name);
    data.append('mr_com_desc', '');
    data.append('mr_com_image', '');
    data.append('mr_com_audio', '');
    data.append('mr_com_video', '');
    data.append('mr_com_status', '1');
    data.append('mr_com_added_by', this.userData[0].user_id);
    this.spinner.show();
    this.backendService.updateCommonRecords(data).subscribe(
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
      "mr_com_status": this.statusType,
      "mr_com_id": this.statusId
    }
    this.modalService.dismissAll();
    this.spinner.show();
    this.backendService.updateCommonStatus(params).subscribe(
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
