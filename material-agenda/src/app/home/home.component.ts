import {Component, OnInit} from '@angular/core';
import {Task} from '../interfaces/agenda';
import {AuthService} from "../services/auth.service";
import {AgendaService} from "../services/agenda.service";
import {Router} from "@angular/router";
import {from} from "rxjs";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass'],
    providers: [AuthService, AgendaService]
})
export class HomeComponent implements OnInit {
    loading = false;

    tasks: Task[] = [];
    selectedTask: Task = {} as Task;
    showDialog = false;

    user: any;
    constructor(
        private authService: AuthService,
        private agendaService: AgendaService,
        private router: Router,
    ) {
    }

    async ngOnInit(): Promise<void> {
        this.loading = true;

        // check if user is logged in
        this.authService.isLoggedIn().then((user: any) => {
            this.user = user;
        });

        from(this.agendaService.getTasks()).subscribe((tasks: Task[]) => {
            // select only tasks from current user
            this.tasks = tasks.filter((task: Task) => task.userId === this.user.uid);
            this.tasks.forEach((task: Task) => {
                // @ts-ignore
                const milliseconds = task.date.seconds * 1000 + Math.floor(task.date.nanoseconds / 1000000);
                task.date = new Date(milliseconds);
            });
            this.loading = false;
        });
    }

    clearTask(): void {
        // @ts-ignore
        this.selectedTask = {
            title: '',
            description: '',
            date: null,
            creationDate: new Date(),
            userId: this.user.uid,
            completed: false,
            updateDate: null,
            subtasks: [],
        } as Task;
        this.showDialog = false;
    }

    refreshTasks(): void {
        this.loading = true;
        from(this.agendaService.getTasks()).subscribe((tasks: Task[]) => {
            this.tasks = tasks.filter((task: Task) => task.userId === this.user.uid);
            this.tasks.forEach((task: Task) => {
                // @ts-ignore
                const milliseconds = task.date.seconds * 1000 + Math.floor(task.date.nanoseconds / 1000000);
                task.date = new Date(milliseconds);
            });
            this.loading = false;
        });
        this.showDialog = false;
    }

    addTask(): void {
        this.clearTask();
        this.showDialog = true;
    }
}
