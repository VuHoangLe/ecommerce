import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDocuments } from '../../firebase/services';
// const info = localStorage.getItem('userInfo') !== null ? JSON.parse(localStorage.getItem('userInfo')) : [];

const initialState = {
    value: [],
    status: 'idle',
};

export const getUser = createAsyncThunk('user/getUser', async () => {
    const res = await getDocuments('users');
    return res;
});

const findItem = (state, item) => {
    return state.filter((e) => e.email === item.email && e.uid === item.uid);
};

const delItem = (state, item) => {
    return state.filter((e) => e.uid !== item.uid);
};

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const newUser = action.payload;
            const duplicate = findItem(state.value, newUser);
            if (duplicate.length) {
                state.value = delItem(state.value, newUser);
                state.value = [newUser];
            } else state.value = [newUser];

            localStorage.setItem('userInfo', JSON.stringify(state.value));
        },
        delUser: (state) => {
            state.value = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload;
            });
    },
});

export const { addUser, delUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;
