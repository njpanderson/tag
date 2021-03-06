import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../views/Icon.jsx';
import { rawMarkup } from '../../lib/utils';

var DialogHeading = function(props) {
	var notes = [],
		icon;

	props.notes.forEach((note, index) => (notes.push(
		<p key={'note-' + index}
			dangerouslySetInnerHTML={rawMarkup(note)}/>
	)));

	if (props.iconGlyph) {
		icon = <Icon glyph={props.iconGlyph}/>;
	}

	return (
		<div className={props.className}>
			<h2>
				{icon}
				<span dangerouslySetInnerHTML={rawMarkup(props.title)}/>
			</h2>
			{notes}
		</div>
	);
};

DialogHeading.propTypes = {
	iconGlyph: PropTypes.string,
	className: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	notes: PropTypes.arrayOf(PropTypes.string)
};

export default DialogHeading;