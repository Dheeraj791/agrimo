
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

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { tabviewRouting } from '../tabview/tabview.routing';
import { TabviewComponent } from '../tabview/tabview.component';






@NgModule({
  declarations: [
    TabviewComponent
],
imports     : [
    RouterModule.forChild(tabviewRouting),
    SharedModule,
    DataTablesModule,
    MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        CKEditorModule,
        MatRadioModule,
        MatCheckboxModule,
        MatSelectModule
]
})
export class TabviewModule { }