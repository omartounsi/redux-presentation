const initialState = {
  theme: false,
};

export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        theme: state.theme === false ? true : false,
      };
    default:
      return state;
  }
}
