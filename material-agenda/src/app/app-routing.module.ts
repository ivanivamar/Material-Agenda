import {RouterModule, Routes} from "@angular/router";
import {AgendaComponent} from "./agenda/agenda.component";
import {canActivate, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full',
        ...canActivate(() => redirectUnauthorizedTo(['/login'])),
    },
    {
        path: 'agenda',
        component: AgendaComponent,
        pathMatch: 'full',
        ...canActivate(() => redirectUnauthorizedTo(['/login'])),
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
