import React from 'react';

// 1. Updated data structure to include the link/redirect destination
const servicesData = [
  { name: 'Account Statement (PDF)', link: '/api/accountStatement/accountpdf' },
  { name: 'Offers', link: '/components/offers/offer' },
  { name: 'Equalisation Levy/ STT/ CTT', link: '/equalisation-levy' },
  { name: 'Fee/ Other Payments', link: '/other-payments' },
  { name: '26 QB (TDS on Sale of Property)', link: '/tds-on-property-26qb' },
  { name: 'Demand Payment for TDS on Property', link: '/tds-demand-payment' },
];

// 2. Reusable Service Link Component (using <a> tag)
const ServiceLink: React.FC<{ serviceName: string, serviceLink: string }> = ({ serviceName, serviceLink }) => {
  return (
    // Change <button> to <a> tag and add the href attribute
    <a
      href={serviceLink} // This is the redirect URL
      className="
        w-full h-auto min-h-[6rem] p-4 bg-white border border-gray-200 
        text-left text-base font-medium text-gray-800 rounded-lg shadow-sm 
        hover:shadow-md transition-shadow relative overflow-hidden group 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        block cursor-pointer // Added 'block' and 'cursor-pointer' for proper link behavior
      "
      // Optional: Add target="_blank" to open in a new tab if needed
      // target="_blank" 
      rel="noopener noreferrer"
    >
      <span className="relative z-10 block pr-6">
        {serviceName}
      </span>

      {/* Blue line for styling (remains the same) */}
      <div 
        className="
          absolute inset-x-0 bottom-0 h-1 bg-blue-600 
          transition-transform duration-300 transform translate-y-full 
          group-hover:translate-y-0
        "
      ></div>
    </a>
  );
};

// Main Services Component
export default function Services() {
  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Banking Services</h1>
        <p className="text-md text-gray-500 mt-1">Select a service to proceed with your payment or transaction.</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 3. Map over the new data and pass the link */}
        {servicesData.map((service, index) => (
          <ServiceLink 
            key={index} 
            serviceName={service.name} 
            serviceLink={service.link} // Passed the link here
          />
        ))}
      </div>
    </div>
  );
}