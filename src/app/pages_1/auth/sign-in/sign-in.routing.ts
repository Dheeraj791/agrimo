import { Route } from '@angular/router';
import { SignInComponent } from '../sign-in/sign-in.component';

export const authSignInRoutes: Route[] = [
    {
        path     : '',
        component: SignInComponent
    }
];
