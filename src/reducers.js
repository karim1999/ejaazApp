const initialState = {
    loggedIn: false,
    user: {},
    categories: [],
    token: ""
};

export const currentUser= (state = initialState, action) => {
    switch (action.type){
        case "SET_USER":
            return { ...state, user: action.user, loggedIn: true, token: action.token };
            break;
        case "SET_CATEGORIES":
            return { ...state, categories: action.categories };
            break;
        case "SET_FAVORITES":
            return { ...state, user: {...state.user, favorites: action.favorites} };
            break;
        case "SET_CART":
            return { ...state, user: {...state.user, cart: action.cart} };
            break;
        case "REMOVE_USER":
            return { ...state, user: {}, loggedIn: false };
        default:
            return state;
    }
};

export const setUser = (user, token) => ({
    type: 'SET_USER',
    user,
    token
});
export const setCategories = (categories) => ({
    type: 'SET_CATEGORIES',
    categories
});
export const setFavorites = (favorites) => ({
    type: 'SET_FAVORITES',
    favorites
});
export const setCart = (cart) => ({
    type: 'SET_CART',
    cart
});
export const removeUser = () => ({
    type: 'REMOVE_USER'
});