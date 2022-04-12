export const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_USER':
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};
