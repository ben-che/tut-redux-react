import { createStore } from "redux";
// grabbing the test reducer - this is where the state will come from
import rootReducer from "../reducers/index";

// use createScore() to make a Redux store, and assign it to a store const
const store = createStore(rootReducer);

// export store
export default store;