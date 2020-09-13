import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { TreoAnimations } from "@treo/animations";
import { AuthService } from "app/core/auth/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  message: any;

  /**
   * Constructor
   *
   * @param {ActivatedRoute} _activatedRoute
   * @param {AuthService} _authService
   * @param {FormBuilder} _formBuilder
   * @param {Router} _router
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    // Set the defaults
    this.message = null;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      email: ["abhilash@agrieasy.com"],
      password: ["admin"],
      rememberMe: [""],
      type: ["user"],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   */
  signIn(): void {
    // Disable the form
    this.signInForm.disable();

    // Hide the message
    this.message = null;

    // Get the credentials
    const credentials = {
      user_id: this.signInForm.value.email,
      password: this.signInForm.value.password,
    };

    // Sign in
    this._authService.signIn(credentials).subscribe(
      (response) => {
        // Check if status is success or not
        if (response.hasOwnProperty("status")) {
          if (!response.status) {
            this.signInForm.enable();
            this.message = {
              appearance: "outline",
              content: response.message,
              shake: true,
              showIcon: false,
              type: "error",
            };
            return;
          }
        }
        // Set the redirect url.
        // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
        // to the correct page after a successful sign in. This way, that url can be set via
        // routing file and we don't have to touch here.
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get("redirectURL") ||
          "/signed-in-redirect";

        // Navigate to the redirect url
        this._router.navigateByUrl(redirectURL);
      },
      (response) => {
        // Re-enable the form
        this.signInForm.enable();

        // Show the error message
        this.message = {
          appearance: "outline",
          content: response.error,
          shake: true,
          showIcon: false,
          type: "error",
        };
      }
    );
  }
}
