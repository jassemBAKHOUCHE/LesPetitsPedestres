import { URL_API } from "../global.js";

async function registerUser(login, password) {
    try {
        const response = await fetch(URL_API+'/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "pseudo": login,
                "password": password
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function loginuser(login, password) {
    try{
        const response = await fetch(URL_API+'/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "pseudo": login,
                "password": password
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export { registerUser, loginuser };