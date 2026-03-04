import type { 
  SubscriberCalculatorInput, 
  SubscriberCalculatorParams,
  VoipCalculatorInput,
  VoipCalculatorParams,
  ConcurrentCallsCalculatorInput,
  ConcurrentCallsCalculatorParams,
  CalculatorType
} from '../types/calculator';

export function generateShareUrl(
  calculatorType: CalculatorType,
  input: SubscriberCalculatorInput | VoipCalculatorInput | ConcurrentCallsCalculatorInput,
  params: SubscriberCalculatorParams | VoipCalculatorParams | ConcurrentCallsCalculatorParams
): string {
  const url = new URL(window.location.href);
  url.searchParams.set('calc', calculatorType);
  
  if (calculatorType === 'subscriber') {
    const subInput = input as SubscriberCalculatorInput;
    const subParams = params as SubscriberCalculatorParams;
    
    url.searchParams.set('subscribers', subInput.subscriberCount.toString());
    url.searchParams.set('voice', subParams.voiceEnabled.toString());
    url.searchParams.set('sms', subParams.smsEnabled.toString());
    url.searchParams.set('data', subParams.dataEnabled.toString());
    url.searchParams.set('avgCalls', subParams.avgCallsPerMonth.toString());
    url.searchParams.set('avgCallDuration', subParams.avgCallDuration.toString());
    url.searchParams.set('avgSms', subParams.avgSmsPerMonth.toString());
    url.searchParams.set('dataQuota', subParams.dataQuotaUpdateInterval.toString());
    url.searchParams.set('activeData', subParams.activeDataSessionsPercent.toString());
    url.searchParams.set('busyHour', subParams.busyHourPercent.toString());
    url.searchParams.set('weekendRatio', subParams.weekendRatio.toString());
  } else if (calculatorType === 'voip-subscriber') {
    const voipInput = input as VoipCalculatorInput;
    const voipParams = params as VoipCalculatorParams;
    
    url.searchParams.set('subscribers', voipInput.subscriberCount.toString());
    url.searchParams.set('avgCalls', voipParams.avgCallsPerMonth.toString());
    url.searchParams.set('avgCallDuration', voipParams.avgCallDuration.toString());
    url.searchParams.set('sipInterval', voipParams.sipRegistrationInterval.toString());
    url.searchParams.set('sipOnline', voipParams.sipDevicesOnlinePercent.toString());
    url.searchParams.set('busyHour', voipParams.busyHourPercent.toString());
    url.searchParams.set('weekendRatio', voipParams.weekendRatio.toString());
  } else {
    const ccInput = input as ConcurrentCallsCalculatorInput;
    const ccParams = params as ConcurrentCallsCalculatorParams;
    
    url.searchParams.set('cc', ccInput.concurrentCalls.toString());
    url.searchParams.set('aloc', ccParams.avgCallLength.toString());
    url.searchParams.set('asr', ccParams.avgSuccessRate.toString());
    url.searchParams.set('auth', ccParams.callAuthorizationEnabled.toString());
    url.searchParams.set('start', ccParams.callStartEventEnabled.toString());
    url.searchParams.set('busyHour', ccParams.busyHourPercent.toString());
    url.searchParams.set('weekendRatio', ccParams.weekendRatio.toString());
  }
  
  return url.toString();
}

export function parseShareUrl(url: string): {
  calculatorType?: CalculatorType;
  subscriberInput?: Partial<SubscriberCalculatorInput>;
  subscriberParams?: Partial<SubscriberCalculatorParams>;
  voipInput?: Partial<VoipCalculatorInput>;
  voipParams?: Partial<VoipCalculatorParams>;
  concurrentCallsInput?: Partial<ConcurrentCallsCalculatorInput>;
  concurrentCallsParams?: Partial<ConcurrentCallsCalculatorParams>;
} {
  const params = new URL(url).searchParams;
  const calculatorType = params.get('calc') as CalculatorType | null;
  
  if (!calculatorType) {
    return {};
  }
  
  if (calculatorType === 'subscriber') {
    return {
      calculatorType,
      subscriberInput: {
        subscriberCount: params.has('subscribers') ? Number(params.get('subscribers')) : undefined,
      },
      subscriberParams: {
        voiceEnabled: params.has('voice') ? params.get('voice') === 'true' : undefined,
        smsEnabled: params.has('sms') ? params.get('sms') === 'true' : undefined,
        dataEnabled: params.has('data') ? params.get('data') === 'true' : undefined,
        avgCallsPerMonth: params.has('avgCalls') ? Number(params.get('avgCalls')) : undefined,
        avgCallDuration: params.has('avgCallDuration') ? Number(params.get('avgCallDuration')) : undefined,
        avgSmsPerMonth: params.has('avgSms') ? Number(params.get('avgSms')) : undefined,
        dataQuotaUpdateInterval: params.has('dataQuota') ? Number(params.get('dataQuota')) : undefined,
        activeDataSessionsPercent: params.has('activeData') ? Number(params.get('activeData')) : undefined,
        busyHourPercent: params.has('busyHour') ? Number(params.get('busyHour')) : undefined,
        weekendRatio: params.has('weekendRatio') ? Number(params.get('weekendRatio')) : undefined,
      },
    };
  } else if (calculatorType === 'voip-subscriber') {
    return {
      calculatorType,
      voipInput: {
        subscriberCount: params.has('subscribers') ? Number(params.get('subscribers')) : undefined,
      },
      voipParams: {
        avgCallsPerMonth: params.has('avgCalls') ? Number(params.get('avgCalls')) : undefined,
        avgCallDuration: params.has('avgCallDuration') ? Number(params.get('avgCallDuration')) : undefined,
        sipRegistrationInterval: params.has('sipInterval') ? Number(params.get('sipInterval')) : undefined,
        sipDevicesOnlinePercent: params.has('sipOnline') ? Number(params.get('sipOnline')) : undefined,
        busyHourPercent: params.has('busyHour') ? Number(params.get('busyHour')) : undefined,
        weekendRatio: params.has('weekendRatio') ? Number(params.get('weekendRatio')) : undefined,
      },
    };
  } else {
    return {
      calculatorType,
      concurrentCallsInput: {
        concurrentCalls: params.has('cc') ? Number(params.get('cc')) : undefined,
      },
      concurrentCallsParams: {
        avgCallLength: params.has('aloc') ? Number(params.get('aloc')) : undefined,
        avgSuccessRate: params.has('asr') ? Number(params.get('asr')) : undefined,
        callAuthorizationEnabled: params.has('auth') ? params.get('auth') === 'true' : undefined,
        callStartEventEnabled: params.has('start') ? params.get('start') === 'true' : undefined,
        busyHourPercent: params.has('busyHour') ? Number(params.get('busyHour')) : undefined,
        weekendRatio: params.has('weekendRatio') ? Number(params.get('weekendRatio')) : undefined,
      },
    };
  }
}