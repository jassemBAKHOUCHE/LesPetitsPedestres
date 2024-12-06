<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>
        fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "pseudo": "lej",
                "password": "password"
            }),
        })
        .then(response => {
            return response.json();
        })
        .then(data => console.log('Data:', data))
        .catch(error => console.error('Error:', error));

    </script>
</body>
</html>