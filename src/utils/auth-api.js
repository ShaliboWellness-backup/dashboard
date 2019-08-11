import axios from "axios";

const { NODE_ENV, REACT_API } = process.env;

const isNotProduction = NODE_ENV !== 'production';
const address = isNotProduction ? 'http://localhost:3001' : REACT_API;

// const address = 'http://localhost:3001'
// const address = 'https://shalibo.herokuapp.com'

// Check if user is logged in

export const isSignedIn = async (history) => {


    await axios.get(`${address}/user`, {
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

export const handleSignup = async (history, name, email, password, confirmPassword) => {
    console.log(history, name, email, password, confirmPassword)
    await axios.post(`${address}/register`, {
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
        await axios.post(`${address}/login`
            , {
                username: email,
                password: password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        ).then(function (response) {
            console.log(response)
            return response.status === 200 ? history.push('/home') : alert('Oops, It seems that either the email or password are incorrect. Please try again.')
        })
            .catch(function (error) {
                console.log(error);
                alert('Oops, It seems something went wrong. Please try again.')

            })
    }
;

export const handleLogout = async () => {
    await axios.get(`${address}/logout`)
        .then(function (response) {
            console.log(response);
            window.location.reload()
        })
        .catch(function (error) {
            console.log(error);
        });
}

