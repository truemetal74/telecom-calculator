import React, { useState, useEffect } from 'react';
import useCalculatorStore from '../store/calculatorStore';
import InputField from '../components/InputField';
import { calculateVoipLoad } from '../utils/calculations';
import { generateShareUrl } from '../utils/sharing';
import { trackCalculatorUsage, trackShareLink } from '../utils/gtm';

const VoipCalculator: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const {
    voipInput,
    voipParams,
    setVoipInput,
    setVoipParams,
  } = useCalculatorStore();

  const results = calculateVoipLoad(voipInput, voipParams);

  useEffect(() => {
    trackCalculatorUsage('voip', 'page_view', {
      subscriber_count: voipInput.subscriberCount,
    });
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-semibold mb-6">Input Parameters</h2>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Main Input</h3>
          <InputField
            label="Estimated Number of Subscribers"
            value={voipInput.subscriberCount}
            onChange={(value) => setVoipInput({ subscriberCount: value })}
            min={1}
            max={100000000}
            width="large"
            largeNumbers={true}
            tooltip="Total number of VoIP subscribers who will use your service. This includes all registered SIP devices."
            required
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h3 className="text-lg font-medium mb-4">Voice Service Configuration</h3>
          
          <div className="space-y-4">
            <InputField
              label="Average Voice Calls per Month per User"
              value={voipParams.avgCallsPerMonth}
              onChange={(value) => setVoipParams({ avgCallsPerMonth: value })}
              min={0}
              max={1000}
              width="medium"
              tooltip="Average number of voice calls each VoIP subscriber makes per month. VoIP users typically have higher usage than traditional telecom. Industry typical: 200-500 calls/month."
            />
            
            <InputField
              label="Average Call Duration"
              value={voipParams.avgCallDuration}
              onChange={(value) => setVoipParams({ avgCallDuration: value })}
              min={1}
              max={3600}
              width="medium"
              unit="seconds"
              tooltip="Average duration of a voice call in seconds. Used to calculate concurrent calls capacity. VoIP calls are often longer than mobile calls. Industry typical: 180-420 seconds (3-7 minutes)."
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h3 className="text-lg font-medium mb-4">SIP Registration Configuration</h3>
          
          <div className="space-y-4">
            <InputField
              label="SIP Registration Interval"
              value={voipParams.sipRegistrationInterval}
              onChange={(value) => setVoipParams({ sipRegistrationInterval: value })}
              min={1}
              max={3600}
              width="medium"
              unit="seconds"
              tooltip="How often SIP devices re-register with the server to maintain their connection. Lower values mean more frequent registration requests. Industry typical: 300-3600 seconds (5-60 minutes)."
            />
            
            <InputField
              label="SIP Devices Online During Peak Hours"
              value={voipParams.sipDevicesOnlinePercent}
              onChange={(value) => setVoipParams({ sipDevicesOnlinePercent: value })}
              min={0}
              max={100}
              width="small"
              unit="%"
              tooltip="Percentage of total subscribers who have their SIP devices actively registered and online during peak hours. Includes softphones, desk phones, and mobile apps. Industry typical: 10-25%."
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h3 className="text-lg font-medium mb-4">Traffic Distribution Parameters</h3>
          
          <div className="space-y-4">
            <InputField
              label="Busy Hour Traffic Percentage"
              value={voipParams.busyHourPercent}
              onChange={(value) => setVoipParams({ busyHourPercent: value })}
              min={1}
              max={50}
              width="small"
              unit="%"
              tooltip="Percentage of daily traffic that occurs during the busiest hour. Used to calculate peak system load. Cannot exceed 50%. VoIP often has different patterns than mobile. Typical: 8-15%."
            />

            <InputField
              label="Weekend to Weekday Activity Ratio"
              value={voipParams.weekendRatio}
              onChange={(value) => setVoipParams({ weekendRatio: value })}
              min={0}
              max={2}
              step={0.1}
              width="small"
              tooltip="Ratio of weekend activity compared to weekday activity. VoIP services often see higher weekend usage than traditional telecom. 1.0 = same activity, 1.2 = 20% more on weekends. Typical: 0.8-1.4."
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-6">Results</h2>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="text-sm text-gray-600">Total Voice Minutes per Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {results.totalVoiceMinutesPerMonth.toLocaleString()}
              </p>
            </div>

            <div className="border-b pb-4">
              <p className="text-sm text-gray-600">Voice Calls in Busy Hour (BHCA)</p>
              <p className="text-2xl font-bold text-gray-900">
                {results.busyHourVoiceCalls.toLocaleString()}
              </p>
            </div>

            <div className="border-b pb-4">
              <p className="text-sm text-gray-600">Total Monthly Calls (CDRs)</p>
              <p className="text-2xl font-bold text-gray-900">
                {results.totalMonthlyCalls.toLocaleString()}
              </p>
            </div>

            <div className="border-b pb-4">
              <p className="text-sm text-gray-600">SIP Devices Online</p>
              <p className="text-2xl font-bold text-gray-900">
                {results.sipDevicesOnline.toLocaleString()}
              </p>
            </div>

            <div className="border-b pb-4">
              <p className="text-sm text-gray-600">Concurrent Calls in Busy Hour</p>
              <p className="text-2xl font-bold text-gray-900">
                {results.concurrentCallsBusyHour.toLocaleString()}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-2">Charging Requests per Second by Service</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Voice:</span>
                    <span className="font-medium">{results.voiceChargingPerSecond.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">SIP Registration:</span>
                    <span className="font-medium">{results.sipChargingPerSecond.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-3">
                <p className="text-sm text-gray-600">Total Charging Requests per Second</p>
                <p className="text-3xl font-bold text-blue-600">
                  {results.chargingRequestsPerSecond.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => {
            const shareUrl = generateShareUrl('voip-subscriber', voipInput, voipParams);
            navigator.clipboard.writeText(shareUrl);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 3000);
            
            trackShareLink('voip');
            trackCalculatorUsage('voip', 'share_results', {
              subscriber_count: voipInput.subscriberCount,
              tps: results.chargingRequestsPerSecond,
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

export default VoipCalculator;