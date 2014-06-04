/// <reference path="minecraft_enemies.ts" />

/*
 * splitted namespace,
 * divided into two source files
 */
module minecraft {

    export module player {

        export class goodboy implements minecraft.enemies.NamedEnemy {
            name:string;
        }

    }

}