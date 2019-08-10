export default function() {

    return fetch("/api/gettrips", {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            'Accept': 'application/json'
        }
    })
    .then((res) => {
        let status = res.status;
        if (status === 500) {
            return Promise.reject(res);
        } else {
            return Promise.resolve(res);
        }
    })
    .then(res => res.json())
    .then((res) => {
        if (res.code === -1) {
            return -1;
        } else {
            return res.all_trips;
        }
    }).catch((err) => {
        return 500;
    });

}