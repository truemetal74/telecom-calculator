import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import ConcurrentCallsCalculator from './ConcurrentCallsCalculator';
import { parseShareUrl } from '../utils/sharing';
import useCalculatorStore from '../store/calculatorStore';

const ConcurrentCallsCalculatorPage: React.FC = () => {
  const {
    setConcurrentCallsInput,
    setConcurrentCallsParams,
  } = useCalculatorStore();

  useEffect(() => {
    const parsed = parseShareUrl(window.location.href);
    
    if (parsed.calculatorType === 'concurrent-calls') {
      if (parsed.concurrentCallsInput) {
        setConcurrentCallsInput(parsed.concurrentCallsInput);
      }
      if (parsed.concurrentCallsParams) {
        setConcurrentCallsParams(parsed.concurrentCallsParams);
      }
    }
  }, [setConcurrentCallsInput, setConcurrentCallsParams]);

  return (
    <Layout activeCalculator="concurrent-calls">
      <ConcurrentCallsCalculator />
    </Layout>
  );
};

export default ConcurrentCallsCalculatorPage;