import React from 'react';

import './footer.css'

import github from './github.png'
import rsschool from './rs_school_js.svg'

function Footer() {

  return (
    <footer className="footer">
      <div className="footer__bottom">
        <div className="footer__bottom-container container">
          <div className="footer__copyright"><h3>© 2021 React Game "Ход конём"</h3></div>
          <div className="footer__icon">
            <div className="footer__icon-item">
              <a href="https://github.com/KarpusKonstantin">
                <img src={github} alt="GitHub" className="footer__payments-img" />
              </a>
            </div>
            <div className="footer__icon-item">
              <a href="https://rs.school/js/">
                <img src={rsschool} alt="RS School" className="footer__payments-rs" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
