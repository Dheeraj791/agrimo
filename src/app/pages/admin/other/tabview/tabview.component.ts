// import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
 import { Component, OnInit } from '@angular/core';
 import { Subject } from 'rxjs';
 import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
 import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
 import { MasterRecordService } from '../../masterrecords/master-record.service';
 import { Router, ActivatedRoute } from '@angular/router';
 @Component({
  selector: 'app-tabview',
  templateUrl: './tabview.component.html',
  styleUrls: ['./tabview.component.scss']
})
export class TabviewComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  persons: [];
  dtTrigger: any;
  closeResult = '';
  public Editor = ClassicEditor;
   cropMasterRecordList: any;
   selectedMaster :any;
  constructor(private modalService: NgbModal, private masterRecordSevice: MasterRecordService
    ,         private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.masterRecordSevice.getCropMasterRecordLists().subscribe(
      res => {
        console.log(res);
        this.cropMasterRecordList = res;
        const defaultValue = this.cropMasterRecordList[0].name.split(' ')[1].replace(/ /g, '').toLowerCase();
        console.log(defaultValue);
        this.selectedMaster = defaultValue
        this.router.navigate(['crop-master', defaultValue], {relativeTo: this.route});
      }
    );
  }

  ontabClick(value) {
    console.log(value);
    value = value.split(' ')[1].replace(/ /g, '').toLowerCase();
    this.selectedMaster = value;
    this.router.navigate(['crop-master', value], {relativeTo: this.route});
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass : 'myCustomModalClass', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  statusModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
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
