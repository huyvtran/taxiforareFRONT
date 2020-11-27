import React, { Component } from "react";
import { singlePost, update } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

class EditPost extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            title: "",
            body: "",
            model:"",
            city:"",
            phone: "",
            email: "",
            redirectToProfile: false,
            error: "",
            fileSize: 0,
            loading: false
        };
    }

    init = postId => {
        singlePost(postId).then(data => {
            if (data.error) {
                this.setState({ redirectToProfile: true });
            } else {
                this.setState({
                    id: data.postedBy._id,
                    title: data.title,
                    body: data.body,
                    model: data.model,
                    city: data.city,
                    phone: data.phone,
                    email: data.email,
                    error: ""
                });
            }
        });
    };

    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId);
    }

    isValid = () => {
        const { title, body, fileSize } = this.state;
        if (fileSize > 1000000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        if (title.length === 0 || body.length === 0) {
            this.setState({ error: "All fields are required", loading: false });
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
            const postId = this.props.match.params.postId;
            const token = isAuthenticated().token;

            update(postId, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: "",
                        body: "",
                        model:"",
            city:"",
            phone: "",
            email: "",
                        redirectToProfile: true
                    });
                }
            });
        }
    };

    editPostForm = (title, body, model, city, phone, email) => (
        <div class="content">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="section-header text-center">
                        <h2>Uppdatera annons</h2>
                    </div>
                    <form>
                        <div class="service-fields mb-3">
                            <h3 class="heading-2">Information</h3>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label>Titel<span class="text-muted"></span></label> 
                                        <input
                onChange={this.handleChange("title")}
                type="text"
                className="form-control"
                value={title}
            />
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Model <span class="text-muted"></span></label>
                                        <input
                onChange={this.handleChange("model")}
                type="text"
                className="form-control"
                value={this.state.model}
            />
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Stad<span class="text-muted"></span></label>
                                        <input
                onChange={this.handleChange("city")}
                type="text"
                className="form-control"
                value={this.state.city}
            />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="service-fields mb-3">
                            <h3 class="heading-2">Kontakt information</h3>
                            <div class="row">
                            <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Telefon<span class="text-muted"></span></label>
                                        <input
                onChange={this.handleChange("phone")}
                type="text"
                className="form-control"
                value={this.state.phone}
            />
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>E-postadress<span class="text-muted"></span></label>
                                        <input
                onChange={this.handleChange("email")}
                type="text"
                className="form-control"
                value={this.state.email}
            />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="service-fields mb-3">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label>Beskrivning <span class="text-muted"></span></label>
                                        <textarea
                onChange={this.handleChange("body")}
                type="text"
                className="form-control"
                value={body}
            />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
            <label className="text-muted">Uppdatera bild</label>
            <input
                onChange={this.handleChange("photo")}
                type="file"
                accept="image/*"
                className="form-control"
            />
        </div>
                        <div class="submit-section">
                        <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary"
        >
            Uppdatera annonsen
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
            id,
            title,
            body,
            redirectToProfile,
            error,
            loading
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
        }

        return (
            <div className="container">
                <div
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

                {isAuthenticated().user.role === "admin" &&
                    this.editPostForm(title, body)}

                {isAuthenticated().user._id === id &&
                    this.editPostForm(title, body)}
            </div>
        );
    }
}

export default EditPost;
