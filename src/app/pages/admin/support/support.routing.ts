import { Route } from '@angular/router';
import { GeneratenotificationComponent } from '../support/generatenotification/generatenotification.component';
import { TicketsComponent } from '../support/tickets/tickets.component';

export const supportRouting: Route[] = [
    {
        path     : 'notification',
        component: GeneratenotificationComponent
    },{
        path     : 'tickets',
        component: TicketsComponent
    }
];
