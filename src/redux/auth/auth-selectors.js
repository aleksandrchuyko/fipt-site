const authSelectors = {
    getUser: state => state.auth.user,
    getIsLoggedIn: state => state.auth.isLoggedIn,
    getIsRefreshingUser: state => state.auth.isRefreshingUser,
}
export default authSelectors;