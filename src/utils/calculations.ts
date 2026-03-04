import type { 
  SubscriberCalculatorInput, 
  SubscriberCalculatorParams, 
  SubscriberCalculatorResults,
  VoipCalculatorInput,
  VoipCalculatorParams,
  VoipCalculatorResults,
  ConcurrentCallsCalculatorInput,
  ConcurrentCallsCalculatorParams,
  ConcurrentCallsCalculatorResults
} from '../types/calculator';

export function calculateSubscriberLoad(
  input: SubscriberCalculatorInput,
  params: SubscriberCalculatorParams
): SubscriberCalculatorResults {
  const { subscriberCount } = input;
  const {
    voiceEnabled,
    smsEnabled,
    dataEnabled,
    avgCallsPerMonth,
    avgCallDuration,
    avgSmsPerMonth,
    dataQuotaUpdateInterval,
    activeDataSessionsPercent,
    busyHourPercent,
    weekendRatio,
  } = params;
  
  // Calculate voice and SMS separately
  let totalVoicePerMonth = 0;
  let totalSmsPerMonth = 0;
  
  if (voiceEnabled) {
    totalVoicePerMonth = subscriberCount * avgCallsPerMonth;
  }
  if (smsEnabled) {
    totalSmsPerMonth = subscriberCount * avgSmsPerMonth;
  }
  
  const totalVoiceAndSmsPerMonth = totalVoicePerMonth + totalSmsPerMonth;
  
  // Calculate weighted average daily traffic
  // Assuming 22 weekdays and 8 weekend days in a typical month
  const weekdaysPerMonth = 22;
  const weekendDaysPerMonth = 8;
  
  // Calculate the weighted total days considering weekend traffic is different
  const weightedDaysInMonth = weekdaysPerMonth + (weekendDaysPerMonth * weekendRatio);
  
  // Calculate average daily traffic (weighted by weekday/weekend ratio)
  const avgDailyVoice = totalVoicePerMonth / weightedDaysInMonth;
  const avgDailySms = totalSmsPerMonth / weightedDaysInMonth;
  const avgDailyTraffic = totalVoiceAndSmsPerMonth / weightedDaysInMonth;
  
  // Busy hour traffic is on a typical weekday (not weekend)
  const busyHourVoice = avgDailyVoice * (busyHourPercent / 100);
  const busyHourSms = avgDailySms * (busyHourPercent / 100);
  const busyHourVoiceAndSms = avgDailyTraffic * (busyHourPercent / 100);
  
  const voiceChargingPerSecond = busyHourVoice / 3600;
  const smsChargingPerSecond = busyHourSms / 3600;
  const voiceAndSmsPerSecond = busyHourVoiceAndSms / 3600;
  
  // Only calculate data sessions and charging if data service is enabled
  let activeDataSessionsBusyHour = 0;
  let dataChargingPerSecond = 0;
  
  if (dataEnabled) {
    activeDataSessionsBusyHour = subscriberCount * (activeDataSessionsPercent / 100);
    dataChargingPerSecond = activeDataSessionsBusyHour / dataQuotaUpdateInterval;
  }
  
  const totalTps = voiceAndSmsPerSecond + dataChargingPerSecond;
  
  // Calculate concurrent calls in busy hour
  // Only count voice calls, not SMS
  const busyHourVoiceCalls = voiceEnabled ? 
    (subscriberCount * avgCallsPerMonth / weightedDaysInMonth) * (busyHourPercent / 100) : 0;
  
  const concurrentCallsBusyHour = (busyHourVoiceCalls * avgCallDuration) / 3600;
  
  return {
    busyHourVoiceAndSms: Math.round(busyHourVoiceAndSms),
    activeDataSessionsBusyHour: Math.round(activeDataSessionsBusyHour),
    concurrentCallsBusyHour: Math.round(concurrentCallsBusyHour),
    chargingRequestsPerSecond: Math.round(totalTps * 10) / 10,
    voiceChargingPerSecond: Math.round(voiceChargingPerSecond * 10) / 10,
    smsChargingPerSecond: Math.round(smsChargingPerSecond * 10) / 10,
    dataChargingPerSecond: Math.round(dataChargingPerSecond * 10) / 10,
  };
}

