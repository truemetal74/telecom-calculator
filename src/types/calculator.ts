export interface SubscriberCalculatorInput {
  subscriberCount: number;
}

export interface SubscriberCalculatorParams {
  voiceEnabled: boolean;
  smsEnabled: boolean;
  dataEnabled: boolean;
  avgCallsPerMonth: number;
  avgCallDuration: number;
  avgSmsPerMonth: number;
  dataQuotaUpdateInterval: number;
  activeDataSessionsPercent: number;
  busyHourPercent: number;
  weekendRatio: number;
}

export interface SubscriberCalculatorResults {
  busyHourVoiceAndSms: number;
  activeDataSessionsBusyHour: number;
  concurrentCallsBusyHour: number;
  chargingRequestsPerSecond: number;
  voiceChargingPerSecond: number;
  smsChargingPerSecond: number;
  dataChargingPerSecond: number;
}

export interface ConcurrentCallsCalculatorInput {
  concurrentCalls: number;
}

export interface ConcurrentCallsCalculatorParams {
  avgCallLength: number;
  avgSuccessRate: number;
  callAuthorizationEnabled: boolean;
  callStartEventEnabled: boolean;
  busyHourPercent: number;
  weekendRatio: number;
}

export interface ConcurrentCallsCalculatorResults {
  chargingRequestsPerSecond: number;
  busyHourCalls: number;
  totalMonthlyCdrs: number;
}

export interface ConcurrentCallsCalculatorReverseInput {
  chargingRequestsPerSecond: number;
}

export interface VoipCalculatorInput {
  subscriberCount: number;
}

export interface VoipCalculatorParams {
  avgCallsPerMonth: number;
  avgCallDuration: number;
  sipRegistrationInterval: number;
  sipDevicesOnlinePercent: number;
  busyHourPercent: number;
  weekendRatio: number;
}

export interface VoipCalculatorResults {
  totalVoiceMinutesPerMonth: number;
  totalMonthlyCalls: number;
  busyHourVoiceCalls: number;
  sipDevicesOnline: number;
  concurrentCallsBusyHour: number;
  chargingRequestsPerSecond: number;
  voiceChargingPerSecond: number;
  sipChargingPerSecond: number;
}

export type CalculatorType = 'subscriber' | 'voip-subscriber' | 'concurrent-calls';