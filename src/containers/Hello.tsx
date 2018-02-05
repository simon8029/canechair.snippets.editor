import Hello from '../components/Hello/Hello';
import { connect, Dispatch } from 'react-redux';
import { StoreState } from '../types/index';
import * as HelloActions from '../actions';

function mapStateToProps(state: StoreState) {
    return {
        name: state.name,
        enthusiasmLevel: state.enthusiasmLevel
    };
}

function mapDispatchToProps(dispatch: Dispatch<HelloActions.EnthusiasmAction>) {
    return {
        onIncrement: () => dispatch(HelloActions.incrementEnthusiasm()),
        onDecrement: () => dispatch(HelloActions.decrementEnthusiasm())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);