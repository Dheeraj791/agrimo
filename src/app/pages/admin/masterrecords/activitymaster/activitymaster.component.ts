import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { MasterRecordService } from "../master-record.service";
import { FormGroup, NgForm } from "@angular/forms";

@Component({
  selector: "app-activitymaster",
  templateUrl: "./activitymaster.component.html",
  styleUrls: ["./activitymaster.component.scss"],
})
export class ActivitymasterComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  persons: [];
  dtTrigger: any;
  closeResult = "";
  public Editor = ClassicEditor;
  activityMasterRecords: any = [];
  singleActivity: any;
  activityName: any;
  selectedActivityType: any = "General Activity";
  description: any = "<p>Hello, world!</p>";
  userData = JSON.parse(localStorage.getItem("user_data"));
  constructor(
    private modalService: NgbModal,
    private backendService: MasterRecordService
  ) {}

  ngOnInit(): void {
    const data = {
      record_type: "activities",
      admin_id: "1",
    };
    this.backendService.fetchActivityMasterRecord(data).subscribe((res) => {
      if(res.status === true) {
        this.activityMasterRecords = res.result;
      }
    });
  }
  open(content, data) {
    this.singleActivity = data;
    this.modalService
      .open(content, {
        ariaLabelledBy: "modal-basic-title",
        windowClass: "myCustomModalClass",
        size: "lg",
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
  statusModal(content, list) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", size: "sm" })
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
  }

  onAddActivity(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const data = {
      mr_activity_name: this.activityName,
      mr_activity_type: this.selectedActivityType,
      mr_activity_desc: this.description,
      mr_activity_status: 1,
      mr_activity_added_by: this.userData[0].user_id,
    };
    console.log(data);
    this.backendService.addActivityMasterRecord(data).subscribe(
      res => {
        console.log(res);
      }
    )
  }
}
