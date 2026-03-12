import * as React from 'react';

interface MockupProps {
  variant: string;
  className?: string;
}

// Base mockup container
const MockupContainer = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative w-full h-full min-h-[300px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden ${className}`}>
    {/* Browser chrome */}
    <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
      </div>
      <div className="flex-1 mx-4">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md max-w-xs" />
      </div>
    </div>
    <div className="p-4 h-[calc(100%-52px)] overflow-hidden">
      {children}
    </div>
  </div>
);

// Calendar/Appointments Mockup
const CalendarMockup = () => (
  <MockupContainer>
    <div className="flex h-full gap-4">
      {/* Sidebar */}
      <div className="w-48 flex-shrink-0 space-y-4">
        <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">N</div>
          <div className="flex-1">
            <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded w-20" />
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-16 mt-1" />
          </div>
        </div>
        <div className="space-y-2">
          {['Calendar', 'Clients', 'Services', 'Staff'].map((item, i) => (
            <div key={item} className={`flex items-center gap-2 p-2 rounded-lg ${i === 0 ? 'bg-primary/10 text-primary' : ''}`}>
              <div className={`w-5 h-5 rounded ${i === 0 ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`} />
              <span className="text-xs font-medium">{item}</span>
            </div>
          ))}
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <div className="text-xs font-medium mb-2">Quick Stats</div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Today</span>
              <span className="font-bold text-primary">12 appts</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Revenue</span>
              <span className="font-bold text-green-600">$1,847</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main calendar area */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-slate-100 rounded">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span className="font-semibold text-sm">December 2024</span>
            <button className="p-1.5 hover:bg-slate-100 rounded">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs bg-primary text-white rounded-lg">+ New Booking</button>
          </div>
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-5 gap-1 flex-1">
          {/* Time column */}
          <div className="space-y-0">
            {['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM'].map(time => (
              <div key={time} className="h-12 flex items-start justify-end pr-2 text-[10px] text-slate-400">{time}</div>
            ))}
          </div>
          {/* Staff columns */}
          {['Sarah M.', 'Mike J.', 'Emma C.', 'Alex K.'].map((staff, staffIdx) => (
            <div key={staff} className="space-y-0 border-l border-slate-100 dark:border-slate-800">
              <div className="h-6 flex items-center justify-center text-[10px] font-medium bg-slate-50 dark:bg-slate-800 border-b">{staff}</div>
              {[0, 1, 2, 3, 4, 5].map(slot => {
                const hasAppt = (staffIdx === 0 && slot === 1) || (staffIdx === 1 && slot === 0) || (staffIdx === 2 && slot === 3) || (staffIdx === 3 && slot === 2);
                const colors = ['bg-primary/20 border-primary', 'bg-accent/20 border-accent', 'bg-green-100 border-green-500', 'bg-purple-100 border-purple-500'];
                return (
                  <div key={slot} className="h-12 border-b border-slate-50 dark:border-slate-800 p-0.5">
                    {hasAppt && (
                      <div className={`h-full rounded text-[8px] p-1 border-l-2 ${colors[staffIdx]}`}>
                        <div className="font-medium truncate">Client Name</div>
                        <div className="text-slate-500 truncate">Haircut & Style</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  </MockupContainer>
);

// POS Checkout Mockup
const POSMockup = () => (
  <MockupContainer>
    <div className="flex h-full gap-4">
      {/* Left - Cart */}
      <div className="flex-1 space-y-3">
        <div className="text-sm font-semibold">Current Sale</div>
        <div className="space-y-2">
          {[
            { name: 'Haircut & Style', staff: 'Sarah M.', price: 85 },
            { name: 'Deep Conditioning', staff: 'Sarah M.', price: 35 },
            { name: 'Olaplex Treatment', staff: 'Sarah M.', price: 45 },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div>
                <div className="text-xs font-medium">{item.name}</div>
                <div className="text-[10px] text-slate-500">{item.staff}</div>
              </div>
              <div className="text-sm font-bold">${item.price}</div>
            </div>
          ))}
        </div>
        <div className="border-t pt-3 space-y-2">
          <div className="flex justify-between text-xs"><span>Subtotal</span><span>$165.00</span></div>
          <div className="flex justify-between text-xs"><span>Tax (13%)</span><span>$21.45</span></div>
          <div className="flex justify-between text-sm font-bold"><span>Total</span><span className="text-primary">$186.45</span></div>
        </div>
      </div>
      
      {/* Right - Payment */}
      <div className="w-56 space-y-3">
        <div className="text-sm font-semibold">Payment</div>
        <div className="grid grid-cols-2 gap-2">
          {['Card', 'Cash', 'Gift Card', 'Split'].map(method => (
            <button key={method} className={`p-3 rounded-lg border text-xs font-medium ${method === 'Card' ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-slate-800 border-slate-200'}`}>
              {method}
            </button>
          ))}
        </div>
        <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border border-primary/20">
          <div className="text-[10px] text-slate-500 mb-1">Add Tip</div>
          <div className="grid grid-cols-4 gap-1">
            {['15%', '18%', '20%', '25%'].map(tip => (
              <button key={tip} className={`py-2 rounded text-[10px] font-medium ${tip === '20%' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-700'}`}>{tip}</button>
            ))}
          </div>
          <div className="mt-2 text-center">
            <span className="text-lg font-bold text-primary">$37.29</span>
            <span className="text-[10px] text-slate-500 ml-1">tip</span>
          </div>
        </div>
        <button className="w-full py-3 bg-green-500 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          Charge $223.74
        </button>
      </div>
    </div>
  </MockupContainer>
);

