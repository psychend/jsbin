import * as MODES from '../lib/cm-modes';
import {
  SET_CSS,
  SET_HTML,
  SET_JS,
  SET_RESULT,
  UPDATE,
} from '../actions/processors';
import { RESET, FETCH_BIN_REQUEST } from '../actions/bin';

function addDefaultStates(obj, key, value) {
  Object.keys(MODES).forEach(mode => {
    obj[`${MODES[mode]}-${key}`] = value(mode, MODES[mode]);
  });
}

export const defaultState = {
  result: '',
  insertJS: false,
  updated: 0,
};

addDefaultStates(defaultState, 'result', () => null);

export default function reducer(state = defaultState, action) {
  const { type, value } = action;

  let key = null;
  if (type === SET_HTML) {
    key = MODES.HTML;
  }

  if (type === SET_CSS) {
    key = MODES.CSS;
  }

  if (type === SET_JS) {
    key = MODES.JAVASCRIPT;
  }

  if (key !== null) {
    return { ...state, [`${key}-result`]: value };
  }

  if (type === UPDATE) {
    return { ...state, updated: state.updated + 1 };
  }

  if (type === SET_RESULT) {
    return { ...state, insertJS: action.insertJS, result: action.result };
  }

  if (type === RESET || type === FETCH_BIN_REQUEST) {
    return { ...defaultState };
  }

  return state;
}
