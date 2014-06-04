module minecraft {

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