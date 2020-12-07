import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signout, isAuthenticated } from '../auth';


class ProfileTabs extends Component {
    render() {
        const {  posts } = this.props;
        return (
            <>
            <div class="row mt-3">
							<div class="col-lg-12">
								<a href={`/user/${isAuthenticated().user._id}`} class="dash-widget dash-bg-1">
									<span class="dash-widget-icon">{posts.length}</span>
									<div class="dash-widget-info">
										<span>Annonser skapade</span>
									</div>
								</a>
							</div>
                        </div>   
                       
                        {posts.map((post, i) => (
                            <ul key={i}>
                                    <Link to={`/post/${post._id}`}>
                                            <li className="list-group-item">{post.title}</li>
                                    </Link>
                            </ul>
                        ))}
            
                    </>
                                        
        );
    }
}

export default ProfileTabs;
