import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft,
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Upload,
  FileText,
  CreditCard,
  Printer,
  FileCheck,
  Globe,
  Clock,
  Star,
  Trash2,
  X,
  CheckCircle,
  MapPin,
  Phone
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const categories = [
  { id: "all", label: "All Services", icon: Globe },
  { id: "government", label: "Government", icon: FileCheck },
  { id: "printing", label: "Printing", icon: Printer },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "payment", label: "Payment", icon: CreditCard },
];

const availableServices = [
  { id: 1, name: "Aadhaar Card Update", category: "government", price: 50, estimatedTime: "15 min", description: "Update address, mobile, or photo", requiresUpload: true },
  { id: 2, name: "PAN Card Application", category: "government", price: 107, estimatedTime: "20 min", description: "New PAN card or correction", requiresUpload: true },
  { id: 3, name: "Passport Form Filling", category: "government", price: 150, estimatedTime: "30 min", description: "Complete passport application", requiresUpload: true },
  { id: 4, name: "Voter ID Application", category: "government", price: 50, estimatedTime: "20 min", description: "New voter ID or correction", requiresUpload: true },
  { id: 5, name: "Black & White Print", category: "printing", price: 3, estimatedTime: "2 min", description: "Per page A4 size", requiresUpload: true },
  { id: 6, name: "Color Print", category: "printing", price: 10, estimatedTime: "3 min", description: "Per page A4 size", requiresUpload: true },
  { id: 7, name: "Xerox Copy", category: "printing", price: 2, estimatedTime: "1 min", description: "Per page black & white", requiresUpload: false },
  { id: 8, name: "Lamination", category: "printing", price: 20, estimatedTime: "5 min", description: "A4 size document", requiresUpload: false },
  { id: 9, name: "Photo Print", category: "printing", price: 5, estimatedTime: "5 min", description: "Passport size photos", requiresUpload: true },
  { id: 10, name: "Resume Typing", category: "documents", price: 100, estimatedTime: "30 min", description: "Professional resume format", requiresUpload: false },
  { id: 11, name: "Application Letter", category: "documents", price: 50, estimatedTime: "15 min", description: "Any official application", requiresUpload: false },
  { id: 12, name: "Form Filling", category: "documents", price: 30, estimatedTime: "10 min", description: "Any form filling service", requiresUpload: true },
  { id: 13, name: "Mobile Recharge", category: "payment", price: 0, estimatedTime: "2 min", description: "All operators supported", requiresUpload: false },
  { id: 14, name: "Electricity Bill", category: "payment", price: 10, estimatedTime: "5 min", description: "Pay electricity bills", requiresUpload: false },
  { id: 15, name: "DTH Recharge", category: "payment", price: 0, estimatedTime: "2 min", description: "All DTH providers", requiresUpload: false },
];

const selectedCentre = {
  name: "Digital India Cyber Cafe",
  address: "MG Road, Sector 14",
  phone: "+91 98765 43210",
  rating: 4.8,
  reviews: 234,
  isOpen: true,
};

interface CartItem {
  serviceId: number;
  name: string;
  price: number;
  quantity: number;
  uploadedFile?: string;
  notes?: string;
}

