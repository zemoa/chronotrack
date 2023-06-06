export class AddTask {
    static readonly type ='[Task] Add Task';
    constructor(public label: string){}
}

export class RemoveTask {
    static readonly type ='[Task] Remove Task';
    constructor(public id: number){}
}