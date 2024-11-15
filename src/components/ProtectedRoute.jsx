import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
    const [isValid, setIsValid] = useState(false); // Track validity state
    const token = localStorage.getItem('token');

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setIsValid(false); // No token found
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/verify-token', {  
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log(response.status);
                setIsValid(true);
  
            } catch (error) {
                console.error('Error verifying token:', error);
                setIsValid(false);
            }
        };
        console.log("isvalid");
        console.log("isvalid".isValid);
        verifyToken();
    }, [token]);

    console.log(isValid);

    // if (isValid === null) {
    //     return <div>Loading...</div>; // Optionally show a loading state
    // }

    if (!isValid) {
        return <Navigate to="/adminLogin" replace />;
    }

    //If the token is valid, allow access to the component
    return <Component />;
};

export default ProtectedRoute;  


