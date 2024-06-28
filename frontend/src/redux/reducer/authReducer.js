import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../action/authAction";

const initialState = {
  userData: null,
};
const reloadChannel = new BroadcastChannel('logout');


reloadChannel.onmessage = (event) => {
  if (event.data === 'logout') {
    window.location.reload();
  }
};

const authReducer = (state = initialState, action) => {
  console.log({ action });
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, userData: action?.payload };

    case LOGOUT_SUCCESS:
      reloadChannel.postMessage('logout');
      return { ...state, userData: null };

    default:
      return state;
  }
};

export default authReducer;