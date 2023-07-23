import { createSlice } from "@reduxjs/toolkit";

export const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    admin: false
}

const initialErrors = {
    username: '',
    password: '',
    email: ''
}

export const usersSlice = createSlice({

    name: 'users',
    initialState: {
        users:[],
        userSelected: initialUserForm,
        errors: initialErrors
    },
    reducers: {

        addUser: (state, action) => {
            state.users = [
                ...state.users,
                {
                    ...action.payload
                }
            ];
            state.userSelected = initialUserForm;
        }, 

        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },

        updateUser: (state, action) => {
            state.users = state.users.map( u => {
                if ( u.id === action.payload.id ) {
                    return {
                        ...action.payload,
                    };
                }
                return u;
            } );
            state.userSelected = initialUserForm;
        },

        loadingUsers: (state, action) => {
            state.users = action.payload
        },

        onUserSelectedForm: (state, action) => {
            state.userSelected = action.payload;
        }
    }

});

export const {
    addUser,
    removeUser,
    updateUser,
    loadingUsers,
    onUserSelectedForm
} = usersSlice.actions;