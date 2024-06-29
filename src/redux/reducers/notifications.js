const initialState = {
    notifications: [],
    unreadCount: 0,
};

const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "get_notif":
            return {
                ...state,
                notifications: action.payload,
                unreadCount: action.payload.filter((notif) => !notif.isRead).length,
            };
        case "update_notif":
            const updatedNotifications = state.notifications.map((notif) =>
                notif.id === action.payload.id ? action.payload : notif
            );
            return {
                ...state,
                notifications: updatedNotifications,
                unreadCount: updatedNotifications.filter((notif) => !notif.isRead).length,
            };
        default:
            return state;
    }
};

export default notificationsReducer;
