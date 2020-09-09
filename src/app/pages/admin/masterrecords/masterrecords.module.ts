
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { masterRecordsRouting } from '../masterrecords/master.routing';
import { ActivitymasterComponent } from '../masterrecords/activitymaster/activitymaster.component';
import { IrrigationmasterComponent } from '../masterrecords/irrigationmaster/irrigationmaster.component';
import { LandmeasurementComponent } from '../masterrecords/landmeasurement/landmeasurement.component';
import { LocationmasterComponent } from '../masterrecords/locationmaster/locationmaster.component';
import { MaterialmasterComponent } from '../masterrecords/materialmaster/materialmaster.component';
import { MulchmasterComponent } from '../masterrecords/mulchmaster/mulchmaster.component';
import { PlantationmasterComponent } from '../masterrecords/plantationmaster/plantationmaster.component';
import { PreparationmasterComponent } from '../masterrecords/preparationmaster/preparationmaster.component';
import { QamasterComponent } from '../masterrecords/qamaster/qamaster.component';
import { SeasonmasterComponent } from '../masterrecords/seasonmaster/seasonmaster.component';
import { SoilmasterComponent } from '../masterrecords/soilmaster/soilmaster.component';
import { UnitmeasurementmasterComponent } from '../masterrecords/unitmeasurementmaster/unitmeasurementmaster.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';

import {MasterRecordService} from '../masterrecords/master-record.service';

@NgModule({
  declarations: [
    ActivitymasterComponent,
    IrrigationmasterComponent,
    LandmeasurementComponent,
    LocationmasterComponent,
    MaterialmasterComponent,
    MulchmasterComponent,
    PlantationmasterComponent,
    PreparationmasterComponent,
    QamasterComponent,
    SeasonmasterComponent,
    SoilmasterComponent,
    UnitmeasurementmasterComponent,
   
],
imports     : [
    RouterModule.forChild(masterRecordsRouting),
    SharedModule,
    DataTablesModule,
    MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        CKEditorModule,
        MatTabsModule,
        MatSelectModule
        
],
providers: [MasterRecordService]
})
export class MasterrecordsModule { }