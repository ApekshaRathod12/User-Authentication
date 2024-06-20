import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';
 
function ProtectedRoute( {element} ) {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const token = localStorage.getItem('jwt');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setIsAuthorized(false);
        return;
      }
 
      const authStatus = await isAuthenticated(token);
      setIsAuthorized(authStatus);
 
      if (!authStatus) {
        localStorage.removeItem('jwt');
      }
    };
 
    checkAuth();
  }, [token]);
 
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }
 
  return isAuthorized ? element : navigate('/login');
 
}
 
export default ProtectedRoute;