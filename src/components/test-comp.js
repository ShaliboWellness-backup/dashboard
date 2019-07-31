import React from 'react';
import { accountsPassword, accountsClient, accountsGraphQL } from '../graphql/apollo-client-accounts'

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class Test extends React.PureComponent {
    signup = async () => {
        console.log('testtest');
        try {
            await accountsPassword.createUser({
                username: 'roy',
                password: 'password'
            });
        } catch (e) {
            console.log(e.toString())
        }
    };

    login = async () => {
        this.setState({ error: null });
        try {
            await accountsPassword.login({
                password: 'password',
                user: {
                    username: 'roy',
                },
            }).then((result) => {alert(JSON.stringify(result))});
        } catch (e) {
            console.log(e.toString())
        }
    };



    render() {
        return(
            <div>
                <button onClick={() => this.signup()}>signup</button>
                <button onClick={() => this.login()}>login</button>
                <button onClick={() => accountsClient.logout().then((result) => {alert(JSON.stringify(result))})}>logout</button>
                <button onClick={
                    async () => {
                        try {
                            const user = await accountsClient.refreshSession();
                            // const user = await accountsClient.getUser()
                            alert(JSON.stringify(user))
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }>get user</button>
            </div>
            )
    }
}


export default Test;
