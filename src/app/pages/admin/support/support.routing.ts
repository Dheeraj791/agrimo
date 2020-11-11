import { Route } from '@angular/router';
import { GeneratenotificationComponent } from '../support/generatenotification/generatenotification.component';
import { TicketsComponent } from '../support/tickets/tickets.component';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';

export const supportRouting: Route[] = [
    {
        path     : 'notification',
        component: GeneratenotificationComponent
    },{
        path     : 'tickets',
        component: TicketsComponent
    },
    {
        path: 'tickets/:id', component: TicketInfoComponent
    }
];