const CustomerOrder = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const filteredServices = availableServices.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (service: typeof availableServices[0]) => {
    const existing = cart.find((item) => item.serviceId === service.id);
    if (existing) {
      setCart(cart.map((item) =>
        item.serviceId === service.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        serviceId: service.id,
        name: service.name,
        price: service.price,
        quantity: 1,
      }]);
    }
  };

  const updateQuantity = (serviceId: number, delta: number) => {
    setCart(cart.map((item) => {
      if (item.serviceId === serviceId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter((item) => item.quantity > 0));
  };

  const removeFromCart = (serviceId: number) => {
    setCart(cart.filter((item) => item.serviceId !== serviceId));
  };

  const getCartItemQuantity = (serviceId: number) => {
    const item = cart.find((i) => i.serviceId === serviceId);
    return item?.quantity || 0;
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = () => {
    setShowCheckout(false);
    setOrderPlaced(true);
    setCart([]);
  };

  const getCategoryIcon = (categoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat?.icon || FileText;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-24">
        {/* Centre Header */}
        <div className="bg-gradient-hero text-primary-foreground py-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_100%/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_100%/0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/customer")}
              className="mb-4 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold">{selectedCentre.name}</h1>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-success/20 text-success border border-success/30">
                    Open Now
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-primary-foreground/80 text-sm">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {selectedCentre.address}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4" />
                    {selectedCentre.phone}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-accent" />
                    {selectedCentre.rating} ({selectedCentre.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Categories */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className="gap-1.5 whitespace-nowrap"
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => {
              const Icon = getCategoryIcon(service.category);
              const inCart = getCartItemQuantity(service.id);

              return (
                <div
                  key={service.id}
                  className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{service.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{service.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                    <div>
                      <p className="text-lg font-bold text-foreground">
                        ₹{service.price}
                        {service.price === 0 && <span className="text-sm font-normal text-muted-foreground ml-1">+ amount</span>}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {service.estimatedTime}
                      </p>
                    </div>

                    {inCart > 0 ? (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(service.id, -1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-6 text-center font-semibold">{inCart}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(service.id, 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="accent"
                        size="sm"
                        onClick={() => addToCart(service)}
                        className="gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </Button>
                    )}
                  </div>

                  {service.requiresUpload && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <Button variant="ghost" size="sm" className="w-full gap-2 text-muted-foreground hover:text-foreground">
                        <Upload className="w-4 h-4" />
                        Upload Document
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">No services found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      {/* Fixed Cart Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-primary" />
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              </div>
              <div>
                <p className="font-semibold text-foreground">₹{totalAmount}</p>
                <p className="text-xs text-muted-foreground">{totalItems} item(s)</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowCart(true)}>
                View Cart
              </Button>
              <Button variant="accent" size="sm" onClick={() => setShowCheckout(true)}>
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Dialog */}
      <Dialog open={showCart} onOpenChange={setShowCart}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Your Cart
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 max-h-[50vh] overflow-y-auto">
            {cart.map((item) => (
              <div key={item.serviceId} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">₹{item.price} × {item.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.serviceId, -1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.serviceId, 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive"
                    onClick={() => removeFromCart(item.serviceId)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 mt-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">₹{totalAmount}</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCart(false)}>
              Continue Shopping
            </Button>
            <Button variant="accent" onClick={() => { setShowCart(false); setShowCheckout(true); }}>
              Proceed to Checkout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Checkout Dialog */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Order</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="font-medium text-foreground mb-1">{selectedCentre.name}</p>
              <p className="text-sm text-muted-foreground">{selectedCentre.address}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Order Summary</p>
              {cart.map((item) => (
                <div key={item.serviceId} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                  <span className="text-foreground">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">₹{totalAmount}</span>
              </div>
            </div>

            <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm text-accent font-medium">Payment on arrival</p>
              <p className="text-xs text-muted-foreground">Pay via UPI, Cash, or Card at the centre</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCheckout(false)}>
              Cancel
            </Button>
            <Button variant="accent" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Order Success Dialog */}
      <Dialog open={orderPlaced} onOpenChange={setOrderPlaced}>
        <DialogContent className="max-w-sm text-center">
          <div className="py-6">
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Order Placed!</h2>
            <p className="text-muted-foreground mb-4">
              Your order has been sent to {selectedCentre.name}. You'll receive a confirmation shortly.
            </p>
            <p className="text-sm text-primary font-medium">
              Order ID: #CYB{Date.now().toString().slice(-6)}
            </p>
          </div>

          <Button variant="accent" className="w-full" onClick={() => { setOrderPlaced(false); navigate("/customer"); }}>
            Back to Search
          </Button>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default CustomerOrder;
