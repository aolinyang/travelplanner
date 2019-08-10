export default function(user_info) {

    let reqBody = {
        email: user_info.email,
        password: user_info.password
    }

    return fetch("/api/login", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user_info": reqBody
        })
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
        return res;
    }).catch((err) => {
        return 500;
    });

}