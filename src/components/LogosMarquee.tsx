export function LogosMarquee() {
  const logos = [
    'Glossier', 'The Ordinary', 'Fenty Beauty', 'Rare Beauty', 'Glow Recipe',
    'Youth to the People', 'Drunk Elephant', 'Tatcha', 'Summer Fridays', 'Herbivore'
  ];

  return (
    <section className="py-16 border-t border-b border-border/40 bg-gradient-subtle">
      <div className="container">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8">
          Trusted by 50,000+ beauty and wellness businesses
        </p>
        
        <div className="relative overflow-hidden group">
          <div className="flex animate-marquee group-hover:pause">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="flex-shrink-0 px-8 flex items-center justify-center"
              >
                <div className="text-xl font-semibold text-muted-foreground/60 hover:text-foreground hover:scale-110 transition-all duration-300 whitespace-nowrap cursor-default">
                  {logo}
                </div>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee2 group-hover:pause" aria-hidden="true">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={`${logo}-${index}-2`}
                className="flex-shrink-0 px-8 flex items-center justify-center"
              >
                <div className="text-xl font-semibold text-muted-foreground/60 hover:text-foreground hover:scale-110 transition-all duration-300 whitespace-nowrap cursor-default">
                  {logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}