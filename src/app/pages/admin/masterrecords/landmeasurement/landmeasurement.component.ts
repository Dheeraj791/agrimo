import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgForm } from '@angular/forms';
import { MasterRecordService } from '../master-record.service';

@Component({
  selector: 'app-landmeasurement',
  templateUrl: './landmeasurement.component.html',
  styleUrls: ['./landmeasurement.component.scss'],
})
export class LandmeasurementComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  persons: [];
  dtTrigger: any;
  closeResult = '';
  public Editor = ClassicEditor;
  landMeasurementName: any;
  landMeasurementRecords: any = [];
  activityType = 'landmeasurement';
  userData = JSON.parse(localStorage.getItem('user_data'));
  constructor(
    private modalService: NgbModal,
    private backendService: MasterRecordService
  ) {}

  ngOnInit(): void {
    const data = {
      record_type: this.activityType,
      admin_id: '1',
    };
    this.backendService.fetchActivityMasterRecord(data).subscribe((res) => {
      if (res.status === true) {
        this.landMeasurementRecords = res.result;
        console.log(this.landMeasurementRecords);
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
  statusModal(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
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
    this.backendService.addCommonRecords(data).subscribe(
      res => {
        console.log(res);
        this.modalService.dismissAll();
      }
    )
  }

  onUpdateLandMeasurement(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      return;
    }
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
