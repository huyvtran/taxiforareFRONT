import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";
import SocialLogin from "./SocialLogin";
import Facebook from "./Facebook";


class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
        };
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const { email, password } = this.state;
        const user = {
            email,
            password
        };
        // console.log(user);
        signin(user).then(data => {
            if (data.error) {
                this.setState({ error: data.error, loading: false });
            } else {
                // authenticate
                authenticate(data, () => {
                    this.setState({ redirectToReferer: true });
                });
            }
        });
    };

    signinForm = (email, password) => (

					<form>
				<div className="modal-body">
					<form>
						<div className="form-group form-focus">
							<label className="focus-label">Email</label>
							<input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
						</div>
						<div className="form-group form-focus">
							<label className="focus-label">Password</label>
							<input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
						</div>
						<div className="text-right">	
						</div>
                        <button
                onClick={this.clickSubmit}
                className="btn btn-primary btn-block btn-lg login-btn"
            >
                Logga in
            </button>
						<div className="login-or">	<span className="or-line"></span>
							<span className="span-or">or</span>
						</div>
						<div className="row form-row social-login">
                        <Facebook />
							<SocialLogin />
						</div>
                        <Link to={`/signup`}>
						<div className="text-center dont-have">Har du inget konto? <a class="forgot-link">Registrera dig</a>
						</div>
                        </Link>
                        </form>
                        </div>
					</form>		
    );

    render() {
        const {
            email,
            password,
            error,
            redirectToReferer,
            loading
        } = this.state;

        console.log(error)


        if (redirectToReferer) {
            return <Redirect to="/" />;
        }

        return (
            <div className="content">
                            <div className="container">
<div className="section-header text-center">
                        <h2>Logga in</h2>
                    </div>            
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Laddar...</h2>
                    </div>
                ) : (
                    ""
                )}

                {this.signinForm(email, password)}
            </div>
            </div>
        );
    }
}

export default Signin;