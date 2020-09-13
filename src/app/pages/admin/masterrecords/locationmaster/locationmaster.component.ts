import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-locationmaster',
  templateUrl: './locationmaster.component.html',
  styleUrls: ['./locationmaster.component.scss']
})
export class LocationmasterComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  persons: [];
  dtTrigger: any;
  closeResult = '';
  public Editor = ClassicEditor;
  tab_name = "Country";
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
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
  tabChange(event){
    console.log(event.index)
    
    if(event.index==0){
      this.tab_name = "Country";
    }else if(event.index==1){
      this.tab_name = "State";
    }else if(event.index==2){
      this.tab_name = "District";
    }else if(event.index==3){
      this.tab_name = "Tehsil";
    }else if(event.index==4){
      this.tab_name = "City/Village";
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