import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from "../../interfaces/agenda";
import {AgendaService} from "../../services/agenda.service";

@Component({
    selector: 'app-task-dialog',
    templateUrl: './task-dialog.component.html',
    styleUrls: ['./task-dialog.component.sass'],
    providers: [AgendaService]
})
export class TaskDialogComponent {
    @Input() task: Task = {} as Task;
    @Output() closeOutput: EventEmitter<any> = new EventEmitter<any>();
    @Output() saveOutput: EventEmitter<Task> = new EventEmitter<Task>();
    constructor(private agendaService: AgendaService) {
    }

    close() {
        this.closeOutput.emit();
    }

    save() {
        this.task.updateDate = new Date();
        this.agendaService[this.task.id ? 'updateTask' : 'addTask'](this.task);

        this.saveOutput.emit(this.task);
    }
}
