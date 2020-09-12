import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { TreoNavigationItem } from '@treo/components/navigation';
import { TreoMockApi } from '@treo/lib/mock-api/mock-api.interfaces';
import { TreoMockApiService } from '@treo/lib/mock-api/mock-api.service';
import {
  compactNavigation,
  defaultNavigation,
  futuristicNavigation,
  horizontalNavigation,
} from 'app/data/mock/common/navigation/data';

@Injectable({
  providedIn: 'root',
})
export class NavigationMockApi implements TreoMockApi {
  defaultNav: any;
  userRole: any;
  // Private Readonly
  private readonly _compactNavigation: TreoNavigationItem[];
  private readonly _defaultNavigation: TreoNavigationItem[];
  private readonly _futuristicNavigation: TreoNavigationItem[];
  private readonly _horizontalNavigation: TreoNavigationItem[];

  /**
   * Constructor
   *
   * @param _treoMockApiService
   */
  constructor(private _treoMockApiService: TreoMockApiService) {
    // Set the data
    this._compactNavigation = compactNavigation;
    this._defaultNavigation = defaultNavigation;
    this._futuristicNavigation = futuristicNavigation;
    this._horizontalNavigation = horizontalNavigation;

    // Register the API endpoints
    this.register();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register
   */
  register(): void {
    // get user role from local storage
    const userData = JSON.parse(window.localStorage.getItem('user_data'));
    if (userData != null) {
      this.userRole = userData[0].user_type_name;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Navigation - GET
    // -----------------------------------------------------------------------------------------------------
    this._treoMockApiService.onGet('api/common/navigation').reply(() => {
      // Logic for showing nav menus based on role
      this.defaultNav = [];
      this._defaultNavigation.filter((nav) => {
        if (nav.role === this.userRole) {
          this.defaultNav.push(nav);
        }
      });
      console.log(this.defaultNav);

      // Fill compact navigation children using the default navigation
      this._compactNavigation.forEach((compactNavItem) => {
        this._defaultNavigation.forEach((defaultNavItem) => {
          if (defaultNavItem.id === compactNavItem.id) {
            compactNavItem.children = cloneDeep(defaultNavItem.children);
          }
        });
      });

      // Fill futuristic navigation children using the default navigation
      this._futuristicNavigation.forEach((futuristicNavItem) => {
        this._defaultNavigation.forEach((defaultNavItem) => {
          if (defaultNavItem.id === futuristicNavItem.id) {
            futuristicNavItem.children = cloneDeep(defaultNavItem.children);
          }
        });
      });

      // Fill horizontal navigation children using the default navigation
      this._horizontalNavigation.forEach((horizontalNavItem) => {
        this._defaultNavigation.forEach((defaultNavItem) => {
          if (defaultNavItem.id === horizontalNavItem.id) {
            horizontalNavItem.children = cloneDeep(defaultNavItem.children);
          }
        });
      });

      return [
        200,
        {
          compact: cloneDeep(this._compactNavigation),
          //   default: cloneDeep(this._defaultNavigation),
          default: cloneDeep(this.defaultNav),
          futuristic: cloneDeep(this._futuristicNavigation),
          horizontal: cloneDeep(this._horizontalNavigation),
        },
      ];
    });
  }
}
