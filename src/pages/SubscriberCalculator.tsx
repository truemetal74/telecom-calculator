import React, { useState, useEffect } from 'react';
import useCalculatorStore from '../store/calculatorStore';
import InputField from '../components/InputField';
import CheckboxField from '../components/CheckboxField';
import { calculateSubscriberLoad } from '../utils/calculations';
import { generateShareUrl } from '../utils/sharing';
import { trackCalculatorUsage, trackShareLink } from '../utils/gtm';

const SubscriberCalculator: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const {
    subscriberInput,
    subscriberParams,
    setSubscriberInput,
    setSubscriberParams,
  } = useCalculatorStore();

  const results = calculateSubscriberLoad(subscriberInput, subscriberParams);

  useEffect(() => {
    trackCalculatorUsage('mvno_mno', 'page_view', {
      subscriber_count: subscriberInput.subscriberCount,
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
            value={subscriberInput.subscriberCount}
            onChange={(value) => setSubscriberInput({ subscriberCount: value })}
            min={1}
            max={100000000}
            width="large"
            largeNumbers={true}
            tooltip="Total number of subscribers who will use your telecom service. This is the main input for capacity planning calculations."
            required
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h3 className="text-lg font-medium mb-4">Service Configuration</h3>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Services Provided</p>
              
              {/* Voice Calls Section */}
              <div className="border-l-4 border-blue-200 pl-4 mb-4">
                <CheckboxField
                  label="Voice Calls"
                  checked={subscriberParams.voiceEnabled}
                  onChange={(checked) => setSubscriberParams({ voiceEnabled: checked })}
                  tooltip="Enable voice call service for your subscribers. This affects the calculation of call-related transaction load."
                />
                {subscriberParams.voiceEnabled && (
                  <div className="ml-6 mt-2 space-y-4">
                    <InputField
                      label="Average Voice Calls per Month per User"
                      value={subscriberParams.avgCallsPerMonth}
                      onChange={(value) => setSubscriberParams({ avgCallsPerMonth: value })}
                      min={0}
                      max={1000}
                      width="medium"
                      tooltip="Average number of voice calls (incoming + outgoing) each subscriber makes per month. Industry typical: 50-300 calls/month."
                    />
                    <InputField
                      label="Average Call Duration"
                      value={subscriberParams.avgCallDuration}
                      onChange={(value) => setSubscriberParams({ avgCallDuration: value })}
                      min={1}
                      max={3600}
                      width="medium"
                      unit="seconds"
                      tooltip="Average duration of a voice call in seconds. Used to calculate concurrent calls capacity. Industry typical: 120-300 seconds (2-5 minutes)."
                    />
                  </div>
                )}
              </div>

              {/* SMS Section */}
              <div className="border-l-4 border-green-200 pl-4 mb-4">
                <CheckboxField
                  label="SMS"
                  checked={subscriberParams.smsEnabled}
                  onChange={(checked) => setSubscriberParams({ smsEnabled: checked })}
                  tooltip="Enable SMS service for your subscribers. This includes all text messaging transactions."
                />
                {subscriberParams.smsEnabled && (
                  <div className="ml-6 mt-2">
                    <InputField
                      label="Average SMS Messages per Month per User"
                      value={subscriberParams.avgSmsPerMonth}
                      onChange={(value) => setSubscriberParams({ avgSmsPerMonth: value })}
                      min={0}
                      max={1000}
                      width="medium"
                      tooltip="Average number of SMS messages each subscriber sends per month. Industry typical: 100-500 SMS/month."
                    />
                  </div>
                )}
              </div>

              {/* Data Section */}
              <div className="border-l-4 border-purple-200 pl-4 mb-4">
                <CheckboxField
                  label="Data"
                  checked={subscriberParams.dataEnabled}
                  onChange={(checked) => setSubscriberParams({ dataEnabled: checked })}
                  tooltip="Enable data service for your subscribers. This includes internet access and data session management."
                />
                {subscriberParams.dataEnabled && (
                  <div className="ml-6 mt-2 space-y-4">
                    <InputField
                      label="Data Session Quota Update Interval"
                      value={subscriberParams.dataQuotaUpdateInterval}
                      onChange={(value) => setSubscriberParams({ dataQuotaUpdateInterval: value })}
                      min={1}
                      max={3600}
                      width="medium"
                      unit="seconds"
                      tooltip="How often the system checks and updates data usage quotas for active sessions. Lower values mean more frequent charging requests. Typical: 300-900 seconds."
                    />
                    <InputField
                      label="Active Data Sessions During Peak Hours"
                      value={subscriberParams.activeDataSessionsPercent}
                      onChange={(value) => setSubscriberParams({ activeDataSessionsPercent: value })}
                      min={0}
                      max={100}
                      width="small"
                      unit="%"
                      tooltip="Percentage of total subscribers who have active data sessions during peak hours. Includes all users browsing, streaming, or using apps. Typical: 15-40%."
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Traffic Distribution Parameters</h4>
              
              <InputField
                label="Busy Hour Traffic Percentage"
                value={subscriberParams.busyHourPercent}
                onChange={(value) => setSubscriberParams({ busyHourPercent: value })}
                min={1}
                max={50}
                width="small"
                unit="%"
                tooltip="Percentage of daily traffic that occurs during the busiest hour. Used to calculate peak system load. Cannot exceed 50%. Typical: 8-15%."
              />

              <InputField
                label="Weekend to Weekday Activity Ratio"
                value={subscriberParams.weekendRatio}
                onChange={(value) => setSubscriberParams({ weekendRatio: value })}
                min={0}
                max={2}
                step={0.1}
                width="small"
                tooltip="Ratio of weekend activity compared to weekday activity. 1.0 = same activity, 0.5 = half activity on weekends, 1.5 = 50% more activity. Typical: 0.6-1.2."
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-6">Results</h2>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="text-sm text-gray-600">Voice Calls and SMS in Busy Hour</p>
              <p className="text-2xl font-bold text-gray-900">
                {results.busyHourVoiceAndSms.toLocaleString()}
              </p>
            </div>

            <div className="border-b pb-4">
              <p className="text-sm text-gray-600">Active Data Sessions in Busy Hour</p>
              <p className="text-2xl font-bold text-gray-900">
                {results.activeDataSessionsBusyHour.toLocaleString()}
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
                    <span className="text-gray-600">SMS:</span>
                    <span className="font-medium">{results.smsChargingPerSecond.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data:</span>
                    <span className="font-medium">{results.dataChargingPerSecond.toLocaleString()}</span>
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
            const shareUrl = generateShareUrl('subscriber', subscriberInput, subscriberParams);
            navigator.clipboard.writeText(shareUrl);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 3000);
            
            trackShareLink('mvno_mno');
            trackCalculatorUsage('mvno_mno', 'share_results', {
              subscriber_count: subscriberInput.subscriberCount,
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

export default SubscriberCalculator;