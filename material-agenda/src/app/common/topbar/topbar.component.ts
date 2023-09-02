import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.sass'],
    providers: [AuthService],
})
export class TopbarComponent implements OnInit {
    user: any = null;
    pageTitle: string = 'Home';

    constructor(
        private auth: AuthService,
        private router: Router,
    ) {
    }

    async ngOnInit(): Promise<void> {
        // check if user is logged in
        this.auth.isLoggedIn().then((user: any) => {
            this.user = user;
            console.log('%c NavbarComponent -> ngOnInit -> user', 'color: #bada55', user);
        });

        // set page title
        this.router.events.subscribe((val) => {
            this.pageTitle = this.router.url.split('/')[1].toUpperCase();
        });
    }
}
