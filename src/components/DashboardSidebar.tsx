import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Clock, 
  BarChart3, 
  Users, 
  Settings,
  Zap,
  Bell,
  LogOut
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/owner" },
  { icon: FileText, label: "Services", href: "/owner/services" },
  { icon: Clock, label: "Orders", href: "/owner/orders" },
  { icon: Users, label: "Customers", href: "/owner/customers" },
  { icon: BarChart3, label: "Analytics", href: "/owner/analytics" },
  { icon: Settings, label: "Settings", href: "/owner/settings" },
];

const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-40">
      {/* Logo */}
      <div className="h-16 flex items-center gap-2 px-6 border-b border-border">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-glow">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold text-foreground">
          Cyber<span className="text-primary">Hub</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                  {item.label === "Orders" && (
                    <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-accent text-accent-foreground">
                      3
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
            RK
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground truncate">Rajesh Kumar</div>
            <div className="text-xs text-muted-foreground truncate">Digital India Cyber</div>
          </div>
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <LogOut className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
