export default function(trip) {

    return fetch("/api/updatetrip", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            'Accept': 'application/json',
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "trip_info": trip
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
        return res.code;
    }).catch((err) => {
        return parseInt(err.message);
    });

}