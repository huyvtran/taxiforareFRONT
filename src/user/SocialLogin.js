import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { socialLogin, authenticate } from '../auth';

class SocialLogin extends Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false
        };
    }

    responseGoogle = response => {
        // console.log('response', response);
        const tokenId = response.tokenId;
        const user = {
            tokenId: tokenId
        };

        socialLogin(user).then(data => {
            // console.log('signin data: ', data);
            if (data.error) {
                console.log('Error Login. Please try again..');
            } else {
                // console.log('signin success - setting jwt: ', data);
                authenticate(data, () => {
                    console.log('social login response from api', data);
                    this.setState({ redirectToReferrer: true });
                });
            }
        });
    };

    render() {
        // redirect
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return <Redirect to="/" />;
        }

        return (
            <div className="col-6">
            <GoogleLogin
                clientId="115301621988-9j84fjv0f2cb6gmgvbtm0uci396aj5o2.apps.googleusercontent.com"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                render={renderProps => (
                    <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="btn btn-google btn-block"
                    >
                        <i className="fab fa-google mr-1"></i> Logga in
                    </button>
                )}
            />
            </div>
        );
    }
}

export default SocialLogin;