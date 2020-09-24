import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MasterRecordService } from '../master-record.service';
@Component({
  selector: 'app-materialmaster',
  templateUrl: './materialmaster.component.html',
  styleUrls: ['./materialmaster.component.scss']
})
export class MaterialmasterComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  persons: [];
  dtTrigger: any;
  closeResult = '';
  public Editor = ClassicEditor;
  activityType = 'materialmaster';
  materialMasterRecords: any;
  constructor(private modalService: NgbModal, private backendService: MasterRecordService) { }

  ngOnInit(): void {
    const data = {
      record_type: this.activityType,
      admin_id: '1',
    };
    this.backendService.fetchActivityMasterRecord(data).subscribe((res) => {
      if (res.status === true) {
        this.materialMasterRecords = res.result;
        console.log(this.materialMasterRecords);
      }
    });
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',windowClass : "myCustomModalClass", size:'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  statusModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:'sm'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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