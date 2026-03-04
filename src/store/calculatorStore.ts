import { create } from 'zustand';
import type { 
  SubscriberCalculatorInput, 
  SubscriberCalculatorParams, 
  ConcurrentCallsCalculatorInput, 
  ConcurrentCallsCalculatorParams,
  ConcurrentCallsCalculatorReverseInput,
  VoipCalculatorInput,
  VoipCalculatorParams
} from '../types/calculator';

interface CalculatorStore {
  subscriberInput: SubscriberCalculatorInput;
  subscriberParams: SubscriberCalculatorParams;
  voipInput: VoipCalculatorInput;
  voipParams: VoipCalculatorParams;
  concurrentCallsInput: ConcurrentCallsCalculatorInput;
  concurrentCallsParams: ConcurrentCallsCalculatorParams;
  concurrentCallsReverseInput: ConcurrentCallsCalculatorReverseInput;
  concurrentCallsReverseMode: boolean;
  
  setSubscriberInput: (input: Partial<SubscriberCalculatorInput>) => void;
  setSubscriberParams: (params: Partial<SubscriberCalculatorParams>) => void;
  setVoipInput: (input: Partial<VoipCalculatorInput>) => void;
  setVoipParams: (params: Partial<VoipCalculatorParams>) => void;
  setConcurrentCallsInput: (input: Partial<ConcurrentCallsCalculatorInput>) => void;
  setConcurrentCallsParams: (params: Partial<ConcurrentCallsCalculatorParams>) => void;
  setConcurrentCallsReverseInput: (input: Partial<ConcurrentCallsCalculatorReverseInput>) => void;
  setConcurrentCallsReverseMode: (reverse: boolean) => void;
}

const useCalculatorStore = create<CalculatorStore>((set) => ({
  subscriberInput: {
    subscriberCount: 1000000,
  },
  subscriberParams: {
    voiceEnabled: true,
    smsEnabled: true,
    dataEnabled: true,
    avgCallsPerMonth: 200,
    avgCallDuration: 180,
    avgSmsPerMonth: 300,
    dataQuotaUpdateInterval: 600,
    activeDataSessionsPercent: 20,
    busyHourPercent: 10,
    weekendRatio: 0.8,
  },
  voipInput: {
    subscriberCount: 100000,
  },
  voipParams: {
    avgCallsPerMonth: 300,
    avgCallDuration: 180,
    sipRegistrationInterval: 300,
    sipDevicesOnlinePercent: 15,
    busyHourPercent: 10,
    weekendRatio: 0.8,
  },
  concurrentCallsInput: {
    concurrentCalls: 1000,
  },
  concurrentCallsParams: {
    avgCallLength: 180,
    avgSuccessRate: 50,
    callAuthorizationEnabled: true,
    callStartEventEnabled: false,
    busyHourPercent: 10,
    weekendRatio: 0.8,
  },
  concurrentCallsReverseInput: {
    chargingRequestsPerSecond: 8.3,
  },
  concurrentCallsReverseMode: false,
  
  setSubscriberInput: (input) => set((state) => ({
    subscriberInput: { ...state.subscriberInput, ...input }
  })),
  
  setSubscriberParams: (params) => set((state) => ({
    subscriberParams: { ...state.subscriberParams, ...params }
  })),
  
  setVoipInput: (input) => set((state) => ({
    voipInput: { ...state.voipInput, ...input }
  })),
  
  setVoipParams: (params) => set((state) => ({
    voipParams: { ...state.voipParams, ...params }
  })),
  
  setConcurrentCallsInput: (input) => set((state) => ({
    concurrentCallsInput: { ...state.concurrentCallsInput, ...input }
  })),
  
  setConcurrentCallsParams: (params) => set((state) => ({
    concurrentCallsParams: { ...state.concurrentCallsParams, ...params }
  })),
  
  setConcurrentCallsReverseInput: (input) => set((state) => ({
    concurrentCallsReverseInput: { ...state.concurrentCallsReverseInput, ...input }
  })),
  
  setConcurrentCallsReverseMode: (reverse) => set(() => ({
    concurrentCallsReverseMode: reverse
  })),
}));

export default useCalculatorStore;