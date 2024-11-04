import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
    const [isValid, setIsValid] = useState(null); // Track validity state
    const token = localStorage.getItem('token');

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setIsValid(false); // No token found
                return;
            }

            try {
                const response = await fetch('/api/verify-token', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    setIsValid(true); // Token is valid
                } else {
                    setIsValid(false); // Token is invalid or expired
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                setIsValid(false);
            }
        };

        verifyToken();
    }, [token]);

    if (isValid === null) {
        return <div>Loading...</div>; // Optionally show a loading state
    }

    if (!isValid) {
        return <Navigate to="/adminLogin" />;
    }

    // If the token is valid, allow access to the component
    return <Component />;
};

export default ProtectedRoute;
