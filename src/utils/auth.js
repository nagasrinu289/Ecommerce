import { createContext, useState, useContext } from "react";
const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token,setToken] = useState(localStorage.getItem("xtoken")?localStorage.getItem("xtoken").toString():"");
    const [user, setUser] = useState(localStorage.getItem('user') ? localStorage.getItem('user'):null); 
    const [data, setData] = useState({}); 
    const [search,setSearch] = useState([]);
    const [wishList,setWishList] = useState([]);
    const [carts,setCarts] = useState(localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : []);

    
    const hasEmail = (val) => {
        if (val) {
            localStorage.setItem("hasEmail", "true");
        } else {
            localStorage.removeItem("hasEmail");
        }
    };
    
    const login = (user) => {
        setUser(user);
        
        localStorage.setItem("user", user);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('xtoken');
        localStorage.removeItem("user");
        localStorage.removeItem("hasEmail");
        localStorage.removeItem('Resetpass');
    };

    return (
        <authContext.Provider value={{ user,token,setToken,search,setSearch, login, logout, hasEmail, data,setData,wishList,setWishList,carts,setCarts }}>
            {children}
        </authContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(authContext);
};
