import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MasterRecordService } from '../../masterrecords/master-record.service';
import { FormGroup, NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-diseasemaster',
  templateUrl: './diseasemaster.component.html',
  styleUrls: ['./diseasemaster.component.scss']
})
export class DiseasemasterComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  persons: [];
  closeResult = '';

  showformvalue = 1;
  plantationRecords = [];
  url = "";

  disease_name = "";
  shoot_protigation_type = "";
  
  symp_image = "";
  symp_audio = "";
  symp_video = "";
  symp_desc = "";
  symp_detailsRow = [
    {
      "detail_name": "",
      "detail_id": 1,
      "control": "add"
    }
  ];
  symp_detailsRowLen = 1;
  symp_image_status = "0";
  symp_image_flag = "No image selected";
  symp_audio_flage = "No audio selected"
  symp_audio_status = "0";

  root_prot_image = "";
  root_prot_audio = "";
  root_prot_video = "";
  root_prot_desc = "";
  root_prot_detailsRow = [
    {
      "detail_name": "",
      "detail_id": 1,
      "control": "add"
    }
  ];
  root_prot_detailsRowLen = 1;
  root_prot_image_status = "0";
  root_prot_image_flag = "No image selected";
  root_prot_audio_flage = "No audio selected"
  root_prot_audio_status = "0";

  shoot_prot_image = "";
  shoot_prot_audio = "";
  shoot_prot_video = "";
  shoot_prot_desc = "";
  shoot_prot_detailsRow = [
    {
      "detail_name": "",
      "detail_id": 1,
      "control": "add"
    }
  ];
  shoot_prot_detailsRowLen = 1;
  shoot_prot_image_status = "0";
  shoot_prot_image_flag = "No image selected";
  shoot_prot_audio_flage = "No audio selected"
  shoot_prot_audio_status = "0";

  userData = JSON.parse(localStorage.getItem('user_data'));
  singleRecord: any;
  desices_master_id="0";
  symp_id = 0;
  root_prot_id = 0;
  shoot_prot_ir = 0;

 globlaSympRecord :any;
 globlaroot_protRecord :any;
 globlashoot_protRecord :any;

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
      record_type: 'desices_master',
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
    this.symp_audio_status = "0";
    this.symp_audio = "";
    this.root_prot_image_status = "0";
    this.root_prot_image = "";
    this.root_prot_audio_status = "0";
    this.root_prot_audio = "";
    this.shoot_prot_image_status = "0";
    this.shoot_prot_image = "";
    this.shoot_prot_audio_status = "0";
    this.shoot_prot_audio = "";
    this.symp_audio_flage = "No file selected"
    this.root_prot_audio_flage = "No file selected"
    this.shoot_prot_audio_flage = "No file selected"
    this.symp_image_flag = "No file selected"
    this.root_prot_image_flag = "No file selected"
    this.shoot_prot_image_flag = "No file selected"
    this.disease_name = "";
    this.shoot_protigation_type = "";
    this.symp_desc = "";
    this.symp_video = "";
    this.symp_detailsRow = [{
      "detail_name": "",
      "detail_id": 1,
      "control": "add"
    }];
    this.symp_detailsRowLen = 1;
    this.root_prot_desc = "";
    this.root_prot_video = "";
    this.root_prot_detailsRow = [{
      "detail_name": "",
      "detail_id": 1,
      "control": "add"
    }];
    this.root_prot_detailsRowLen = 1;
    this.shoot_prot_desc = "";
    this.shoot_prot_video = "";
    this.shoot_prot_detailsRow = [{
      "detail_name": "",
      "detail_id": 1,
      "control": "add"
    }];
    this.shoot_prot_detailsRowLen = 1;
    return true;
  }
  editModal(content, list) {
    this.showformvalue = 1;
    this.spinner.show();
    this.singleRecord=list;
    this.desices_master_id=list.desices_master_id;
    const data = {
      record_type: 'mr_disease_records',
      desices_master_id: list.desices_master_id,
    };
    this.backendService.fetchPlantationRecords(data).subscribe((res) => {
      if (res.status === true) {
        this.clearFields();
        
        this.disease_name = this.singleRecord.desices_name;

        var sympRecords = res.result[0];
        var root_protRecords = res.result[1];
        var shoot_protRecords = res.result[2];
        this.globlaSympRecord = res.result[0];
        this.globlaroot_protRecord = res.result[1];
        this.globlashoot_protRecord = res.result[2];

        this.symp_id = sympRecords.plantation_doc_id;
        this.root_prot_id = root_protRecords.plantation_doc_id;
        this.shoot_prot_ir = shoot_protRecords.plantation_doc_id;

        //bed starts here
        if (sympRecords.disease_img != "") {
          this.symp_image_status = "0";
          this.symp_image = sympRecords.disease_img;
        } else {
          this.symp_image_status = "0";
          this.symp_image = "";
        }

        if (sympRecords.disease_audio != "") {
          this.symp_audio_status = "0";
          this.symp_audio = sympRecords.disease_audio;
        } else {
          this.symp_audio_status = "0";
          this.symp_audio = "";
        }

        if (sympRecords.disease_video_link != "") {
          this.symp_video = sympRecords.disease_video_link;
        } else {
          this.symp_video = "";
        }

        if (sympRecords.description != "") {
          this.symp_desc = sympRecords.description;
        } else {
          this.symp_desc = "";
        }

        if (sympRecords.pointers != "") {
          var temp = sympRecords.pointers.split(',');
          this.symp_detailsRow = [];
          for (let index = 0; index < temp.length; index++) {
            var pd = {
              "detail_name": temp[index],
              "detail_id": index,
              "control": "add"
            };
            this.symp_detailsRow.push(pd)
            this.symp_detailsRowLen = this.symp_detailsRow.length;
          }
        } else {
          this.symp_detailsRow = [
            {
              "detail_name": "",
              "detail_id": 1,
              "control": "add"
            }
          ];
          this.symp_detailsRowLen = 1;
        }

        //root_prot starts here
        if (root_protRecords.disease_img != "") {
          this.root_prot_image_status = "0";
          this.root_prot_image = root_protRecords.disease_img;
        } else {
          this.root_prot_image_status = "0";
          this.root_prot_image = "";
        }

        if (root_protRecords.disease_audio != "") {
          this.root_prot_audio_status = "0";
          this.root_prot_audio = root_protRecords.disease_audio;
        } else {
          this.root_prot_audio_status = "0";
          this.root_prot_audio = "";
        }

        if (root_protRecords.disease_video_link != "") {
          this.root_prot_video = root_protRecords.disease_video_link;
        } else {
          this.root_prot_video = "";
        }

        if (root_protRecords.description != "") {
          this.root_prot_desc = root_protRecords.description;
        } else {
          this.root_prot_desc = "";
        }

        if (root_protRecords.pointers != "") {
          var temp = root_protRecords.pointers.split(',');
          this.root_prot_detailsRow = [];
          for (let index = 0; index < temp.length; index++) {
            var pd = {
              "detail_name": temp[index],
              "detail_id": index,
              "control": "add"
            };
            this.root_prot_detailsRow.push(pd)
            this.root_prot_detailsRowLen = this.root_prot_detailsRow.length;
          }
        } else {
          this.root_prot_detailsRow = [
            {
              "detail_name": "",
              "detail_id": 1,
              "control": "add"
            }
          ];
          this.root_prot_detailsRowLen = 1;
        }

        //shoot_protigation records here 
        if (shoot_protRecords.disease_img != "") {
          this.shoot_prot_image_status = "0";
          this.shoot_prot_image = shoot_protRecords.disease_img;
        } else {
          this.shoot_prot_image_status = "0";
          this.shoot_prot_image = "";
        }

        if (shoot_protRecords.disease_audio != "") {
          this.shoot_prot_audio_status = "0";
          this.shoot_prot_audio = shoot_protRecords.disease_audio;
        } else {
          this.shoot_prot_audio_status = "0";
          this.shoot_prot_audio = "";
        }

        if (shoot_protRecords.disease_video_link != "") {
          this.shoot_prot_video = shoot_protRecords.disease_video_link;
        } else {
          this.shoot_prot_video = "";
        }

        if (shoot_protRecords.description != "") {
          this.shoot_prot_desc = shoot_protRecords.description;
        } else {
          this.shoot_prot_desc = "";
        }

        if (shoot_protRecords.pointers != "") {
          var temp = shoot_protRecords.pointers.split(',');
          this.shoot_prot_detailsRow = [];
          for (let index = 0; index < temp.length; index++) {
            var pd = {
              "detail_name": temp[index],
              "detail_id": index,
              "control": "add"
            };
            this.shoot_prot_detailsRow.push(pd)
            this.shoot_prot_detailsRowLen = this.shoot_prot_detailsRow.length;
          }
        } else {
          this.shoot_prot_detailsRow = [
            {
              "detail_name": "",
              "detail_id": 1,
              "control": "add"
            }
          ];
          this.shoot_prot_detailsRowLen = 1;
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

  symp_add(index) {
    var data = {
      "detail_name": "",
      "detail_id": index + 1 + 1,
      "control": "add"
    }
    this.symp_detailsRow.push(data);
    this.symp_detailsRowLen = this.symp_detailsRow.length;
  }

  symp_deleteRow(data, index) {
    var removeIndex = this.symp_detailsRow.map(function (item) { return item.detail_id; }).indexOf(index);
    this.symp_detailsRow.splice(removeIndex, 1);
    this.symp_detailsRowLen = this.symp_detailsRow.length;
  }

  root_prot_add(index) {
    var data = {
      "detail_name": "",
      "detail_id": index + 1 + 1,
      "control": "add"
    }
    this.root_prot_detailsRow.push(data);
    this.root_prot_detailsRowLen = this.root_prot_detailsRow.length;
  }

  root_prot_deleteRow(data, index) {
    var removeIndex = this.root_prot_detailsRow.map(function (item) { return item.detail_id; }).indexOf(index);
    this.root_prot_detailsRow.splice(removeIndex, 1);
    this.root_prot_detailsRowLen = this.root_prot_detailsRow.length;
  }

  shoot_prot_add(index) {
    var data = {
      "detail_name": "",
      "detail_id": index + 1 + 1,
      "control": "add"
    }
    this.shoot_prot_detailsRow.push(data);
    this.shoot_prot_detailsRowLen = this.shoot_prot_detailsRow.length;
  }

  shoot_prot_deleteRow(data, index) {
    var removeIndex = this.shoot_prot_detailsRow.map(function (item) { return item.detail_id; }).indexOf(index);
    this.shoot_prot_detailsRow.splice(removeIndex, 1);
    this.shoot_prot_detailsRowLen = this.shoot_prot_detailsRow.length;
  }

  imageUpload(event, type) {
    if (type === 'symp') {
      const file = event.target.files[0];
      this.symp_image = file;
      this.symp_image_flag = "1 File selected";
      console.log(file);
      this.symp_image_status = "1";
    } else if (type === 'root') {
      const file = event.target.files[0];
      this.root_prot_image = file;
      this.root_prot_image_flag = "1 File selected";
      console.log(file);
      this.root_prot_image_status = "1";
    } else if (type === 'shoot') {
      const file = event.target.files[0];
      this.shoot_prot_image = file;
      this.shoot_prot_image_flag = "1 File selected";
      console.log(file);
      this.shoot_prot_image_status = "1";
    }
  }

  audioUpload(event, type) {
    if (type === 'symp') {
      const file = event.target.files[0];
      this.symp_audio = file;
      this.symp_audio_flage = "1 File selected";
      console.log(file);
      this.symp_audio_status = "1";
    } else if (type === 'root') {
      const file = event.target.files[0];
      this.root_prot_audio = file;
      this.root_prot_audio_flage = "1 File selected";
      console.log(file);
      this.root_prot_audio_status = "1";
    } else if (type === 'shoot') {
      const file = event.target.files[0];
      this.shoot_prot_audio = file;
      this.shoot_prot_audio_flage = "1 File selected";
      console.log(file);
      this.shoot_prot_audio_status = "1";
    }
  }

  onAddActivity(form: NgForm) {
    
    if (form.invalid) {
      return;
    }
    var temp = [];
    for (let index = 0; index < this.symp_detailsRow.length; index++) {
      temp.push(this.symp_detailsRow[index]['detail_name'])
    }
    var symp_pointers = temp.toString();

    var temp2 = [];
    for (let index = 0; index < this.root_prot_detailsRow.length; index++) {
      temp2.push(this.root_prot_detailsRow[index]['detail_name'])
    }
    var root_prot_pointers = temp2.toString();

    var temp3 = [];
    for (let index = 0; index < this.shoot_prot_detailsRow.length; index++) {
      temp3.push(this.shoot_prot_detailsRow[index]['detail_name'])
    }
    var shoot_prot_pointers = temp3.toString();

    var finalData = [
      {
        "disease_record_type": "symptoms",
        "desices_master_id": "",
        "disease_img": "",
        "disease_audio": "",
        "disease_video_link": this.symp_video,
        "status": "1",
        "value": "1",
        "description": this.symp_desc,
        "pointers": symp_pointers
      }, {
        "disease_record_type": "root_protection",
        "desices_master_id": "",
        "disease_img": "",
        "disease_audio": "",
        "disease_video_link": this.root_prot_video,
        "status": "1",
        "value": "2",
        "description": this.root_prot_desc,
        "pointers": root_prot_pointers
      }, {
        "disease_record_type": "shoot_protection",
        "desices_master_id": "",
        "disease_img": "",
        "disease_audio": "",
        "disease_video_link": this.shoot_prot_video,
        "status": "1",
        "value": "3",
        "description": this.shoot_prot_desc,
        "pointers": shoot_prot_pointers
      }
    ];

    const data = new FormData();
    if (this.symp_image_status === "1") {
      data.append('symp_image', this.symp_image);
    }
    if (this.symp_audio_status === "1") {
      data.append('symp_audio', this.symp_audio);
    }
    if (this.root_prot_image_status === "1") {
      data.append('root_prot_image', this.root_prot_image);
    }
    if (this.root_prot_audio_status === "1") {
      data.append('root_prot_audio', this.root_prot_audio);
    }
    if (this.shoot_prot_image_status === "1") {
      data.append('shoot_prot_image', this.shoot_prot_image);
    }
    if (this.shoot_prot_audio_status === "1") {
      data.append('shoot_prot_audio', this.shoot_prot_audio);
    }

    data.append('symp_image_status', this.symp_image_status);
    data.append('root_prot_image_status', this.root_prot_image_status);
    data.append('shoot_prot_image_status', this.shoot_prot_image_status);
    data.append('symp_audio_status', this.symp_audio_status);
    data.append('root_prot_audio_status', this.root_prot_audio_status);
    data.append('shoot_prot_audio_status', this.shoot_prot_audio_status);

    data.append('disease_name', this.disease_name);
    data.append('shoot_protigation_type', this.shoot_protigation_type);
    data.append('data', JSON.stringify(finalData));
    data.append('status', '1');
    data.append('user_id', this.userData[0].user_id);
    // this.spinner.show();
    this.backendService.addDiseaseCategory(data).subscribe(
      res => {
        if (res.status === true) {
          this.modalService.dismissAll();
          this.toastr.success(res.message);
          this.disease_name = "";
          this.shoot_protigation_type = "";
          this.symp_image_status = "0";
          this.symp_image = "";
          this.symp_audio_status = "0";
          this.symp_audio = "";
          this.root_prot_image_status = "0";
          this.root_prot_image = "";
          this.root_prot_audio_status = "0";
          this.root_prot_audio = "";
          this.shoot_prot_image_status = "0";
          this.shoot_prot_image = "";
          this.shoot_prot_audio_status = "0";
          this.shoot_prot_audio = "";
          this.symp_audio_flage = "No file selected"
          this.root_prot_audio_flage = "No file selected"
          this.shoot_prot_audio_flage = "No file selected"
          this.symp_image_flag = "No file selected"
          this.root_prot_image_flag = "No file selected"
          this.shoot_prot_image_flag = "No file selected"
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
    for (let index = 0; index < this.symp_detailsRow.length; index++) {
      temp.push(this.symp_detailsRow[index]['detail_name'])
    }
    var symp_pointers = temp.toString();

    var temp2 = [];
    for (let index = 0; index < this.root_prot_detailsRow.length; index++) {
      temp2.push(this.root_prot_detailsRow[index]['detail_name'])
    }
    var root_prot_pointers = temp2.toString();

    var temp3 = [];
    for (let index = 0; index < this.shoot_prot_detailsRow.length; index++) {
      temp3.push(this.shoot_prot_detailsRow[index]['detail_name'])
    }
    var shoot_prot_pointers = temp3.toString();

    var finalData = [
      {
        "des_doc_id":this.globlaSympRecord.des_doc_id,
        "disease_record_type": "symptoms",
        "desices_master_id": this.globlaSympRecord.desices_master_id,
        "disease_img": this.globlaSympRecord.disease_img,
        "disease_audio": this.globlaSympRecord.disease_audio,
        "disease_video_link": this.symp_video,
        "status": "1",
        "value": "1",
        "description": this.symp_desc,
        "pointers": symp_pointers
      }, {
        "des_doc_id":this.globlaroot_protRecord.des_doc_id,
        "disease_record_type": "root_prot_preparation",
        "desices_master_id": this.globlaroot_protRecord.desices_master_id,
        "disease_img": this.globlaroot_protRecord.disease_img,
        "disease_audio": this.globlaroot_protRecord.disease_audio,
        "disease_video_link": this.root_prot_video,
        "status": "1",
        "value": "2",
        "description": this.root_prot_desc,
        "pointers": root_prot_pointers
      }, {
        "des_doc_id":this.globlashoot_protRecord.des_doc_id,
        "disease_record_type": "shoot_prot_preparation",
        "desices_master_id": this.globlashoot_protRecord.desices_master_id,
        "disease_img": this.globlashoot_protRecord.disease_img,
        "disease_audio": this.globlashoot_protRecord.disease_audio,
        "disease_video_link": this.shoot_prot_video,
        "status": "1",
        "value": "3",
        "description": this.shoot_prot_desc,
        "pointers": shoot_prot_pointers
      }
    ];

    const data = new FormData();
    if (this.symp_image_status === "1") {
      data.append('symp_image', this.symp_image);
    }
    if (this.symp_audio_status === "1") {
      data.append('symp_audio', this.symp_audio);
    }
    if (this.root_prot_image_status === "1") {
      data.append('root_prot_image', this.root_prot_image);
    }
    if (this.root_prot_audio_status === "1") {
      data.append('root_prot_audio', this.root_prot_audio);
    }
    if (this.shoot_prot_image_status === "1") {
      data.append('shoot_prot_image', this.shoot_prot_image);
    }
    if (this.shoot_prot_audio_status === "1") {
      data.append('shoot_prot_audio', this.shoot_prot_audio);
    }
   
    data.append('plantation_doc_id', "this.symp_image_status");
    data.append('desices_master_id', this.desices_master_id);
    data.append('symp_image_status', this.symp_image_status);
    data.append('root_prot_image_status', this.root_prot_image_status);
    data.append('shoot_prot_image_status', this.shoot_prot_image_status);
    data.append('symp_audio_status', this.symp_audio_status);
    data.append('root_prot_audio_status', this.root_prot_audio_status);
    data.append('shoot_prot_audio_status', this.shoot_prot_audio_status);


    data.append('disease_name', this.disease_name);
    data.append('shoot_protigation_type', this.shoot_protigation_type);
    data.append('data', JSON.stringify(finalData));
    data.append('status', '1');
    data.append('user_id', this.userData[0].user_id);
    // this.spinner.show();
    this.backendService.updateDiseaseCategory(data).subscribe(
      res => {
        if (res.status === true) {
          this.modalService.dismissAll();
          this.toastr.success(res.message);
          this.disease_name = "";
          this.shoot_protigation_type = "";
          this.symp_image_status = "0";
          this.symp_image = "";
          this.symp_audio_status = "0";
          this.symp_audio = "";
          this.root_prot_image_status = "0";
          this.root_prot_image = "";
          this.root_prot_audio_status = "0";
          this.root_prot_audio = "";
          this.shoot_prot_image_status = "0";
          this.shoot_prot_image = "";
          this.shoot_prot_audio_status = "0";
          this.shoot_prot_audio = "";
          this.symp_audio_flage = "No file selected"
          this.root_prot_audio_flage = "No file selected"
          this.shoot_prot_audio_flage = "No file selected"
          this.symp_image_flag = "No file selected"
          this.root_prot_image_flag = "No file selected"
          this.shoot_prot_image_flag = "No file selected"
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
      "desices_master_id": this.statusId
    }
    this.modalService.dismissAll();
    this.spinner.show();
    this.backendService.changeDiseaseStatus(params).subscribe(
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