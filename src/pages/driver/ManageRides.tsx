
import React, { useState } from "react";
import DriverLayout from "@/components/layouts/DriverLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

// Mock rides data
const upcomingRides = [
  {
    id: "req-001",
    riderName: "John Smith",
    riderImage: "https://i.pravatar.cc/150?img=11",
    date: "2025-04-09",
    time: "08:30 AM",
    pickup: "123 Main St",
    dropoff: "456 Market St",
    distance: "3.5 miles",
    amount: "$12.50",
    status: "accepted"
  },
  {
    id: "req-002",
    riderName: "Emily Johnson",
    riderImage: "https://i.pravatar.cc/150?img=5",
    date: "2025-04-09",
    time: "10:15 AM",
    pickup: "789 Oak Ave",
    dropoff: "101 Pine St",
    distance: "5.2 miles",
    amount: "$18.75",
    status: "accepted"
  }
];

const pendingRequests = [
  {
    id: "req-003",
    riderName: "Michael Brown",
    riderImage: "https://i.pravatar.cc/150?img=8",
    date: "2025-04-10",
    time: "09:00 AM",
    pickup: "222 Cedar St",
    dropoff: "333 Elm St",
    distance: "4.7 miles",
    amount: "$16.25",
    status: "pending"
  }
];

const rideHistory = [
  {
    id: "ride-001",
    riderName: "Sarah Wilson",
    riderImage: "https://i.pravatar.cc/150?img=20",
    date: "2025-04-07",
    time: "08:45 AM",
    pickup: "444 Maple Ave",
    dropoff: "555 Cherry St",
    distance: "6.3 miles",
    amount: "$22.80",
    status: "completed"
  },
  {
    id: "ride-002",
    riderName: "Robert Davis",
    riderImage: "https://i.pravatar.cc/150?img=12",
    date: "2025-04-06",
    time: "02:30 PM",
    pickup: "666 Walnut St",
    dropoff: "777 Chestnut St",
    distance: "2.8 miles",
    amount: "$10.50",
    status: "completed"
  },
  {
    id: "ride-003",
    riderName: "Jennifer Thompson",
    riderImage: "https://i.pravatar.cc/150?img=9",
    date: "2025-04-05",
    time: "11:15 AM",
    pickup: "888 Birch Ln",
    dropoff: "999 Ash St",
    distance: "3.9 miles",
    amount: "$14.25",
    status: "cancelled"
  }
];

const ManageRides = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const handleAcceptRequest = (requestId: string) => {
    toast.success("Ride request accepted!");
    // In a real app, you would update the status in your database
  };
  
  const handleDeclineRequest = (requestId: string) => {
    toast.info("Ride request declined.");
    // In a real app, you would update the status in your database
  };
  
  const handleStartRide = (rideId: string) => {
    toast.success("Ride started! Navigate to pickup location.");
    // In a real app, you would update the ride status
  };
  
  const handleCompleteRide = (rideId: string) => {
    toast.success("Ride completed! Payment processed.");
    // In a real app, you would update the ride status
  };
  
  const handleCancelRide = (rideId: string) => {
    toast.error("Ride cancelled.");
    // In a real app, you would update the ride status
  };
  
  return (
    <DriverLayout title="Manage Rides">
      <Tabs defaultValue="upcoming" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Rides</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingRides.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rider</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingRides.map((ride) => (
                      <TableRow key={ride.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={ride.riderImage} />
                              <AvatarFallback>{ride.riderName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{ride.riderName}</div>
                              <Button variant="ghost" size="sm" className="h-6 p-0 text-primary">
                                <Phone className="h-3 w-3 mr-1" /> Call
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center text-sm">
                              <Calendar className="mr-1 h-3 w-3" /> {ride.date}
                            </div>
                            <div className="flex items-center text-sm">
                              <Clock className="mr-1 h-3 w-3" /> {ride.time}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center text-sm">
                              <MapPin className="mr-1 h-3 w-3 text-gray-600" /> {ride.pickup}
                            </div>
                            <div className="flex items-center text-sm">
                              <MapPin className="mr-1 h-3 w-3 text-blue-600" /> {ride.dropoff}
                            </div>
                            <div className="text-xs text-gray-500">{ride.distance}</div>
                          </div>
                        </TableCell>
                        <TableCell>{ride.amount}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleStartRide(ride.id)}
                            >
                              Start Ride
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleCancelRide(ride.id)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No upcoming rides scheduled.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Pending Ride Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingRequests.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rider</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={request.riderImage} />
                              <AvatarFallback>{request.riderName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{request.riderName}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center text-sm">
                              <Calendar className="mr-1 h-3 w-3" /> {request.date}
                            </div>
                            <div className="flex items-center text-sm">
                              <Clock className="mr-1 h-3 w-3" /> {request.time}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center text-sm">
                              <MapPin className="mr-1 h-3 w-3 text-gray-600" /> {request.pickup}
                            </div>
                            <div className="flex items-center text-sm">
                              <MapPin className="mr-1 h-3 w-3 text-blue-600" /> {request.dropoff}
                            </div>
                            <div className="text-xs text-gray-500">{request.distance}</div>
                          </div>
                        </TableCell>
                        <TableCell>{request.amount}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-2">
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleAcceptRequest(request.id)}
                            >
                              Accept
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => handleDeclineRequest(request.id)}
                            >
                              Decline
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No pending ride requests.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Ride History</CardTitle>
            </CardHeader>
            <CardContent>
              {rideHistory.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rider</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rideHistory.map((ride) => (
                      <TableRow key={ride.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={ride.riderImage} />
                              <AvatarFallback>{ride.riderName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{ride.riderName}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center text-sm">
                              <Calendar className="mr-1 h-3 w-3" /> {ride.date}
                            </div>
                            <div className="flex items-center text-sm">
                              <Clock className="mr-1 h-3 w-3" /> {ride.time}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center text-sm">
                              <MapPin className="mr-1 h-3 w-3 text-gray-600" /> {ride.pickup}
                            </div>
                            <div className="flex items-center text-sm">
                              <MapPin className="mr-1 h-3 w-3 text-blue-600" /> {ride.dropoff}
                            </div>
                            <div className="text-xs text-gray-500">{ride.distance}</div>
                          </div>
                        </TableCell>
                        <TableCell>{ride.amount}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              ride.status === "completed" 
                                ? "default" 
                                : ride.status === "cancelled" 
                                  ? "destructive" 
                                  : "outline"
                            }
                          >
                            {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No ride history available.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DriverLayout>
  );
};

export default ManageRides;
