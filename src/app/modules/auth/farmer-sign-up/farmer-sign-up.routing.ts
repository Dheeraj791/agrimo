import { Route } from '@angular/router';
import { AuthSignUpComponent } from 'app/modules/auth/farmer-sign-up/farmer-sign-up.component';

export const authSignupRoutes: Route[] = [
    {
        path     : '',
        component: AuthSignUpComponent
    }
];
