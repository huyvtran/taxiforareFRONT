import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="footer mt-5">
		    <div className="footer-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget footer-menu">
              <h2 className="footer-title">Snabba länkar  </h2>
              <ul>
                <li>
                  <a href="about-us.html">Om oss</a>
                </li>
                <li>
                  <a href="contact-us.html">Kontakta oss</a>
                </li>
                <li>
                  <a href="faq.html">Faq</a>
                </li>
                <li>
                  <a href="#">Hjälp</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget footer-menu">
              <h2 className="footer-title">Kategorier</h2>
              <ul>
                <li>
                  <a href="search.html">Taxi</a>
                </li>
                <li>
                  <a href="search.html">Taxiförare</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget footer-contact">
              <h2 className="footer-title">Kontakta oss</h2>
              <div className="footer-contact-info">
                <div className="footer-address">
                  <span><i className="far fa-building"></i></span>
                  <p>Svampvägen 132, Karlaplan, Stockholm, Sverige</p>
                </div>
                <p><i className="fas fa-headphones"></i> 086474737</p>
                <p className="mb-0"><i className="fas fa-envelope"></i> kontakt@taxiforare.se</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h2 className="footer-title">Följ oss</h2>
              <div className="social-icon">
                <ul>
                  <li>
                    <a href="#" target="_blank"><i className="fab fa-facebook-f"></i> </a>
                  </li>
                  <li>
                    <a href="#" target="_blank"><i className="fab fa-twitter"></i> </a>
                  </li>
                  <li>
                    <a href="#" target="_blank"><i className="fab fa-youtube"></i></a>
                  </li>
                  <li>
                    <a href="#" target="_blank"><i className="fab fa-google"></i></a>
                  </li>
                </ul>
              </div>
              <div className="subscribe-form">
                                  <input type="email" className="form-control" placeholder="Ange din e-postadress"/>
                                  <button type="submit" className="btn footer-btn">
                                      <i className="fas fa-paper-plane"></i>
                                  </button>
                              </div>
            </div>
          </div>
        </div>
      </div>
    </div>    
    <div className="footer-bottom">
      <div className="container">
        <div className="copyright">
          <div className="row">
            <div className="col-md-6 col-lg-6">
              <div className="copyright-text">
                <p className="mb-0">&copy; 2020 <a href="index.html">Taxiförare</a>. All rights reserved.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-6">
              <div className="copyright-menu">
                <ul className="policy-menu">
                  <li>
                    <a href="term-condition.html">Villkor</a>
                  </li>
                  <li>
                    <a href="privacy-policy.html">Integritet</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>    
  </footer>
      </div>
    );
  }
}

export default Footer;