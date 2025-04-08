
import { useState } from "react";
import RiderLayout from "@/components/layouts/RiderLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  DollarSign,
  Plus, 
  Trash2,
  WalletCards
} from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Mock payment methods
const initialPaymentMethods = [
  {
    id: "pm1",
    type: "visa",
    last4: "4242",
    expiry: "04/25",
    name: "John Doe",
    isDefault: true
  },
  {
    id: "pm2",
    type: "mastercard",
    last4: "5555",
    expiry: "07/26",
    name: "John Doe",
    isDefault: false
  }
];

// Mock transaction history
const transactionHistory = [
  {
    id: "tx1",
    date: "Today, 3:30 PM",
    description: "Ride to Airport",
    amount: "-$28.50",
    status: "Completed"
  },
  {
    id: "tx2",
    date: "Yesterday, 9:15 AM",
    description: "Added funds",
    amount: "+$50.00",
    status: "Completed"
  },
  {
    id: "tx3",
    date: "Apr 5, 7:45 PM",
    description: "Ride to Downtown",
    amount: "-$12.75",
    status: "Completed"
  },
  {
    id: "tx4",
    date: "Apr 3, 8:30 AM",
    description: "Ride to Work",
    amount: "-$9.50",
    status: "Completed"
  }
];

interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiry: string;
  name: string;
  isDefault: boolean;
}

const Payment = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);
  const [topupAmount, setTopupAmount] = useState<string>("");
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: ""
  });
  
  const handleTopup = () => {
    if (!topupAmount || isNaN(Number(topupAmount)) || Number(topupAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    toast.success(`Successfully added $${topupAmount} to your wallet`);
    setTopupAmount("");
  };
  
  const handleAddCard = () => {
    // Simple validation
    if (!newCard.number || !newCard.expiry || !newCard.cvc || !newCard.name) {
      toast.error("Please fill in all card details");
      return;
    }
    
    // In a real app, this would call an API to validate and save the card
    const newPaymentMethod: PaymentMethod = {
      id: `pm${paymentMethods.length + 1}`,
      type: newCard.number.startsWith("4") ? "visa" : "mastercard",
      last4: newCard.number.slice(-4),
      expiry: newCard.expiry,
      name: newCard.name,
      isDefault: paymentMethods.length === 0
    };
    
    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    setNewCard({ number: "", expiry: "", cvc: "", name: "" });
    setIsAddingCard(false);
    toast.success("Payment method added successfully");
  };
  
  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    toast.success("Default payment method updated");
  };
  
  const handleRemoveCard = (id: string) => {
    const methodToRemove = paymentMethods.find(method => method.id === id);
    
    if (methodToRemove?.isDefault && paymentMethods.length > 1) {
      toast.error("Cannot remove default payment method. Please set another method as default first.");
      return;
    }
    
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    toast.success("Payment method removed");
  };
  
  return (
    <RiderLayout title="Payment Methods">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Your Payment Methods</CardTitle>
              <CardDescription>
                Manage your cards and payment options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id} 
                  className={`border rounded-lg p-4 ${method.isDefault ? 'border-primary' : ''}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-primary" />
                      <span className="font-medium capitalize">
                        {method.type} •••• {method.last4}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Expires {method.expiry}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {method.name}
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.isDefault ? (
                        <span className="text-xs bg-primary-50 text-primary px-2 py-1 rounded-full">
                          Default
                        </span>
                      ) : (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleSetDefault(method.id)}
                        >
                          Set as Default
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveCard(method.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                    <DialogDescription>
                      Add a new credit or debit card to your account
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input 
                        id="card-number" 
                        placeholder="1234 5678 9012 3456"
                        value={newCard.number}
                        onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input 
                          id="expiry" 
                          placeholder="MM/YY"
                          value={newCard.expiry}
                          onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input 
                          id="cvc" 
                          placeholder="123"
                          value={newCard.cvc}
                          onChange={(e) => setNewCard({...newCard, cvc: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Cardholder Name</Label>
                      <Input 
                        id="name" 
                        placeholder="John Doe"
                        value={newCard.name}
                        onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddingCard(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddCard}>Add Card</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Transaction History</CardTitle>
              <CardDescription>
                Your recent payment activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {transactionHistory.map((tx) => (
                  <div 
                    key={tx.id} 
                    className="flex items-center justify-between p-3 border-b last:border-0"
                  >
                    <div>
                      <div className="font-medium">{tx.description}</div>
                      <div className="text-sm text-gray-500">{tx.date}</div>
                    </div>
                    <div className={`font-medium ${
                      tx.amount.startsWith("+") ? "text-green-600" : "text-gray-900"
                    }`}>
                      {tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-center border-t pt-4">
              <Button variant="outline">View All Transactions</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">RideX Wallet</CardTitle>
              <CardDescription>
                Manage your RideX balance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-primary-50 p-6 rounded-lg text-center">
                <WalletCards className="h-10 w-10 mx-auto mb-2 text-primary" />
                <div className="text-sm text-gray-500">Available Balance</div>
                <div className="text-3xl font-bold">$125.50</div>
              </div>
              
              <div className="space-y-4">
                <div className="text-sm font-medium">Top up your wallet</div>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setTopupAmount("10")}
                    className={topupAmount === "10" ? "border-primary text-primary" : ""}
                  >
                    $10
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setTopupAmount("25")}
                    className={topupAmount === "25" ? "border-primary text-primary" : ""}
                  >
                    $25
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setTopupAmount("50")}
                    className={topupAmount === "50" ? "border-primary text-primary" : ""}
                  >
                    $50
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Enter amount"
                    value={topupAmount}
                    onChange={(e) => setTopupAmount(e.target.value)}
                  />
                </div>
                
                <Button className="w-full" onClick={handleTopup}>
                  Add Funds
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Payment Settings</CardTitle>
              <CardDescription>
                Configure your payment preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Auto Top-up</div>
                  <div className="text-sm text-gray-500">
                    Automatically add funds when balance is low
                  </div>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Payment Receipts</div>
                  <div className="text-sm text-gray-500">
                    Manage email receipt settings
                  </div>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Expense Reports</div>
                  <div className="text-sm text-gray-500">
                    Export your ride history for expense tracking
                  </div>
                </div>
                <Button variant="outline">Export</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RiderLayout>
  );
};

export default Payment;
