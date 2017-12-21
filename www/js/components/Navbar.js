import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/fontawesome-free-solid';

export default function NavBar(props) {
	return (
		<Navbar className='fixed-top' inverse toggleable>
			<Navbar.Header>
				<Navbar.Brand>
					<a className='nav-link' href="/#/home">
						<FontAwesomeIcon className="nav-link" icon={faUtensils} />
						RecipeBox
					</a>
				</Navbar.Brand>
			</Navbar.Header>
			
			<Nav>
			{props.links.map( (link,i) => {
				let lc = link.title.toLowerCase().split(' ').join('-');
				return (
					<NavItem 
						key={lc}
						className={props.active === lc ? 'active' : ''}
						id={lc}
						onClick={props.setActive} 
						href={`#${link.href}`} >
						<Link 
							to={link.href} 
							style={{textDecoration:'none'}}
							className='nav-link' >
							{link.title}
						</Link>
					</NavItem>
				)
			})}
			</Nav>

		</Navbar>
	);
}