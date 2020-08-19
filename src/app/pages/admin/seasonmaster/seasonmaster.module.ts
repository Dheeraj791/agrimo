
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
import { MaterialLayoutComponent } from 'app/layout/layouts/horizontal/material/material.component';
import {seasonmasterRoute} from '../seasonmaster/seasonmaster.routing';
import { PlantationmasterComponent } from '../plantationmaster/plantationmaster.component';
import { QamasterComponent } from '../qamaster/qamaster.component';
import { SeasonmasterComponent } from '../seasonmaster/seasonmaster.component';
@NgModule({
  declarations: [
    SeasonmasterComponent
],
imports     : [
    RouterModule.forChild(seasonmasterRoute),
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
export class SeasonmasterModule { }

