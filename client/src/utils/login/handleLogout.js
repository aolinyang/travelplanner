export default function() {

    return fetch("/api/logout", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        let status = res.status;
        if (status === 403) {
            return Promise.reject(res);
        } else {
            return Promise.resolve(res);
        }
    })
    .then(res => res.json())
    .then((res) => {
        return res.code;
    }).catch((err) => {
        return 403;
    });

}