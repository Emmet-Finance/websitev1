import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BridgeRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('https://master.d3rd013nklfbmi.amplifyapp.com/', { replace: true });
  }, [navigate]);

  return null;
};

export default BridgeRedirect;
