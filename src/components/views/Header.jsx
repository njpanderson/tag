import React, { Component, PropTypes } from 'react';

import Toolbar from './Toolbar.jsx';

class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<header>
				{this.props.children}
				<Toolbar
					buttons={this.props.settings.toolbar}
					settings={this.props.settings}
					onButtonClick={this.props.onButtonClick}
					lib={this.props.lib}/>
			</header>
		);
	}
}

Header.propTypes = {
	children: PropTypes.object,
	settings: PropTypes.object.isRequired,
	onButtonClick: PropTypes.func,
	lib: PropTypes.object.isRequired
};

export default Header;