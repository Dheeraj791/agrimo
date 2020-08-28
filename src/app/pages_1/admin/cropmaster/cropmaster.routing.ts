import { Route } from '@angular/router';
import { CropcategorymasterComponent } from '../cropmaster/cropcategorymaster/cropcategorymaster.component';
import { CropfamilymasterComponent } from '../cropmaster/cropfamilymaster/cropfamilymaster.component';
import { CropmasterComponent } from '../cropmaster/cropmaster/cropmaster.component';
import { CropstagesmasterComponent } from '../cropmaster/cropstagesmaster/cropstagesmaster.component';
import { DiseasemasterComponent } from '../cropmaster/diseasemaster/diseasemaster.component';
import { CropactivitymasterComponent } from '../cropmaster/cropactivitymaster/cropactivitymaster.component';

export const cropmasterRoute: Route[] = [
    {
        path     : 'activity',
        component: CropactivitymasterComponent
    },{
        path     : 'category',
        component: CropcategorymasterComponent
    },{
        path     : 'family',
        component: CropfamilymasterComponent
    },{
        path     : 'crop',
        component: CropmasterComponent
    },{
        path     : 'stages',
        component: CropstagesmasterComponent
    },{
        path     : 'disease',
        component: DiseasemasterComponent
    }
];
