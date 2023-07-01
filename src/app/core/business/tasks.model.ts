export interface TasksStateModel {
    loading: boolean,
    tasks: Task[]
}

export class Task {
    readonly name: string;
    readonly id: string;
    readonly selected: boolean;
    readonly workLoads: WorkLoad[];
    constructor(name: string, id: string, selected?: boolean, workloads?: WorkLoad[]){
        this.name = name;
        this.id = id;
        this.selected = selected ?? false;
        this.workLoads = workloads ?? [];
    }

    // static copy(otherTask: Task, data: {name?: string, id?: string, selected?: boolean}): Task {
    //     return new Task(
    //         data.name ?? otherTask.name,
    //         data.id ?? otherTask.id,
    //         data.selected ?? otherTask.selected,
    //     )
    // }
}

export class WorkLoad {
    readonly start: Date;
    readonly end?: Date;
    constructor(start: Date, end?: Date) {
        this.start = start;
        this.end = end;
    }
}