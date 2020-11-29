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
  selector: 'app-cropmaster',
  templateUrl: './cropmaster.component.html',
  styleUrls: ['./cropmaster.component.scss']
})
export class CropmasterComponent implements OnInit {
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
  crop_sub_category_name = "0";
  final_crop_cat_id = "0";

  cropMasterRecord = [];
  crop_master_id = "0"
  stageMaster = []
  crop_stage_records = []
  unitmeasurementmaster= []
  material_id = "0"
  material_quantity : number;
  mat_unit_id= "0"
  mat_area_id="0"
  constructor(
    private modalService: NgbModal,
    private backendService: MasterRecordService,
    public spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.stageMaster = [
      {
        "season_type": "Monsoon",
        "season_id": 1,
        "sub_season_data": [
          {
            "sub_season_name": "STARTING",
            "stage_type": [
              {
                "name": "Flowering",
                "value": "",
                "id": 1
              }, {
                "name": "Harvesting",
                "value": "",
                "id": 1
              }, {
                "name": "Sapling",
                "value": "",
                "id": 1
              }, {
                "name": "Vegetation",
                "value": "",
                "id": 1
              }
            ]
          }, {
            "sub_season_name": "PEAK",
            "stage_type": [
              {
                "name": "Flowering",
                "value": "",
                "id": 1
              }, {
                "name": "Harvesting",
                "value": "",
                "id": 1
              }, {
                "name": "Sapling",
                "value": "",
                "id": 1
              }, {
                "name": "Vegetation",
                "value": "",
                "id": 1
              }
            ]
          }, {
            "sub_season_name": "CLOSING",
            "stage_type": [
              {
                "name": "Flowering",
                "value": "",
                "id": 1
              }, {
                "name": "Harvesting",
                "value": "",
                "id": 1
              }, {
                "name": "Sapling",
                "value": "",
                "id": 1
              }, {
                "name": "Vegetation",
                "value": "",
                "id": 1
              }
            ]
          }
        ]
      }, {
        "season_type": "Winters",
        "season_id": 1,
        "sub_season_data": [
          {
            "sub_season_name": "STARTING",
            "stage_type": [
              {
                "name": "Flowering",
                "value": "",
                "id": 1
              }, {
                "name": "Harvesting",
                "value": "",
                "id": 1
              }, {
                "name": "Sapling",
                "value": "",
                "id": 1
              }, {
                "name": "Vegetation",
                "value": "",
                "id": 1
              }
            ]
          }, {
            "sub_season_name": "PEAK",
            "stage_type": [
              {
                "name": "Flowering",
                "value": "",
                "id": 1
              }, {
                "name": "Harvesting",
                "value": "",
                "id": 1
              }, {
                "name": "Sapling",
                "value": "",
                "id": 1
              }, {
                "name": "Vegetation",
                "value": "",
                "id": 1
              }
            ]
          }, {
            "sub_season_name": "CLOSING",
            "stage_type": [
              {
                "name": "Flowering",
                "value": "",
                "id": 1
              }, {
                "name": "Harvesting",
                "value": "",
                "id": 1
              }, {
                "name": "Sapling",
                "value": "",
                "id": 1
              }, {
                "name": "Vegetation",
                "value": "",
                "id": 1
              }
            ]
          }
        ]
      }
    ];

  }

