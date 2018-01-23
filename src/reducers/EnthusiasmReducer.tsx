import { EnthusiasmAction } from '../actions';
import { Store } from '../types/index';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../constants/index';

const EnthusiasmReducer = (state: Store = { languageName: '21', enthusiasmLevel: 0 }, action: EnthusiasmAction) => {
    switch (action.type) {
        case INCREMENT_ENTHUSIASM:
            return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
        case DECREMENT_ENTHUSIASM:
            return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
        default:
            return state;
    }
};

export default EnthusiasmReducer;