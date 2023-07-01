export namespace Tasks {
    export class FetchAll {
        static readonly type = '[Tasks] Fetch all';
    }

    export class Add {
        static readonly type = '[Tasks] Add';
        constructor(public name: string){}
    }

    export class Remove {
        static readonly type = '[Tasks] Remove';
        constructor(public id: string){}
    }
}