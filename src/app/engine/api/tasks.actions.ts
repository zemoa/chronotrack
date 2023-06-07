export class AddTask {
    static readonly type ='[Task] Add Task';
    constructor(public label: string){}
}

export class RemoveTask {
    static readonly type ='[Task] Remove Task';
    constructor(public id: number){}
}

export class StartWorkingOnTask {
    static readonly type ='[Task] Start Working On Task';
    constructor(public id: number){}
}

export class StopWorkingOnTask {
    static readonly type ='[Task] Stop Working On Task';
    constructor(public id: number){}
}