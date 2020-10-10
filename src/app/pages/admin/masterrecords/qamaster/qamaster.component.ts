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
  selector: 'app-qamaster',
  templateUrl: './qamaster.component.html',
  styleUrls: ['./qamaster.component.scss']
})
export class QamasterComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  persons: [];
  closeResult = '';
  landMeasurementName: any;
  landMeasurementRecords: any = [];
  activityType = 'qa_records';
  singleActivity: any;
  userData = JSON.parse(localStorage.getItem('user_data'));
  statusType = 0;
  statusId = 0;
  mr_com_name = "";
  mr_com_id = "0";
  qaSubjects = []
  qaData = {
    "subject": "",
    "question": "",
    "answer": "",
    "qa_status": "1",
    "added_by": ""
  }

  constructor(
    private modalService: NgbModal,
    private backendService: MasterRecordService,
    public spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

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
      console.log(res.result)
      if (res.status === true) {
        this.landMeasurementRecords = res.result;
        
        this.rerender();
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
      this.getSubjects();
    });
  }
  getSubjects() {
    this.backendService.fetchRecords({ record_type: "qa_subjects" }).subscribe((res) => {
      if (res.status === true) {
        this.qaSubjects = res.result;
        console.log('qaSubjects',this.qaSubjects)
      } else {

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
    data.append('subject', this.qaData.subject);
    data.append('question', this.qaData.question);
    data.append('answer', this.qaData.answer);
    data.append('qa_status', '1');
    data.append('added_by', this.userData[0].user_id);
    this.spinner.show();
    this.backendService.addQaMaster(data).subscribe(
      res => {
        if (res.status === true) {
          this.modalService.dismissAll();
          this.qaData = {
            "subject": "",
            "question": "",
            "answer": "",
            "qa_status": "1",
            "added_by": ""
          };
          this.toastr.success(res.message);
          this.fetchData();
        } else {
          this.toastr.error(res.message);
        }
      }
    )
  }

  onUpdateRecord(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const data = new FormData();
    data.append('qa_id', this.singleActivity.qa_id);
    data.append('subject', this.singleActivity.subject);
    data.append('question', this.singleActivity.question);
    data.append('answer', this.singleActivity.answer);
    data.append('qa_status', '1');
    data.append('added_by', this.userData[0].user_id);
    this.spinner.show();
    this.backendService.updateQaMaster(data).subscribe(
      res => {
        if (res.status === true) {
          this.modalService.dismissAll();
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
      "qa_status": this.statusType,
      "qa_id": this.statusId
    }
    this.modalService.dismissAll();
    this.spinner.show();
    this.backendService.updateQaStatus(params).subscribe(
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
