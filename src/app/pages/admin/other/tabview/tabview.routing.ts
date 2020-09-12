import { Route } from '@angular/router';
import { TabviewComponent } from '../tabview/tabview.component';

export const tabviewRouting: Route[] = [
  {
    path: '',
    component: TabviewComponent,
    children: [
      {
        path: 'crop-master',
        loadChildren: () =>
          import('app/pages/admin/cropmaster/cropmaster.module').then(
            (m) => m.CropmasterModule
          ),
      },
    ],
  },
];
