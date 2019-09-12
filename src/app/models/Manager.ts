import {Roles} from './Roles';
import {City} from './City';

export class Manager {
    constructor(
        public id: number = null,
        public login: string = '',
        public password: string = '',
        public name: string = '',
        public surname: string = '',
        public role: Roles = null,
        public cities: City[] = [],
    ) {
    }
}