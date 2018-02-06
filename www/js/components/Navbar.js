import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, NavItem } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/fontawesome-free-solid';

export default function Navbar(props) {
	return (
		<BSNavbar className='fixed-top' inverse collapseOnSelect>
			<BSNavbar.Header>
				<BSNavbar.Brand>
					<a className='nav-link' href="/#/home">
						<FontAwesomeIcon className="nav-link" icon={faUtensils} />
						RecipeBox
					</a>
				</BSNavbar.Brand>
				<BSNavbar.Toggle />
			</BSNavbar.Header>
			
			<BSNavbar.Collapse>
			<Nav>
			{props.links.map( (link,i) => {
				if (link.display == undefined || link.display) {
					let lc = link.title.toLowerCase().split(' ').join('-');
					return (
						<NavItem 
							key={lc}
							className={props.active === lc ? 'active' : ''}
							id={lc}
							onClick={() => {props.setActive(lc,link.href)}} 
							href={`#${link.href}`} >
							<Link 
								to={link.href} 
								style={{textDecoration:'none'}}
								className='nav-link' >
								{link.title}
							</Link>
						</NavItem>
					)
				}
				return null;
			})}
			</Nav>
			</BSNavbar.Collapse>

		</BSNavbar>
	);
}