import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  public loginForm!: FormGroup;
  private subscription!: Subscription;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userLogin: [
        '',
        [
          Validators.required
        ]
      ],
      userPassword: [
        '',
        [
          Validators.required
        ]
      ],
      stayConnected: [
        false
      ]
    })
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  public onLogin() {
    this.subscription = this.userService.login(this.loginForm.value)
      .subscribe((authentificated: boolean) => {
        if (authentificated) {
          this.router.navigate(['/', 'home']);
        } else {
          this.loginForm.reset();
        }

      })
  }


}
