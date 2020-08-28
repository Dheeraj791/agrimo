import { Route } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';

export const profileRoute: Route[] = [
    {
        path     : '',
        component: ProfileComponent
    }
];
