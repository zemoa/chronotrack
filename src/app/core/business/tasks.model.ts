export interface TasksStateModel {
    loading: boolean,
    tasks: Task[]
}

export class Task {
    readonly name: string;
    readonly id: string;
    constructor(name: string, id: string){
        this.name = name;
        this.id = id;
    }
}