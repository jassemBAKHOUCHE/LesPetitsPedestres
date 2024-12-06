import { URL } from "../global";

async function addMoney(montant, token) {
    try {
        const response = await fetch(URL+'/api/addMoney', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                "amount": montant
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getMoney(token) {
    try {
        const response = await fetch(URL+'/api/getMoney', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export { addMoney, getMoney };