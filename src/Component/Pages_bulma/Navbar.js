import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
const Navbar = () => {
	
	const [isActive, setisActive] = useState(false);
    const history = useNavigate();
 
    const Logout = async () => {
        try {
            await localStorage.removeItem('TokenData')
			alert('Logout Success')
            history("/");
        } catch (error) {
            console.log(error);
        }
    }
 
    return (
        <nav className='navbar is-primary' role='navigation' aria-label='main navigation'>
			  <div className='navbar-brand'>
				<a href='/' className='navbar-item'>
				  <img
					src='https://bulma.io/images/bulma-logo-white.png'
					alt='Logo'
					width='112'
					height='28'
				  />
				</a>
				<a onClick={() => {setisActive(!isActive);}}
					role="button"
					className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
					aria-label="menu"
					aria-expanded="false"
					data-target="navbarBasicExample"
				  >
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				  </a>
			  </div>
			  <div id='navbarBasicExample' className={`navbar-menu ${isActive ? "is-active" : ""}`}>
					<div className='navbar-start'>
					  <div class="navbar-item has-dropdown has-dropdown-down is-hoverable">
						  <a class="navbar-link" href="#">Attendance</a>
						  <div class="navbar-dropdown">
							<a class="navbar-item" href="/">Overview</a>
							<a class="navbar-item">Elements </a>
							<a class="navbar-item">Components</a>
							<hr class="navbar-divider" />
							<div class="navbar-item">
								Version 0.9.4
							</div>
						  </div>
						</div>
					</div>
					<div className="navbar-end">
						<div className="navbar-item">
								<div className="buttons">
									<button onClick={Logout} className="button is-light">
										Log Out
									</button>
								</div>
						</div>
					</div>
			  </div>
			  
			  
			  
		</nav>
    )
}
 
export default Navbar