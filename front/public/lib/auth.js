import { URL } from "../global";

async function registerUser(login, password) {
    try {
        const response = await fetch(URL+'/api/register', {
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
        const response = await fetch(URL+'/api/login', {
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