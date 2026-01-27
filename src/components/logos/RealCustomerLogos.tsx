export function RealCustomerLogos() {
  const customerLogos = [
    'Salon Lofts', 'Great Clips', 'Sport Clips', 'Supercuts', 'Hair Cuttery',
    'Drybar', 'Blowout Bar', 'The Parlor', 'Gloss Salon', 'Tease Salon',
    'Aveda Institute', 'Paul Mitchell Schools', 'Regis Salons', 'SmartStyle'
  ];

  return (
    <section className="py-16 border-t border-b border-border/40 bg-gradient-subtle">
      <div className="container">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Trusted by salon professionals coast to coast
          </p>
          <p className="text-xs text-muted-foreground">
            From independent studios to multi-location franchises
          </p>
        </div>
        
        <div className="relative overflow-hidden group">
          <div className="flex animate-marquee group-hover:pause">
            {[...customerLogos, ...customerLogos].map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="flex-shrink-0 px-8 flex items-center justify-center min-w-[180px]"
              >
                <div className="text-lg font-semibold text-muted-foreground/60 hover:text-foreground hover:scale-110 transition-all duration-300 whitespace-nowrap cursor-default">
                  {logo}
                </div>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee2 group-hover:pause" aria-hidden="true">
            {[...customerLogos, ...customerLogos].map((logo, index) => (
              <div
                key={`${logo}-${index}-2`}
                className="flex-shrink-0 px-8 flex items-center justify-center min-w-[180px]"
              >
                <div className="text-lg font-semibold text-muted-foreground/60 hover:text-foreground hover:scale-110 transition-all duration-300 whitespace-nowrap cursor-default">
                  {logo}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional trust signals */}
        <div className="text-center mt-8 space-y-2">
          <div className="flex justify-center items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              4.8★ Average Rating
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              2M+ Appointments Booked
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              $500M+ Processed
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}