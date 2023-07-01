export interface TasksStateModel {
    loading: boolean,
    tasks: Task[]
}

export class Task {
    readonly name: string;
    readonly id: string;
    readonly selected: boolean;
    constructor(name: string, id: string, selected?: boolean){
        this.name = name;
        this.id = id;
        this.selected = selected ?? false;
    }

    // static copy(otherTask: Task, data: {name?: string, id?: string, selected?: boolean}): Task {
    //     return new Task(
    //         data.name ?? otherTask.name,
    //         data.id ?? otherTask.id,
    //         data.selected ?? otherTask.selected,
    //     )
    // }
}