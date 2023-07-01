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

    export class Select {
        static readonly type = '[Tasks] Select';
        constructor(public id: string){}
    }
    export class StartWorking {
        static readonly type = '[Tasks] Start working';
        constructor(){}
    }
}