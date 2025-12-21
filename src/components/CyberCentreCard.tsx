import { Star, MapPin, Clock, Badge, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CyberCentreProps {
  name: string;
  address: string;
  distance: string;
  rating: number;
  reviews: number;
  services: string[];
  waitTime: string;
  isOpen: boolean;
  isTrusted?: boolean;
}

const CyberCentreCard = ({
  name,
  address,
  distance,
  rating,
  reviews,
  services,
  waitTime,
  isOpen,
  isTrusted = false,
}: CyberCentreProps) => {
  return (
    <div className="bg-card rounded-xl border border-border/50 p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            {isTrusted && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-success/10 text-success border border-success/20">
                Trusted
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{address}</span>
            <span className="text-primary font-medium">• {distance}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-lg">
          <Star className="w-4 h-4 fill-accent text-accent" />
          <span className="text-sm font-semibold text-accent">{rating}</span>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>
      </div>

      {/* Services */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {services.slice(0, 4).map((service, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
          >
            {service}
          </span>
        ))}
        {services.length > 4 && (
          <span className="px-2 py-1 text-xs rounded-md bg-secondary text-muted-foreground">
            +{services.length - 4} more
          </span>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-4 text-sm">
          <span className={`flex items-center gap-1.5 font-medium ${isOpen ? "text-success" : "text-destructive"}`}>
            <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-success" : "bg-destructive"}`} />
            {isOpen ? "Open Now" : "Closed"}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            {waitTime} wait
          </span>
        </div>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
          View Details
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default CyberCentreCard;
