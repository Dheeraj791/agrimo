import { Route } from '@angular/router';
import { InstallfpoComponent } from '../registration/installfpo/installfpo.component';
import { RegisteredusersComponent } from '../registration/registeredusers/registeredusers.component';
import { MarketvendorsComponent } from '../registration/marketvendors/marketvendors.component';

export const registrationRouting: Route[] = [
    {
        path     : 'fpos',
        component: InstallfpoComponent
    },{
        path     : 'users',
        component: RegisteredusersComponent
    },{
        path     : 'vendors',
        component: MarketvendorsComponent
    }
];
