import { Route } from '@angular/router';
import { ActivityMasterModule } from './activity-master.module';
import { ActivityMasterComponent } from './activity-master.component';

export const activityMasterRoutes: Route[] = [
    {
        path     : '',
        component: ActivityMasterComponent
    }
];
