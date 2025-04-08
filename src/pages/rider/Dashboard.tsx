
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RiderLayout from "@/components/layouts/RiderLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart, Calendar, Car, CreditCard, History, Map, MapPin } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock data
const recentRides = [
  {
    id: "ride-1",
    date: "Today, 2:30 PM",
    pickup: "Home",
    destination: "Work",
    amount: "$12.50",
    status: "Completed"
  },
  {
    id: "ride-2",
    date: "Yesterday, 9:15 AM",
    pickup: "Work",
    destination: "Home",
    amount: "$13.25",
    status: "Completed"
  },
  {
    id: "ride-3",
    date: "Apr 5, 5:45 PM",
    pickup: "Gym",
    destination: "Home",
    amount: "$8.75",
    status: "Completed"
  }
];

const RiderDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  
  return (
    <RiderLayout title="Rider Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quick Ride</CardTitle>
            <CardDescription>Book a ride in seconds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-medium">Pickup Location</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  className="w-full px-3 py-2 border rounded-md"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                />
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Map className="h-4 w-4 text-primary" />
                  <span className="font-medium">Destination</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter destination"
                  className="w-full px-3 py-2 border rounded-md"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              
              <Button 
                className="w-full bg-primary hover:bg-primary-600" 
                onClick={() => navigate("/rider/book")}
                disabled={!pickupLocation || !destination}
              >
                <Car className="mr-2 h-4 w-4" />
                Find Rides
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Wallet</CardTitle>
            <CardDescription>Your payment details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-500">Current Balance</span>
                <div className="text-2xl font-bold">$125.50</div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span>Monthly spending</span>
                  <span className="font-medium">$89.25 / $150</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              
              <div className="pt-2">
                <Button variant="outline" className="w-full" onClick={() => navigate("/rider/payment")}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Manage Payment Methods
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <Card className="md:col-span-7">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg">Recent Rides</CardTitle>
                <CardDescription>Your latest trips</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate("/rider/history")}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRides.map((ride) => (
                <div 
                  key={ride.id} 
                  className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                      <Calendar className="h-3 w-3" />
                      <span>{ride.date}</span>
                    </div>
                    <div className="font-medium">{ride.pickup} to {ride.destination}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{ride.amount}</div>
                    <div className="text-sm text-green-600">{ride.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Ride Statistics</CardTitle>
            <CardDescription>Your riding patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-center h-48">
                <BarChart className="h-full w-full text-gray-300" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-gray-500">Rides This Month</div>
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">89</div>
                  <div className="text-sm text-gray-500">Total Rides</div>
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">4.9</div>
                  <div className="text-sm text-gray-500">Avg. Rating</div>
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">$10.75</div>
                  <div className="text-sm text-gray-500">Avg. Ride Cost</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </RiderLayout>
  );
};

export default RiderDashboard;
