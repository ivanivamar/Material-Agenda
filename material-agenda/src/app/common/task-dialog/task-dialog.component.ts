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

    showChooseDate = false;
    newDate: any = this.task.date;

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

    deleteTask() {
        if (this.task.id != null) {
            this.agendaService.deleteTask(this.task.id);
        }
        this.closeOutput.emit();
    }

    clearDueDate(event: any) {
        event.stopPropagation();
        // @ts-ignore
        this.task.date = null;
    }

    addSubtask() {
        this.task.subtasks.push({
            title: '',
            completed: false,
        });
    }

    deleteSubtask(index: number) {
        this.task.subtasks.splice(index, 1);
    }

    checkDisabled(): boolean {
        return this.task.title === '' || this.task.description === '' || this.task.date === null;
    }
}
