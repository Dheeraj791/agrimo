import { Route } from '@angular/router';
import { HomeComponent } from 'app/pages/dashboard/home/home.component';

export const homeRoute: Route[] = [
    {
        path     : '',
        component: HomeComponent
    }
];
