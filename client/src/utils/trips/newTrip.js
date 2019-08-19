export default function(trip_info) {

    return fetch("/api/newtrip", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            'Accept': 'application/json',
            "content-type": "application/json"
        },
        body: JSON.stringify({
            trip_info: trip_info
        })
    })
    .then((res) => {
        let status = res.status;
        if (status === 500 || status === 403) {
            throw new Error(status.toString());
        } else {
            return Promise.resolve(res);
        }
    })
    .then(res => res.json())
    .then((res) => {
        return {
            trip_id: res.trip_info.trip_id
        }
    }).catch((err) => {
        return parseInt(err.message);
    });

}