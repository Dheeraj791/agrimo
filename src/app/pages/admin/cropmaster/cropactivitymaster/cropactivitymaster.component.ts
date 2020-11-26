import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { MasterRecordService } from '../../masterrecords/master-record.service';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
@Component({
  selector: 'app-cropactivitymaster',
  templateUrl: './cropactivitymaster.component.html',
  styleUrls: ['./cropactivitymaster.component.scss']
})
export class CropactivitymasterComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  selectedCars = [3, 1];
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];
  persons: [];
  closeResult = '';
  landMeasurementName: any;
  activityType = 'crop_master';
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
  filteredBindCropCategory = [];
  show_category_name = false;
  show_sub_category_name = false;
  category_name = "";
  sub_category_name = "";
  disable_name = false;

  allResults = []
  mr_commons = []
  desices_master = []
  disease_records_id = [];
  crop_stage_master = []
  crop_stage_master_id = [];
  crop_category_master = []
  crop_sub_category = [];
  landmeasurement = [];
  landmeasurement_id = [];
  irrigation = [];
  irrigation_id = [];
  materialmaster = [];
  materialmaster_id = [];
  mulchmaster = [];
  mulchmaster_id = [];
  soilmaster = [];
  soilmaster_id = [];

  season_master = []
  season_master_id = [];
  plantation_master = []
  plantation_master_id = []
  crop_sub_category_name = [];
  final_crop_cat_id = "0";

  cropMasterRecord = [];
  crop_master_id = "0"
  stageMaster = []
  crop_stage_records = []
  season_selection = [
    {
      "selection_id":1,
      "season_id": "",
      "season_name": "",
      "sub_season_ids": []
    }, {
      "selection_id":1,
      "season_id": "",
      "season_name": "",
      "sub_season_ids": []
    }
  ]
  activitiesdata = []
  activity_id_type = "0";
  activity_id = "0"
  activity_type = "0";

  act_type = [
    {
      act_type_id : 1,
      act_type_name:'Nutrition'
    },{
      act_type_id : 2,
      act_type_name:'Protection'
    }
  ]
  act_type_to = [
    {
      act_type_to_id : 1,
      act_type_to_name:'Root'
    },{
      act_type_to_id : 2,
      act_type_to_name:'Shoot'
    }
  ]

  act_type_id = "0";
  act_type_to_id="0";
  starting_from :number;
  unitmeasurementmaster= []
  material_id = "0"
  material_quantity : number;
  mat_unit_id= "0"
  mat_area_id="0"
  starting_stage= '0'
  constructor(
    private modalService: NgbModal,
    private backendService: MasterRecordService,
    public spinner: NgxSpinnerService,
    private toastr: ToastrService
  )  { }

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

    this.backendService.fetch_for_crop_master(data).subscribe((res) => {
      if (res.status === true) {
        this.allResults = res.result;
        this.mr_commons = this.allResults[0];
        for (let index = 0; index < this.mr_commons.length; index++) {
          if (this.mr_commons[index]['mr_com_type'] === 'landmeasurement') {
            this.landmeasurement.push(this.mr_commons[index]);
          } else if (this.mr_commons[index]['mr_com_type'] === 'irrigation') {
            this.irrigation.push(this.mr_commons[index])
          } else if (this.mr_commons[index]['mr_com_type'] === 'materialmaster') {
            this.materialmaster.push(this.mr_commons[index]);
          } else if (this.mr_commons[index]['mr_com_type'] === 'mulchmaster') {
            this.mulchmaster.push(this.mr_commons[index]);
          } else if (this.mr_commons[index]['mr_com_type'] === 'soilmaster') {
            this.soilmaster.push(this.mr_commons[index]);
          }else if (this.mr_commons[index]['mr_com_type'] === 'activities') {
            this.activitiesdata.push(this.mr_commons[index]);
          }else if (this.mr_commons[index]['mr_com_type'] === 'unitmeasurementmaster') {
            this.unitmeasurementmaster.push(this.mr_commons[index]);
          }
        }
        this.desices_master = this.allResults[1];
        this.crop_family_master = this.allResults[2];
        this.crop_stage_master = this.allResults[3];
        this.crop_category_master = this.allResults[4];
        this.plantation_master = this.allResults[5];
        this.season_master = this.allResults[6];
        console.log(this.crop_category_master)
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }

  activityOnChange(){
    let actData = this.activity_id_type.split('_');
    this.activity_id = actData[0];
    this.activity_type = actData[1];
    console.log("actData",actData)
  }
  familyOnChange(type) {
    this.filteredCropCategory = [];
    var family_id = this.family_id
    if (type === 'edit') {
      this.crop_category_id = this.crop_category_id
    } else {
      if (this.family_id != '0') {
        this.filteredCropCategory = this.crop_category_master.filter(function (item) {
          return item.crop_family_id == family_id;
        });
        this.filteredBindCropCategory = this.filteredCropCategory.filter((v, i, a) => a.findIndex(t => (t.crop_category === v.crop_category)) === i)

        if (this.filteredCropCategory.length > 0) {
          this.category_name = ""
          this.crop_category_id = "0";
        } else {
          this.category_name = ""
          this.crop_category_id = "0";
        }
      } else {
        this.filteredCropCategory = [];
        this.category_name = ""
        this.crop_category_id = "0";
      }
    }
    console.log("filteredBindCropCategory",this.filteredCropCategory)
    this.categoryOnChange(this.crop_category_id);
  }
  categoryOnChange(catid) {
    this.crop_category_id = catid;
    if (this.crop_category_id === '0') {
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
      var category_name = this.category_name;
      this.crop_sub_category = this.filteredCropCategory.filter(function (item) {
        return item.crop_category == category_name;
      });
      console.log("filteredSubCategory", this.crop_sub_category)
    }
    // this.subcategoryOnChange();
  }
  subcategoryOnChange() {
    // if (this.crop_category_id === '0') {
    //   this.crop_sub_category_name = [];
    //   this.final_crop_cat_id = "0"
    // } else {
    //   var finalCat = this.crop_sub_category_name.split("_");
    //   this.final_crop_cat_id = finalCat[0]
    // }
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  statusModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then((result) => {
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

  toggleDisabled() {
    const car: any = this.cars[1];
    car.disabled = !car.disabled;
  }

}