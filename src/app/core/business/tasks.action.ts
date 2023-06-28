export namespace Tasks {
    export class FetchAll {
        static readonly type = '[Tasks] Fetch all';
    }

    export class Add {
        static readonly type = '[Tasks] Fetch all';
        constructor(public name: string){}
    }
}