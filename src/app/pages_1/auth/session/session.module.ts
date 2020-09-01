
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
import { SessionComponent } from '../session/session.component';
import { sessionRoute } from '../session/session.route';
@NgModule({
  declarations: [
    SessionComponent
  ],
  imports: [
    RouterModule.forChild(sessionRoute),
    SharedModule,
    DataTablesModule,
    MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        CKEditorModule
  ]
})
export class SessionModule { }

