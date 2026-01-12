import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Bell,
  Search,
  Plus,
  Pencil,
  Trash2,
  IndianRupee,
  FileText,
  Printer,
  CreditCard,
  GraduationCap,
  Fingerprint,
  FileCheck,
  Copy,
  MoreVertical,
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  icon: keyof typeof iconMap;
  isAvailable: boolean;
  estimatedTime: string;
}

const iconMap = {
  FileText,
  Printer,
  CreditCard,
  GraduationCap,
  Fingerprint,
  FileCheck,
  Copy,
};

const categoryColors: Record<string, string> = {
  "Government": "bg-primary/10 text-primary",
  "Printing": "bg-accent/10 text-accent",
  "Education": "bg-success/10 text-success",
  "Document": "bg-secondary text-secondary-foreground",
};

const initialServices: Service[] = [
  { id: "1", name: "Aadhaar Update", description: "Address, mobile, name correction", price: 50, category: "Government", icon: "Fingerprint", isAvailable: true, estimatedTime: "15 min" },
  { id: "2", name: "PAN Card Application", description: "New PAN card or correction", price: 150, category: "Government", icon: "CreditCard", isAvailable: true, estimatedTime: "20 min" },
  { id: "3", name: "Passport Application", description: "New passport or renewal", price: 200, category: "Government", icon: "FileCheck", isAvailable: true, estimatedTime: "30 min" },
  { id: "4", name: "Printing (B&W)", description: "Per page black & white print", price: 3, category: "Printing", icon: "Printer", isAvailable: true, estimatedTime: "2 min" },
  { id: "5", name: "Printing (Color)", description: "Per page color print", price: 10, category: "Printing", icon: "Printer", isAvailable: true, estimatedTime: "2 min" },
  { id: "6", name: "Xerox Copy", description: "Per page photocopy", price: 2, category: "Printing", icon: "Copy", isAvailable: true, estimatedTime: "1 min" },
  { id: "7", name: "Exam Form Filling", description: "Government & competitive exams", price: 100, category: "Education", icon: "GraduationCap", isAvailable: false, estimatedTime: "25 min" },
  { id: "8", name: "Income Certificate", description: "Apply for income certificate", price: 80, category: "Document", icon: "FileText", isAvailable: true, estimatedTime: "15 min" },
];

const OwnerServices = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Government",
    icon: "FileText" as keyof typeof iconMap,
    estimatedTime: "",
  });

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleAvailability = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isAvailable: !s.isAvailable } : s))
    );
  };

  const handleOpenCreate = () => {
    setEditingService(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "Government",
      icon: "FileText",
      estimatedTime: "",
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price.toString(),
      category: service.category,
      icon: service.icon,
      estimatedTime: service.estimatedTime,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.price) return;

    if (editingService) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingService.id
            ? {
                ...s,
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                category: formData.category,
                icon: formData.icon,
                estimatedTime: formData.estimatedTime,
              }
            : s
        )
      );
    } else {
      const newService: Service = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        icon: formData.icon,
        isAvailable: true,
        estimatedTime: formData.estimatedTime,
      };
      setServices((prev) => [...prev, newService]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const categories = ["Government", "Printing", "Education", "Document"];
  const icons = Object.keys(iconMap) as (keyof typeof iconMap)[];

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
              placeholder="Search services..."
              className="pl-10 bg-secondary/50 border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
            </Button>
            <Button variant="hero" size="sm" className="gap-2" onClick={handleOpenCreate}>
              <Plus className="w-4 h-4" />
              Add Service
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-1">Service Management</h1>
            <p className="text-muted-foreground">
              Manage your services, pricing, and availability
            </p>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-xl border border-border/50 p-4">
              <p className="text-sm text-muted-foreground">Total Services</p>
              <p className="text-2xl font-bold text-foreground">{services.length}</p>
            </div>
            <div className="bg-card rounded-xl border border-border/50 p-4">
              <p className="text-sm text-muted-foreground">Active Services</p>
              <p className="text-2xl font-bold text-success">
                {services.filter((s) => s.isAvailable).length}
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border/50 p-4">
              <p className="text-sm text-muted-foreground">Inactive Services</p>
              <p className="text-2xl font-bold text-destructive">
                {services.filter((s) => !s.isAvailable).length}
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border/50 p-4">
              <p className="text-sm text-muted-foreground">Avg. Price</p>
              <p className="text-2xl font-bold text-primary">
                ₹{Math.round(services.reduce((a, b) => a + b.price, 0) / services.length)}
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service) => {
              const IconComponent = iconMap[service.icon];
              return (
                <div
                  key={service.id}
                  className={`bg-card rounded-xl border p-5 transition-all hover:shadow-md ${
                    service.isAvailable ? "border-border/50" : "border-destructive/30 opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-lg flex items-center justify-center ${
                          categoryColors[service.category] || "bg-secondary"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{service.name}</h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            categoryColors[service.category] || "bg-secondary"
                          }`}
                        >
                          {service.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleOpenEdit(service)}
                      >
                        <Pencil className="w-4 h-4 text-muted-foreground" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:text-destructive"
                        onClick={() => handleDelete(service.id)}
                      >
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <IndianRupee className="w-4 h-4 text-primary" />
                        <span className="font-bold text-foreground">{service.price}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ~{service.estimatedTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs ${
                          service.isAvailable ? "text-success" : "text-destructive"
                        }`}
                      >
                        {service.isAvailable ? "Active" : "Inactive"}
                      </span>
                      <Switch
                        checked={service.isAvailable}
                        onCheckedChange={() => handleToggleAvailability(service.id)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No services found</p>
              <Button variant="hero" className="mt-4" onClick={handleOpenCreate}>
                Add Your First Service
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Edit Service" : "Add New Service"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Service Name</label>
              <Input
                placeholder="e.g., Aadhaar Update"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <Input
                placeholder="Brief description of the service"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Price (₹)</label>
                <Input
                  type="number"
                  placeholder="50"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Est. Time</label>
                <Input
                  placeholder="e.g., 15 min"
                  value={formData.estimatedTime}
                  onChange={(e) =>
                    setFormData({ ...formData, estimatedTime: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFormData({ ...formData, category: cat })}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      formData.category === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Icon</label>
              <div className="flex flex-wrap gap-2">
                {icons.map((iconKey) => {
                  const Icon = iconMap[iconKey];
                  return (
                    <button
                      key={iconKey}
                      onClick={() => setFormData({ ...formData, icon: iconKey })}
                      className={`p-2 rounded-lg transition-all ${
                        formData.icon === iconKey
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="hero" onClick={handleSave}>
              {editingService ? "Save Changes" : "Create Service"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OwnerServices;
