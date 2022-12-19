export default function IsUserLogin() {
    
    const token = localStorage.getItem('auth');
    
    if ( token ){
        
        const getAuthToken = token ? JSON.parse(token) : '';
        const jwtAuthExpiration = getAuthToken.user.jwtAuthExpiration;
        const currenttime = Math.floor(Date.now() / 1000);

        if (currenttime > jwtAuthExpiration) {
            
            localStorage.removeItem("auth");

            return false;
        }
        
        return true;
    }

    return false;
}