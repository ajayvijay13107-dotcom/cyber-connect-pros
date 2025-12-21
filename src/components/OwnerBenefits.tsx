import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  Clock, 
  BarChart3, 
  Bell, 
  CreditCard,
  Store,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Increase Sales 40%",
    description: "Get more customers through online visibility and bookings",
  },
  {
    icon: Users,
    title: "New Customer Base",
    description: "Reach customers who prefer digital booking over walk-ins",
  },
  {
    icon: Clock,
    title: "Save 2 Hours Daily",
    description: "Automated queue management and digital order processing",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Track daily sales, popular services, and customer trends",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description: "Get alerted for new orders and customer requests",
  },
  {
    icon: CreditCard,
    title: "Digital Payments",
    description: "Accept UPI, cards and online payments seamlessly",
  },
];

const features = [
  "Free to start - No setup fees",
  "Dashboard to manage all services",
  "Customer history & repeat order tracking",
  "WhatsApp notifications",
  "Print queue management",
  "Daily & monthly reports",
];

const OwnerBenefits = () => {
  return (
    <section className="py-20 bg-gradient-hero text-primary-foreground relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_100%/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_100%/0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm font-medium mb-6">
              <Store className="w-4 h-4" />
              <span>For Cyber Centre Owners</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Grow Your Business
              <span className="block text-accent-glow mt-2">With Digital Tools</span>
            </h2>
            
            <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
              Join 500+ cyber centre owners who have increased their sales and reduced workload with our smart management platform.
            </p>

            {/* Feature Checklist */}
            <ul className="space-y-3 mb-10">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-primary-foreground/90">{feature}</span>
                </li>
              ))}
            </ul>

            <Button variant="accent" size="xl" asChild>
              <Link to="/owner" className="gap-2">
                Register Your Centre
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Right - Benefits Grid */}
          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-primary-foreground/10 border border-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/15 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mb-3">
                  <benefit.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-1">{benefit.title}</h3>
                <p className="text-sm text-primary-foreground/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerBenefits;
