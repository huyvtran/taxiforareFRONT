import React, {Component } from 'react';
import $ from 'jquery';
import { Link, withRouter } from 'react-router-dom';
import DefaultProfile from "../images/avatar.jpg";

import { signout, isAuthenticated } from '../auth';



class Menu extends Component {

  constructor() {
    super();
    this.state = {
        user: "",
        redirectToSignin: false
    };
}


  componentDidMount() {
    $(document).on('click', '#mobile_btn', function() {
      $('main-wrapper').toggleClass('slide-nav');
      $('.sidebar-overlay').toggleClass('opened');
      $('html').addClass('menu-opened');
      $('.header').removeClass('navbar-fixed');
      return false;
    });
    
    $(document).on('click', '.sidebar-overlay', function() {
      $('html').removeClass('menu-opened');
      $(this).removeClass('opened');
      $('main-wrapper').removeClass('slide-nav');
    });
    
    $(document).on('click', '#menu_close', function() {
      $('html').removeClass('menu-opened');
      $('.sidebar-overlay').removeClass('opened');
      $('main-wrapper').removeClass('slide-nav');
    });
  
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
}
  render() {
    const { user } = this.state;

    const photoUrl = user._id
            ? `${process.env.REACT_APP_API_URL}/user/photo/${
                  user._id
              }?${new Date().getTime()}`
            : DefaultProfile;

    return (
        <header className="header">
        <nav className="navbar navbar-expand-lg header-nav">
          <div className="navbar-header">
            <a id="mobile_btn">
              <span className="bar-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </a>
            <a href="/" className="navbar-brand logo">
              <img src="/assets/img/taxi01.jpg" className="img-fluid" alt="Logo"/>
            </a>
            <a href="/" className="navbar-brand logo-small">
              <img src="/assets/img/taxi01.jpg" className="img-fluid" alt="Logo"/>
            </a>
            {!isAuthenticated() && (
            <a className="createButton" href="/post/create">
           <i className="fas fa-plus-circle mr-1"></i>Skapa annons
           </a>
           )}
          </div>
          <div className="main-menu-wrapper">
            <div className="menu-header">
              <a href="/" className="menu-logo mt-2">
                <img src="/assets/img/taxi01.jpg" className="img-fluid" alt="Logo"/>
              </a>
              <a id="menu_close" className="menu-close"> <i className="fas fa-times"></i></a>
            </div>
            <ul className="main-nav">
              <li>
              <a href="/">Startsida</a>
                        </li>
              {!isAuthenticated() && (
                        <React.Fragment>
                            <li className="nav-item">
                                <a href="/signup">Skapa konto</a>
                            </li>
                            <li className="nav-item">
                            <a href="/signin">Logga in</a>
                            </li>
                        </React.Fragment>
                    )}
                    {isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                <li>
                                <Link to={`/findpeople`}>
                                    Hitta användare
                                </Link>
                            </li>
            )}
        
        {isAuthenticated() && (
                        <React.Fragment>
                            
                            <li>
                                
                                <a href={`/user/${isAuthenticated().user._id}`}>Profil</a>
   
                            </li>
                            <li>
                        <a
                            className="nav-link"
                            style={{ cursor: 'pointer', color: '#fff' }}
                            onClick={() => signout(() => ('/'))}
                        >
                            Logga ut
                        </a>
                    </li>
                        </React.Fragment>
                    )}
                    
            </ul>
          </div>
        
          <ul className="nav header-navbar-rht">
          {isAuthenticated() && (
                        <React.Fragment>
                                        <Link to={`/post/create`} className="nav-link header-login">
            </Link>
                           
            <li>
              <Link to={`/post/create`} className="nav-link header-login">
                <i className="fas fa-plus-circle mr-1"></i><span>Skapa annons</span>
                </Link>
            </li>       
                        </React.Fragment>
                    )}

          </ul>
        
        </nav>
        </header>
            
        );
    
  }
}

export default withRouter(Menu);
