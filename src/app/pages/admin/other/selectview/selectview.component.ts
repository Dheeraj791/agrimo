import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MasterRecordService } from '../../masterrecords/master-record.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-selectview',
  templateUrl: './selectview.component.html',
  styleUrls: ['./selectview.component.scss']
})
export class SelectviewComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  persons: [];
  dtTrigger: any;
  closeResult = '';
  public Editor = ClassicEditor;
  masterRecordList: any = [];
  selectedMaster: string;
  constructor(private modalService: NgbModal, private masterRecordService: MasterRecordService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.masterRecordService.getMasterRecordLists().subscribe(
      res => {
        this.masterRecordList = res;
        this.selectedMaster = this.masterRecordList[0].name;
        this.router.navigate(['master'], {relativeTo: this.route});
      }
    );
  }

  onMasterRecordListChange(event) {
   this.selectedMaster = event.value;
   let selectedValue = this.selectedMaster.split(' ').slice(0, -1).join(' ').replace(/ /g, '').toLowerCase();
   this.router.navigate(['master', selectedValue], {relativeTo: this.route});
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass : 'myCustomModalClass', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  statusModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
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
