import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiPost";
import { Redirect } from "react-router-dom";

class NewPost extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            model:"",
            city:"",
            phone: "",
            email: "",
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false
        };
    }

    componentDidMount() {
        this.postData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }

    isValid = () => {
        const { title, body, model, city, email, phone, fileSize } = this.state;
        if (fileSize > 100000) {
            this.setState({
                error: "Filstorleken bör vara mindre än 100 kb",
                loading: false
            });
            return false;
        }
        if (title.length === 0) {
            this.setState({ error: "Alla fält måste vara ifyllda", loading: false });
            return false;
        }
        if (model.length === 0) {
            this.setState({ error: "Model måste vara anges", loading: false });
            return false;
        }
        if (city.length === 0) {
            this.setState({ error: "Stad måste vara anges", loading: false });
            return false;
        }
        if (body.length === 0) {
            this.setState({ error: "Ange en beskrivning", loading: false });
            return false;
        }
        if (phone.length === 0) {
            this.setState({ error: "Ett telefon nummer måste anges", loading: false });
            return false;
        }
        if (email.length === 0) {
            this.setState({ error: "E-postadress måste anges", loading: false });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: "",
                        body: "",
                        redirectToProfile: true
                    });
                }
            });
        }
    };

    newPostForm = (title, body, model, city, phone, email) => (
        <div className="content">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-lg-10">
						<div className="section-header text-center">
							<h2>Skapa annons</h2>
						</div>
						<form>
							<div className="service-fields mb-3">
								<h3 className="heading-2">Information</h3>
								<div className="row">
									<div className="col-lg-12">
										<div className="form-group">
											<label>Titel<span className="text-danger">*</span></label> 
											<input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                />
										</div>
									</div>
									<div className="col-lg-6">
										<div className="form-group">
											<label>Model <span className="text-danger">*</span></label>
											<input
                    onChange={this.handleChange("model")}
                    type="text"
                    className="form-control"
                    value={model}
                />
										</div>
									</div>
									<div className="col-lg-6">
										<div className="form-group">
											<label>Stad<span className="text-danger">*</span></label>
											<input
                    onChange={this.handleChange("city")}
                    type="text"
                    className="form-control"
                    value={city}
                />
										</div>
									</div>
									<div className="col-lg-12">
										<div className="form-group">
											<label>Beskrivning <span className="text-danger">*</span></label>
                                            <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
								</div>
							</div>
                            <div className="col-lg-12">
										<div className="form-group">
                                        <label className="text-muted">Bifoga bild</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
                                        </div>
                                        </div>
								</div>
							</div>
							<div className="service-fields mb-3">
								<h3 className="heading-2">Kontakt information</h3>
								<div className="row">
                                <div className="col-lg-6">
										<div className="form-group">
											<label>Telefon<span className="text-danger">*</span></label>
											<input
                    onChange={this.handleChange("phone")}
                    type="text"
                    className="form-control"
                    value={phone}
                />
										</div>
									</div>
									<div className="col-lg-6">
										<div className="form-group">
											<label>E-postadress<span className="text-danger">*</span></label>
											<input
                    onChange={this.handleChange("email")}
                    type="text"
                    className="form-control"
                    value={email}
                />
										</div>
									</div>
								</div>
							</div>
							<div className="submit-section">
                            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary mb-3"
            >
                Skapa annons
            </button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
    );

    render() {
        const {
            title,
            body,
            model,
            city,
            phone,
            email,
            user,
            error,
            loading,
            redirectToProfile
        } = this.state;

        console.log(error)

        if (redirectToProfile) {
            return <Redirect to={`/user/${user._id}`} />;
        }

        return (
            <div className="content"><div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
       {error}
        </div>
                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}

                {this.newPostForm(title, body, model, city, phone, email)}
                <div className="content">
                    <div className="container">
                <div className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
               {error}
                </div>
            </div>
            </div>
            </div>
        );
    }
}

export default NewPost;