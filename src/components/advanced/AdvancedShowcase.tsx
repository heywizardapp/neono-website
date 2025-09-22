import { LazyScene3D } from '../lazy/LazyScene3D';
import { EnhancedCarousel } from './EnhancedCarousel';
import { Parallax3D, ParallaxLayer } from './ParallaxSystem';
import { TextReveal, GlitchText, WaveText } from './DynamicTypography';
import { HoverCard } from '../interactions/MicroInteractions';

const showcaseItems = [
  {
    title: "Multi-Layer Parallax",
    description: "Experience depth with smooth 3D parallax scrolling effects",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Enhanced Carousel",
    description: "Momentum physics with magnetic snap and gesture controls",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Dynamic Typography",
    description: "Animated text effects with reveal, typewriter, and glitch",
    color: "from-green-500 to-teal-500",
  },
  {
    title: "3D Elements",
    description: "Interactive Three.js components with floating geometries",
    color: "from-orange-500 to-red-500",
  },
];

export function AdvancedShowcase() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-subtle overflow-hidden">
      <div className="container">
        {/* Header with advanced typography */}
        <div className="text-center mb-16">
          <TextReveal 
            animation="slide-up" 
            stagger={150}
            className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4"
          >
            Advanced Interactive Features
          </TextReveal>
          
          <div className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            <GlitchText intensity="medium" trigger="scroll">
              Cutting-edge animations and 3D effects
            </GlitchText>
          </div>

          <WaveText className="text-2xl font-semibold text-gradient">
            Experience the Future
          </WaveText>
        </div>

        {/* Enhanced Carousel Showcase */}
        <div className="mb-20">
          <EnhancedCarousel
            className="max-w-4xl mx-auto"
            itemsToShow={1}
            showNavigation={true}
            showIndicators={true}
            momentum={true}
            magneticSnap={true}
            autoPlay={true}
            autoPlayInterval={4000}
          >
            {showcaseItems.map((item, index) => (
              <Parallax3D key={index} intensity={15} className="p-4">
                <HoverCard effect="tilt" intensity="medium">
                  <div className={`relative h-64 rounded-2xl bg-gradient-to-br ${item.color} p-8 text-white overflow-hidden shadow-2xl`}>
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.2),transparent_70%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.1),transparent_70%)]" />
                    </div>
                    
                    <div className="relative z-10 h-full flex flex-col justify-center">
                      <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                      <p className="text-lg opacity-90">{item.description}</p>
                    </div>

                    {/* Floating particles */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full animate-bounce" />
                    <div className="absolute bottom-8 left-8 w-2 h-2 bg-white/40 rounded-full animate-bounce delay-300" />
                    <div className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce delay-700" />
                  </div>
                </HoverCard>
              </Parallax3D>
            ))}
          </EnhancedCarousel>
        </div>

        {/* 3D Scene Integration */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <TextReveal 
              animation="fade" 
              className="text-2xl font-semibold mb-2"
            >
              Interactive 3D Elements
            </TextReveal>
            <p className="text-muted-foreground">
              Move your mouse to interact with the floating geometries
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 rounded-2xl" />
            <LazyScene3D 
              className="h-96 w-full rounded-2xl border border-border/40 shadow-lg"
              enableControls={true}
              autoRotate={true}
            />
          </div>
        </div>

        {/* Multi-layer Parallax Demo */}
        <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-border/40">
          <ParallaxLayer speed={0.2} className="absolute inset-0">
            <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(124,124,242,0.3)_0%,transparent_70%)]" />
          </ParallaxLayer>
          
          <ParallaxLayer speed={0.5} className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-primary to-accent rounded-full opacity-20 blur-xl" />
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-mint to-lavender rounded-full opacity-15 blur-2xl" />
          </ParallaxLayer>
          
          <ParallaxLayer speed={0.8} className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <TextReveal 
                animation="scale" 
                stagger={200}
                className="text-4xl font-bold mb-4"
              >
                Multi-Layer Parallax
              </TextReveal>
              <p className="text-xl opacity-80">
                Scroll to see the depth effect in action
              </p>
            </div>
          </ParallaxLayer>
        </div>

        {/* Performance note */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            All animations are GPU-accelerated for 60fps performance
          </div>
        </div>
      </div>
    </section>
  );
}