import React, {useContext, useReducer, useEffect} from "react";
import { GET_USERS, GET_SINGLE_USER_INFO } from "../actions";
import reducer from "../reducers/user_reducer";
import users from "../utils/users";

const initialState = {
    users: [],
    user: {}
};

const UserContext = React.createContext();

export const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getUsers = () => {
        dispatch({type: GET_USERS, payload: users})
    };

    const getSingleUserInfo = (id) => {
        const user = users.find(item => item.id === id);
        dispatch({type: GET_SINGLE_USER_INFO, payload: user})
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <UserContext.Provider value={{...state, getSingleUserInfo}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext);
}