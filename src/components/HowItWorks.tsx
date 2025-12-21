import { MapPin, Calendar, Upload, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Find Nearby Centre",
    description: "Search cyber centres near you with ratings, services & live queue status",
    color: "primary",
  },
  {
    icon: Calendar,
    title: "Book Your Slot",
    description: "Choose a convenient time slot and skip the waiting queue completely",
    color: "accent",
  },
  {
    icon: Upload,
    title: "Upload Documents",
    description: "Share documents securely through the app for printing or processing",
    color: "success",
  },
  {
    icon: CheckCircle,
    title: "Track & Collect",
    description: "Get real-time updates and collect your work when ready",
    color: "primary",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-card relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It <span className="text-gradient-accent">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Get your work done in 4 simple steps - no more long queues or wasted time
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary via-accent to-success opacity-20" />
          
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Step Number */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center text-sm font-bold text-muted-foreground z-10">
                {index + 1}
              </div>
              
              {/* Icon Container */}
              <div className={`w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center ${
                step.color === "primary" 
                  ? "bg-primary/10" 
                  : step.color === "accent" 
                  ? "bg-accent/10" 
                  : "bg-success/10"
              }`}>
                <step.icon className={`w-10 h-10 ${
                  step.color === "primary" 
                    ? "text-primary" 
                    : step.color === "accent" 
                    ? "text-accent" 
                    : "text-success"
                }`} />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
