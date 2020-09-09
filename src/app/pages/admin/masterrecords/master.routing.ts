import { Route } from '@angular/router';

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

export const masterRecordsRouting: Route[] = [
    {
        path: '', 
        redirectTo: 'activity',
        pathMatch: 'full'
    },
    {
        path     : 'activity',
        component: ActivitymasterComponent
    },{
        path     : 'irrigation',
        component: IrrigationmasterComponent
    },{
        path     : 'landmeasurement',
        component: LandmeasurementComponent
    },{
        path     : 'location',
        component: LocationmasterComponent
    },{
        path     : 'material',
        component: MaterialmasterComponent
    },{
        path     : 'mulch',
        component: MulchmasterComponent
    },{
        path     : 'plantation',
        component: PlantationmasterComponent
    },{
        path     : 'preparation',
        component: PreparationmasterComponent
    },{
        path     : 'qa',
        component: QamasterComponent
    },{
        path     : 'season',
        component: SeasonmasterComponent
    },{
        path     : 'soil',
        component: SoilmasterComponent
    },
    {
        path     : 'unitmeasurement',
        component: UnitmeasurementmasterComponent
    }
];
