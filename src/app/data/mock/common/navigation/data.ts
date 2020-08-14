/* tslint:disable:max-line-length */
import { TreoNavigationItem } from '@treo/components/navigation';

export const defaultNavigation: TreoNavigationItem[] = [
    {
        id: 'pages',
        title: 'Dashboard',
        type: 'basic',
        icon: 'apps',
        link: '/dashboard'
    },
    {
        id: 'pages',
        title: 'Master Records',
        subtitle: 'Create master records',
        type: 'group',
        children: [
            {
                id: 'pages.masterrecords',
                title: 'Master Records',
                type: 'collapsable',
                icon: 'heroicons_outline:clipboard-list',
                children: [
                    {
                        id: 'pages.activitymaster',
                        title: 'Activities Master',
                        type: 'basic',
                        link: '/activitymaster'
                    },
                    {
                        id: 'pages.activitymaster',
                        title: 'Irrigation Master',
                        type: 'basic',
                        link: '/irrigationmaster'
                    },{
                        id: 'pages.activitymaster',
                        title: 'Land Measurement Master',
                        type: 'basic',
                        link: '/landmeasurement'
                    },
                    {
                        id: 'pages.activitymaster',
                        title: 'Location Master',
                        type: 'basic',
                        link: '/locationmaster'
                    }
                ]
            }
        ]
    }
];
export const compactNavigation: TreoNavigationItem[] = [
    {
        id: 'starter',
        title: 'Starter',
        type: 'aside',
        icon: 'apps',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    }
];
export const futuristicNavigation: TreoNavigationItem[] = [
    {
        id: 'starter.example',
        title: 'Example component',
        type: 'basic',
        icon: 'heroicons:chart-pie',

    },
    {
        id: 'starter.dummy.1',
        title: 'Dummy menu item #1',
        icon: 'heroicons:calendar',
        type: 'basic'
    },
    {
        id: 'starter.dummy.2',
        title: 'Dummy menu item #1',
        icon: 'heroicons:user-group',
        type: 'basic'
    }
];
export const horizontalNavigation: TreoNavigationItem[] = [
    {
        id: 'starter',
        title: 'Starter',
        type: 'group',
        icon: 'apps',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    }
];
