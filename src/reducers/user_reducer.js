import { GET_USERS, GET_SINGLE_USER_INFO } from "../actions";

const UserReducer = (state, action) => {
    switch (action.type) {
        case GET_USERS:
        return {
            ...state,
            users: action.payload
        };
        case GET_SINGLE_USER_INFO:
        return {
            ...state,
            user: action.payload
        };
        default:
        throw new Error(`No matching "${action.type}" - action type`)
    }
}

export default UserReducer;