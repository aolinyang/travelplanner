import {observable, action} from "mobx";

class UserStore {

    @observable user_info; //object
    @observable all_trips; //array

    constructor() {
        this.user_info = {};
        this.all_trips = {};
    }

    @action
    supply_user(user_info) {
        this.user_info = user_info;
    }

    @action
    supply_trips(trips) {
        this.all_trips = trips;
    }

    @action
    add_trip() {
        this.all_trips.push({});
    }

    @action
    update_trip(id, new_trip_info) {
        for (let i = 0; i < this.all_trips.length; i++) {
            if (this.all_trips[i].trip_id === id) {
                this.all_trips[i] = new_trip_info;
                break;
            }
        }
    }

    @action
    delete_trip(id) {
        for (let i = 0; i < this.all_trips.length; i++) {
            if (this.all_trips[i].trip_id === id) {
                this.all_trips.splice(i, 1);
                break;
            }
        }
    }

    @action
    erase_info() {
        this.user_info = {};
        this.all_trips = {};
    }

}

export default new UserStore();