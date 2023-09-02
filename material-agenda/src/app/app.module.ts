import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {provideStorage, getStorage} from '@angular/fire/storage';
import { AgendaComponent } from './agenda/agenda.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {MatInputComponent} from "./common/mat-input/mat-input.component";
import {MatTextareaComponent} from "./common/mat-textarea/mat-textarea.component";
import {MatDropdownComponent} from "./common/mat-dropdown/mat-dropdown.component";
import {RippleDirective} from "./ripple.directive";
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        AgendaComponent,
        NavbarComponent,
        MatInputComponent,
        MatTextareaComponent,
        MatDropdownComponent,
        RippleDirective,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterOutlet,
        FormsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}