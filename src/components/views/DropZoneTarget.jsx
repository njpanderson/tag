import React from 'react';
import PropTypes from 'prop-types';

import { collectRef } from '../../lib/utils';
import DropZone from '../../lib/DropZone';

class DropZoneTarget extends React.Component {
	constructor(props) {
		super(props);

		this.onEvent = this.onEvent.bind(this);
	}

	onEvent(event) {
		if (event.type === 'click') {
			event.preventDefault();
		}

		this.props.onEvent(event, this.props.zone);
	}

	render() {
		var key = this.props.zone.id + '-target',
			classNames = [this.props.settings.classes.dropzone_target_outer];

		if (this.props.activeAttachments.length >= this.props.zone.maxAttachments) {
			classNames.push(this.props.settings.classes.hidden);
		}

		return (
			<span className={classNames.join(' ')}>
				<span key={key}
					onClick={this.onEvent}
					ref={collectRef(this.props, ['dropzone_target'], this.props.zone.id)}
					className={this.props.settings.classes.dropzone_target}>
						<b>{this.props.settings.dropZone.label}</b>
					</span>
			</span>
		);
	}
}

DropZoneTarget.propTypes = {
	zone: PropTypes.instanceOf(DropZone).isRequired,
	settings: PropTypes.object.isRequired,
	activeAttachments: PropTypes.array.isRequired,
	onEvent: PropTypes.func.isRequired,
	refCollector: PropTypes.func
};

export default DropZoneTarget;