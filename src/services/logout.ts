
const logout = (): void => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};

export default logout;