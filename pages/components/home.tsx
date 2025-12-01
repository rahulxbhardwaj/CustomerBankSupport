import Link from "next/link";
import Image from "next/image";

export default function Homee() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 shadow-sm bg-white/70 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-blue-800">
          Bhardwaj<span className="text-blue-500">Bank</span>
        </h1>
        <div className="space-x-6 text-gray-600 font-medium">
          <Link href="#features" className="hover:text-blue-700">Features</Link>
          <Link href="#rates" className="hover:text-blue-700">Rates</Link>
          <Link href="#about" className="hover:text-blue-700">About</Link>
          <Link href="components/loginform" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between flex-grow px-8 md:px-20 py-10">
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            The Future of <span className="text-blue-600">AI-Powered Banking</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-lg">
            Smart. Secure. Seamless. Manage your money effortlessly with BhardwajBank - India&apos;s first AI-driven banking experience.
          </p>
          <div className="space-x-4">
            <Link
              href="/components/registerform"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              href="/learn-more"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative h-96">
          <Image
            src="https://s6.imgcdn.dev/YPlYMl.png"
            alt="AI Bank"
            width={384}
            height={384}
            className="drop-shadow-lg"
            unoptimized
            priority
          />
        </div>
      </section>

      {/* Rates Section */}
      <section id="rates" className="bg-white py-16 shadow-inner">
        <h3 className="text-center text-3xl font-bold text-gray-800 mb-10">Our Latest Deposit Rates</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { term: '7 Days', rate: '2.9%' },
            { term: '1 Month', rate: '3.1%' },
            { term: '3 Months', rate: '3.5%' },
            { term: '6 Months', rate: '4.0%' },
            { term: '1 Year+', rate: '5.5%' },
          ].map(({ term, rate }) => (
            <div
              key={term}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-6 w-44 text-center hover:shadow-md transition"
            >
              <p className="text-gray-600">{term}</p>
              <p className="text-2xl font-bold text-blue-700">{rate}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-gray-300 text-center py-6 mt-auto">
        <p className="text-sm">&copy; {new Date().getFullYear()} BhardwajBank. All rights reserved.</p>
        <p className="text-xs mt-1">AI-Powered Banking - Secure - Reliable - Fast</p>
      </footer>
    </div>
  );
}
