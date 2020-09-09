import { Route } from '@angular/router';
import { SelectviewComponent } from '../selectview/selectview.component';

export const selectviewRouting: Route[] = [
    {
        path     : '',
        component: SelectviewComponent,
        children: [
            {
                path: 'master',
                loadChildren: () => import('app/pages/admin/masterrecords/masterrecords.module').then(m => m.MasterrecordsModule)
            }
        ]
    }
];
