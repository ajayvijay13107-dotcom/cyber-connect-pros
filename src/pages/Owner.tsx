import DashboardSidebar from "@/components/DashboardSidebar";
import StatCard from "@/components/StatCard";
import OrderQueue from "@/components/OrderQueue";
import { 
  IndianRupee, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Bell,
  Search,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const stats = [
  { icon: IndianRupee, label: "Today's Revenue", value: "₹4,250", trend: { value: 12, isPositive: true }, variant: "success" as const },
  { icon: ShoppingCart, label: "Today's Orders", value: "28", trend: { value: 8, isPositive: true }, variant: "primary" as const },
  { icon: Users, label: "New Customers", value: "12", trend: { value: 5, isPositive: true }, variant: "accent" as const },
  { icon: TrendingUp, label: "Conversion Rate", value: "68%", trend: { value: 3, isPositive: false }, variant: "default" as const },
];

const recentActivity = [
  { text: "New order from Amit Patel - Aadhaar Update", time: "2 min ago", type: "order" },
  { text: "Payment received ₹250 - PAN Card", time: "15 min ago", type: "payment" },
  { text: "Sunita Devi left a 5-star review", time: "1 hour ago", type: "review" },
  { text: "Document upload from Rahul Singh", time: "2 hours ago", type: "upload" },
];

const Owner = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      
      <main className="ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search orders, customers..."
              className="pl-10 bg-secondary/50 border-0"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
            </Button>
            <Button variant="hero" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              New Order
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-1">Good Morning, Rajesh! 👋</h1>
            <p className="text-muted-foreground">Here's what's happening at your cyber centre today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Order Queue - Takes 2 columns */}
            <div className="lg:col-span-2">
              <OrderQueue />
            </div>

            {/* Recent Activity */}
            <div className="bg-card rounded-xl border border-border/50">
              <div className="p-5 border-b border-border">
                <h3 className="font-semibold text-foreground">Recent Activity</h3>
                <p className="text-sm text-muted-foreground">Latest updates from your centre</p>
              </div>
              <div className="p-4 space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      activity.type === "order" ? "bg-primary" :
                      activity.type === "payment" ? "bg-success" :
                      activity.type === "review" ? "bg-accent" : "bg-muted-foreground"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground leading-relaxed">{activity.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border">
                <Button variant="ghost" className="w-full text-primary">
                  View All Activity
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Add New Service", icon: Plus, color: "primary" },
              { label: "Print Queue", icon: Search, color: "accent" },
              { label: "Customer List", icon: Users, color: "success" },
              { label: "View Reports", icon: TrendingUp, color: "default" },
            ].map((action, index) => (
              <button
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-md transition-all text-left group"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  action.color === "primary" ? "bg-primary/10" :
                  action.color === "accent" ? "bg-accent/10" :
                  action.color === "success" ? "bg-success/10" : "bg-secondary"
                }`}>
                  <action.icon className={`w-5 h-5 ${
                    action.color === "primary" ? "text-primary" :
                    action.color === "accent" ? "text-accent" :
                    action.color === "success" ? "text-success" : "text-muted-foreground"
                  }`} />
                </div>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Owner;
