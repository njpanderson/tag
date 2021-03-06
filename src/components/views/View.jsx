import React from 'react';
import PropTypes from 'prop-types';

import { collectRef } from '../../lib/utils';

class View extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (typeof this.props.onMount === 'function') {
			this.props.onMount('view_frame');
		}
	}

	shouldComponentUpdate() {
		// no. reloads/updates are handled by the view class
		return false;
	}

	render() {
		return (
			<section className="view"
				ref={collectRef(this.props, 'view')}>
				<div className="drag-mask"></div>
				<iframe ref={collectRef(this.props, 'view_frame')}
					src={this.props.settings.view.src}></iframe>
			</section>
		);
	}
}

View.propTypes = {
	settings: PropTypes.object,
	onMount: PropTypes.func,
	refCollector: PropTypes.func,
};

export default View;