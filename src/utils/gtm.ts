// Google Tag Manager utilities

export const GTM_ID = import.meta.env.VITE_GTM_ID;

export const initGTM = () => {
  if (!GTM_ID) {
    console.warn('GTM_ID not found in environment variables');
    return;
  }

  // Initialize dataLayer
  (window as any).dataLayer = (window as any).dataLayer || [];
  
  // GTM script injection
  const gtmScript = document.createElement('script');
  gtmScript.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  `;
  document.head.appendChild(gtmScript);
};

export const gtmPush = (event: string, data?: Record<string, any>) => {
  if (!GTM_ID) return;
  
  const dataLayer = (window as any).dataLayer;
  if (dataLayer) {
    dataLayer.push({
      event,
      ...data,
    });
  }
};

// Predefined events for the telecom calculator
export const trackCalculatorUsage = (calculatorType: string, action: string, data?: Record<string, any>) => {
  gtmPush('calculator_usage', {
    calculator_type: calculatorType,
    action,
    ...data,
  });
};

export const trackShareLink = (calculatorType: string) => {
  gtmPush('share_link', {
    calculator_type: calculatorType,
    event_category: 'engagement',
    event_label: 'share_calculator_results',
  });
};

export const trackCalculatorNavigation = (fromCalculator: string, toCalculator: string) => {
  gtmPush('calculator_navigation', {
    from_calculator: fromCalculator,
    to_calculator: toCalculator,
    event_category: 'navigation',
  });
};