import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Phone,
  FileText,
  Printer,
  ChevronDown,
  ChevronUp,
  Eye,
  Play,
  Check,
  X,
  RefreshCw,
  Download,
  User
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type OrderStatus = "pending" | "in_progress" | "completed" | "cancelled";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  hasDocument?: boolean;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  estimatedTime: string;
  notes?: string;
}

const mockOrders: Order[] = [
  {
    id: "CYB001234",
    customerName: "Amit Sharma",
    customerPhone: "+91 98765 43210",
    items: [
      { name: "Aadhaar Card Update", quantity: 1, price: 50, hasDocument: true },
      { name: "Color Print", quantity: 5, price: 10 },
    ],
    totalAmount: 100,
    status: "pending",
    createdAt: "2 min ago",
    estimatedTime: "20 min",
  },
  {
    id: "CYB001233",
    customerName: "Priya Patel",
    customerPhone: "+91 87654 32109",
    items: [
      { name: "PAN Card Application", quantity: 1, price: 107, hasDocument: true },
    ],
    totalAmount: 107,
    status: "pending",
    createdAt: "5 min ago",
    estimatedTime: "25 min",
  },
  {
    id: "CYB001232",
    customerName: "Rahul Verma",
    customerPhone: "+91 76543 21098",
    items: [
      { name: "Black & White Print", quantity: 20, price: 3 },
      { name: "Lamination", quantity: 2, price: 20 },
    ],
    totalAmount: 100,
    status: "in_progress",
    createdAt: "15 min ago",
    estimatedTime: "10 min",
  },
  {
    id: "CYB001231",
    customerName: "Sneha Gupta",
    customerPhone: "+91 65432 10987",
    items: [
      { name: "Passport Form Filling", quantity: 1, price: 150, hasDocument: true },
      { name: "Photo Print", quantity: 8, price: 5 },
    ],
    totalAmount: 190,
    status: "in_progress",
    createdAt: "25 min ago",
    estimatedTime: "15 min",
  },
  {
    id: "CYB001230",
    customerName: "Vikram Singh",
    customerPhone: "+91 54321 09876",
    items: [
      { name: "Resume Typing", quantity: 1, price: 100 },
      { name: "Black & White Print", quantity: 3, price: 3 },
    ],
    totalAmount: 109,
    status: "completed",
    createdAt: "1 hour ago",
    estimatedTime: "35 min",
  },
  {
    id: "CYB001229",
    customerName: "Kavita Rao",
    customerPhone: "+91 43210 98765",
    items: [
      { name: "Voter ID Application", quantity: 1, price: 50, hasDocument: true },
    ],
    totalAmount: 50,
    status: "completed",
    createdAt: "2 hours ago",
    estimatedTime: "20 min",
  },
  {
    id: "CYB001228",
    customerName: "Suresh Kumar",
    customerPhone: "+91 32109 87654",
    items: [
      { name: "Mobile Recharge", quantity: 1, price: 199 },
    ],
    totalAmount: 199,
    status: "cancelled",
    createdAt: "3 hours ago",
    estimatedTime: "5 min",
    notes: "Customer did not arrive",
  },
];

const statusConfig: Record<OrderStatus, { label: string; color: string; bgColor: string; icon: React.ElementType }> = {
  pending: { label: "Pending", color: "text-amber-600", bgColor: "bg-amber-50 border-amber-200", icon: Clock },
  in_progress: { label: "In Progress", color: "text-blue-600", bgColor: "bg-blue-50 border-blue-200", icon: RefreshCw },
  completed: { label: "Completed", color: "text-success", bgColor: "bg-success/10 border-success/20", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "text-destructive", bgColor: "bg-destructive/10 border-destructive/20", icon: XCircle },
};