  ngOnInit(): void {
    this.spinner.show();
    this.fetchCropMasterData();
  }
  ngAfterViewInit(): void { this.dtTrigger.next(); }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  fetchCropMasterData() {

    const data = {
      record_type: this.activityType,
      admin_id: '1',
    };

    this.backendService.fetchRecords(data).subscribe((res) => {
      if (res.status === true) {
        this.cropMasterRecord = res.result;
        console.log("cropMasterRecord", this.cropMasterRecord);
        this.rerender();
        this.fetchData();
      } else {
        this.fetchData();
        this.spinner.hide();
      }
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
  }

  categoryOnChange() {
    console.log("filteredCropCategory", this.filteredCropCategory)
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
  }
  subcategoryOnChange() {
    if (this.crop_category_id === '0') {
      this.crop_sub_category_name = "0";
      this.final_crop_cat_id = "0"
    } else {
      var finalCat = this.crop_sub_category_name.split("_");
      this.final_crop_cat_id = finalCat[0]
    }
  }
  open(content) {
    this.clearAll();
    this.filteredCropCategory = [];
    this.category_name = ""
    this.crop_category_id = "0"
    this.sub_category_name = ""
    this.family_id = "0"

    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        windowClass: 'myCustomModalClass',
        size: 'xl',
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
  getValues(data) {
    var temp = []
    for (let index = 0; index < data.length; index++) {
      temp.push(parseInt(data[index]))
    }
    return temp;
  }
  editModal(content, data) {
    this.clearAll();
    this.crop_master_id = data.crop_master_id;
    this.family_id = data.vegitable;
    this.familyOnChange('add');
    this.crop_category_id = data.vegitable_sub_category + '_' + data.crop_category;
    this.categoryOnChange();
    this.crop_sub_category_name = data.vegitable_sub_category + '_' + data.crop_sub_category;
    this.subcategoryOnChange();
    this.soilmaster_id = this.getValues(data.soil_id.split(','));
    this.season_master_id = this.getValues(data.season_id.split(','));
    this.irrigation_id = this.getValues(data.irrigation.split(','));
    this.mulchmaster_id = this.getValues(data.mulching.split(','));
    this.disease_records_id = this.getValues(data.desices_id.split(','));
    this.plantation_master_id = this.getValues(data.plantation_id.split(','));
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

  fetchCropStageRecords(content,season_id) {
   
    const data = {
      crop_master_id: this.crop_master_id,
      admin_id: '1',
    };

    this.backendService.fetchCropStageRecords(data).subscribe((res) => {
      if (res.status === true) {
        this.crop_stage_records = res.result;
        this.makeStageData(content,season_id);
        console.log("crop_stage_records", this.crop_stage_records);        
      } else {       
        this.makeStageData(content,season_id);
      }
    });
  }

  makeStageData(content,seasons_id){
    
    // this.season_master
    // this.crop_stage_master
    console.log("seasons_id",seasons_id)
    let season_master_data = []
    for (let i = 0; i < this.season_master.length; i++) {
      var checkVal = seasons_id.includes(this.season_master[i].season_id)
      console.log(checkVal)
      if(checkVal){
        season_master_data.push(this.season_master[i])
      }
    }
    var temp = []
    var subSeason = [{
      "sub_id":1,
      "sub_name":"Starting"
    },{
      "sub_id":2,
      "sub_name":"Peak"
    },{
      "sub_id":3,
      "sub_name":"Closing"
    }]
    for (let seasonindex = 0; seasonindex < season_master_data.length; seasonindex++) {
      
        var interNal = {
          "season_name":season_master_data[seasonindex]['season_name'],
          "season_id":season_master_data[seasonindex]['season_id'],
          "sub_season_data":[]
        }
        var sub_season_data = [];
        for (let subIndex = 0; subIndex < subSeason.length; subIndex++) {
         var subSeasonTemp = {
          "sub_season_name": subSeason[subIndex]['sub_name'],
          "sub_season_id": subSeason[subIndex]['sub_id'],
          "stage_type": []
         }    
         var stageData = [];
         for (let stageIndex = 0; stageIndex < this.crop_stage_master.length; stageIndex++) {
           var crStageTemp = {
             "crop_stage_id":this.crop_stage_master[stageIndex]['crop_stage_id'],
             "crop_stage_name":this.crop_stage_master[stageIndex]['crop_stage_name'],
             "value":"",
             "value_name":this.crop_stage_master[stageIndex]['crop_stage_id']+"_"+subSeason[subIndex]['sub_season_id']
           }
           stageData.push(crStageTemp);
         }
         subSeasonTemp.stage_type = stageData
         sub_season_data.push(subSeasonTemp)     
        }
        interNal.sub_season_data = sub_season_data
        temp.push(interNal)
    }
    
    this.stageMaster=temp;

    this.modalService
    .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
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

  getStageValues(){
    console.log(this.stageMaster)
  }
  stageModal(content, list) {
    this.clearAll();
    var data = list;
    this.crop_master_id = data.crop_master_id;
   
    this.family_id = data.vegitable;
    this.familyOnChange('add');
    this.crop_category_id = data.vegitable_sub_category + '_' + data.crop_category;
    this.categoryOnChange();
    this.crop_sub_category_name = data.vegitable_sub_category + '_' + data.crop_sub_category;
    this.subcategoryOnChange();
    this.soilmaster_id = this.getValues(data.soil_id.split(','));
    this.season_master_id = this.getValues(data.season_id.split(','));
    this.irrigation_id = this.getValues(data.irrigation.split(','));
    this.mulchmaster_id = this.getValues(data.mulching.split(','));
    this.disease_records_id = this.getValues(data.desices_id.split(','));
    this.plantation_master_id = this.getValues(data.plantation_id.split(','));
    var listData = list;
    this.fetchCropStageRecords(content,listData.season_id); 
    
  }

  onAddRecords() {
    let reqParams = [];
    for (let index = 0; index < this.stageMaster.length; index++) {
      var subSeason = []
      for (let subindex = 0; subindex < this.stageMaster[index]['sub_season_data'].length; subindex++) {
        var crop_stage = [];
        var stage_life = [];
        for (let stageindex = 0; stageindex < this.stageMaster[index]['sub_season_data'][subindex]['stage_type'].length; stageindex++) {          
          crop_stage.push(this.stageMaster[index]['sub_season_data'][subindex]['stage_type'][stageindex]['crop_stage_id'])
          stage_life.push(this.stageMaster[index]['sub_season_data'][subindex]['stage_type'][stageindex]['value'])
        }
        let data = {
          'crop_master_id':this.crop_master_id, 
          'season_id':this.stageMaster[index]['season_id'], 
          'sub_season_id':this.stageMaster[index]['sub_season_data'][subindex]['sub_season_id'], 
          'crop_stage_id':crop_stage.toString(), 
          'stage_life':stage_life.toString(), 
          'soil_id':this.soilmaster_id.toString(), 
          'status':"1"
        };
        reqParams.push(data);
      }
    }
    // console.log("reqParams",reqParams)
    // this.spinner.show();
    // return false;
    this.backendService.addCropMasterStage(reqParams).subscribe(
      res => {
        if (res.status === true) {
          this.modalService.dismissAll();
          this.toastr.success(res.message);
          this.spinner.hide();
          this.clearAll();
        } else {
          this.toastr.error(res.message);
          this.spinner.hide();
        }
      }
    )
  }
  onAddCropRecords(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const data = new FormData();
    // data.append('crop_master_id', this.crop_master_id);
    data.append('vegitable', this.family_id);
    data.append('vegitable_sub_category', this.final_crop_cat_id);
    data.append('irrigation', this.irrigation_id.toString());
    data.append('mulching', this.mulchmaster_id.toString());
    data.append('plantation_id', this.plantation_master_id.toString());
    data.append('season_id', this.season_master_id.toString());
    data.append('soil_id', this.soilmaster_id.toString());
    data.append('desices_id', this.disease_records_id.toString());
    data.append('family_id', this.family_id);

    data.append('status', '1');
    data.append('user_id', this.userData[0].user_id);
    this.spinner.show();
    this.backendService.addCropMaster(data).subscribe(
      res => {
        if (res.status === true) {
          this.modalService.dismissAll();
          this.toastr.success(res.message);
          this.fetchCropMasterData();
          this.clearAll();
        } else {
          this.toastr.error(res.message);
        }
      }
    )

  }
  onUpdateRecord(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      return;
    }

    const data = new FormData();
    data.append('crop_master_id', this.crop_master_id);
    data.append('vegitable', this.family_id);
    data.append('vegitable_sub_category', this.final_crop_cat_id);
    data.append('irrigation', this.irrigation_id.toString());
    data.append('mulching', this.mulchmaster_id.toString());
    data.append('plantation_id', this.plantation_master_id.toString());
    data.append('season_id', this.season_master_id.toString());
    data.append('soil_id', this.soilmaster_id.toString());
    data.append('desices_id', this.disease_records_id.toString());
    data.append('family_id', this.family_id);

    data.append('status', '1');
    data.append('user_id', this.userData[0].user_id);
    this.spinner.show();
    this.backendService.updateCropMaster(data).subscribe(
      res => {
        if (res.status === true) {
          this.modalService.dismissAll();
          this.toastr.success(res.message);
          this.fetchCropMasterData();
          this.clearAll();
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
      "crop_master_id": this.statusId
    }
    this.modalService.dismissAll();
    this.spinner.show();
    this.backendService.changeCropMasterStatus(params).subscribe(
      res => {
        if (res.status === true) {
          this.toastr.success(res.message);
          this.fetchCropMasterData();
        } else {
          this.toastr.success(res.message);
          this.fetchCropMasterData();
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

  clearAll() {
    this.family_id = "";
    this.crop_category_id = "";
    this.final_crop_cat_id = "";
    this.crop_sub_category_name = "";
    this.soilmaster_id = ['15', '16'];
    this.season_master_id = []
    this.irrigation_id = []
    this.mulchmaster_id = []
    this.disease_records_id = []
    this.plantation_master_id = []
    this.crop_master_id = "0";
  }
}
