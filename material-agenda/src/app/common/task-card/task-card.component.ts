import {Component, Input, Output} from '@angular/core';
import { Task } from 'src/app/interfaces/agenda';

@Component({
    selector: 'app-task-card',
    templateUrl: './task-card.component.html',
    styleUrls: ['./task-card.component.sass']
})
export class TaskCardComponent {
    // @ts-ignore
    @Input() task: Task;

    constructor() {}

    getHour(date: Date): string {
        // get hour from date
        return new Date(date).getHours().toString();
    }
}
