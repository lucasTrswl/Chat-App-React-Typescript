// Backend url //
export const API_URL = "http://172.20.10.2:3000";

// Auth routes //
export const AUTH_REGISTER = API_URL + "/auth/register"
export const AUTH_LOGIN = API_URL + "/auth/login";
export const AUTH_LOGOUT = API_URL + "/auth/logout";
export const AUTH_ME = API_URL + "/auth/me";

// Chat/Messages routes //
export const CHAT_SEND = (messageId: string) => API_URL + `/chat/${messageId}/send`;
export const CHAT_DELETE = (messageId: string) => API_URL + `/chat/${messageId}`;
export const MESSAGES_GET = (userId: string) => API_URL + `/messages/${userId}`;

// Social routes //
export const SOCIAL_SEND_FRIEND_REQUEST = (requestId: string) => API_URL + `/social/friend-request/${requestId}`;
export const SOCIAL_ACCEPT_FRIEND_REQUEST = (requestId: string) => API_URL + `/social/friend-request/${requestId}/accept`;
export const SOCIAL_GET_FRIEND_REQUESTS = API_URL + "/social/friend-requests";
export const SOCIAL_GET_FRIENDS = API_URL + "/social/friends";

// Notification routes
export const NOTIFICATIONS = API_URL + "/notifications";


