import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass'],
    providers: [AuthService]
})
export class LoginComponent {
    constructor(
        private auth: AuthService,
        private router: Router
        ) {
    }

    login() {
        this.auth.googleLogin().then((user) => {
            console.log('%c user', 'color: green; font-weight: bold;', user);
            this.router.navigate(['']);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }).catch((error) => {
            console.log('error', error);
        });
    }
}
