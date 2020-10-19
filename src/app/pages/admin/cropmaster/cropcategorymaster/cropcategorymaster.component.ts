import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { MasterRecordService } from '../../masterrecords/master-record.service';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cropcategorymaster',
  templateUrl: './cropcategorymaster.component.html',
  styleUrls: ['./cropcategorymaster.component.scss']
})
export class CropcategorymasterComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  persons: [];
  closeResult = '';
  landMeasurementName: any;
  cropCategoryRecord: any = [];
  activityType = 'crop_category_master';
  singleActivity: any;
  userData = JSON.parse(localStorage.getItem('user_data'));
  statusType = 0;
  statusId = 0;
  crop_stage_name = "";
  sequence = "";
  crop_stage_id = "0";
  crop_family_master = [];
  family_id = "0";
  crop_category_id = "0";
  filteredCropCategory = [];
  show_category_name = false;
  show_sub_category_name = false;
  category_name = "";
  sub_category_name = "";
  disable_name = false;
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
      record_type: this.activityType,
      admin_id: '1',
    };

    this.backendService.fetchRecords(data).subscribe((res) => {
      if (res.status === true) {
        this.cropCategoryRecord = res.result;
        this.rerender();
        this.fetchFamilyData()
      } else {
        this.fetchFamilyData()
        this.spinner.hide();
      }
    });
  }
  fetchFamilyData() {
    const data = {
      record_type: "crop_family_master",
      admin_id: '1',
    };

    this.backendService.fetchRecords(data).subscribe((res) => {
      if (res.status === true) {
        this.crop_family_master = res.result;
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }

  familyOnChange(type) {
    this.filteredCropCategory = [];
    var family_id = this.family_id
    if (type === 'edit') {
      this.crop_category_id = this.crop_category_id
    } else {
      if (this.family_id != '0') {
        this.filteredCropCategory = this.cropCategoryRecord.filter(function (item) {
          return item.crop_family_id == family_id;
        });
        if (this.filteredCropCategory.length > 0) {
          this.crop_category_id = this.filteredCropCategory[0]['crop_category_id'] + "_" + this.filteredCropCategory[0]['crop_category'];
        } else {
          this.crop_category_id = "add";
          this.show_category_name = true;
          this.show_sub_category_name = true;
          this.disable_name = false;
        }
      } else {
        this.filteredCropCategory = [];
        this.category_name = ""
        this.crop_category_id = "";
        this.show_category_name = false;
        this.show_sub_category_name = false;
        this.disable_name = false;
      }
    }
  }

  categoryOnChange() {
    if (this.crop_category_id === 'add') {
      this.show_category_name = true;
      this.show_sub_category_name = true;
      this.disable_name = false;
      this.category_name = ""
    } else if (this.crop_category_id === '0') {
      this.show_category_name = false;
      this.show_sub_category_name = false;
      this.disable_name = false;
      this.category_name = ""
      this.crop_category_id = "0"
    } else {
      var finalCat = this.crop_category_id.split("_");
      this.category_name = finalCat[1]
      // this.crop_category_id = finalCat[0]
      this.show_sub_category_name = true;
      this.show_category_name = true;
      this.disable_name = true;
    }
  }
  open(content) {
    this.filteredCropCategory = [];
    this.category_name = ""
    this.crop_category_id = "0"
    this.sub_category_name = ""
    this.family_id = "0"
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
  editModal(content, data) {
    this.filteredCropCategory = this.cropCategoryRecord;
    this.category_name = data.crop_category;
    this.crop_category_id = data.crop_category_id;
    this.sub_category_name = data.crop_sub_category;
    this.family_id = data.crop_family_id;
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
  statusModal(content, status, id) {

    this.statusType = status;
    this.statusId = id;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' })
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


  onAddLandMeasurement(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const data = new FormData();
    data.append('crop_category', this.category_name);
    data.append('crop_sub_category', this.sub_category_name);

    data.append('status', '1');
    data.append('user_id', this.userData[0].user_id);
    data.append('crop_family_id', this.family_id);
    this.spinner.show();
    this.backendService.addCropCategory(data).subscribe(
      res => {
        if (res.status === true) {
          this.modalService.dismissAll();
          this.category_name = ""
          this.crop_category_id = "0"
          this.sub_category_name = ""
          this.family_id = "0"
          this.toastr.success(res.message);
          this.fetchData();
        } else {
          this.toastr.error(res.message);
        }
      }
    )
  }

  onUpdateLandMeasurement(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      return;
    }

    const data = new FormData();
    data.append('crop_category_id', this.crop_category_id);
    data.append('crop_category', this.category_name);
    data.append('crop_sub_category', this.sub_category_name);
    data.append('status', '1');
    data.append('user_id', this.userData[0].user_id);
    data.append('crop_family_id', this.family_id);
    this.spinner.show();
    this.backendService.updateCropCategory(data).subscribe(
      res => {
        if (res.status === true) {
          this.modalService.dismissAll();
          this.category_name = ""
          this.crop_category_id = "0"
          this.sub_category_name = ""
          this.family_id = "0"
          this.toastr.success(res.message);
          this.fetchData();
        } else {
          this.toastr.error(res.message);
        }
      }
    )
  }

  onChangeStatus() {
    let data = this.singleActivity;
    var params = {
      "status": this.statusType,
      "crop_category_id": this.statusId
    }
    this.modalService.dismissAll();
    this.spinner.show();
    this.backendService.chageCropCategoryStatus(params).subscribe(
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
