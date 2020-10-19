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
  selector: 'app-preparationmaster',
  templateUrl: './preparationmaster.component.html',
  styleUrls: ['./preparationmaster.component.scss']
})
export class PreparationmasterComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  persons: [];
  closeResult = '';

  showformvalue = 1;
  plantationRecords = [];
  url = "";

  preparation_name = "";
  irrigation_type = "";
  inorganic_image = "";
  inorganic_audio = "";
  inorganic_video = "";
  inorganic_desc = "";
  inorganic_detailsRow = [
    {
      "detail_name": "",
      "detail_id": 1,
      "control": "add"
    }
  ];
  inorganic_detailsRowLen = 1;
  inorganic_image_status = "0";
  inorganic_image_flag = "No image selected";
  inorganic_audio_flage = "No audio selected"
  inorganic_audio_status = "0";

  arrg_image = "";
  arrg_audio = "";
  arrg_video = "";
  arrg_desc = "";
  arrg_detailsRow = [
    {
      "detail_name": "",
      "detail_id": 1,
      "control": "add"
    }
  ];
  arrg_detailsRowLen = 1;
  arrg_image_status = "0";
  arrg_image_flag = "No image selected";
  arrg_audio_flage = "No audio selected"
  arrg_audio_status = "0";

  seed_image = "";
  seed_audio = "";
  seed_video = "";
  seed_desc = "";
  seed_detailsRow = [
    {
      "detail_name": "",
      "detail_id": 1,
      "control": "add"
    }
  ];
  seed_detailsRowLen = 1;
  seed_image_status = "0";
  seed_image_flag = "No image selected";
  seed_audio_flage = "No audio selected"
  seed_audio_status = "0";

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

  shed_image = "";
  shed_audio = "";
  shed_video = "";
  shed_desc = "";
  shed_detailsRow = [
    {
      "detail_name": "",
      "detail_id": 1,
      "control": "add"
    }
  ];
  shed_detailsRowLen = 1;
  shed_image_status = "0";
  shed_image_flag = "No image selected";
  shed_audio_flage = "No audio selected"
  shed_audio_status = "0";

  tray_image = "";
  tray_audio = "";
  tray_video = "";
  tray_desc = "";
  tray_detailsRow = [
    {
      "detail_name": "",
      "detail_id": 1,
      "control": "add"
    }
  ];
  tray_detailsRowLen = 1;
  tray_image_status = "0";
  tray_image_flag = "No image selected";
  tray_audio_flage = "No audio selected"
  tray_audio_status = "0";

  userData = JSON.parse(localStorage.getItem('user_data'));
  singleRecord: any;
  prepration_rec_id = "0";

  inorganic_id = 0;
  bed_id = 0;
  arrg_id = 0;
  seed_id = 0;
  shed_id = 0;
  tray_id = 0;

  statusType: any;
  statusId: any;

  globlaInorganicRecord: any;
  globlaBedRecord: any;
  globlaArrgRecord: any;
  globlaSeedRecord: any;
  globlaShedRecord: any;
  globlaTrayRecord: any;

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
      record_type: 'mr_preparation_master',
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
    if (flag === true) {
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
  clearFields() {
    this.inorganic_image_status = "0"
    this.showformvalue = 1;
    this.inorganic_audio_status = "0";
    this.inorganic_audio = "";
    this.arrg_image_status = "0";
    this.arrg_image = "";
    this.arrg_audio_status = "0";
    this.arrg_audio = "";
    this.seed_image_status = "0";
    this.seed_image = "";
    this.seed_audio_status = "0";
    this.seed_audio = "";
    this.inorganic_audio_flage = "No file selected"
    this.arrg_audio_flage = "No file selected"
    this.seed_audio_flage = "No file selected"
    this.inorganic_image_flag = "No file selected"
    this.arrg_image_flag = "No file selected"
    this.seed_image_flag = "No file selected"
    this.preparation_name = "";
    this.irrigation_type = "";
    this.inorganic_desc = "";
    this.inorganic_video = "";
    this.inorganic_detailsRow = [{
      "detail_name": "",
      "detail_id": 1,
      "control": "add"
    }];
    this.inorganic_detailsRowLen = 1;
    this.arrg_desc = "";
    this.arrg_video = "";
    this.arrg_detailsRow = [{
      "detail_name": "",
      "detail_id": 1,
      "control": "add"
    }];
    this.arrg_detailsRowLen = 1;
    this.seed_desc = "";
    this.seed_video = "";
    this.seed_detailsRow = [{
      "detail_name": "",
      "detail_id": 1,
      "control": "add"
    }];
    this.seed_detailsRowLen = 1;


    this.bed_image = "";
    this.bed_audio = "";
    this.bed_video = "";
    this.bed_desc = "";
    this.bed_detailsRow = [
      {
        "detail_name": "",
        "detail_id": 1,
        "control": "add"
      }
    ];
    this.bed_detailsRowLen = 1;
    this.bed_image_status = "0";
    this.bed_image_flag = "No image selected";
    this.bed_audio_flage = "No audio selected"
    this.bed_audio_status = "0";

    this.shed_image = "";
    this.shed_audio = "";
    this.shed_video = "";
    this.shed_desc = "";
    this.shed_detailsRow = [
      {
        "detail_name": "",
        "detail_id": 1,
        "control": "add"
      }
    ];
    this.shed_detailsRowLen = 1;
    this.shed_image_status = "0";
    this.shed_image_flag = "No image selected";
    this.shed_audio_flage = "No audio selected"
    this.shed_audio_status = "0";

    this.tray_image = "";
    this.tray_audio = "";
    this.tray_video = "";
    this.tray_desc = "";
    this.tray_detailsRow = [
      {
        "detail_name": "",
        "detail_id": 1,
        "control": "add"
      }
    ];
    this.tray_detailsRowLen = 1;
    this.tray_image_status = "0";
    this.tray_image_flag = "No image selected";
    this.tray_audio_flage = "No audio selected"
    this.tray_audio_status = "0";
    return true;
  }

  editModal(content, list) {
    this.clearFields();
    this.showformvalue = 1;
    this.spinner.show();
    this.singleRecord = list;
    this.prepration_rec_id = list.prepration_rec_id;
    const data = {
      record_type: 'mr_preparation_records',
      prepration_id: list.prepration_rec_id,
    };
    this.backendService.fetchPlantationRecords(data).subscribe((res) => {
      if (res.status === true) {
        this.preparation_name = this.singleRecord.prepration_name;

        this.globlaInorganicRecord = res.result[0];
        this.globlaBedRecord = res.result[1];
        this.globlaArrgRecord = res.result[2];
        this.globlaSeedRecord = res.result[3];
        this.globlaShedRecord = res.result[4];
        this.globlaTrayRecord = res.result[5];

        this.inorganic_id = this.globlaInorganicRecord.pre_doc_id;
        this.bed_id = this.globlaBedRecord.pre_doc_id;
        this.arrg_id = this.globlaArrgRecord.pre_doc_id;
        this.seed_id = this.globlaSeedRecord.pre_doc_id;
        this.shed_id = this.globlaShedRecord.pre_doc_id;
        this.tray_id = this.globlaTrayRecord.pre_doc_id;

        //iorganic starts here
        if (this.globlaInorganicRecord.prepration_img != "") {
          this.inorganic_image_status = "0";
          this.inorganic_image = this.globlaInorganicRecord.prepration_img;
        } else {
          this.inorganic_image_status = "0";
          this.inorganic_image = "";
        }

        if (this.globlaInorganicRecord.plantation_audio != "") {
          this.inorganic_audio_status = "0";
          this.inorganic_audio = this.globlaInorganicRecord.prepration_audio;
        } else {
          this.inorganic_audio_status = "0";
          this.inorganic_audio = "";
        }

        if (this.globlaInorganicRecord.prepration_video_link != "") {
          this.inorganic_video = this.globlaInorganicRecord.prepration_video_link;
        } else {
          this.inorganic_video = "";
        }

        if (this.globlaInorganicRecord.description != "") {
          this.inorganic_desc = this.globlaInorganicRecord.description;
        } else {
          this.inorganic_desc = "";
        }

        if (this.globlaInorganicRecord.pointers != "") {
          var temp = this.globlaInorganicRecord.pointers.split(',');
          this.inorganic_detailsRow = [];
          for (let index = 0; index < temp.length; index++) {
            var pd = {
              "detail_name": temp[index],
              "detail_id": index,
              "control": "add"
            };
            this.inorganic_detailsRow.push(pd)
            this.inorganic_detailsRowLen = this.inorganic_detailsRow.length;
          }
        } else {
          this.inorganic_detailsRow = [
            {
              "detail_name": "",
              "detail_id": 1,
              "control": "add"
            }
          ];
          this.inorganic_detailsRowLen = 1;
        }
        //bed starts here
        if (this.globlaBedRecord.prepration_img != "") {
          this.bed_image_status = "0";
          this.bed_image = this.globlaBedRecord.prepration_img;
        } else {
          this.bed_image_status = "0";
          this.bed_image = "";
        }

        if (this.globlaBedRecord.plantation_audio != "") {
          this.bed_audio_status = "0";
          this.bed_audio = this.globlaBedRecord.prepration_audio;
        } else {
          this.bed_audio_status = "0";
          this.bed_audio = "";
        }

        if (this.globlaBedRecord.prepration_video_link != "") {
          this.bed_video = this.globlaBedRecord.prepration_video_link;
        } else {
          this.bed_video = "";
        }

        if (this.globlaBedRecord.description != "") {
          this.bed_desc = this.globlaBedRecord.description;
        } else {
          this.bed_desc = "";
        }

        if (this.globlaBedRecord.pointers != "") {
          var temp = this.globlaBedRecord.pointers.split(',');
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
        //arrg starts here
        if (this.globlaArrgRecord.prepration_img != "") {
          this.arrg_image_status = "0";
          this.arrg_image = this.globlaArrgRecord.prepration_img;
        } else {
          this.arrg_image_status = "0";
          this.arrg_image = "";
        }

        if (this.globlaArrgRecord.plantation_audio != "") {
          this.arrg_audio_status = "0";
          this.arrg_audio = this.globlaArrgRecord.prepration_audio;
        } else {
          this.arrg_audio_status = "0";
          this.arrg_audio = "";
        }

        if (this.globlaArrgRecord.prepration_video_link != "") {
          this.arrg_video = this.globlaArrgRecord.prepration_video_link;
        } else {
          this.arrg_video = "";
        }

        if (this.globlaArrgRecord.description != "") {
          this.arrg_desc = this.globlaArrgRecord.description;
        } else {
          this.arrg_desc = "";
        }

        if (this.globlaArrgRecord.pointers != "") {
          var temp = this.globlaArrgRecord.pointers.split(',');
          this.arrg_detailsRow = [];
          for (let index = 0; index < temp.length; index++) {
            var pd = {
              "detail_name": temp[index],
              "detail_id": index,
              "control": "add"
            };
            this.arrg_detailsRow.push(pd)
            this.arrg_detailsRowLen = this.arrg_detailsRow.length;
          }
        } else {
          this.arrg_detailsRow = [
            {
              "detail_name": "",
              "detail_id": 1,
              "control": "add"
            }
          ];
          this.arrg_detailsRowLen = 1;
        }
        //seed starts here
        if (this.globlaSeedRecord.prepration_img != "") {
          this.seed_image_status = "0";
          this.seed_image = this.globlaSeedRecord.prepration_img;
        } else {
          this.seed_image_status = "0";
          this.seed_image = "";
        }

        if (this.globlaSeedRecord.plantation_audio != "") {
          this.seed_audio_status = "0";
          this.seed_audio = this.globlaSeedRecord.prepration_audio;
        } else {
          this.seed_audio_status = "0";
          this.seed_audio = "";
        }

        if (this.globlaSeedRecord.prepration_video_link != "") {
          this.seed_video = this.globlaSeedRecord.prepration_video_link;
        } else {
          this.seed_video = "";
        }

        if (this.globlaSeedRecord.description != "") {
          this.seed_desc = this.globlaSeedRecord.description;
        } else {
          this.seed_desc = "";
        }

        if (this.globlaSeedRecord.pointers != "") {
          var temp = this.globlaSeedRecord.pointers.split(',');
          this.seed_detailsRow = [];
          for (let index = 0; index < temp.length; index++) {
            var pd = {
              "detail_name": temp[index],
              "detail_id": index,
              "control": "add"
            };
            this.seed_detailsRow.push(pd)
            this.seed_detailsRowLen = this.seed_detailsRow.length;
          }
        } else {
          this.seed_detailsRow = [
            {
              "detail_name": "",
              "detail_id": 1,
              "control": "add"
            }
          ];
          this.seed_detailsRowLen = 1;
        }
        //shed starts here
        if (this.globlaShedRecord.prepration_img != "") {
          this.shed_image_status = "0";
          this.shed_image = this.globlaShedRecord.prepration_img;
        } else {
          this.shed_image_status = "0";
          this.shed_image = "";
        }

        if (this.globlaShedRecord.plantation_audio != "") {
          this.shed_audio_status = "0";
          this.shed_audio = this.globlaShedRecord.prepration_audio;
        } else {
          this.shed_audio_status = "0";
          this.shed_audio = "";
        }

        if (this.globlaShedRecord.prepration_video_link != "") {
          this.shed_video = this.globlaShedRecord.prepration_video_link;
        } else {
          this.shed_video = "";
        }

        if (this.globlaShedRecord.description != "") {
          this.shed_desc = this.globlaShedRecord.description;
        } else {
          this.shed_desc = "";
        }

        if (this.globlaShedRecord.pointers != "") {
          var temp = this.globlaShedRecord.pointers.split(',');
          this.shed_detailsRow = [];
          for (let index = 0; index < temp.length; index++) {
            var pd = {
              "detail_name": temp[index],
              "detail_id": index,
              "control": "add"
            };
            this.shed_detailsRow.push(pd)
            this.shed_detailsRowLen = this.shed_detailsRow.length;
          }
        } else {
          this.shed_detailsRow = [
            {
              "detail_name": "",
              "detail_id": 1,
              "control": "add"
            }
          ];
          this.shed_detailsRowLen = 1;
        }
        //tray starts here
        if (this.globlaTrayRecord.prepration_img != "") {
          this.tray_image_status = "0";
          this.tray_image = this.globlaTrayRecord.prepration_img;
        } else {
          this.tray_image_status = "0";
          this.tray_image = "";
        }

        if (this.globlaTrayRecord.plantation_audio != "") {
          this.tray_audio_status = "0";
          this.tray_audio = this.globlaTrayRecord.prepration_audio;
        } else {
          this.tray_audio_status = "0";
          this.tray_audio = "";
        }

        if (this.globlaTrayRecord.prepration_video_link != "") {
          this.tray_video = this.globlaTrayRecord.prepration_video_link;
        } else {
          this.tray_video = "";
        }

        if (this.globlaTrayRecord.description != "") {
          this.tray_desc = this.globlaTrayRecord.description;
        } else {
          this.tray_desc = "";
        }

        if (this.globlaTrayRecord.pointers != "") {
          var temp = this.globlaTrayRecord.pointers.split(',');
          this.tray_detailsRow = [];
          for (let index = 0; index < temp.length; index++) {
            var pd = {
              "detail_name": temp[index],
              "detail_id": index,
              "control": "add"
            };
            this.tray_detailsRow.push(pd)
            this.tray_detailsRowLen = this.tray_detailsRow.length;
          }
        } else {
          this.tray_detailsRow = [
            {
              "detail_name": "",
              "detail_id": 1,
              "control": "add"
            }
          ];
          this.tray_detailsRowLen = 1;
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

  inorg_add(index) {
    var data = {
      "detail_name": "",
      "detail_id": index + 1 + 1,
      "control": "add"
    }
    this.inorganic_detailsRow.push(data);
    this.inorganic_detailsRowLen = this.inorganic_detailsRow.length;
  }

  inorg_deleteRow(data, index) {
    var removeIndex = this.inorganic_detailsRow.map(function (item) { return item.detail_id; }).indexOf(index);
    this.inorganic_detailsRow.splice(removeIndex, 1);
    this.inorganic_detailsRowLen = this.inorganic_detailsRow.length;
  }

  arrg_add(index) {
    var data = {
      "detail_name": "",
      "detail_id": index + 1 + 1,
      "control": "add"
    }
    this.arrg_detailsRow.push(data);
    this.arrg_detailsRowLen = this.arrg_detailsRow.length;
  }

  arrg_deleteRow(data, index) {
    var removeIndex = this.arrg_detailsRow.map(function (item) { return item.detail_id; }).indexOf(index);
    this.arrg_detailsRow.splice(removeIndex, 1);
    this.arrg_detailsRowLen = this.arrg_detailsRow.length;
  }

  seed_add(index) {
    var data = {
      "detail_name": "",
      "detail_id": index + 1 + 1,
      "control": "add"
    }
    this.seed_detailsRow.push(data);
    this.seed_detailsRowLen = this.seed_detailsRow.length;
  }

  seed_deleteRow(data, index) {
    var removeIndex = this.seed_detailsRow.map(function (item) { return item.detail_id; }).indexOf(index);
    this.seed_detailsRow.splice(removeIndex, 1);
    this.seed_detailsRowLen = this.seed_detailsRow.length;
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

  shed_add(index) {
    var data = {
      "detail_name": "",
      "detail_id": index + 1 + 1,
      "control": "add"
    }
    this.shed_detailsRow.push(data);
    this.shed_detailsRowLen = this.shed_detailsRow.length;
  }

  shed_deleteRow(data, index) {
    var removeIndex = this.shed_detailsRow.map(function (item) { return item.detail_id; }).indexOf(index);
    this.shed_detailsRow.splice(removeIndex, 1);
    this.shed_detailsRowLen = this.shed_detailsRow.length;
  }

  tray_add(index) {
    var data = {
      "detail_name": "",
      "detail_id": index + 1 + 1,
      "control": "add"
    }
    this.tray_detailsRow.push(data);
    this.tray_detailsRowLen = this.tray_detailsRow.length;
  }

  tray_deleteRow(data, index) {
    var removeIndex = this.tray_detailsRow.map(function (item) { return item.detail_id; }).indexOf(index);
    this.tray_detailsRow.splice(removeIndex, 1);
    this.tray_detailsRowLen = this.tray_detailsRow.length;
  }

  imageUpload(event, type) {
    if (type === 'inorganic') {
      const file = event.target.files[0];
      this.inorganic_image = file;
      this.inorganic_image_flag = "1 File selected";
      this.inorganic_image_status = "1";
    } else if (type === 'arrg') {
      const file = event.target.files[0];
      this.arrg_image = file;
      this.arrg_image_flag = "1 File selected";
      this.arrg_image_status = "1";
    } else if (type === 'seed') {
      const file = event.target.files[0];
      this.seed_image = file;
      this.seed_image_flag = "1 File selected";
      this.seed_image_status = "1";
    } else if (type === 'shed') {
      const file = event.target.files[0];
      this.shed_image = file;
      this.shed_image_flag = "1 File selected";
      this.shed_image_status = "1";
    } else if (type === 'tray') {
      const file = event.target.files[0];
      this.tray_image = file;
      this.tray_image_flag = "1 File selected";
      this.tray_image_status = "1";
    } else if (type === 'bed') {
      const file = event.target.files[0];
      this.bed_image = file;
      this.bed_image_flag = "1 File selected";
      this.bed_image_status = "1";
    }
  }

  audioUpload(event, type) {
    if (type === 'inorganic') {
      const file = event.target.files[0];
      this.inorganic_audio = file;
      this.inorganic_audio_flage = "1 File selected";
      this.inorganic_audio_status = "1";
    } else if (type === 'arrg') {
      const file = event.target.files[0];
      this.arrg_audio = file;
      this.arrg_audio_flage = "1 File selected";
      this.arrg_audio_status = "1";
    } else if (type === 'seed') {
      const file = event.target.files[0];
      this.seed_audio = file;
      this.seed_audio_flage = "1 File selected";
      this.seed_audio_status = "1";
    } else if (type === 'shed') {
      const file = event.target.files[0];
      this.shed_audio = file;
      this.shed_audio_flage = "1 File selected";
      this.shed_audio_status = "1";
    } else if (type === 'tray') {
      const file = event.target.files[0];
      this.tray_audio = file;
      this.tray_audio_flage = "1 File selected";
      this.tray_audio_status = "1";
    } else if (type === 'bed') {
      const file = event.target.files[0];
      this.bed_audio = file;
      this.bed_audio_flage = "1 File selected";
      this.bed_audio_status = "1";
    }
  }

  onAddActivity(form: NgForm) {

    if (form.invalid) {
      return;
    }
    var temp = [];
    for (let index = 0; index < this.inorganic_detailsRow.length; index++) {
      temp.push(this.inorganic_detailsRow[index]['detail_name'])
    }
    var inorganic_pointers = temp.toString();

    var temp2 = [];
    for (let index = 0; index < this.arrg_detailsRow.length; index++) {
      temp2.push(this.arrg_detailsRow[index]['detail_name'])
    }
    var arrg_pointers = temp2.toString();

    var temp3 = [];
    for (let index = 0; index < this.seed_detailsRow.length; index++) {
      temp3.push(this.seed_detailsRow[index]['detail_name'])
    }
    var seed_pointers = temp3.toString();

    var temp4 = [];
    for (let index = 0; index < this.bed_detailsRow.length; index++) {
      temp4.push(this.bed_detailsRow[index]['detail_name'])
    }
    var bed_pointers = temp4.toString();

    var temp5 = [];
    for (let index = 0; index < this.tray_detailsRow.length; index++) {
      temp5.push(this.tray_detailsRow[index]['detail_name'])
    }
    var tray_pointers = temp5.toString();

    var temp6 = [];
    for (let index = 0; index < this.shed_detailsRow.length; index++) {
      temp6.push(this.shed_detailsRow[index]['detail_name'])
    }
    var shed_pointers = temp6.toString();

    var finalData = [
      {
        "preparation_record_type": "inorganic_to_organic",
        "prepration_id": "",
        "prepration_img": "",
        "prepration_audio": "",
        "prepration_video_link": this.inorganic_video,
        "status": "1",
        "value": "1",
        "description": this.inorganic_desc,
        "pointers": inorganic_pointers
      }, {
        "preparation_record_type": "bed_distrub",
        "prepration_id": "",
        "prepration_img": "",
        "prepration_audio": "",
        "prepration_video_link": this.bed_video,
        "status": "1",
        "value": "2",
        "description": this.bed_desc,
        "pointers": bed_pointers
      }, {
        "preparation_record_type": "arrangement_of_seeds",
        "prepration_id": "",
        "prepration_img": "",
        "prepration_audio": "",
        "prepration_video_link": this.arrg_video,
        "status": "1",
        "value": "3",
        "description": this.arrg_desc,
        "pointers": arrg_pointers
      }, {
        "preparation_record_type": "seed_treatment",
        "prepration_id": "",
        "prepration_img": "",
        "prepration_audio": "",
        "prepration_video_link": this.seed_video,
        "status": "1",
        "value": "3",
        "description": this.seed_desc,
        "pointers": seed_pointers
      }, {
        "preparation_record_type": "shed_preparation",
        "prepration_id": "",
        "prepration_img": "",
        "prepration_audio": "",
        "prepration_video_link": this.shed_video,
        "status": "1",
        "value": "3",
        "description": this.shed_desc,
        "pointers": shed_pointers
      }, {
        "preparation_record_type": "tray_preparation",
        "prepration_id": "",
        "prepration_img": "",
        "prepration_audio": "",
        "prepration_video_link": this.tray_video,
        "status": "1",
        "value": "3",
        "description": this.tray_desc,
        "pointers": tray_pointers
      }
    ];

    const data = new FormData();
    if (this.inorganic_image_status === "1") {
      data.append('inorganic_image', this.inorganic_image);
    }
    if (this.inorganic_audio_status === "1") {
      data.append('inorganic_audio', this.inorganic_audio);
    }
    if (this.arrg_image_status === "1") {
      data.append('arrg_image', this.arrg_image);
    }
    if (this.arrg_audio_status === "1") {
      data.append('arrg_audio', this.arrg_audio);
    }
    if (this.seed_image_status === "1") {
      data.append('seed_image', this.seed_image);
    }
    if (this.seed_audio_status === "1") {
      data.append('seed_audio', this.seed_audio);
    }
    if (this.bed_image_status === "1") {
      data.append('bed_image', this.bed_image);
    }
    if (this.bed_audio_status === "1") {
      data.append('bed_audio', this.bed_audio);
    }
    if (this.shed_image_status === "1") {
      data.append('shed_image', this.shed_image);
    }
    if (this.shed_audio_status === "1") {
      data.append('shed_audio', this.shed_audio);
    }
    if (this.tray_image_status === "1") {
      data.append('tray_image', this.tray_image);
    }
    if (this.tray_audio_status === "1") {
      data.append('tray_audio', this.tray_audio);
    }

    data.append('inorganic_image_status', this.inorganic_image_status);
    data.append('inorganic_audio_status', this.inorganic_audio_status);

    data.append('arrg_image_status', this.arrg_image_status);
    data.append('arrg_audio_status', this.arrg_audio_status);

    data.append('bed_image_status', this.bed_image_status);
    data.append('bed_audio_status', this.bed_audio_status);

    data.append('shed_image_status', this.shed_image_status);
    data.append('shed_audio_status', this.shed_audio_status);

    data.append('tray_audio_status', this.tray_audio_status);
    data.append('tray_image_status', this.tray_image_status);

    data.append('seed_audio_status', this.seed_audio_status);
    data.append('seed_image_status', this.seed_image_status);


    data.append('prepration_name', this.preparation_name);
    data.append('data', JSON.stringify(finalData));
    data.append('status', '1');
    data.append('mr_com_added_by', this.userData[0].user_id);
    // this.spinner.show();
    this.backendService.addPreparation(data).subscribe(
      res => {
        if (res.status === true) {
          this.modalService.dismissAll();
          this.toastr.success(res.message);
          this.clearFields();
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
    for (let index = 0; index < this.inorganic_detailsRow.length; index++) {
      temp.push(this.inorganic_detailsRow[index]['detail_name'])
    }
    var inorganic_pointers = temp.toString();

    var temp2 = [];
    for (let index = 0; index < this.arrg_detailsRow.length; index++) {
      temp2.push(this.arrg_detailsRow[index]['detail_name'])
    }
    var arrg_pointers = temp2.toString();

    var temp3 = [];
    for (let index = 0; index < this.seed_detailsRow.length; index++) {
      temp3.push(this.seed_detailsRow[index]['detail_name'])
    }
    var seed_pointers = temp3.toString();

    var temp4 = [];
    for (let index = 0; index < this.bed_detailsRow.length; index++) {
      temp4.push(this.bed_detailsRow[index]['detail_name'])
    }
    var bed_pointers = temp4.toString();

    var temp5 = [];
    for (let index = 0; index < this.tray_detailsRow.length; index++) {
      temp5.push(this.tray_detailsRow[index]['detail_name'])
    }
    var tray_pointers = temp5.toString();

    var temp6 = [];
    for (let index = 0; index < this.shed_detailsRow.length; index++) {
      temp6.push(this.shed_detailsRow[index]['detail_name'])
    }
    var shed_pointers = temp6.toString();

    var finalData = [
      {
        "preparation_record_type": "inorganic_to_organic",
        "pre_doc_id":this.globlaInorganicRecord.pre_doc_id,
        "prepration_id": this.globlaInorganicRecord.prepration_id,
        "prepration_img": this.globlaInorganicRecord.prepration_img,
        "prepration_audio": this.inorganic_audio,
        "prepration_video_link": this.inorganic_video,
        "status": "1",
        "value": "1",
        "description": this.inorganic_desc,
        "pointers": inorganic_pointers
      }, {
        "preparation_record_type": "bed_distrub",
        "pre_doc_id":this.globlaBedRecord.pre_doc_id,
        "prepration_id": this.globlaBedRecord.prepration_id,
        "prepration_img": this.globlaBedRecord.prepration_img,
        "prepration_audio": this.bed_audio,
        "prepration_video_link": this.bed_video,
        "status": "1",
        "value": "2",
        "description": this.bed_desc,
        "pointers": bed_pointers
      }, {
        "preparation_record_type": "arrangement_of_seeds",
        "pre_doc_id":this.globlaArrgRecord.pre_doc_id,
        "prepration_id": this.globlaArrgRecord.prepration_id,
        "prepration_img": this.globlaArrgRecord.prepration_img,
        "prepration_audio": this.arrg_audio,
        "prepration_video_link": this.arrg_video,
        "status": "1",
        "value": "3",
        "description": this.arrg_desc,
        "pointers": arrg_pointers
      }, {
        "preparation_record_type": "seed_treatment",
        "pre_doc_id":this.globlaSeedRecord.pre_doc_id,
        "prepration_id": this.globlaSeedRecord.prepration_id,
        "prepration_img": this.globlaSeedRecord.prepration_img,
        "prepration_audio": this.seed_audio,
        "prepration_video_link": this.seed_video,
        "status": "1",
        "value": "3",
        "description": this.seed_desc,
        "pointers": seed_pointers
      }, {
        "preparation_record_type": "shed_preparation",
        "pre_doc_id":this.globlaShedRecord.pre_doc_id,
        "prepration_id": this.globlaShedRecord.prepration_id,
        "prepration_img": this.globlaShedRecord.prepration_img,
        "prepration_audio": this.shed_audio,
        "prepration_video_link": this.shed_video,
        "status": "1",
        "value": "3",
        "description": this.shed_desc,
        "pointers": shed_pointers
      }, {
        "preparation_record_type": "tray_preparation",
        "pre_doc_id":this.globlaTrayRecord.pre_doc_id,
        "prepration_id": this.globlaTrayRecord.prepration_id,
        "prepration_img": this.globlaTrayRecord.prepration_img,
        "prepration_audio": this.tray_audio,
        "prepration_video_link": this.tray_video,
        "status": "1",
        "value": "3",
        "description": this.tray_desc,
        "pointers": tray_pointers
      }
    ];


    const data = new FormData();
    if (this.inorganic_image_status === "1") {
      data.append('inorganic_image', this.inorganic_image);
    }
    if (this.inorganic_audio_status === "1") {
      data.append('inorganic_audio', this.inorganic_audio);
    }
    if (this.arrg_image_status === "1") {
      data.append('arrg_image', this.arrg_image);
    }
    if (this.arrg_audio_status === "1") {
      data.append('arrg_audio', this.arrg_audio);
    }
    if (this.seed_image_status === "1") {
      data.append('seed_image', this.seed_image);
    }
    if (this.seed_audio_status === "1") {
      data.append('irr_audio', this.seed_audio);
    }

    data.append('plantation_doc_id', "this.inorganic_image_status");
    data.append('prepration_rec_id', this.prepration_rec_id);
    data.append('inorganic_image_status', this.inorganic_image_status);
    data.append('arrg_image_status', this.arrg_image_status);
    data.append('irr_image_status', this.seed_image_status);
    data.append('inorganic_audio_status', this.inorganic_audio_status);
    data.append('arrg_audio_status', this.arrg_audio_status);
    data.append('irr_audio_status', this.seed_audio_status);


    data.append('preparation_name', this.preparation_name);
    data.append('irrigation_type', this.irrigation_type);
    data.append('data', JSON.stringify(finalData));
    data.append('status', '1');
    data.append('mr_com_added_by', this.userData[0].user_id);
    // this.spinner.show();
    this.backendService.updatePreparation(data).subscribe(
      res => {
        if (res.status === true) {
          this.modalService.dismissAll();
          this.toastr.success(res.message);
          this.clearFields();
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
      "prepration_rec_id": this.statusId
    }
    this.modalService.dismissAll();
    this.spinner.show();
    this.backendService.changePreparationStatus(params).subscribe(
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