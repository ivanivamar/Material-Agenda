export interface Task {
    id?: string;
    title: string;
    description: string;
    status: string;
    date: Date;
    creationDate: Date;
    updateDate: Date;
    userId: string;
    tasks: Subtask[];
}

export interface Subtask {
    status: string;
    description: string;
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
