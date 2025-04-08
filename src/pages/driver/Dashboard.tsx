
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DriverLayout from "@/components/layouts/DriverLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, Calendar, Clock, DollarSign, MapPin, ToggleLeft, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Mock ride requests
const pendingRides = [
  {
    id: "request-1",
    rider: "Emma Wilson",
    pickup: "Downtown, Main St",
    destination: "Airport Terminal 2",
    distance: "12.5 miles",
    fare: "$28.50",
    time: "15 min away"
  },
  {
    id: "request-2",
    rider: "James Brown",
    pickup: "Central Park",
    destination: "Grand Central Station",
    distance: "3.2 miles",
    fare: "$12.75",
    time: "5 min away"
  }
];

const DriverDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  
  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    toast.success(isOnline ? "You are now offline" : "You are now online and accepting rides");
  };
  
  const handleAcceptRide = (rideId: string) => {
    toast.success("Ride accepted! Navigate to the pickup location.");
    // In a real app, this would update the database and notify the rider
  };
  
  const handleDeclineRide = (rideId: string) => {
    toast.info("Ride declined");
    // In a real app, this would update the database and remove from the list
  };
  
  return (
    <DriverLayout title="Driver Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        <Card className="md:col-span-8">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg">Driver Status</CardTitle>
                <CardDescription>Control your availability</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
                <Switch checked={isOnline} onCheckedChange={handleToggleOnline} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-gray-500 text-sm mb-1">Current Location</div>
                  <div className="font-medium flex items-center justify-center">
                    <MapPin className="h-4 w-4 mr-1 text-primary" /> 
                    Downtown Area
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-gray-500 text-sm mb-1">Today's Earnings</div>
                  <div className="font-medium flex items-center justify-center">
                    <DollarSign className="h-4 w-4 mr-1 text-primary" /> 
                    $85.25
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-gray-500 text-sm mb-1">Online Hours</div>
                  <div className="font-medium flex items-center justify-center">
                    <Clock className="h-4 w-4 mr-1 text-primary" /> 
                    4h 25m
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between mb-1 text-sm">
                  <span>Daily Goal Progress</span>
                  <span>$85.25 / $150.00</span>
                </div>
                <Progress value={57} className="h-2" />
              </div>
            </div>
            
            {isOnline && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Nearby Ride Requests</h3>
                <div className="space-y-4">
                  {pendingRides.map((ride) => (
                    <div 
                      key={ride.id} 
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between mb-3">
                        <div className="flex items-center">
                          <User className="h-5 w-5 mr-2 text-gray-500" />
                          <span className="font-medium">{ride.rider}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          <Clock className="h-4 w-4 inline mr-1" />
                          {ride.time}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                        <div>
                          <div className="text-xs text-gray-500">Pickup</div>
                          <div className="text-sm">{ride.pickup}</div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-gray-500">Destination</div>
                          <div className="text-sm">{ride.destination}</div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-gray-500">Fare</div>
                          <div className="text-sm font-medium">{ride.fare}</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeclineRide(ride.id)}
                        >
                          Decline
                        </Button>
                        <Button 
                          className="bg-primary"
                          size="sm"
                          onClick={() => handleAcceptRide(ride.id)}
                        >
                          Accept
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="md:col-span-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Today's Summary</CardTitle>
            <CardDescription>Your daily activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-sm text-gray-500">Total Rides</div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">37.2</div>
                  <div className="text-sm text-gray-500">Miles Driven</div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">4.9</div>
                  <div className="text-sm text-gray-500">Rating</div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">3</div>
                  <div className="text-sm text-gray-500">Hours Online</div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="w-full bg-primary" onClick={() => navigate("/driver/earnings")}>
                  <DollarSign className="mr-2 h-4 w-4" />
                  View Detailed Earnings
                </Button>
              </div>
              
              <div className="border-t pt-4 mt-2">
                <h4 className="text-sm font-medium mb-2">Recent Notifications</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-2 rounded-md bg-gray-50">
                    <Bell className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">New promotion available</div>
                      <div className="text-xs text-gray-500">Complete 10 rides to earn a $25 bonus</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 p-2 rounded-md bg-gray-50">
                    <Calendar className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">Weekly summary ready</div>
                      <div className="text-xs text-gray-500">Your earnings report for last week is available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Upcoming Schedule</CardTitle>
              <CardDescription>Pre-booked rides</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate("/driver/rides")}>
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <ToggleLeft className="h-16 w-16 mx-auto text-gray-300 mb-2" />
            <h3 className="text-lg font-medium mb-1">No upcoming rides</h3>
            <p className="text-sm max-w-md mx-auto">
              You don't have any pre-booked rides. Turn on your availability to start receiving ride requests.
            </p>
          </div>
        </CardContent>
      </Card>
    </DriverLayout>
  );
};

export default DriverDashboard;
