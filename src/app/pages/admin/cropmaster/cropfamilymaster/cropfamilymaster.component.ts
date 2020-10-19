import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { MasterRecordService } from '../../masterrecords/master-record.service';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cropfamilymaster',
  templateUrl: './cropfamilymaster.component.html',
  styleUrls: ['./cropfamilymaster.component.scss']
})
export class CropfamilymasterComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  persons: [];
  closeResult = '';
  landMeasurementName: any;
  landMeasurementRecords: any = [];
  activityType = 'crop_family_master';
  singleActivity: any;
  userData = JSON.parse(localStorage.getItem('user_data'));
  statusType = 0;
  statusId = 0;
  cf_name = "";
  cf_id = "0";
  
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
    this.cf_name = data.cf_name;
    this.cf_id = data.cf_id;
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
    data.append('cf_name', this.cf_name);
    data.append('status', '1');
    data.append('cf_added_by', this.userData[0].user_id);
    this.spinner.show();
    this.backendService.addCropFamily(data).subscribe(
      res => {
        if (res.status === true) {
          this.modalService.dismissAll();
          this.cf_name = "";
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
    data.append('cf_id',this.cf_id);
    data.append('cf_name', this.cf_name);
    data.append('status', '1');
    data.append('cf_added_by', this.userData[0].user_id);
    this.spinner.show();
    this.backendService.updateCropFamily(data).subscribe(
      res => {
        if (res.status === true) {
          this.modalService.dismissAll();
          this.cf_name = "";
          this.cf_id="0";
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
      "cf_id": this.statusId
    }
    this.modalService.dismissAll();
    this.spinner.show();
    this.backendService.chageFamilyStatus(params).subscribe(
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
