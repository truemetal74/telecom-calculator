import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CalculatorsPage: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/calculators/subscriber', { replace: true });
  }, [navigate]);
  
  return null;
};

export default CalculatorsPage;