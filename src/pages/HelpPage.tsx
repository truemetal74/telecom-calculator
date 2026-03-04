import React from 'react';

const HelpPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Help & Documentation</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <p className="text-gray-700 mb-4">
          Telecom Calculator provides two main calculators to help you determine system capacity requirements:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Choose the calculator that matches your input data</li>
          <li>Enter your main parameters (subscribers or concurrent calls)</li>
          <li>Adjust optional parameters if needed</li>
          <li>View your results in real-time</li>
          <li>Share results with your team using the share button</li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Formula Explanations</h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Subscriber-Based Calculations</h3>
          <p className="text-gray-700 mb-2">The subscriber calculator uses the following formulas:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Total monthly transactions = subscribers × (calls + SMS)</li>
            <li>Average day factor = (20 + 10 × weekend ratio) / 30</li>
            <li>Busy hour load = daily load × busy hour percentage</li>
            <li>TPS = (voice/SMS per second) + (data sessions / quota interval)</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Concurrent Calls Calculations</h3>
          <p className="text-gray-700 mb-2">The concurrent calls calculator uses:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Base CPS = (concurrent calls / call length) × (1 + failure rate)</li>
            <li>Total CPS = base CPS × number of charging events</li>
            <li>Additional load from authorization and start events</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Common Use Cases</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Network Expansion Planning</h3>
            <p className="text-gray-700">
              Use the subscriber calculator to determine infrastructure requirements for expanding 
              your network to support additional subscribers.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Real-Time Capacity Assessment</h3>
            <p className="text-gray-700">
              Use the concurrent calls calculator to assess whether your current infrastructure 
              can handle peak call volumes.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Vendor Proposal Preparation</h3>
            <p className="text-gray-700">
              Generate technical specifications from business requirements to create accurate 
              vendor RFPs and proposals.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;