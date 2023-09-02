import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.sass'],
    providers: [AuthService],
})
export class NavbarComponent implements OnInit {
    user: any = null;

    constructor(
        private auth: AuthService,
        private router: Router,
    ) {}

    async ngOnInit(): Promise<void> {
        // check if user is logged in
        this.auth.isLoggedIn().then((user: any) => {
            this.user = user;
            console.log('%c NavbarComponent -> ngOnInit -> user', 'color: #bada55', user);
        });
    }

    logout(): void {
        this.auth.logout().then(() => {
            this.user = null;
            this.router.navigate(['/login']);
        });
    }
}
