import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { TreoAnimations } from '@treo/animations';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector     : 'auth-farmer-sign-up',
    templateUrl  : './farmer-sign-up.component.html',
    styleUrls    : ['./farmer-sign-up.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : TreoAnimations
})

export class AuthSignUpComponent implements OnInit, OnDestroy
{
    message: any;
    FarmersignUpForm: FormGroup;
    isShown: boolean = false ;
    selectedState;
    selectedCity;
    cities:any;
    dropdownList = [
        {value: 'madhyapradesh', viewValue: 'Madhya Pradesh', cities: ['Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Indore‎']},
        {value: 'andra_pradesh', viewValue: 'Andra Pradesh', cities:['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Tirupati']},
        {value: 'karnataka', viewValue: 'Karnataka', cities: ['Mysore', 'Davangere', 'Mangalore', 'Hubli-Dharwad', 'Belgaum']},
        {value: 'tamilnadu', viewValue: 'Tamilnadu', cities: ['Tiruchirappalli', 'Madurai', 'Erode', 'Vellore', 'Coimbatore']}
      ];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {AuthService} _authService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.message = null;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.FarmersignUpForm = this._formBuilder.group({
                name      : ['', Validators.required],
                phone      : ['', Validators.required,Validators.pattern(/^[6-9]\d{9}$/)],
                email     : ['', [Validators.required, Validators.email]],
                state      : ['', Validators.required],
                district      : ['', Validators.required],
                tehsil      : ['', Validators.required],
                city      : ['', Validators.required],
                password  : ['', Validators.required],
                company   : [''],
                agreements: ['', Validators.requiredTrue],
                whatsapp: ['true', Validators.required],
                whatsappnumber : [''],             

            }
        );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void
    {
        // Do nothing if the form is invalid
        if ( this.FarmersignUpForm.invalid )
        {
            return;
        }

        // Disable the form
        this.FarmersignUpForm.disable();

        // Hide the message
        this.message = null;

        // Do your action here...

        // Emulate server delay
        setTimeout(() => {

            // Re-enable the form
            this.FarmersignUpForm.enable();

            // Reset the form
            this.FarmersignUpForm.reset({});

            // Show the message
            this.message = {
                appearance: 'outline',
                content   : 'Your account has been created and a confirmation mail has been sent to your email address.',
                shake     : false,
                showIcon  : false,
                type      : 'success'
            };
        }, 1000);
    }
    toggleShow() {

        this.isShown = ! this.isShown;
        
        }

    onSelect(evt){
        var selectedList = this.dropdownList.find(list => list.value == this.selectedState);
        this.cities = selectedList.cities;
    }
    
}
