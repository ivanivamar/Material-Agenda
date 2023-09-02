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
import { HomeComponent } from './home/home.component';
import { TaskCardComponent } from './common/task-card/task-card.component';
import { TaskDialogComponent } from './common/task-dialog/task-dialog.component';
import { TopbarComponent } from './common/topbar/topbar.component';
import {CalendarModule} from "primeng/calendar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {InputSwitchModule} from "primeng/inputswitch";
import {CheckboxModule} from "primeng/checkbox";

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
        HomeComponent,
        TaskCardComponent,
        TaskDialogComponent,
        TopbarComponent,
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
        CalendarModule,
        BrowserAnimationsModule,
        InputSwitchModule,
        CheckboxModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
