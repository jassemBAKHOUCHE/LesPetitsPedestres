async function registerUser() {
    try {
        const response = await fetch('http://57.128.111.45:8000/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "pseudo": "lej",
                "password": "password"
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function loginuser() {
    try{
        const response = await fetch('http://57.128.111.45:8000/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "pseudo": "lej",
                "password": "password"
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export { registerUser, loginuser };