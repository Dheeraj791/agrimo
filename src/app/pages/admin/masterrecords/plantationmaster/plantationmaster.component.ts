import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MasterRecordService } from '../master-record.service';
import { FormGroup, NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-plantationmaster',
  templateUrl: './plantationmaster.component.html',
  styleUrls: ['./plantationmaster.component.scss']
})
export class PlantationmasterComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  persons: [];
  closeResult = '';

  showformvalue = 1;
  plantationRecords = [];
  url = "";

  plantation_name = "";
  irrigation_type = "";
  bed_image = "";
  bed_audio = "";
  bed_video = "";
  bed_desc = "";
  bed_detailsRow = [
    {
      "detail_name": "",
      "detail_id": 1,
      "control": "add"
    }
  ];
  bed_detailsRowLen = 1;
  bed_image_status = "0";
  bed_image_flag = "No image selected";
  bed_audio_flage = "No audio selected"
  bed_audio_status = "0";

  crop_image = "";
  crop_audio = "";
  crop_video = "";
  crop_desc = "";
  crop_detailsRow = [
    {
      "detail_name": "",
      "detail_id": 1,
      "control": "add"
    }
  ];
  crop_detailsRowLen = 1;
  crop_image_status = "0";
  crop_image_flag = "No image selected";
  crop_audio_flage = "No audio selected"
  crop_audio_status = "0";

  irr_image = "";
  irr_audio = "";
  irr_video = "";
  irr_desc = "";
  irr_detailsRow = [
    {
      "detail_name": "",
      "detail_id": 1,
      "control": "add"
    }
  ];
  irr_detailsRowLen = 1;
  irr_image_status = "0";
  irr_image_flag = "No image selected";
  irr_audio_flage = "No audio selected"
  irr_audio_status = "0";

  userData = JSON.parse(localStorage.getItem('user_data'));
  singleRecord: any;
  plantation_id="0";
  bed_id = 0;
  crop_id = 0;
  irr_ir = 0;

 globlaBedRecord :any;
 globlaCropRecord :any;
 globlaIrrRecord :any;

 statusType:any;
 statusId : any;

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
      record_type: 'plantation_master',
      admin_id: '1',
    };
    this.backendService.fetchPlantationMaster(data).subscribe((res) => {
      if (res.status === true) {
        this.plantationRecords = res.result;
        this.url = res.url;
        this.rerender();
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }

  open(content) {
   var flag = this.clearFields();
   if(flag===true){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'lg' }).result.then((result) => {
      var flag = this.clearFields();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      var flag = this.clearFields();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  }

  statusModal(content, status, id) {
    this.statusType = status;
    this.statusId = id;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  clearFields(){
    console.log("called");
    this.showformvalue = 1;
    this.bed_audio_status = "0";
    this.bed_audio = "";
    this.crop_image_status = "0";
    this.crop_image = "";
    this.crop_audio_status = "0";
    this.crop_audio = "";
    this.irr_image_status = "0";
    this.irr_image = "";
    this.irr_audio_status = "0";
    this.irr_audio = "";
    this.bed_audio_flage = "No file selected"
    this.crop_audio_flage = "No file selected"
    this.irr_audio_flage = "No file selected"
    this.bed_image_flag = "No file selected"
    this.crop_image_flag = "No file selected"
    this.irr_image_flag = "No file selected"
    this.plantation_name = "";
    this.irrigation_type = "";
    this.bed_desc = "";
    this.bed_video = "";
    this.bed_detailsRow = [{
      "detail_name": "",
      "detail_id": 1,
      "control": "add"
    }];
    this.bed_detailsRowLen = 1;
    this.crop_desc = "";
    this.crop_video = "";
    this.crop_detailsRow = [{
      "detail_name": "",
      "detail_id": 1,
      "control": "add"
    }];
    this.crop_detailsRowLen = 1;
    this.irr_desc = "";
    this.irr_video = "";
    this.irr_detailsRow = [{
      "detail_name": "",
      "detail_id": 1,
      "control": "add"
    }];
    this.irr_detailsRowLen = 1;
    return true;
  }
  editModal(content, list) {
    this.showformvalue = 1;
    this.spinner.show();
    this.singleRecord=list;
    this.plantation_id=list.plantation_id;
    const data = {
      record_type: 'plantation_records',
      plantation_id: list.plantation_id,
    };
    this.backendService.fetchPlantationRecords(data).subscribe((res) => {
      if (res.status === true) {
        this.clearFields();
        
        this.plantation_name = this.singleRecord.plantation_name;
        this.irrigation_type = this.singleRecord.irrigation_type;

        var bedRecords = res.result[0];
        var cropRecords = res.result[1];
        var irrRecords = res.result[2];
        this.globlaBedRecord = res.result[0];
        this.globlaCropRecord = res.result[1];
        this.globlaIrrRecord = res.result[2];

        this.bed_id = bedRecords.plantation_doc_id;
        this.crop_id = cropRecords.plantation_doc_id;
        this.irr_ir = irrRecords.plantation_doc_id;

        //bed starts here
        if (bedRecords.plantation_img != "") {
          this.bed_image_status = "1";
          this.bed_image = bedRecords.plantation_img;
        } else {
          this.bed_image_status = "0";
          this.bed_image = "";
        }

        if (bedRecords.plantation_audio != "") {
          this.bed_audio_status = "1";
          this.bed_audio = bedRecords.plantation_audio;
        } else {
          this.bed_audio_status = "0";
          this.bed_audio = "";
        }

        if (bedRecords.plantation_video_link != "") {
          this.bed_video = bedRecords.plantation_video_link;
        } else {
          this.bed_video = "";
        }

        if (bedRecords.description != "") {
          this.bed_desc = bedRecords.description;
        } else {
          this.bed_desc = "";
        }

        if (bedRecords.pointers != "") {
          var temp = bedRecords.pointers.split(',');
          this.bed_detailsRow = [];
          for (let index = 0; index < temp.length; index++) {
            var pd = {
              "detail_name": temp[index],
              "detail_id": index,
              "control": "add"
            };
            this.bed_detailsRow.push(pd)
            this.bed_detailsRowLen = this.bed_detailsRow.length;
          }
        } else {
          this.bed_detailsRow = [
            {
              "detail_name": "",
              "detail_id": 1,
              "control": "add"
            }
          ];
          this.bed_detailsRowLen = 1;
        }

        //crop starts here
        if (cropRecords.plantation_img != "") {
          this.crop_image_status = "1";
          this.crop_image = cropRecords.plantation_img;
        } else {
          this.crop_image_status = "0";
          this.crop_image = "";
        }

        if (cropRecords.plantation_audio != "") {
          this.crop_audio_status = "1";
          this.crop_audio = cropRecords.plantation_audio;
        } else {
          this.crop_audio_status = "0";
          this.crop_audio = "";
        }

        if (cropRecords.plantation_video_link != "") {
          this.crop_video = cropRecords.plantation_video_link;
        } else {
          this.crop_video = "";
        }

        if (cropRecords.description != "") {
          this.crop_desc = cropRecords.description;
        } else {
          this.crop_desc = "";
        }

        if (cropRecords.pointers != "") {
          var temp = cropRecords.pointers.split(',');
          this.crop_detailsRow = [];
          for (let index = 0; index < temp.length; index++) {
            var pd = {
              "detail_name": temp[index],
              "detail_id": index,
              "control": "add"
            };
            this.crop_detailsRow.push(pd)
            this.crop_detailsRowLen = this.crop_detailsRow.length;
          }
        } else {
          this.crop_detailsRow = [
            {
              "detail_name": "",
              "detail_id": 1,
              "control": "add"
            }
          ];
          this.crop_detailsRowLen = 1;
        }

        //irrigation records here 
        if (irrRecords.plantation_img != "") {
          this.irr_image_status = "1";
          this.irr_image = irrRecords.plantation_img;
        } else {
          this.irr_image_status = "0";
          this.irr_image = "";
        }

        if (irrRecords.plantation_audio != "") {
          this.irr_audio_status = "1";
          this.irr_audio = irrRecords.plantation_audio;
        } else {
          this.irr_audio_status = "0";
          this.irr_audio = "";
        }

        if (irrRecords.plantation_video_link != "") {
          this.irr_video = irrRecords.plantation_video_link;
        } else {
          this.irr_video = "";
        }

        if (irrRecords.description != "") {
          this.irr_desc = irrRecords.description;
        } else {
          this.irr_desc = "";
        }

        if (irrRecords.pointers != "") {
          var temp = irrRecords.pointers.split(',');
          this.irr_detailsRow = [];
          for (let index = 0; index < temp.length; index++) {
            var pd = {
              "detail_name": temp[index],
              "detail_id": index,
              "control": "add"
            };
            this.irr_detailsRow.push(pd)
            this.irr_detailsRowLen = this.irr_detailsRow.length;
          }
        } else {
          this.irr_detailsRow = [
            {
              "detail_name": "",
              "detail_id": 1,
              "control": "add"
            }
          ];
          this.irr_detailsRowLen = 1;
        }

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
          this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });

  }

  private getDismissReason(reason: any): string {
    var flag = this.clearFields();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  showForm(num) {
    this.showformvalue = num;
  }

  bed_add(index) {
    var data = {
      "detail_name": "",
      "detail_id": index + 1 + 1,
      "control": "add"
    }
    this.bed_detailsRow.push(data);
    this.bed_detailsRowLen = this.bed_detailsRow.length;
  }

  bed_deleteRow(data, index) {
    var removeIndex = this.bed_detailsRow.map(function (item) { return item.detail_id; }).indexOf(index);
    this.bed_detailsRow.splice(removeIndex, 1);
    this.bed_detailsRowLen = this.bed_detailsRow.length;
  }

  crop_add(index) {
    var data = {
      "detail_name": "",
      "detail_id": index + 1 + 1,
      "control": "add"
    }
    this.crop_detailsRow.push(data);
    this.crop_detailsRowLen = this.crop_detailsRow.length;
  }

  crop_deleteRow(data, index) {
    var removeIndex = this.crop_detailsRow.map(function (item) { return item.detail_id; }).indexOf(index);
    this.crop_detailsRow.splice(removeIndex, 1);
    this.crop_detailsRowLen = this.crop_detailsRow.length;
  }

  irr_add(index) {
    var data = {
      "detail_name": "",
      "detail_id": index + 1 + 1,
      "control": "add"
    }
    this.irr_detailsRow.push(data);
    this.irr_detailsRowLen = this.irr_detailsRow.length;
  }

  irr_deleteRow(data, index) {
    var removeIndex = this.irr_detailsRow.map(function (item) { return item.detail_id; }).indexOf(index);
    this.irr_detailsRow.splice(removeIndex, 1);
    this.irr_detailsRowLen = this.irr_detailsRow.length;
  }

  imageUpload(event, type) {
    if (type === 'bed') {
      const file = event.target.files[0];
      this.bed_image = file;
      this.bed_image_flag = "1 File selected";
      console.log(file);
      this.bed_image_status = "1";
    } else if (type === 'crop') {
      const file = event.target.files[0];
      this.crop_image = file;
      this.crop_image_flag = "1 File selected";
      console.log(file);
      this.crop_image_status = "1";
    } else if (type === 'irr') {
      const file = event.target.files[0];
      this.irr_image = file;
      this.irr_image_flag = "1 File selected";
      console.log(file);
      this.irr_image_status = "1";
    }
  }

  audioUpload(event, type) {
    if (type === 'bed') {
      const file = event.target.files[0];
      this.bed_audio = file;
      this.bed_audio_flage = "1 File selected";
      console.log(file);
      this.bed_audio_status = "1";
    } else if (type === 'crop') {
      const file = event.target.files[0];
      this.crop_audio = file;
      this.crop_audio_flage = "1 File selected";
      console.log(file);
      this.crop_audio_status = "1";
    } else if (type === 'irr') {
      const file = event.target.files[0];
      this.irr_audio = file;
      this.irr_audio_flage = "1 File selected";
      console.log(file);
      this.irr_audio_status = "1";
    }
  }

  onAddActivity(form: NgForm) {
    
    if (form.invalid) {
      return;
    }
    var temp = [];
    for (let index = 0; index < this.bed_detailsRow.length; index++) {
      temp.push(this.bed_detailsRow[index]['detail_name'])
    }
    var bed_pointers = temp.toString();

    var temp2 = [];
    for (let index = 0; index < this.crop_detailsRow.length; index++) {
      temp2.push(this.crop_detailsRow[index]['detail_name'])
    }
    var crop_pointers = temp2.toString();

    var temp3 = [];
    for (let index = 0; index < this.irr_detailsRow.length; index++) {
      temp3.push(this.irr_detailsRow[index]['detail_name'])
    }
    var irr_pointers = temp3.toString();

    var finalData = [
      {
        "plantation_record_type": "bed_preparation",
        "plantation_id": "",
        "plantation_img": "",
        "plantation_audio": "",
        "plantation_video_link": this.bed_video,
        "status": "1",
        "value": "1",
        "description": this.bed_desc,
        "pointers": bed_pointers
      }, {
        "plantation_record_type": "crop_preparation",
        "plantation_id": "",
        "plantation_img": "",
        "plantation_audio": "",
        "plantation_video_link": this.crop_video,
        "status": "1",
        "value": "2",
        "description": this.crop_desc,
        "pointers": crop_pointers
      }, {
        "plantation_record_type": "irr_preparation",
        "plantation_id": "",
        "plantation_img": "",
        "plantation_audio": "",
        "plantation_video_link": this.irr_video,
        "status": "1",
        "value": "3",
        "description": this.irr_desc,
        "pointers": irr_pointers
      }
    ];

    const data = new FormData();
    if (this.bed_image_status === "1") {
      data.append('bed_image', this.bed_image);
    }
    if (this.bed_audio_status === "1") {
      data.append('bed_audio', this.bed_audio);
    }
    if (this.crop_image_status === "1") {
      data.append('crop_image', this.crop_image);
    }
    if (this.crop_audio_status === "1") {
      data.append('crop_audio', this.crop_audio);
    }
    if (this.irr_image_status === "1") {
      data.append('irr_image', this.irr_image);
    }
    if (this.irr_audio_status === "1") {
      data.append('irr_audio', this.irr_audio);
    }

    data.append('bed_image_status', this.bed_image_status);
    data.append('crop_image_status', this.crop_image_status);
    data.append('irr_image_status', this.irr_image_status);
    data.append('bed_audio_status', this.bed_audio_status);
    data.append('crop_audio_status', this.crop_audio_status);
    data.append('irr_audio_status', this.irr_audio_status);


    data.append('plantation_name', this.plantation_name);
    data.append('irrigation_type', this.irrigation_type);
    data.append('data', JSON.stringify(finalData));
    data.append('status', '1');
    data.append('mr_com_added_by', this.userData[0].user_id);
    // this.spinner.show();
    this.backendService.addPlantationRecords(data).subscribe(
      res => {
        if (res.status === true) {
          this.modalService.dismissAll();
          this.toastr.success(res.message);
          this.plantation_name = "";
          this.irrigation_type = "";
          this.bed_image_status = "0";
          this.bed_image = "";
          this.bed_audio_status = "0";
          this.bed_audio = "";
          this.crop_image_status = "0";
          this.crop_image = "";
          this.crop_audio_status = "0";
          this.crop_audio = "";
          this.irr_image_status = "0";
          this.irr_image = "";
          this.irr_audio_status = "0";
          this.irr_audio = "";
          this.bed_audio_flage = "No file selected"
          this.crop_audio_flage = "No file selected"
          this.irr_audio_flage = "No file selected"
          this.bed_image_flag = "No file selected"
          this.crop_image_flag = "No file selected"
          this.irr_image_flag = "No file selected"
          this.fetchData();
        } else {
          this.toastr.error(res.message);
        }
      }
    );
  }
  onUpdateRecord(form: NgForm) {
    if (form.invalid) {
      return;
    }
    var temp = [];
    for (let index = 0; index < this.bed_detailsRow.length; index++) {
      temp.push(this.bed_detailsRow[index]['detail_name'])
    }
    var bed_pointers = temp.toString();

    var temp2 = [];
    for (let index = 0; index < this.crop_detailsRow.length; index++) {
      temp2.push(this.crop_detailsRow[index]['detail_name'])
    }
    var crop_pointers = temp2.toString();

    var temp3 = [];
    for (let index = 0; index < this.irr_detailsRow.length; index++) {
      temp3.push(this.irr_detailsRow[index]['detail_name'])
    }
    var irr_pointers = temp3.toString();

    var finalData = [
      {
        "plantation_doc_id":this.bed_id,
        "plantation_record_type": "bed_preparation",
        "plantation_id": this.globlaBedRecord.plantation_id,
        "plantation_img": this.globlaBedRecord.plantation_img,
        "plantation_audio": this.globlaBedRecord.plantation_audio,
        "plantation_video_link": this.bed_video,
        "status": "1",
        "value": "1",
        "description": this.bed_desc,
        "pointers": bed_pointers
      }, {
        "plantation_doc_id":this.crop_id,
        "plantation_record_type": "crop_preparation",
        "plantation_id": this.globlaCropRecord.plantation_id,
        "plantation_img": this.globlaCropRecord.plantation_img,
        "plantation_audio": this.globlaCropRecord.plantation_audio,
        "plantation_video_link": this.crop_video,
        "status": "1",
        "value": "2",
        "description": this.crop_desc,
        "pointers": crop_pointers
      }, {
        "plantation_doc_id":this.irr_ir,
        "plantation_record_type": "irr_preparation",
        "plantation_id": this.globlaIrrRecord.plantation_id,
        "plantation_img": this.globlaIrrRecord.plantation_img,
        "plantation_audio": this.globlaIrrRecord.plantation_audio,
        "plantation_video_link": this.irr_video,
        "status": "1",
        "value": "3",
        "description": this.irr_desc,
        "pointers": irr_pointers
      }
    ];

    const data = new FormData();
    if (this.bed_image_status === "1") {
      data.append('bed_image', this.bed_image);
    }
    if (this.bed_audio_status === "1") {
      data.append('bed_audio', this.bed_audio);
    }
    if (this.crop_image_status === "1") {
      data.append('crop_image', this.crop_image);
    }
    if (this.crop_audio_status === "1") {
      data.append('crop_audio', this.crop_audio);
    }
    if (this.irr_image_status === "1") {
      data.append('irr_image', this.irr_image);
    }
    if (this.irr_audio_status === "1") {
      data.append('irr_audio', this.irr_audio);
    }
   
    data.append('plantation_doc_id', "this.bed_image_status");
    data.append('plantation_id', this.plantation_id);
    data.append('bed_image_status', this.bed_image_status);
    data.append('crop_image_status', this.crop_image_status);
    data.append('irr_image_status', this.irr_image_status);
    data.append('bed_audio_status', this.bed_audio_status);
    data.append('crop_audio_status', this.crop_audio_status);
    data.append('irr_audio_status', this.irr_audio_status);


    data.append('plantation_name', this.plantation_name);
    data.append('irrigation_type', this.irrigation_type);
    data.append('data', JSON.stringify(finalData));
    data.append('status', '1');
    data.append('mr_com_added_by', this.userData[0].user_id);
    // this.spinner.show();
    this.backendService.updatePlantationRecords(data).subscribe(
      res => {
        if (res.status === true) {
          this.modalService.dismissAll();
          this.toastr.success(res.message);
          this.plantation_name = "";
          this.irrigation_type = "";
          this.bed_image_status = "0";
          this.bed_image = "";
          this.bed_audio_status = "0";
          this.bed_audio = "";
          this.crop_image_status = "0";
          this.crop_image = "";
          this.crop_audio_status = "0";
          this.crop_audio = "";
          this.irr_image_status = "0";
          this.irr_image = "";
          this.irr_audio_status = "0";
          this.irr_audio = "";
          this.bed_audio_flage = "No file selected"
          this.crop_audio_flage = "No file selected"
          this.irr_audio_flage = "No file selected"
          this.bed_image_flag = "No file selected"
          this.crop_image_flag = "No file selected"
          this.irr_image_flag = "No file selected"
          this.fetchData();
        } else {
          this.toastr.error(res.message);
        }
      }
    );
  }
  onChangeStatus() {
    var params = {
      "status": this.statusType,
      "plantation_id": this.statusId
    }
    this.modalService.dismissAll();
    this.spinner.show();
    this.backendService.updatePlantationStatus(params).subscribe(
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
  remove(type) {

  }
  add(u) {

  }
  deleteRow(data, i) {

  }
}