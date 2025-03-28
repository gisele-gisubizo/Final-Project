import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  // Check if user is authenticated (localStorage)
  if (!localStorage.getItem('user')) {
    navigate('/LoginPage');
    return null; // or a loading spinner
  }

  return children;
};

export default ProtectedRoute;
