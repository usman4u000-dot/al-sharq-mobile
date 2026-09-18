import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

// Replace with your actual GA4 Measurement ID
const MEASUREMENT_ID = 'G-XXXXXXXXXX';

export const initGA = () => {
  if (MEASUREMENT_ID && MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    ReactGA.initialize(MEASUREMENT_ID);
  }
};

export const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (MEASUREMENT_ID && MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
      ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
    }
  }, [location]);

  return null;
};
