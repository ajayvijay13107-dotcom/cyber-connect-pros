import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Cyber Centre Owner, Delhi",
    content: "Since joining CyberHub, my daily customers have increased by 50%. The slot booking feature has eliminated long queues in my shop.",
    rating: 5,
    avatar: "RK",
  },
  {
    name: "Priya Sharma",
    role: "Regular Customer, Mumbai",
    content: "I love that I can book a slot and upload documents from home. No more waiting in line for Aadhaar updates!",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "Mohammed Ali",
    role: "Cyber Centre Owner, Bangalore",
    content: "The analytics dashboard helps me understand which services are popular. My income has grown 35% in 3 months.",
    rating: 5,
    avatar: "MA",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-surface relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Loved by <span className="text-gradient">Thousands</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            See what our users are saying about their experience
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-lg transition-shadow"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/10 absolute top-4 right-4" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-foreground/90 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
