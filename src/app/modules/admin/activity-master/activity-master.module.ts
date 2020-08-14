import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ActivityMasterComponent } from './activity-master.component';
import { activityMasterRoutes } from './activity-master.routing';

@NgModule({
    declarations: [
        ActivityMasterComponent
    ],
    imports     : [
        RouterModule.forChild(activityMasterRoutes),
        SharedModule
    ]
})
export class ActivityMasterModule
{
}