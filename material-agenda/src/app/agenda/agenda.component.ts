import {Component, OnInit} from '@angular/core';
import { Task } from '../interfaces/agenda';
import {AuthService} from "../services/auth.service";
import {from} from "rxjs";
import {AgendaService} from "../services/agenda.service";

@Component({
    selector: 'app-agenda',
    templateUrl: './agenda.component.html',
    styleUrls: ['./agenda.component.sass'],
    providers: [AuthService, AgendaService]
})
export class AgendaComponent implements OnInit {
    currentDate: Date = new Date();
    selectedDate: Date = new Date();
    daysTabs: any[] = [];

    tasks: Task[] = [];
    selectedTask: Task = {} as Task;
    currentTasks: Task[] = [];

    showChooseDate = false;
    showDialog = false;

    user: any;

    constructor(
        private authService: AuthService,
        private agendaService: AgendaService,
    ) {
    }

    async ngOnInit(): Promise<void> {
        // set in this.daysTabs currentDate and next 2 days
        this.daysTabs.push(this.currentDate);
        this.daysTabs.push(this.addDays(this.currentDate, 1));
        this.daysTabs.push(this.addDays(this.currentDate, 2));

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

            this.getTasksForCurrent();
        });
    }

    addDays(date: Date, days: number): Date {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    onDateSelect(event: any) {
        this.selectedDate = event;

        // set in this.daysTabs currentDate and next 2 days
        this.daysTabs = [];
        this.daysTabs.push(this.selectedDate);
        this.daysTabs.push(this.addDays(this.selectedDate, 1));
        this.daysTabs.push(this.addDays(this.selectedDate, 2));
        this.getTasksForCurrent();
    }

    getTasksForCurrent() {
        // get tasks for selected date
        this.currentTasks = this.tasks.filter((task: Task) => {
            return task.date.getDate() === this.selectedDate.getDate() &&
                task.date.getMonth() === this.selectedDate.getMonth() &&
                task.date.getFullYear() === this.selectedDate.getFullYear();
        });
    }

    getMonthName(date: Date): string {
        const monthNames = [
            'Jan', 'Feb', 'March',
            'Apr', 'May', 'Jun', 'Jul',
            'Aug', 'Sep', 'Oct',
            'Nov', 'Dec'
        ];
        return monthNames[date.getMonth()];
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

    addTask(): void {
        this.clearTask();
        this.showDialog = true;
    }
}
