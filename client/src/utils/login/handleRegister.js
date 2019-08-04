export default async function(user_info) {

    let reqBody = {
        first_name: user_info.first_name,
        last_name: user_info.last_name,
        email: user_info.email,
        password: user_info.password
    }

    let result = await fetch("/api/register", {
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
        let code = res.code;
        if (code == "-1"){
            return -1;
        }
        return 0;
    }).catch((err) => {
        return 500;
    });

    return result;

}