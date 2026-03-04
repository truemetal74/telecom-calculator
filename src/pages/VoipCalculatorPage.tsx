import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import VoipCalculator from './VoipCalculator';
import { parseShareUrl } from '../utils/sharing';
import useCalculatorStore from '../store/calculatorStore';

const VoipCalculatorPage: React.FC = () => {
  const {
    setVoipInput,
    setVoipParams,
  } = useCalculatorStore();

  useEffect(() => {
    const parsed = parseShareUrl(window.location.href);
    
    if (parsed.calculatorType === 'voip-subscriber') {
      if (parsed.voipInput) {
        setVoipInput(parsed.voipInput);
      }
      if (parsed.voipParams) {
        setVoipParams(parsed.voipParams);
      }
    }
  }, [setVoipInput, setVoipParams]);

  return (
    <Layout activeCalculator="voip-subscriber">
      <VoipCalculator />
    </Layout>
  );
};

export default VoipCalculatorPage;