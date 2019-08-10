import axios from "axios";


// Check if user is logged in

export const isSignedIn = async (history) => {


    await axios.get('https://shalibo.herokuapp.com/user', {
        withCredentials: true

    })
        .then(function (response) {
            console.log(response);
            let signedIn = !!response.data.name
            console.log(signedIn)
            return history && signedIn ? history.push('/home') : signedIn
        })
        .catch(function (error) {
            console.log(error);
        });
};


//Sign up function

export const handleSignup = async (name, email, password, confirmPassword, history) => {
    await axios.post('https://shalibo.herokuapp.com/register', {
        name: name,
        email: email,
        username: email,
        password: password,
        password2: confirmPassword
    }, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        console.log(response);
        return response.status === 200 && !!response.data ? history.push('/home') : alert('Oops, something went wrong. Please try again later.')

    }).catch(function (error) {
        console.log(error);
    });
}


// Log in function

export const handleLogin = async (email, password, history) => {
    await axios.post('https://shalibo.herokuapp.com/login', {
            username: email,
            password: password,
        },
        {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(function (response) {
        console.log(response)
        return response.status === 200 ? history.push('/home') : alert('Oops, It seems that either the email or password are incorrect. Please try again.')
    })
        .catch(function (error) {
            console.log(error);
            alert('Oops, It seems something went wrong. Please try again.')

        })
};

export const handleLogout = async () => {
    await axios.get('https://shalibo.herokuapp.com/logout')
        .then(function (response) {
            console.log(response);
            window.location.reload()
        })
        .catch(function (error) {
            console.log(error);
        });
}

