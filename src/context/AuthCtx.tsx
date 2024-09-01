import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../components/CustomHttpInterceptor';

export const AuthCtx = createContext<any>(null);

type SignInType = {
    email: string;
    password: string;
    callback: (token: string | null, err: any) => any;
};

export default function AuthContext({ children }: { children: JSX.Element }) {
    const token = localStorage.getItem("@PUNCH-CLOCK:SYSTEM") || "{}";

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(token ? true : false);

    useEffect(() => {
        const isLoggedIn = async () => {
            setLoading(true);
            
            if(token) { 
                try {
                    await api.post("/verify-token", { token });
                    setUserLoggedIn(true);
                } catch (err: any) {
                    if(err) localStorage.removeItem("@PUNCH-CLOCK:SYSTEM");
                    
                    setUserLoggedIn(false);
                } finally {
                    setLoading(false);
                }
            }
        };
        isLoggedIn();
    }, []);

    const authActions = {
        userIsLoggedIn: userLoggedIn,
        isLoading: loading,
        signIn: async ({ email, password, callback }: SignInType)  => {
            setLoading(true);

            try {
                const { data } = await api.post("/sign-in", { email, password });
                console.log(data);
                localStorage.setItem("@PUNCH-CLOCK:SYSTEM", data.token);

                setUserLoggedIn(true);
                setLoading(false);
                callback(data, null);
            } catch (err: any) { 
                callback(null, err);
                console.log(err);
            } finally { 
                setLoading(false);
            }
        },
        signOut: async () => {
            setUserLoggedIn(false);    
            localStorage.removeItem("@PUNCH-CLOCK:SYSTEM");
            navigate("/");
        },
        setUserLoggedIn
    };

    return (
        <AuthCtx.Provider value={authActions}>
            {children}
        </AuthCtx.Provider>
    );
};