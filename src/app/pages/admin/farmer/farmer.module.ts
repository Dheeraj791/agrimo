import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { FullCalendarModule} from '@fullcalendar/angular';
import { DataTablesModule } from 'angular-datatables';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { farmerRoute } from '../farmer/farmer.routing';
import { AddticketComponent } from '../farmer/addticket/addticket.component';
import { CropstatusupdateComponent } from '../farmer/cropstatusupdate/cropstatusupdate.component';
import { CalendarComponent } from '../farmer/calendar/calendar.component';
import { ViewassignedcropComponent } from '../farmer/viewassignedcrop/viewassignedcrop.component';
import { DashboardComponent } from '../farmer/dashboard/dashboard.component';
import { MatSelectModule } from '@angular/material/select';
import { MasterRecordService } from '../masterrecords/master-record.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AddticketComponent,
    CropstatusupdateComponent,
    ViewassignedcropComponent,
    DashboardComponent,
    CalendarComponent
    ],
  imports: [
    RouterModule.forChild(farmerRoute),
    SharedModule,
    DataTablesModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    CKEditorModule,
    MatSelectModule,
    FullCalendarModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    MatCheckboxModule
  ], providers: [MasterRecordService, ToastrService, MatDatepickerModule]
})
export class FarmerModule {}