// Marketing Dashboard Mockup
const MarketingMockup = () => (
  <MockupContainer>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Marketing Campaigns</div>
        <button className="px-3 py-1.5 text-xs bg-primary text-white rounded-lg">+ New Campaign</button>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Sent This Month', value: '2,847', change: '+12%', color: 'text-primary' },
          { label: 'Open Rate', value: '68%', change: '+5%', color: 'text-green-600' },
          { label: 'Bookings Generated', value: '156', change: '+23%', color: 'text-accent' },
        ].map(stat => (
          <div key={stat.label} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="text-[10px] text-slate-500">{stat.label}</div>
            <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-[10px] text-green-600">{stat.change}</div>
          </div>
        ))}
      </div>
      
      <div className="space-y-2">
        <div className="text-xs font-medium">Active Campaigns</div>
        {[
          { name: 'Birthday Special - 20% Off', status: 'Active', sent: 234, opens: '72%', type: 'Auto' },
          { name: 'Win-Back: 30 Days Inactive', status: 'Active', sent: 89, opens: '45%', type: 'Auto' },
          { name: 'Holiday Promo - Gift Cards', status: 'Scheduled', sent: 0, opens: '-', type: 'Manual' },
        ].map((campaign, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${campaign.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <div>
                <div className="text-xs font-medium">{campaign.name}</div>
                <div className="text-[10px] text-slate-500">{campaign.type} • {campaign.sent} sent</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-primary">{campaign.opens}</div>
              <div className="text-[10px] text-slate-500">open rate</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </MockupContainer>
);

// Staff Dashboard Mockup
const StaffMockup = () => (
  <MockupContainer>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Team Performance</div>
        <select className="text-xs border rounded-lg px-2 py-1 bg-white dark:bg-slate-800">
          <option>This Month</option>
        </select>
      </div>
      
      <div className="space-y-2">
        {[
          { name: 'Sarah Martinez', role: 'Senior Stylist', revenue: 12450, clients: 89, rating: 4.9, avatar: 'SM' },
          { name: 'Mike Johnson', role: 'Barber', revenue: 9820, clients: 124, rating: 4.8, avatar: 'MJ' },
          { name: 'Emma Chen', role: 'Colorist', revenue: 8940, clients: 45, rating: 5.0, avatar: 'EC' },
          { name: 'Alex Kim', role: 'Stylist', revenue: 7230, clients: 67, rating: 4.7, avatar: 'AK' },
        ].map((staff, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
              {staff.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium">{staff.name}</span>
                {i === 0 && <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-[8px] rounded-full">Top Performer</span>}
              </div>
              <div className="text-[10px] text-slate-500">{staff.role}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-green-600">${staff.revenue.toLocaleString()}</div>
              <div className="text-[10px] text-slate-500">{staff.clients} clients • ⭐ {staff.rating}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-primary/10 rounded-lg">
          <div className="text-[10px] text-slate-500">Total Commissions</div>
          <div className="text-lg font-bold text-primary">$8,234</div>
        </div>
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-[10px] text-slate-500">Avg Rating</div>
          <div className="text-lg font-bold text-green-600">4.85 ⭐</div>
        </div>
      </div>
    </div>
  </MockupContainer>
);

// Analytics Dashboard Mockup
const AnalyticsMockup = () => (
  <MockupContainer>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Business Analytics</div>
        <div className="flex gap-2">
          {['7D', '30D', '90D', 'YTD'].map(period => (
            <button key={period} className={`px-2 py-1 text-[10px] rounded ${period === '30D' ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>{period}</button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Revenue', value: '$47,892', change: '+18%' },
          { label: 'Appointments', value: '1,247', change: '+12%' },
          { label: 'New Clients', value: '89', change: '+34%' },
          { label: 'Retention', value: '87%', change: '+5%' },
        ].map(stat => (
          <div key={stat.label} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="text-[10px] text-slate-500">{stat.label}</div>
            <div className="text-lg font-bold">{stat.value}</div>
            <div className="text-[10px] text-green-600">{stat.change}</div>
          </div>
        ))}
      </div>
      
      {/* Chart area */}
      <div className="h-32 bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
        <div className="text-[10px] font-medium mb-2">Revenue Trend</div>
        <div className="flex items-end h-20 gap-1">
          {[40, 55, 45, 60, 75, 65, 80, 70, 85, 90, 78, 95].map((h, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t opacity-80" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border">
          <div className="text-[10px] font-medium mb-2">Top Services</div>
          {['Haircut & Style', 'Color Service', 'Blowout'].map((service, i) => (
            <div key={i} className="flex justify-between text-[10px] py-1">
              <span>{service}</span>
              <span className="font-medium">${[12450, 8920, 5640][i]}</span>
            </div>
          ))}
        </div>
        <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border">
          <div className="text-[10px] font-medium mb-2">Busy Hours</div>
          <div className="flex items-end h-12 gap-0.5">
            {[20, 40, 60, 90, 100, 85, 70, 55, 40].map((h, i) => (
              <div key={i} className="flex-1 bg-accent/60 rounded-t" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex justify-between text-[8px] text-slate-400 mt-1">
            <span>9am</span><span>1pm</span><span>5pm</span>
          </div>
        </div>
      </div>
    </div>
  </MockupContainer>
);

// Online Booking Mockup
const BookingMockup = () => (
  <MockupContainer>
    <div className="max-w-md mx-auto space-y-4">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mx-auto flex items-center justify-center text-white text-xl font-bold mb-2">S</div>
        <div className="text-sm font-semibold">Studio Luxe</div>
        <div className="text-[10px] text-slate-500">Hair Salon & Spa</div>
        <div className="flex items-center justify-center gap-1 mt-1">
          <span className="text-yellow-500">★★★★★</span>
          <span className="text-[10px] text-slate-500">4.9 (247 reviews)</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-xs font-medium">Select Service</div>
        {[
          { name: 'Haircut & Blowout', duration: '60 min', price: 85 },
          { name: 'Color & Highlights', duration: '120 min', price: 175 },
          { name: 'Balayage', duration: '180 min', price: 250 },
        ].map((service, i) => (
          <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${i === 0 ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700'}`}>
            <div>
              <div className="text-xs font-medium">{service.name}</div>
              <div className="text-[10px] text-slate-500">{service.duration}</div>
            </div>
            <div className="text-sm font-bold text-primary">${service.price}</div>
          </div>
        ))}
      </div>
      
      <div className="space-y-2">
        <div className="text-xs font-medium">Available Times - Dec 15</div>
        <div className="grid grid-cols-4 gap-2">
          {['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '3:00 PM', '4:30 PM'].map((time, i) => (
            <button key={i} className={`py-2 px-1 rounded-lg text-[10px] font-medium ${i === 2 ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>{time}</button>
          ))}
        </div>
      </div>
      
      <button className="w-full py-3 bg-primary text-white rounded-xl font-semibold text-sm">
        Book Now
      </button>
    </div>
  </MockupContainer>
);

// Website Builder Mockup
const WebsiteMockup = () => (
  <MockupContainer>
    <div className="flex h-full gap-3">
      {/* Left panel - Components */}
      <div className="w-40 flex-shrink-0 space-y-2 border-r pr-3">
        <div className="text-[10px] font-medium text-slate-500 uppercase">Components</div>
        {['Hero Section', 'Services', 'Gallery', 'Reviews', 'Contact', 'Booking'].map((comp, i) => (
          <div key={i} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-[10px] cursor-move hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-200 dark:bg-slate-600 rounded" />
            {comp}
          </div>
        ))}
      </div>
      
      {/* Center - Preview */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-lg border overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary to-accent flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-lg font-bold">Studio Luxe</div>
            <div className="text-[10px] opacity-80">Premium Hair & Beauty</div>
          </div>
        </div>
        <div className="p-3 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-lg" />
            ))}
          </div>
          <div className="space-y-1">
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
          </div>
          <button className="w-full py-2 bg-primary text-white rounded text-[10px] font-medium">Book Now</button>
        </div>
      </div>
      
      {/* Right panel - Settings */}
      <div className="w-40 flex-shrink-0 space-y-3 border-l pl-3">
        <div className="text-[10px] font-medium text-slate-500 uppercase">Style</div>
        <div className="space-y-2">
          <div className="text-[10px]">Brand Color</div>
          <div className="flex gap-1">
            {['bg-primary', 'bg-accent', 'bg-pink-500', 'bg-purple-500', 'bg-slate-800'].map((color, i) => (
              <div key={i} className={`w-6 h-6 rounded-full ${color} ${i === 0 ? 'ring-2 ring-offset-2 ring-primary' : ''}`} />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-[10px]">Font</div>
          <select className="w-full text-[10px] border rounded p-1.5 bg-white dark:bg-slate-800">
            <option>Inter</option>
          </select>
        </div>
      </div>
    </div>
  </MockupContainer>
);

// AI Features Mockup
const AIMockup = () => (
  <MockupContainer>
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <div>
          <div className="text-sm font-semibold">AI Assistant</div>
          <div className="text-[10px] text-slate-500">Smart insights & automation</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="text-[10px] text-purple-600 font-medium mb-1">Revenue Forecast</div>
          <div className="text-xl font-bold">$52,340</div>
          <div className="text-[10px] text-slate-500">Next month prediction</div>
          <div className="text-[10px] text-green-600">94% accuracy</div>
        </div>
        <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-[10px] text-blue-600 font-medium mb-1">No-Show Risk</div>
          <div className="text-xl font-bold">3</div>
          <div className="text-[10px] text-slate-500">Appointments flagged</div>
          <div className="text-[10px] text-orange-600">Send reminders →</div>
        </div>
      </div>
      
      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
        <div className="text-[10px] font-medium mb-2">💡 Smart Suggestions</div>
        <div className="space-y-2">
          {[
            'Tuesday 2-4pm has 60% vacancy. Run a flash sale?',
            'Client Sarah is due for a color refresh. Send reminder?',
            'Olaplex is running low. Reorder from supplier?',
          ].map((suggestion, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded border text-[10px]">
              <span>{suggestion}</span>
              <button className="px-2 py-1 bg-primary text-white rounded text-[8px]">Act</button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-medium">AI Auto-Response Active</div>
            <div className="text-[8px] text-slate-500">Handled 23 inquiries today</div>
          </div>
        </div>
      </div>
    </div>
  </MockupContainer>
);

// Inventory Management Mockup
const InventoryMockup = () => (
  <MockupContainer>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Inventory</div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs bg-primary text-white rounded-lg">+ Add Product</button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Products', value: '147', color: 'text-primary' },
          { label: 'Low Stock', value: '8', color: 'text-orange-600' },
          { label: 'Out of Stock', value: '2', color: 'text-red-600' },
        ].map(stat => (
          <div key={stat.label} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="text-[10px] text-slate-500">{stat.label}</div>
            <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>
      
      <div className="space-y-2">
        <div className="text-xs font-medium">Stock Alerts</div>
        {[
          { name: 'Olaplex No. 3', stock: 2, min: 10, status: 'critical' },
          { name: 'Redken Shampoo 1L', stock: 5, min: 8, status: 'low' },
          { name: 'Brazilian Blowout', stock: 3, min: 5, status: 'low' },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${item.status === 'critical' ? 'bg-red-500' : 'bg-orange-500'}`} />
              <div>
                <div className="text-xs font-medium">{item.name}</div>
                <div className="text-[10px] text-slate-500">{item.stock} left (min: {item.min})</div>
              </div>
            </div>
            <button className="px-2 py-1 bg-primary/10 text-primary rounded text-[10px] font-medium">Reorder</button>
          </div>
        ))}
      </div>
    </div>
  </MockupContainer>
);

// Cash Management Mockup
const CashMockup = () => (
  <MockupContainer>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Cash Drawer</div>
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-medium">● Open</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200">
          <div className="text-[10px] text-slate-500">Expected Balance</div>
          <div className="text-2xl font-bold text-green-600">$847.50</div>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
          <div className="text-[10px] text-slate-500">Starting Float</div>
          <div className="text-2xl font-bold">$200.00</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-xs font-medium">Today's Cash Activity</div>
        {[
          { type: 'Sale', time: '2:34 PM', amount: '+$85.00', client: 'Walk-in' },
          { type: 'Sale', time: '1:15 PM', amount: '+$120.00', client: 'Sarah M.' },
          { type: 'Cash Out', time: '12:00 PM', amount: '-$50.00', client: 'Bank deposit' },
          { type: 'Sale', time: '10:45 AM', amount: '+$65.00', client: 'Mike J.' },
        ].map((tx, i) => (
          <div key={i} className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded-lg border text-[10px]">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${tx.amount.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {tx.amount.startsWith('+') ? '↓' : '↑'}
              </div>
              <div>
                <div className="font-medium">{tx.type}</div>
                <div className="text-slate-500">{tx.client}</div>
              </div>
            </div>
            <div className="text-right">
              <div className={`font-bold ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{tx.amount}</div>
              <div className="text-slate-500">{tx.time}</div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl font-semibold text-sm">
        Close Drawer & Reconcile
      </button>
    </div>
  </MockupContainer>
);

// Animated Payment Terminal Mockup with tap-to-pay animation
const TerminalMockup = () => {
  const [paymentState, setPaymentState] = React.useState<'ready' | 'tapping' | 'processing' | 'paid'>('ready');
  
  React.useEffect(() => {
    const runAnimation = () => {
      setPaymentState('ready');
      
      // Start tapping after 1.5s
      const tapTimeout = setTimeout(() => setPaymentState('tapping'), 1500);
      
      // Processing after 2.5s
      const processTimeout = setTimeout(() => setPaymentState('processing'), 2500);
      
      // Paid after 3.5s
      const paidTimeout = setTimeout(() => setPaymentState('paid'), 3500);
      
      // Reset after 6s
      const resetTimeout = setTimeout(() => setPaymentState('ready'), 6000);
      
      return () => {
        clearTimeout(tapTimeout);
        clearTimeout(processTimeout);
        clearTimeout(paidTimeout);
        clearTimeout(resetTimeout);
      };
    };
    
    runAnimation();
    const interval = setInterval(runAnimation, 6500);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <MockupContainer>
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-6 relative">
          {/* Credit Card - Animated */}
          <div 
            className={`absolute z-10 transition-all duration-500 ease-out ${
              paymentState === 'ready' ? 'opacity-100 -top-8 -right-4 rotate-12' :
              paymentState === 'tapping' ? 'opacity-100 top-16 right-8 rotate-0 scale-90' :
              'opacity-0 top-16 right-8 rotate-0 scale-75'
            }`}
          >
            <div className="w-24 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl p-2 relative overflow-hidden">
              {/* Card chip */}
              <div className="w-6 h-4 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-sm absolute left-3 top-4">
                <div className="grid grid-cols-3 gap-px p-0.5 h-full">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-yellow-600/50 rounded-[1px]" />
                  ))}
                </div>
              </div>
              {/* Contactless icon on card */}
              <div className="absolute right-2 top-2">
                <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0" />
                </svg>
              </div>
              {/* Card number hint */}
              <div className="absolute bottom-2 left-3 right-3 flex gap-2">
                <div className="flex gap-0.5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-white/40" />
                  ))}
                </div>
                <div className="text-[6px] text-white/60 font-mono">4242</div>
              </div>
            </div>
          </div>
          
          {/* Terminal Device */}
          <div className="w-48 h-72 mx-auto bg-slate-900 rounded-3xl p-2 shadow-2xl relative">
            <div className="w-full h-full bg-white rounded-2xl overflow-hidden flex flex-col">
              {/* Screen */}
              <div className={`flex-1 p-4 flex flex-col items-center justify-center transition-all duration-300 ${
                paymentState === 'paid' 
                  ? 'bg-gradient-to-b from-green-500 to-green-600' 
                  : 'bg-gradient-to-b from-primary to-accent'
              } text-white relative overflow-hidden`}>
                
                {/* Ripple effect on tap */}
                {paymentState === 'tapping' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-white/20 animate-ping" />
                  </div>
                )}
                
                {paymentState === 'ready' && (
                  <>
                    <div className="text-[10px] opacity-80 mb-1">TOTAL</div>
                    <div className="text-3xl font-bold">$186.45</div>
                    <div className="text-[10px] opacity-80 mt-2">Tap, insert, or swipe</div>
                    <div className="mt-4 w-12 h-12 border-4 border-white/30 rounded-full flex items-center justify-center animate-pulse">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                      </svg>
                    </div>
                  </>
                )}
                
                {paymentState === 'tapping' && (
                  <>
                    <div className="text-[10px] opacity-80 mb-1">READING CARD...</div>
                    <div className="text-3xl font-bold">$186.45</div>
                    <div className="mt-4 w-12 h-12 border-4 border-white rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                      </svg>
                    </div>
                  </>
                )}
                
                {paymentState === 'processing' && (
                  <>
                    <div className="text-[10px] opacity-80 mb-1">PROCESSING</div>
                    <div className="text-3xl font-bold">$186.45</div>
                    <div className="mt-4">
                      <div className="flex gap-1">
                        {[0, 1, 2].map(i => (
                          <div 
                            key={i} 
                            className="w-3 h-3 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {paymentState === 'paid' && (
                  <>
                    <div className="w-16 h-16 border-4 border-white rounded-full flex items-center justify-center mb-2 animate-[scale-in_0.3s_ease-out]">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="text-[10px] opacity-80 mb-1">APPROVED</div>
                    <div className="text-3xl font-bold">$186.45</div>
                    <div className="text-[10px] opacity-80 mt-2 font-medium">PAID ✓</div>
                  </>
                )}
              </div>
              
              {/* Keypad */}
              <div className="p-3 bg-slate-100">
                <div className="grid grid-cols-3 gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, '✓', 0, '←'].map(key => (
                    <div key={key} className="aspect-square bg-white rounded-lg flex items-center justify-center text-sm font-medium shadow-sm">{key}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm font-semibold">Stripe Terminal S700</div>
            <div className="text-[10px] text-slate-500">Accepts tap, chip & swipe</div>
          </div>
        </div>
      </div>
    </MockupContainer>
  );
};

// Tip Splitting Mockup
const TipMockup = () => (
  <MockupContainer>
    <div className="space-y-4">
      <div className="text-sm font-semibold">Tip Distribution</div>
      
      <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200">
        <div className="text-center">
          <div className="text-[10px] text-slate-500">Total Tips Today</div>
          <div className="text-3xl font-bold text-green-600">$487.50</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-xs font-medium">Team Split</div>
        {[
          { name: 'Sarah M.', role: 'Stylist', percent: 70, amount: 341.25 },
          { name: 'Alex K.', role: 'Assistant', percent: 20, amount: 97.50 },
          { name: 'Front Desk', role: 'Support', percent: 10, amount: 48.75 },
        ].map((person, i) => (
          <div key={i} className="p-3 bg-white dark:bg-slate-900 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-xs font-medium">{person.name}</div>
                  <div className="text-[10px] text-slate-500">{person.role}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-green-600">${person.amount.toFixed(2)}</div>
                <div className="text-[10px] text-slate-500">{person.percent}%</div>
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full" style={{ width: `${person.percent}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </MockupContainer>
);

// Reminders/Automation Mockup
const RemindersMockup = () => (
  <MockupContainer>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Automated Reminders</div>
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-medium">Active</span>
      </div>
      
      <div className="space-y-3">
        {[
          { time: '24 hours before', channel: 'SMS + Email', status: 'active', sent: 234 },
          { time: '2 hours before', channel: 'SMS', status: 'active', sent: 189 },
          { time: '30 min before', channel: 'Push', status: 'active', sent: 156 },
        ].map((reminder, i) => (
          <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </div>
                <div>
                  <div className="text-xs font-medium">{reminder.time}</div>
                  <div className="text-[10px] text-slate-500">{reminder.channel}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-medium text-green-600">{reminder.sent} sent</div>
                <div className="text-[10px] text-slate-500">this week</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
            📱
          </div>
          <div className="flex-1">
            <div className="text-xs font-medium mb-1">Preview Message</div>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg text-[10px] text-slate-600 dark:text-slate-400">
              "Hi Sarah! 👋 Reminder: Your haircut with Mike is tomorrow at 2:00 PM. Reply C to confirm or R to reschedule."
            </div>
          </div>
        </div>
      </div>
    </div>
  </MockupContainer>
);

// Reviews Management Mockup
const ReviewsMockup = () => (
  <MockupContainer>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Reviews</div>
        <div className="flex items-center gap-1 text-yellow-500">
          <span>★★★★★</span>
          <span className="text-xs font-bold text-slate-900 dark:text-white">4.9</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
          <div className="text-xl font-bold text-primary">247</div>
          <div className="text-[10px] text-slate-500">Total Reviews</div>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
          <div className="text-xl font-bold text-green-600">89%</div>
          <div className="text-[10px] text-slate-500">Response Rate</div>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
          <div className="text-xl font-bold text-accent">12</div>
          <div className="text-[10px] text-slate-500">This Week</div>
        </div>
      </div>
      
      <div className="space-y-2">
        {[
          { name: 'Jennifer L.', rating: 5, text: 'Amazing experience! Sarah is the best stylist...', time: '2 hours ago' },
          { name: 'Michael R.', rating: 5, text: 'Great haircut, very professional and friendly...', time: '1 day ago' },
        ].map((review, i) => (
          <div key={i} className="p-3 bg-white dark:bg-slate-900 rounded-lg border">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">
                  {review.name[0]}
                </div>
                <div>
                  <div className="text-xs font-medium">{review.name}</div>
                  <div className="text-yellow-500 text-[10px]">{'★'.repeat(review.rating)}</div>
                </div>
              </div>
              <div className="text-[10px] text-slate-500">{review.time}</div>
            </div>
            <p className="text-[10px] text-slate-600 dark:text-slate-400">{review.text}</p>
            <button className="mt-2 text-[10px] text-primary font-medium">Reply →</button>
          </div>
        ))}
      </div>
    </div>
  </MockupContainer>
);

// Main export component
export function ProductMockup({ variant, className }: MockupProps) {
  const mockups: Record<string, React.ReactNode> = {
    'calendar': <CalendarMockup />,
    'appointments': <CalendarMockup />,
    'scheduling': <CalendarMockup />,
    'pos': <POSMockup />,
    'checkout': <POSMockup />,
    'retail': <POSMockup />,
    'marketing': <MarketingMockup />,
    'campaigns': <MarketingMockup />,
    'staff': <StaffMockup />,
    'team': <StaffMockup />,
    'performance': <StaffMockup />,
    'analytics': <AnalyticsMockup />,
    'reports': <AnalyticsMockup />,
    'insights': <AnalyticsMockup />,
    'booking': <BookingMockup />,
    'online-booking': <BookingMockup />,
    'discovery': <BookingMockup />,
    'website': <WebsiteMockup />,
    'builder': <WebsiteMockup />,
    'design': <WebsiteMockup />,
    'ai': <AIMockup />,
    'automation': <AIMockup />,
    'prediction': <AIMockup />,
    'inventory': <InventoryMockup />,
    'stock': <InventoryMockup />,
    'cash': <CashMockup />,
    'drawer': <CashMockup />,
    'terminal': <TerminalMockup />,
    'payments': <TerminalMockup />,
    'tip': <TipMockup />,
    'tips': <TipMockup />,
    'reminders': <RemindersMockup />,
    'notifications': <RemindersMockup />,
    'reviews': <ReviewsMockup />,
    'reputation': <ReviewsMockup />,
    'social': <ReviewsMockup />,
    'growth': <InventoryMockup />,
    'targeting': <MarketingMockup />,
    'access': <StaffMockup />,
    'payroll': <StaffMockup />,
    'reporting': <AnalyticsMockup />,
  };

  return (
    <div className={className}>
      {mockups[variant.toLowerCase()] || <CalendarMockup />}
    </div>
  );
}

export default ProductMockup;
