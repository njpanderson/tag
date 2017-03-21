import { connect } from 'react-redux';

import Pallet from '../views/Pallet.jsx';

const mapStateToProps = (state) => {
	return {
		activeDropletId: state.app.active_droplet_id
	};
};

const PalletContainer = connect(
  mapStateToProps
)(Pallet);

export default PalletContainer;