export function calculateVoipLoad(
  input: VoipCalculatorInput,
  params: VoipCalculatorParams
): VoipCalculatorResults {
  const { subscriberCount } = input;
  const {
    avgCallsPerMonth,
    avgCallDuration,
    sipRegistrationInterval,
    sipDevicesOnlinePercent,
    busyHourPercent,
    weekendRatio,
  } = params;
  
  // Calculate voice calls (no SMS for VoIP)
  const totalVoicePerMonth = subscriberCount * avgCallsPerMonth;
  
  // Calculate total voice minutes per month
  const totalVoiceMinutesPerMonth = (totalVoicePerMonth * avgCallDuration) / 60;
  
  // Calculate weighted average daily traffic
  const weekdaysPerMonth = 22;
  const weekendDaysPerMonth = 8;
  const weightedDaysInMonth = weekdaysPerMonth + (weekendDaysPerMonth * weekendRatio);
  
  // Calculate average daily traffic
  const avgDailyVoice = totalVoicePerMonth / weightedDaysInMonth;
  
  // Busy hour traffic
  const busyHourVoiceCalls = avgDailyVoice * (busyHourPercent / 100);
  const voiceChargingPerSecond = busyHourVoiceCalls / 3600;
  
  // Calculate SIP devices online and charging
  const sipDevicesOnline = subscriberCount * (sipDevicesOnlinePercent / 100);
  const sipChargingPerSecond = sipDevicesOnline / sipRegistrationInterval;
  
  const totalTps = voiceChargingPerSecond + sipChargingPerSecond;
  
  // Calculate concurrent calls in busy hour
  const concurrentCallsBusyHour = (busyHourVoiceCalls * avgCallDuration) / 3600;
  
  return {
    totalVoiceMinutesPerMonth: Math.round(totalVoiceMinutesPerMonth),
    totalMonthlyCalls: Math.round(totalVoicePerMonth),
    busyHourVoiceCalls: Math.round(busyHourVoiceCalls),
    sipDevicesOnline: Math.round(sipDevicesOnline),
    concurrentCallsBusyHour: Math.round(concurrentCallsBusyHour),
    chargingRequestsPerSecond: Math.round(totalTps * 10) / 10,
    voiceChargingPerSecond: Math.round(voiceChargingPerSecond * 10) / 10,
    sipChargingPerSecond: Math.round(sipChargingPerSecond * 10) / 10,
  };
}

export function calculateConcurrentCalls(
  input: ConcurrentCallsCalculatorInput,
  params: ConcurrentCallsCalculatorParams
): ConcurrentCallsCalculatorResults {
  const { concurrentCalls } = input;
  const {
    avgCallLength,
    avgSuccessRate,
    callAuthorizationEnabled,
    callStartEventEnabled,
    busyHourPercent,
    weekendRatio,
  } = params;

  const baseCps = (concurrentCalls / avgCallLength) +
                  (concurrentCalls / avgCallLength) * (1 - avgSuccessRate / 100);

  let cps = baseCps;

  if (callAuthorizationEnabled) {
    cps += baseCps;
  }

  if (callStartEventEnabled) {
    cps += baseCps;
  }

  // BHCA: concurrent calls represent only successful connected calls
  // BHCA (all attempts) = successful calls per hour / (ASR/100)
  const successfulCallsPerHour = concurrentCalls * 3600 / avgCallLength;
  const busyHourCalls = successfulCallsPerHour / (avgSuccessRate / 100);

  // Total monthly CDRs from busy hour using traffic distribution
  const weekdaysPerMonth = 22;
  const weekendDaysPerMonth = 8;
  const weightedDaysInMonth = weekdaysPerMonth + (weekendDaysPerMonth * weekendRatio);
  const dailyCdrs = busyHourCalls / (busyHourPercent / 100);
  const totalMonthlyCdrs = dailyCdrs * weightedDaysInMonth;

  return {
    chargingRequestsPerSecond: Math.round(cps * 10) / 10,
    busyHourCalls: Math.round(busyHourCalls),
    totalMonthlyCdrs: Math.round(totalMonthlyCdrs),
  };
}

export function calculateConcurrentCallsReverse(
  cps: number,
  params: ConcurrentCallsCalculatorParams
): { concurrentCalls: number; busyHourCalls: number; totalMonthlyCdrs: number } {
  const {
    avgCallLength,
    avgSuccessRate,
    callAuthorizationEnabled,
    callStartEventEnabled,
    busyHourPercent,
    weekendRatio,
  } = params;

  const eventMultiplier = 1 + (callAuthorizationEnabled ? 1 : 0) + (callStartEventEnabled ? 1 : 0);
  const baseCps = cps / eventMultiplier;
  const divisor = 1 + (1 - avgSuccessRate / 100);
  const concurrentCalls = baseCps * avgCallLength / divisor;

  // BHCA and monthly CDRs from derived concurrent calls
  const successfulCallsPerHour = concurrentCalls * 3600 / avgCallLength;
  const busyHourCalls = successfulCallsPerHour / (avgSuccessRate / 100);

  const weekdaysPerMonth = 22;
  const weekendDaysPerMonth = 8;
  const weightedDaysInMonth = weekdaysPerMonth + (weekendDaysPerMonth * weekendRatio);
  const dailyCdrs = busyHourCalls / (busyHourPercent / 100);
  const totalMonthlyCdrs = dailyCdrs * weightedDaysInMonth;

  return {
    concurrentCalls: Math.round(concurrentCalls * 10) / 10,
    busyHourCalls: Math.round(busyHourCalls),
    totalMonthlyCdrs: Math.round(totalMonthlyCdrs),
  };
}