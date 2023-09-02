export interface Task {
    id?: string;
    title: string;
    description: string;
    completed: boolean;
    date: Date;
    creationDate: Date;
    updateDate: Date;
    userId: string;
    subtasks: Subtask[];
}

export interface Subtask {
    title: string;
    completed: boolean;
}

export interface IDropdownOption {
    value: any;
    icon?: string;
    iconColor?: string;
    label: string;
    selected?: boolean;
}

// Auth:
export interface Register {
    username: string;
    email: string;
    password: string;
}
export interface Login {
    email: string;
    password: string;
}
