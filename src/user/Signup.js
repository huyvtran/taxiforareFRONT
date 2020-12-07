import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
        };
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };

    clickSubmit = event => {
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password
        };
        // console.log(user);
        signup(user).then(data => {
            if (data.error) this.setState({ error: data.error });
            else
                this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    open: true
                });
        });
    };

    signupForm = (name, email, password) => (
        <form>
						<div class="form-group form-focus">
							<label class="focus-label">Namn</label>
							<input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
						</div>
						<div className="form-group form-focus">
							<label className="focus-label">E-post</label>
							<input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
						</div>
						<div class="form-group form-focus">
							<label class="focus-label">Skapa lösenord</label>
							<input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
						</div>
                        <Link to={`/signin`}>
						<div class="text-right">
							<a class="forgot-link" href="#">Har du redan ett konto?</a>
						</div>
                        </Link>
                        <button
                onClick={this.clickSubmit}
                className="btn btn-primary btn-block btn-lg login-btn"
            >
                Skapa konto
            </button>
						<div class="login-or">
							<span class="or-line"></span>
							<span class="span-or">Eller</span>
						</div>
						<div class="row form-row social-login">
							<SocialLogin />
						</div>
					</form>
    );

    render() {
        const { name, email, password, error, open } = this.state;
        return (
            <div className="content">
                            <div className="container">

                            <div className="section-header text-center">
                        <h2>Skapa konto</h2>
                    </div>    
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <div
                    className="alert alert-info"
                    style={{ display: open ? "" : "none" }}
                >
                    New account is successfully created. Please{" "}
                    <Link to="/signin">Sign In</Link>.
                </div>

                {this.signupForm(name, email, password)}
            </div>
            </div>
        );
    }
}

export default Signup;