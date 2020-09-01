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
import { cropmasterRoute } from '../cropmaster/cropmaster.routing';
import { CropcategorymasterComponent } from '../cropmaster/cropcategorymaster/cropcategorymaster.component';
import { CropfamilymasterComponent } from '../cropmaster/cropfamilymaster/cropfamilymaster.component';
import { CropmasterComponent } from '../cropmaster/cropmaster/cropmaster.component';
import { CropstagesmasterComponent } from '../cropmaster/cropstagesmaster/cropstagesmaster.component';
import { DiseasemasterComponent } from '../cropmaster/diseasemaster/diseasemaster.component';
import { CropactivitymasterComponent } from '../cropmaster/cropactivitymaster/cropactivitymaster.component';
@NgModule({
  declarations: [
    CropactivitymasterComponent,
    CropcategorymasterComponent,
    CropfamilymasterComponent,
    CropfamilymasterComponent,
    CropmasterComponent,
    CropstagesmasterComponent,
    DiseasemasterComponent
],
imports     : [
    RouterModule.forChild(cropmasterRoute),
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
export class CropmasterModule { }