import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifications: {
        messages: [],
        type: null,
    }
};
export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotifications: (state, action) =>
            (state = { ...state, notifications: action.payload }),
        removeNotifications: (state) => {
            state.notifications = initialState.notifications;
        },
        removeFirstMessage: (state) => {
            state.notifications.messages.shift();
        },
    },
});

export const {
    setNotifications,
    removeNotifications,
    removeFirstMessage
} = notificationsSlice.actions;

export default notificationsSlice.reducer;