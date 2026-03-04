import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import SubscriberCalculator from './SubscriberCalculator';
import { parseShareUrl } from '../utils/sharing';
import useCalculatorStore from '../store/calculatorStore';

const SubscriberCalculatorPage: React.FC = () => {
  const {
    setSubscriberInput,
    setSubscriberParams,
    setVoipInput,
    setVoipParams,
  } = useCalculatorStore();

  useEffect(() => {
    const parsed = parseShareUrl(window.location.href);
    
    if (parsed.calculatorType === 'subscriber') {
      if (parsed.subscriberInput) {
        setSubscriberInput(parsed.subscriberInput);
      }
      if (parsed.subscriberParams) {
        setSubscriberParams(parsed.subscriberParams);
      }
    } else if (parsed.calculatorType === 'voip-subscriber') {
      if (parsed.voipInput) {
        setVoipInput(parsed.voipInput);
      }
      if (parsed.voipParams) {
        setVoipParams(parsed.voipParams);
      }
    }
  }, [setSubscriberInput, setSubscriberParams, setVoipInput, setVoipParams]);

  return (
    <Layout activeCalculator="subscriber">
      <SubscriberCalculator />
    </Layout>
  );
};

export default SubscriberCalculatorPage;