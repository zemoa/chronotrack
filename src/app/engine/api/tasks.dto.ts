export interface TaskDto {
    id: number;
    label: string;
    created: Date;
    start?: Date;
    stop?: Date;
}

export abstract class TaskErrorDto {
    readonly message: string;
    constructor(message: string){
        this.message = message;
    }
}

export class StopWorkingOnNotStartedTaskError extends TaskErrorDto {
}