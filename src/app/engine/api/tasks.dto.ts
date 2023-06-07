export interface TaskDto {
    id: number;
    label: string;
    created: Date;
    start?: Date;
    stop?: Date;
}