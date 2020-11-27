import React, { Component } from "react";
import { list } from "./apiPost";
import DefaultPost from '../images/noimageicon2.png';
import { Link } from "react-router-dom";

class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            page: 1
        };
    }

    loadPosts = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    };

    componentDidMount() {
        this.loadPosts(this.state.page);
    }

    loadMore = number => {
        this.setState({ page: this.state.page + number });
        this.loadPosts(this.state.page + number);
    };

    loadLess = number => {
        this.setState({ page: this.state.page - number });
        this.loadPosts(this.state.page - number);
    };

    renderPosts = posts => {
        return (
            <div>
                {posts.map((post, i) => {
                    const posterId = post.postedBy
                        ? `/user/${post.postedBy._id}`
                        : "";
                    const posterName = post.postedBy
                        ? post.postedBy.name
                        : " Unknown";

                    return (
                        <div className="col-xl-9 col-md-8">
						<div className="card review-card mb-0">
                        <Link
                        to={`/post/${post._id}`}>
							<div className="card-body">	
								<div className="review-list">
									<div className="review-img">
                                        <img
                                    src={`${
                                        process.env.REACT_APP_API_URL
                                    }/post/photo/${post._id}`}
                                    alt={post.title}
                                    onError={i =>
                                        (i.target.src = `${DefaultPost}`)
                                    }
                                    className="rounded img-fluid"
                                />
									</div>
									<div className="review-info">
                                <h5><a href="">{post.title}</a></h5>
										<div className="review-date mt-2">
                                            Model: {post.model}
                                            </div>
										<p className="mb-2">
                                            Stad: {post.city}
                                            </p>
										<div className="review-user">
											{posterName}
										</div>
									</div>
									<div className="review-count">
										<div className="rating">
                                        {new Date(post.created).toDateString()}
										</div>
									</div>
								</div>
							</div>
                            </Link>
						</div>
					</div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { posts, page } = this.state;
        return (
                 <div>
                <div className="section-header text-center">
                <h2 className="mt-5 mb-5">
                    {!posts.length ? "Inga fler annonser!" : "Senaste Annonserna"}
                </h2>
            </div>

                {this.renderPosts(posts)}

                {page > 1 ? (
                    <button
                        className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
                        onClick={() => this.loadLess(1)}
                    >
                        Previous ({this.state.page - 1})
                    </button>
                ) : (
                    ""
                )}
            </div>
            
        );
    }
}

export default Posts;