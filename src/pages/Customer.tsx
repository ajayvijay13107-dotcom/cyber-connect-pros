import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CyberCentreCard from "@/components/CyberCentreCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MapPin, 
  Filter, 
  SlidersHorizontal,
  Star,
  Clock,
  Printer,
  FileText,
  CreditCard,
  X
} from "lucide-react";

const cyberCentres = [
  {
    name: "Digital India Cyber Cafe",
    address: "MG Road, Sector 14",
    distance: "0.5 km",
    rating: 4.8,
    reviews: 234,
    services: ["Aadhaar", "PAN Card", "Printing", "Scanning", "Passport"],
    waitTime: "5 min",
    isOpen: true,
    isTrusted: true,
  },
  {
    name: "Quick Print Solutions",
    address: "Gandhi Nagar, Block B",
    distance: "1.2 km",
    rating: 4.5,
    reviews: 156,
    services: ["Printing", "Xerox", "Lamination", "Binding"],
    waitTime: "10 min",
    isOpen: true,
    isTrusted: false,
  },
  {
    name: "Sarkar Seva Kendra",
    address: "Civil Lines, Near Bus Stand",
    distance: "1.8 km",
    rating: 4.9,
    reviews: 412,
    services: ["Aadhaar", "PAN Card", "Voter ID", "Driving License", "Passport"],
    waitTime: "15 min",
    isOpen: true,
    isTrusted: true,
  },
  {
    name: "E-Mitra Point",
    address: "Nehru Colony, Main Market",
    distance: "2.1 km",
    rating: 4.3,
    reviews: 89,
    services: ["Aadhaar", "Printing", "Form Filling", "Railway Ticket"],
    waitTime: "8 min",
    isOpen: false,
    isTrusted: false,
  },
  {
    name: "Jan Seva Kendra Plus",
    address: "Station Road, Shop 12",
    distance: "2.5 km",
    rating: 4.7,
    reviews: 298,
    services: ["All Government Services", "Banking", "Insurance", "Printing"],
    waitTime: "12 min",
    isOpen: true,
    isTrusted: true,
  },
];

const serviceFilters = [
  { icon: FileText, label: "Aadhaar" },
  { icon: CreditCard, label: "PAN Card" },
  { icon: Printer, label: "Printing" },
  { icon: FileText, label: "Passport" },
];

const Customer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-12">
        {/* Search Header */}
        <div className="bg-gradient-hero text-primary-foreground py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_100%/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_100%/0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Find Cyber Centres Near You</h1>
            <p className="text-primary-foreground/80 mb-6">Discover trusted centres for all your document needs</p>
            
            {/* Search Bar */}
            <div className="flex gap-3 max-w-2xl">
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter your location or pincode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-background text-foreground border-0 shadow-lg"
                />
              </div>
              <Button variant="accent" size="lg" className="px-6 shadow-accent">
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline ml-2">Search</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Filters & Results */}
        <div className="container mx-auto px-4 py-8">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span>Filter by:</span>
            </div>
            
            {serviceFilters.map((filter) => (
              <Button
                key={filter.label}
                variant={selectedFilter === filter.label ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(selectedFilter === filter.label ? null : filter.label)}
                className="gap-1.5"
              >
                <filter.icon className="w-3.5 h-3.5" />
                {filter.label}
              </Button>
            ))}
            
            <Button variant="ghost" size="sm" className="ml-auto gap-1.5">
              <SlidersHorizontal className="w-4 h-4" />
              More Filters
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/20">
              <span className="w-2 h-2 rounded-full bg-success" />
              <span className="text-sm font-medium text-success">4 Open Now</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 border border-accent/20">
              <Star className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">3 Trusted Centres</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Avg. 10 min wait</span>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                {cyberCentres.length} Cyber Centres Found
              </h2>
              <select className="text-sm border border-border rounded-lg px-3 py-2 bg-background">
                <option>Sort by: Nearest</option>
                <option>Sort by: Rating</option>
                <option>Sort by: Wait Time</option>
              </select>
            </div>

            <div className="grid gap-4">
              {cyberCentres.map((centre, index) => (
                <CyberCentreCard key={index} {...centre} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Customer;