const OwnerOrders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const orderCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    in_progress: orders.filter((o) => o.status === "in_progress").length,
    completed: orders.filter((o) => o.status === "completed").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Customer Orders</h1>
            <p className="text-muted-foreground">Manage and track all orders from customers</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(["all", "pending", "in_progress", "completed", "cancelled"] as const).map((status) => {
            const isActive = statusFilter === status;
            const config = status === "all" ? null : statusConfig[status];
            const Icon = config?.icon || Filter;
            
            return (
              <Button
                key={status}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="gap-2 whitespace-nowrap"
              >
                {status !== "all" && <Icon className="w-4 h-4" />}
                {status === "all" ? "All Orders" : config?.label}
                <span className={`ml-1 px-1.5 py-0.5 rounded text-xs ${
                  isActive ? "bg-primary-foreground/20" : "bg-muted"
                }`}>
                  {orderCounts[status]}
                </span>
              </Button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by order ID, customer name, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {filteredOrders.map((order) => {
            const config = statusConfig[order.status];
            const StatusIcon = config.icon;
            const isExpanded = expandedOrder === order.id;

            return (
              <div
                key={order.id}
                className="bg-card border border-border rounded-xl overflow-hidden transition-all hover:shadow-md"
              >
                {/* Order Header */}
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                >
                  <div className="flex items-center gap-4">
                    {/* Status Badge */}
                    <div className={`px-3 py-1.5 rounded-lg border ${config.bgColor} flex items-center gap-2`}>
                      <StatusIcon className={`w-4 h-4 ${config.color}`} />
                      <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
                    </div>

                    {/* Order Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">#{order.id}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{order.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                        <User className="w-3.5 h-3.5" />
                        <span>{order.customerName}</span>
                        <span>•</span>
                        <span>{order.items.length} item(s)</span>
                      </div>
                    </div>

                    {/* Amount & Expand */}
                    <div className="text-right">
                      <p className="font-bold text-lg text-foreground">₹{order.totalAmount}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" />
                        Est. {order.estimatedTime}
                      </p>
                    </div>

                    <Button variant="ghost" size="icon" className="shrink-0">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </Button>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-border pt-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Customer Info */}
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">Customer Details</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="text-foreground">{order.customerName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-foreground">{order.customerPhone}</span>
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                              Call
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">Order Items</h4>
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-foreground">{item.name}</span>
                                <span className="text-muted-foreground">× {item.quantity}</span>
                                {item.hasDocument && (
                                  <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded flex items-center gap-1">
                                    <FileText className="w-3 h-3" />
                                    Doc
                                  </span>
                                )}
                              </div>
                              <span className="text-foreground font-medium">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                          <div className="pt-2 border-t border-border flex justify-between font-semibold">
                            <span>Total</span>
                            <span className="text-primary">₹{order.totalAmount}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {order.notes && (
                      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Note:</span> {order.notes}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                      {order.status === "pending" && (
                        <>
                          <Button
                            variant="accent"
                            size="sm"
                            className="gap-2"
                            onClick={() => updateOrderStatus(order.id, "in_progress")}
                          >
                            <Play className="w-4 h-4" />
                            Start Order
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-destructive hover:text-destructive"
                            onClick={() => updateOrderStatus(order.id, "cancelled")}
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </Button>
                        </>
                      )}
                      {order.status === "in_progress" && (
                        <Button
                          variant="success"
                          size="sm"
                          className="gap-2"
                          onClick={() => updateOrderStatus(order.id, "completed")}
                        >
                          <Check className="w-4 h-4" />
                          Mark Complete
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => { setSelectedOrder(order); setShowDetails(true); }}
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                      {order.items.some((item) => item.hasDocument) && (
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download className="w-4 h-4" />
                          Download Documents
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredOrders.length === 0 && (
            <div className="text-center py-12 bg-card border border-border rounded-xl">
              <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">No orders found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>

      {/* Order Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Order #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              {/* Status */}
              <div className={`px-4 py-3 rounded-lg border ${statusConfig[selectedOrder.status].bgColor}`}>
                <div className="flex items-center gap-2">
                  {(() => {
                    const Icon = statusConfig[selectedOrder.status].icon;
                    return <Icon className={`w-5 h-5 ${statusConfig[selectedOrder.status].color}`} />;
                  })()}
                  <span className={`font-medium ${statusConfig[selectedOrder.status].color}`}>
                    {statusConfig[selectedOrder.status].label}
                  </span>
                </div>
              </div>

              {/* Customer */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="text-sm font-medium text-foreground mb-2">Customer</h4>
                <p className="text-foreground">{selectedOrder.customerName}</p>
                <p className="text-sm text-muted-foreground">{selectedOrder.customerPhone}</p>
              </div>

              {/* Items */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between p-2 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-foreground">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                <span className="font-semibold text-foreground">Total Amount</span>
                <span className="text-xl font-bold text-primary">₹{selectedOrder.totalAmount}</span>
              </div>

              {/* Timeline */}
              <div className="text-sm text-muted-foreground">
                <p>Created: {selectedOrder.createdAt}</p>
                <p>Estimated Time: {selectedOrder.estimatedTime}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetails(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OwnerOrders;
