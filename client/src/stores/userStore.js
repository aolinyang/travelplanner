import {observable, action} from "mobx";
import getTrips from "./../utils/trips/getTrips";

class UserStore {

    @observable user_info; //object
    @observable all_trips; //array

    constructor() {
        this.user_info = {};
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
        this.all_trips = [];
    }

    @action
    async fetch_trips() {

        let result = await getTrips();
        if (Array.isArray(result)) {
            await result.sort((tripA, tripB) => new Date(tripA.start_date) < new Date(tripB.start_date) ? 1 : -1);
            await result.forEach((trip) => {
                trip.places.sort((placeA, placeB) => new Date(placeA.start_datetime) < new Date(placeB.start_datetime) ? 1 : -1);
                trip.lodging.sort((lodgeA, lodgeB) => new Date(lodgeA.date) < new Date(lodgeB.date) ? 1 : -1);
                trip.travel_log.sort((logA, logB) => new Date(logA.date) < new Date(logB.date) ? 1 : -1);
            });
            this.supply_trips(result);
        } else {
            this.supply_trips(result);
        }

    }

}

export default new UserStore();