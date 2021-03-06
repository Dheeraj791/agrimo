/* tslint:disable:max-line-length */
import { TreoNavigationItem } from '@treo/components/navigation';

export const defaultNavigation: TreoNavigationItem[] = [
    {
        id: 'pages',
        role: 'Super Admin',
        title: 'Dashboard',
        type: 'basic',
        icon: 'apps',
        link: '/dashboard'
    },
    {
        id: 'pages',
        role: 'Super Admin',
        title: 'User Management',
        subtitle: 'Registration & installations',
        type: 'group',
        children: [
            {
                id: 'pages.registration',
                title: 'FPO & Users',
                type: 'collapsable',
                icon: 'heroicons_outline:clipboard-list',
                children : [
                    {
                        id: 'pages.users.users',
                        title: 'Registered Users',
                        type: 'basic',
                        link: '/users/users'
                    },
                    {
                        id: 'pages.users.fpos',
                        title: 'Installed FPOs',
                        type: 'basic',
                        link: '/users/fpos'
                    }, {
                        id: 'pages.users.vendors',
                        title: 'Registered Vendors',
                        type: 'basic',
                        link: '/users/vendors'
                    }
                ]
            }
        ]
    },
    {
        id: 'pages',
        title: 'Master Record',
        role: 'Super Admin',
        subtitle: 'All Master Records',
        type: 'group',
        children: [
            {
                id: 'pages.masterselect',
                title: 'Master Records',
                type: 'basic',
                icon: 'apps',
                link: '/masterselect'
            },
            {
                id: 'pages.mastertabs',
                title: 'Crop Master Records',
                type: 'basic',
                icon: 'apps',
                link: '/mastertabs'
            }
        ]
    },
    {
        id: 'pages',
        role: 'Super Admin',
        title: 'Notification & Support',
        subtitle: 'Check queries, generate notification, update settings',
        type: 'group',
        children: [
            {
                id: 'pages.masterselect',
                title: 'Tickets',
                type: 'basic',
                icon: 'playlist_add_check',
                link: '/support/tickets'
            },
            {
                id: 'pages.masterselect',
                title: 'Notification',
                type: 'basic',
                icon: 'help_outline',
                link: '/support/notification'
            },
            {
                id: 'pages.masterselect',
                title: 'Setting',
                type: 'basic',
                icon: 'settings',
                link: '/setting'
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
