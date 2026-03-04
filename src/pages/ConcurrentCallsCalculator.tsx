import React, { useState, useEffect } from 'react';
import useCalculatorStore from '../store/calculatorStore';
import InputField from '../components/InputField';
import CheckboxField from '../components/CheckboxField';
import { calculateConcurrentCalls, calculateConcurrentCallsReverse } from '../utils/calculations';
import { generateShareUrl } from '../utils/sharing';
import { trackCalculatorUsage, trackShareLink } from '../utils/gtm';
import Tooltip from '../components/Tooltip';

const ConcurrentCallsCalculator: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const {
    concurrentCallsInput,
    concurrentCallsParams,
    concurrentCallsReverseInput,
    concurrentCallsReverseMode,
    setConcurrentCallsInput,
    setConcurrentCallsParams,
    setConcurrentCallsReverseInput,
    setConcurrentCallsReverseMode,
  } = useCalculatorStore();

  const results = concurrentCallsReverseMode
    ? calculateConcurrentCallsReverse(concurrentCallsReverseInput.chargingRequestsPerSecond, concurrentCallsParams)
    : calculateConcurrentCalls(concurrentCallsInput, concurrentCallsParams);

  useEffect(() => {
    trackCalculatorUsage('concurrent_calls', 'page_view', {
      concurrent_calls: concurrentCallsInput.concurrentCalls,
    });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-semibold mb-6">Input Parameters</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Main Input</h3>
          {concurrentCallsReverseMode ? (
            <InputField
              label="Charging Requests per Second (CPS)"
              value={concurrentCallsReverseInput.chargingRequestsPerSecond}
              onChange={(value) => setConcurrentCallsReverseInput({ chargingRequestsPerSecond: value })}
              min={0.1}
              max={100000}
              width="large"
              tooltip="Number of charging requests per second your system must handle. Enter this to calculate the required concurrent call capacity."
              required
            />
          ) : (
            <InputField
              label="Number of Concurrent Calls"
              value={concurrentCallsInput.concurrentCalls}
              onChange={(value) => setConcurrentCallsInput({ concurrentCalls: value })}
              min={1}
              max={1000000}
              width="large"
              largeNumbers={true}
              tooltip="Maximum number of simultaneous active calls your system needs to handle at peak times. This is the primary input for calculating system capacity requirements."
              required
            />
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h3 className="text-lg font-medium mb-4">Call Parameters</h3>
          <div className="space-y-4">
            <InputField
              label="Average Length of Call (ALOC)"
              value={concurrentCallsParams.avgCallLength}
              onChange={(value) => setConcurrentCallsParams({ avgCallLength: value })}
              min={1}
              max={3600}
              width="medium"
              unit="seconds"
              tooltip="Average duration of a completed call in seconds. Used to calculate call completion rate. Industry typical: 120-300 seconds (2-5 minutes)."
            />
            <InputField
              label="Average Success Rate (ASR)"
              value={concurrentCallsParams.avgSuccessRate}
              onChange={(value) => setConcurrentCallsParams({ avgSuccessRate: value })}
              min={0}
              max={100}
              width="small"
              unit="%"
              tooltip="Percentage of call attempts that successfully connect and complete. Failed calls still generate charging events. Industry typical: 40-70%."
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h3 className="text-lg font-medium mb-4">Traffic Distribution Parameters</h3>
          <div className="space-y-4">
            <InputField
              label="Busy Hour Traffic Percentage"
              value={concurrentCallsParams.busyHourPercent}
              onChange={(value) => setConcurrentCallsParams({ busyHourPercent: value })}
              min={1}
              max={50}
              width="small"
              unit="%"
              tooltip="Percentage of daily traffic that occurs during the busiest hour. Used to calculate peak system load. Cannot exceed 50%. Typical: 8-15%."
            />
            <InputField
              label="Weekend to Weekday Activity Ratio"
              value={concurrentCallsParams.weekendRatio}
              onChange={(value) => setConcurrentCallsParams({ weekendRatio: value })}
              min={0}
              max={2}
              step={0.1}
              width="small"
              tooltip="Ratio of weekend activity compared to weekday activity. 1.0 = same activity, 1.2 = 20% more on weekends. Typical: 0.8-1.4."
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h3 className="text-lg font-medium mb-4">Charging Events</h3>
          <div className="space-y-4">
            <CheckboxField
              label="Call Authorization Performed"
              checked={concurrentCallsParams.callAuthorizationEnabled}
              onChange={(checked) => setConcurrentCallsParams({ callAuthorizationEnabled: checked })}
              tooltip="Enable if your system performs authorization checks before allowing calls. This doubles the charging request load as each call requires pre-authorization."
            />
            <CheckboxField
              label="Call Start Event Reported"
              checked={concurrentCallsParams.callStartEventEnabled}
              onChange={(checked) => setConcurrentCallsParams({ callStartEventEnabled: checked })}
              tooltip="Enable if your system sends a separate charging event when calls actually start (after authorization). This adds additional charging requests."
            />
            <CheckboxField
              label="Call Charging Performed"
              checked={true}
              onChange={() => {}}
              disabled={true}
              tooltip="Charging is always performed for each completed call. This is a baseline event and cannot be disabled."
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mx-4 my-8 lg:my-0">
        <Tooltip content="Switch calculation direction" className="">
          <button
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 shadow transition-colors duration-200 focus:outline-none"
            type="button"
            aria-label="Switch calculation direction"
            onClick={() => setConcurrentCallsReverseMode(!concurrentCallsReverseMode)}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="14" x2="23" y2="14" />
                <polyline points="19,10 23,14 19,18" />
                <polyline points="9,10 5,14 9,18" />
              </g>
            </svg>
          </button>
        </Tooltip>
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-semibold mb-6">Results</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            {concurrentCallsReverseMode ? (
              <div className="border-b pb-4">
                <p className="text-sm text-gray-600 mb-2">Number of Concurrent Calls</p>
                <p className="text-4xl font-bold text-blue-600">
                  {'concurrentCalls' in results ? results.concurrentCalls.toLocaleString() : 0}
                </p>
              </div>
            ) : (
              <div className="border-b pb-4">
                <p className="text-sm text-gray-600 mb-2">Charging Requests per Second</p>
                <p className="text-4xl font-bold text-blue-600">
                  {'chargingRequestsPerSecond' in results ? results.chargingRequestsPerSecond.toLocaleString() : 0} CPS
                </p>
              </div>
            )}
            <div className="border-b pb-4">
              <p className="text-sm text-gray-600">CDRs per Busy Hour (BHCA)</p>
              <p className="text-2xl font-bold text-gray-900">
                {'busyHourCalls' in results ? results.busyHourCalls.toLocaleString() : 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Monthly CDRs</p>
              <p className="text-2xl font-bold text-gray-900">
                {'totalMonthlyCdrs' in results ? results.totalMonthlyCdrs.toLocaleString() : 0}
              </p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => {
            const shareUrl = generateShareUrl('concurrent-calls', concurrentCallsInput, concurrentCallsParams);
            navigator.clipboard.writeText(shareUrl);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 3000);
            trackShareLink('concurrent_calls');
            trackCalculatorUsage('concurrent_calls', 'share_results', {
              concurrent_calls: concurrentCallsInput.concurrentCalls,
              cps: 'chargingRequestsPerSecond' in results ? results.chargingRequestsPerSecond : undefined,
            });
          }}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          {copySuccess ? 'Link Copied!' : 'Share Results'}
        </button>
      </div>
    </div>
  );
};

export default ConcurrentCallsCalculator;