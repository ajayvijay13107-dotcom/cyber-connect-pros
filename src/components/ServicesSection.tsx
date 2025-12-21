import { 
  FileText, 
  CreditCard, 
  Printer, 
  Copy, 
  GraduationCap, 
  Car,
  FileCheck,
  Landmark,
  ArrowRight
} from "lucide-react";

const services = [
  {
    icon: FileText,
    name: "Aadhaar Services",
    description: "Update, enrollment, print & corrections",
    price: "₹50 - ₹200",
    popular: true,
  },
  {
    icon: CreditCard,
    name: "PAN Card",
    description: "New application, correction & reprint",
    price: "₹100 - ₹500",
    popular: true,
  },
  {
    icon: Printer,
    name: "Printing",
    description: "B&W, color, photo printing",
    price: "₹2 - ₹20/page",
    popular: false,
  },
  {
    icon: Copy,
    name: "Xerox & Scanning",
    description: "Documents, ID cards, certificates",
    price: "₹2 - ₹10/page",
    popular: false,
  },
  {
    icon: GraduationCap,
    name: "Exam Forms",
    description: "UPSC, SSC, Railway & more",
    price: "₹50 - ₹300",
    popular: true,
  },
  {
    icon: Car,
    name: "Driving License",
    description: "New, renewal & duplicate",
    price: "₹200 - ₹500",
    popular: false,
  },
  {
    icon: FileCheck,
    name: "Passport Services",
    description: "Application & appointment",
    price: "₹100 - ₹300",
    popular: false,
  },
  {
    icon: Landmark,
    name: "Bank Services",
    description: "Account opening, form filling",
    price: "₹50 - ₹200",
    popular: false,
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-gradient-surface relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            All Services, <span className="text-gradient">One Platform</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From government documents to everyday printing, find everything at your nearest cyber centre
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-xl p-6 border border-border/50 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/20">
                  Popular
                </div>
              )}
              
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {service.description}
              </p>
              
              {/* Price */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-success">{service.price}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 text-primary font-medium hover:underline underline-offset-4">
            View All 50+ Services
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
