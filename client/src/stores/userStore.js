import {observable, action} from "mobx";

class UserStore {

    @observable first_name;
    @observable last_name;
    @observable email;

    constructor() {
        
    }

}

export var userStore = new UserStore();