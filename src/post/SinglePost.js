import React, { Component } from 'react';
import { singlePost, read, remove, like, unlike } from './apiPost';
import DefaultPost from '../images/noimageicon2.png';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth';

class SinglePost extends Component {
    state = {
        user: "",
        post: '',
        redirectToHome: false,
        redirectToSignin: false,
        like: false,
        likes: 0,
        comments: []
    };

    checkLike = likes => {
        const userId = isAuthenticated() && isAuthenticated().user._id;
        let match = likes.indexOf(userId) !== -1;
        return match;
    };

    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true });
            } else {
                this.setState({ user: data });
            }
        });
    };

    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    post: data,
                    likes: data.likes.length,
                    like: this.checkLike(data.likes),
                    comments: data.comments
                });
            }
        });
    };

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);
    }

    updateComments = comments => {
        this.setState({ comments });
    };

    likeToggle = () => {
        if (!isAuthenticated()) {
            this.setState({ redirectToSignin: true });
            return false;
        }
        let callApi = this.state.like ? unlike : like;
        const userId = isAuthenticated().user._id;
        const postId = this.state.post._id;
        const token = isAuthenticated().token;
        console.log(this.state.post._id)

        callApi(userId, token, postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    like: !this.state.like,
                    likes: data.likes.length
                });
            }
        });
    };

    deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        remove(postId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ redirectToHome: true });
            }
        });
    };

    deleteConfirmed = () => {
        let answer = window.confirm('Are you sure you want to delete your post?');
        if (answer) {
            this.deletePost();
        }
    };

    renderPost = post => {
        const {user } = this.state;
        console.log(user)

        return (
<div className="content">
			<div className="container">
				<div className="row">
					<div className="col-lg-8">
						<div className="service-view">
							<div className="service-header">
								<h1>{post.title}</h1>
								<address className="service-location"><i className="fas fa-location-arrow"></i> {post.city}</address>
                                <div className="row">
								<div className="col service-cate">
									<a>Taxi</a>
								</div>
                                <div className="col">
                                {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id && (
                        <>
                            <Link to={`/post/edit/${post._id}`} className="btn btn-raised float-right">
                            <i class="fas fa-edit" style={{color: "blue"}}></i>
                             </Link>
                            <button onClick={this.deleteConfirmed} className="btn btn-raised float-right">
                            <i className="fas fa-trash-alt" style={{color: "red"}}></i>
                            </button>
                        </>
                    )}
                                </div>
                                </div>
                            
							</div>
							<div className="service-images service-carousel">
								<div className="images-carousel owl-carousel owl-theme">
									<div className="item">
                                    <img
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                    alt={post.title}
                    onError={i => (i.target.src = `${DefaultPost}`)}
                    className="img-fluid"
                />									</div>
								</div>
							</div>
							<div className="service-details">
								<div className="tab-content">
									<div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
										<div className="card service-description">
											<div className="card-body">
												<h5 className="card-title">Beskrivning</h5>
												<p className="mb-0">{post.body}</p>
											</div>
										</div>
									</div>
									<div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
										<div className="card">
											<div className="card-body">
												<h5 className="card-title">Services Offered</h5>
												<div className="service-offer">
													<ul className="list-bullet">
														<li>Lorem Ipsum</li>
														<li>Lorem Ipsum</li>
														<li>Lorem Ipsum</li>
														<li>Lorem Ipsum</li>
														<li>Lorem Ipsum</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									<div className="tab-pane fade" id="pills-book" role="tabpanel" aria-labelledby="pills-book-tab">
										<div className="card review-box">
											<div className="card-body">
												<div className="review-list">
                                                    <div className="review-img">
														<img className="rounded-circle" src="assets/img/customer/user-01.jpg" alt=""/>
													</div>
                                                    <div className="review-info">
                                                        <h5>Jeffrey Akridge</h5>
                                                        <div className="review-date">August 06, 2020 20:07 pm</div>
                                                        <p className="mb-0">Good Work</p>
                                                    </div>
                                                    <div className="review-count">
                                                        <div className="rating">
                                                            <i className="fas fa-star filled"></i>
															<i className="fas fa-star filled"></i>
															<i className="fas fa-star filled"></i>
															<i className="fas fa-star filled"></i>
															<i className="fas fa-star filled"></i>	
                                                            <span className="d-inline-block average-rating">(5.0)</span>
                                                        </div>
                                                    </div>
                                                </div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-4 theiaStickySidebar">
						<div className="card provider-widget clearfix">
							<div className="card-body">
								<h5 className="card-title">Annonsör</h5>
								<div className="about-author">
									<div>
										<a className="ser-provider-name">{post.postedBy.name}</a>
										<p className="last-seen"><i className="fas fa-circle online"></i> Online</p>
										<p className="text-muted mb-1">Medlem sedan Apr 2020</p>
									</div>
								</div>
								<hr></hr>
								<div className="provider-info">
									<p className="mb-1"><i className="far fa-envelope"></i> <a href="#">{post.email}</a></p>
									<p className="mb-0"><i className="fas fa-phone-alt"></i> {post.phone}</p>
								</div>
							</div>
                            <div className="sidebar-widget widget">
						</div>
						</div>
                        <div className="service-book">
								<a href="book-service.html" className="btn btn-primary"> Skicka ett medelande </a>
							</div>
					</div>
				</div>
                </div>
                </div>
                
        );
    };

    render() {
        const { post, redirectToHome, redirectToSignin } = this.state;

        if (redirectToHome) {
            return <Redirect to={`/`} />;
        } else if (redirectToSignin) {
            return <Redirect to={`/signin`} />;
        }

        return (
            <div>
                {!post ? (
                    <div className="jumbotron text-center">
                        <h2>Laddar...</h2>
                    </div>
                ) : (
                    this.renderPost(post)
                )}
            </div>
        );
    }
}

export default SinglePost;
