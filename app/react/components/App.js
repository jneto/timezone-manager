import React from 'react'
import { Link } from 'react-router'

const App = ( { user, activeRoute, onLogout, children } ) => {
    let userNav
    if (user.role === 'ADMIN') {
        userNav = (<li className={activeRoute === '/users' ? 'active' : undefined}><Link to="/users">Users</Link></li>)
    }
    return (
        <div>
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>

                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="nav navbar-nav">
                            {userNav}
                            <li className={activeRoute === '/timezones' ? 'active' : undefined}><Link to="/timezones">Timezones</Link></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <p className="navbar-text">Signed in as {user.username}</p>
                            <button type="button" className="btn btn-default navbar-btn" onClick={onLogout}>Logout</button>
                        </ul>
                    </div>
                </div>
            </nav>

            <div>
                {children}
            </div>
        </div>
    )
}

export default App
