import React from 'react';
import { Link } from 'react-router-dom';
import { trackCalculatorUsage } from '../utils/gtm';

const LandingPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Telecom Calculator
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl mb-8 text-blue-100">
            Convert requirements from the business side (e.g. desired number of subscribers) to
            to technical parameters for your telecom infrastructure and the billing system,
            such as the number of chargingtransactions per second (TPS) or concurrent calls.
          </h2>
          <p className="text-lg mb-10 max-w-3xl mx-auto text-blue-50">
            Free tools for telecom engineers and project managers to calculate OCS transaction load, 
            required call capacity, etc. Get accurate calculations in seconds adjustment
            align your business goals with technical requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/calculators"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-200"
            >
              Start Calculating
            </Link>
            <a
              href="#about"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200 border border-blue-500"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Calculator Selection Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Calculator</h2>
            <p className="text-lg text-gray-600">
              Select the calculator that matches your input data and requirements
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* MVNO/MNO Calculator Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">📱</span>
                <h3 className="text-xl font-semibold">MVNO/MNO: Transaction Load by Subscribers</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Calculate transaction load on OCS for a mobile network operator or MVNO.
                Includes voice, SMS, and data services.
              </p>
              
              <div className="space-y-3 mb-6">
                <div>
                  <h4 className="font-semibold mb-1 text-sm">You provide:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Number of subscribers</li>
                    <li>• Service types (voice, SMS, data)</li>
                    <li>• Usage patterns</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-sm">You get:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Charging requests per Voice/SMS/Data</li>
                    <li>• BHCA (busy hour call attempts) and maximum connected calls during the busy hour</li>
                    <li>• Active data sessions</li>
                    <li>• Total charging requests the OCS has to handle</li>
                  </ul>
                </div>
              </div>
              
              <Link
                to="/calculators/subscriber"
                onClick={() => trackCalculatorUsage('mvno_mno', 'landing_page_click')}
                className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 text-sm"
              >
                MVNO/MNO Calculator
              </Link>
            </div>

            {/* VoIP Calculator Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">🎙️</span>
                <h3 className="text-xl font-semibold">VoIP Operator: Billing Load by Subscribers</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Calculate transaction load on the real-time billing system for VoIP operators.
                Includes voice calls and SIP registrations.
              </p>
              
              <div className="space-y-3 mb-6">
                <div>
                  <h4 className="font-semibold mb-1 text-sm">You provide:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Number of subscribers</li>
                    <li>• Voice call patterns (e.g. call duration, success rate, distribution by day of the week, etc.)</li>
                    <li>• Average frequency of SIP registrations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-sm">You get:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Voice/SIP transactions-per-second breakdown</li>
                    <li>• Concurrent calls capacity</li>
                    <li>• Total charging requests that your VoIP billing system has to handle</li>
                  </ul>
                </div>
              </div>
              
              <Link
                to="/calculators/voip-subscriber"
                onClick={() => trackCalculatorUsage('voip', 'landing_page_click')}
                className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 text-sm"
              >
                VoIP Calculator
              </Link>
            </div>

            {/* Concurrent Calls Calculator Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">📞</span>
                <h3 className="text-xl font-semibold">Transaction Load and Concurrent Calls</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Calculate the VoIP billing system load based on the projected maximum number
                of connected calls (or do a reverse calculation).
              </p>
              
              <div className="space-y-3 mb-6">
                <div>
                  <h4 className="font-semibold mb-1 text-sm">You provide:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Number of concurrent calls</li>
                    <li>• Average call duration</li>
                    <li>• Success rate percentage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-sm">You get:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Charging requests per second</li>
                    <li>• Authorization load impact</li>
                    <li>• Event reporting load</li>
                    <li>• Total system throughput</li>
                  </ul>
                </div>
              </div>
              
              <Link
                to="/calculators/concurrent-calls"
                onClick={() => trackCalculatorUsage('concurrent_calls', 'landing_page_click')}
                className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 text-sm"
              >
                Concurrent Calls Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Use Telecom Calculator?</h2>
            <p className="text-lg text-gray-600">Trusted by telecom professionals worldwide</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600">
                Get accurate calculations in seconds, not hours of manual work
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
              <p className="text-gray-600">
                Share results with your team via URL. Everyone sees the same data
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2">Industry Proven</h3>
              <p className="text-gray-600">
                Based on real-world telecom formulas and industry best practices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">About Telecom Calculator</h2>
            <p className="text-lg text-gray-600">Professional telecom capacity planning made simple</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-8 text-gray-700">
              Telecom Calculator helps project managers and engineers convert business requirements into 
              technical specifications. Whether you're planning network capacity, preparing vendor proposals, 
              or sizing telecom systems, our calculators provide accurate, industry-standard calculations.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-3">For Project Managers</h3>
                <p className="text-gray-600">
                  Convert subscriber targets into technical requirements. Get the TPS, concurrent call capacity, 
                  and system specifications needed for vendor discussions and implementation planning.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-3">For Pre-Sales Engineers</h3>
                <p className="text-gray-600">
                  Transform customer requirements into precise technical parameters. Share calculations with 
                  customers to validate assumptions and demonstrate system capacity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">What is TPS and why is it important?</h3>
              <p className="text-gray-600">
                Transactions Per Second (TPS) measures how many charging or authorization requests your 
                system must handle. It's crucial for determining server capacity and system architecture requirements.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">How accurate are these calculations?</h3>
              <p className="text-gray-600">
                Our formulas are based on industry-standard telecom engineering practices. Results provide 
                reliable estimates for capacity planning, though actual values may vary based on specific 
                implementation details.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Can I customize the calculation parameters?</h3>
              <p className="text-gray-600">
                Yes! Each calculator includes adjustment parameters with industry-standard defaults. You can 
                modify values like call duration, success rates, and usage patterns to match your specific scenario.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Is the tool free to use?</h3>
              <p className="text-gray-600">
                Absolutely! Telecom Calculator is completely free for all users. No registration required, 
                no usage limits.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;