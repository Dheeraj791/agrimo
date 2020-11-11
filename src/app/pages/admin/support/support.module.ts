import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { NgSelectModule } from '@ng-select/ng-select';
import { MatNativeDateModule } from "@angular/material/core";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { supportRouting } from "../support/support.routing";
import { GeneratenotificationComponent } from "../support/generatenotification/generatenotification.component";
import { TicketsComponent } from "../support/tickets/tickets.component";
import { TicketInfoComponent } from './ticket-info/ticket-info.component';
@NgModule({
  declarations: [GeneratenotificationComponent, TicketsComponent, TicketInfoComponent],
  imports: [
    RouterModule.forChild(supportRouting),
    SharedModule,
    DataTablesModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    NgSelectModule,
    MatMenuModule,
    MatSelectModule,
    CKEditorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
  ],
  providers: [ToastrService, MatDatepickerModule],
})
export class SupportModule {}
