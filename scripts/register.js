document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('register-form');
    const message = document.getElementById('message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        console.log('Sending data:', JSON.stringify(data));

        fetch('https://blogpost-server-production-d92d.up.railway.app/api/v1/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                console.error('Server response:', response);
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            if (data.success) {
                message.textContent = 'Registration successful!';
                message.style.color = 'green';
                
                // Asosiy sahifaga yo‘naltirish
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000); // 2 soniya kutish
            } else {
                message.textContent = `Error: ${data.message}`;
                message.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            message.textContent = `Error: ${error.message}`;
            message.style.color = 'red';
        });
    });
});
fetch('https://blogpost-server-production-d92d.up.railway.app/api/v1/user/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: 'Ibrokhim',
        email: 'ij.ibrokhim.jalalov@gmail.com',
        password: '12345678'
    })
})
.then(response => {
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
})
.then(data => {
    console.log('Success:', data);
   
})
.catch(error => {
    console.error('Error:', error);
    
});
fetch('https://blogpost-server-production-d92d.up.railway.app/api/v1/user/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
        username: 'Ibrokhim',
        email: 'ij.ibrokhim.jalalov@gmail.com',
        password: '12345678'
    })
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));
