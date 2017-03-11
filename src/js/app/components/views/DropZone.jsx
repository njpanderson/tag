import React, { Component, PropTypes } from 'react';

import { collectRef } from '../../lib/utils';
import DropZoneAttachment from './DropZoneAttachment.jsx';

class DropZone extends Component {
	constructor(props) {
		super(props);

		this.myrefs = {};
	}

	componentDidMount() {
		console.log('DropZone mounted!');
		if (typeof this.props.onMount === 'function') {
			this.props.onMount('dropzone', this.props.id);
		}
	}

	renderActiveAttachments() {
		var children = [];

		this.props.activeAttachments.forEach((attachment, index) => {
			children.push(
				<DropZoneAttachment
					key={attachment.droplet_id + '-attachment-' + index}
					droplet={this.props.class_ui.getDropletById(attachment.droplet_id)}
					data={attachment.data}/>
			);
		});

		return children;
	}

	render() {
		var key = this.props.id + '-zone',
			target_key = this.props.id + '-target';

		return (
			<span
				key={key}
				className={this.props.className}
				data-id={this.props.id}
				data-attachment={this.props.attachment}
				ref={collectRef(this.props, ['dropzone'], this.props.id)}>

				<span
					className="attachments">
					{this.renderActiveAttachments()}
				</span>
				<span key={target_key}
					className="target">{this.props.zoneLabel}</span>
			</span>
		);
	}
}

DropZone.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	attachment: PropTypes.string,
	zoneLabel: PropTypes.string,
	activeAttachments: PropTypes.array,
	class_ui: PropTypes.object,
	onMount: PropTypes.func,
	refCollector: PropTypes.func
};

export default DropZone;