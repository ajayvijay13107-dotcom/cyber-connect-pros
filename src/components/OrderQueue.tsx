import { Clock, FileText, Printer, User, MoreVertical, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  customer: string;
  service: string;
  status: "pending" | "in_progress" | "ready" | "completed";
  time: string;
  amount: string;
}

const orders: Order[] = [
  { id: "ORD-001", customer: "Amit Patel", service: "Aadhaar Update", status: "in_progress", time: "10:30 AM", amount: "₹100" },
  { id: "ORD-002", customer: "Sunita Devi", service: "PAN Card Application", status: "pending", time: "10:45 AM", amount: "₹250" },
  { id: "ORD-003", customer: "Rahul Singh", service: "Document Printing (15 pages)", status: "ready", time: "11:00 AM", amount: "₹45" },
  { id: "ORD-004", customer: "Priya Sharma", service: "Passport Application", status: "pending", time: "11:15 AM", amount: "₹150" },
  { id: "ORD-005", customer: "Vikram Kumar", service: "Xerox (20 copies)", status: "completed", time: "09:30 AM", amount: "₹40" },
];

const statusConfig = {
  pending: { label: "Pending", color: "bg-accent/10 text-accent border-accent/20" },
  in_progress: { label: "In Progress", color: "bg-primary/10 text-primary border-primary/20" },
  ready: { label: "Ready", color: "bg-success/10 text-success border-success/20" },
  completed: { label: "Completed", color: "bg-muted text-muted-foreground border-border" },
};

const OrderQueue = () => {
  return (
    <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Today's Orders</h3>
          <p className="text-sm text-muted-foreground">Manage and track customer orders</p>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      <div className="divide-y divide-border">
        {orders.map((order) => (
          <div key={order.id} className="p-4 hover:bg-secondary/30 transition-colors">
            <div className="flex items-center gap-4">
              {/* Order Icon */}
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                {order.service.includes("Print") || order.service.includes("Xerox") ? (
                  <Printer className="w-5 h-5 text-primary" />
                ) : (
                  <FileText className="w-5 h-5 text-primary" />
                )}
              </div>

              {/* Order Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground text-sm">{order.service}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full border ${statusConfig[order.status].color}`}>
                    {statusConfig[order.status].label}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {order.customer}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {order.time}
                  </span>
                </div>
              </div>

              {/* Amount */}
              <div className="text-right">
                <div className="font-semibold text-foreground">{order.amount}</div>
                <div className="text-xs text-muted-foreground">{order.id}</div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                {order.status === "pending" && (
                  <Button variant="success" size="sm" className="h-8 px-3">
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                )}
                {order.status === "in_progress" && (
                  <Button variant="accent" size="sm" className="h-8 px-3">
                    Ready
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderQueue;
