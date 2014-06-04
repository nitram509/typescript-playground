// declares an internal module
module minecraft {

    // declares a module inside an internal module
    // with modifier "export" which is equivalent to public
    export module enemies {

        export interface NamedEnemy {
            name: string;
        }

        export class skeleton implements NamedEnemy {
            name:string;
        }

        export class creeper implements NamedEnemy {
            name:string;
            power:number = 100;
        }


    }

}
