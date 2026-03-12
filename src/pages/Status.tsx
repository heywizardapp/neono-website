import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, AlertCircle, Clock, RefreshCw } from 'lucide-react';

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  latency?: number;
  lastChecked: string;
}

const services: ServiceStatus[] = [
  { name: 'Web Application', status: 'operational', latency: 45, lastChecked: new Date().toISOString() },
  { name: 'Booking API', status: 'operational', latency: 62, lastChecked: new Date().toISOString() },
  { name: 'Payment Processing', status: 'operational', latency: 89, lastChecked: new Date().toISOString() },
  { name: 'SMS Notifications', status: 'operational', latency: 124, lastChecked: new Date().toISOString() },
  { name: 'Email Service', status: 'operational', latency: 156, lastChecked: new Date().toISOString() },
  { name: 'Calendar Sync', status: 'operational', latency: 78, lastChecked: new Date().toISOString() },
  { name: 'Analytics Dashboard', status: 'operational', latency: 95, lastChecked: new Date().toISOString() },
  { name: 'Mobile API', status: 'operational', latency: 53, lastChecked: new Date().toISOString() },
];

const StatusIcon = ({ status }: { status: ServiceStatus['status'] }) => {
  switch (status) {
    case 'operational':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'degraded':
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    case 'outage':
      return <AlertCircle className="w-5 h-5 text-red-500" />;
  }
};

const StatusBadge = ({ status }: { status: ServiceStatus['status'] }) => {
  const colors = {
    operational: 'bg-green-100 text-green-800',
    degraded: 'bg-yellow-100 text-yellow-800',
    outage: 'bg-red-100 text-red-800',
  };
  
  const labels = {
    operational: 'Operational',
    degraded: 'Degraded',
    outage: 'Outage',
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}>
      {labels[status]}
    </span>
  );
};

export default function Status() {
  const [lastRefresh, setLastRefresh] = React.useState(new Date());
  const allOperational = services.every(s => s.status === 'operational');

  const handleRefresh = () => {
    setLastRefresh(new Date());
  };

  return (
    <>
      <Helmet>
        <title>System Status - NeonO</title>
        <meta 
          name="description" 
          content="Check the current operational status of NeonO services. Real-time monitoring of all platform components." 
        />
      </Helmet>

      {/* Hero */}
      <section className={`py-16 ${allOperational ? 'bg-green-50' : 'bg-yellow-50'}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            {allOperational ? (
              <CheckCircle className="w-12 h-12 text-green-500" />
            ) : (
              <AlertCircle className="w-12 h-12 text-yellow-500" />
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[hsl(215,85%,8%)]">
            {allOperational ? 'All Systems Operational' : 'Some Systems Degraded'}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {allOperational 
              ? 'All NeonO services are running normally.' 
              : 'We are aware of issues and working to resolve them.'}
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
            <button 
              onClick={handleRefresh}
              className="ml-2 p-1 hover:bg-white/50 rounded transition"
              aria-label="Refresh status"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-[hsl(215,85%,8%)]">
            Service Status
          </h2>
          
          <div className="space-y-4">
            {services.map((service) => (
              <div 
                key={service.name}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <StatusIcon status={service.status} />
                  <span className="font-medium">{service.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  {service.latency && (
                    <span className="text-sm text-gray-500">
                      {service.latency}ms
                    </span>
                  )}
                  <StatusBadge status={service.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Uptime History */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-[hsl(215,85%,8%)]">
            90-Day Uptime
          </h2>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Overall Platform Uptime</span>
              <span className="text-2xl font-bold text-green-600">99.98%</span>
            </div>
            
            {/* Visual uptime bar */}
            <div className="flex gap-0.5">
              {Array.from({ length: 90 }).map((_, i) => (
                <div 
                  key={i}
                  className="flex-1 h-8 bg-green-500 rounded-sm first:rounded-l last:rounded-r"
                  title={`Day ${90 - i}: Operational`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>90 days ago</span>
              <span>Today</span>
            </div>
          </div>
        </div>
      </section>

      {/* Incident History */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-[hsl(215,85%,8%)]">
            Recent Incidents
          </h2>
          
          <div className="text-center py-12 text-gray-500">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
            <p className="text-lg">No incidents reported in the last 90 days</p>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-[hsl(215,85%,8%)]">
            Get Status Updates
          </h2>
          <p className="text-gray-600 mb-6">
            Subscribe to receive notifications when there are incidents or maintenance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[hsl(240,89%,73%)] focus:border-transparent outline-none"
            />
            <button className="px-6 py-3 bg-[hsl(240,89%,73%)] text-white rounded-lg font-semibold hover:opacity-90 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
