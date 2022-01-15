import React from "react";

export default function NavbarComponent() {
  return (
    <div className="navbar-container navbar-margin mb-5" id="header">
      <nav className="navbar fixed-top navbar-expand-lg navbar-light navbar-background" >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="/assets/ms_club_logo.png" alt="ms-club-logo" className="navbar-logo" width="100px"/>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-content"
            aria-controls="navbar-content"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbar-content">
            <ul className="navbar-nav m-auto mb-lg-0" />
            <ul className="navbar-nav d-flex me-2 navbar-items">
              <li className="nav-item">
                <a className="nav-link" href="/">LOGIN</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">REGISTER</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
