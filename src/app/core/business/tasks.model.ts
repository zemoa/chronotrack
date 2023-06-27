export interface TasksStateModel {
    loading: boolean,
    tasks: Task[]
}

export class Task {
    constructor(private name: string){}
}