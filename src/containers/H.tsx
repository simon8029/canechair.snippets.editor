// import H from '../components/H';
// import * as actions from '../actions/';
// // import { Store } from '../types/index';
// import { connect, Dispatch } from 'react-redux';
// import { bindActionCreators } from 'redux';

// export function mapStateToProps() {
//     return {
//         enthusiasmLevel: 3,
//         languageName: 'aaa'
//     };
// }

// export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
//     return {
//         // onIncrement: () => dispatch(actions.incrementEnthusiasm()),
//         // onDecrement: () => dispatch(actions.decrementEnthusiasm()),
//         actions: bindActionCreators(actions, dispatch)
//     };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(H);

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HActions from '../actions/HActions';
class H extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = props.state;
        this.actions = props.actions;
    }

    render() {
        return (
            <div>
                "H" is working!
        </div>
        );
    }
}
H.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(store, ownProps) {
    return {
        state: store
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(H);