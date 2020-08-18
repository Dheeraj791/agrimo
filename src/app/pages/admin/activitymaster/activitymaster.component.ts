import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-activitymaster',
  templateUrl: './activitymaster.component.html',
  styleUrls: ['./activitymaster.component.scss']
})
export class ActivitymasterComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  persons: [];
  dtTrigger: any;
  closeResult = '';
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  open(content) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  statusLog(content) {

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
