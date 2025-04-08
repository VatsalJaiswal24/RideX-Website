
import React, { useState } from "react";
import StaffLayout from "@/components/layouts/StaffLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Clock, 
  Edit, 
  MapPin, 
  MoreHorizontal, 
  Search, 
  Trash 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Mock ride data
const activeRides = [
  {
    id: "ride-001",
    rider: {
      name: "John Smith",
      image: "https://i.pravatar.cc/150?img=11"
    },
    driver: {
      name: "Dave Driver",
      image: "https://i.pravatar.cc/150?img=2"
    },
    date: "2025-04-08",
    time: "09:15 AM",
    pickup: "123 Main St",
    dropoff: "456 Market St",
    distance: "3.5 miles",
    amount: "$12.50",
    status: "active",
    startTime: "09:10 AM"
  },
  {
    id: "ride-002",
    rider: {
      name: "Emily Johnson",
      image: "https://i.pravatar.cc/150?img=5"
    },
    driver: {
      name: "Sarah Williams",
      image: "https://i.pravatar.cc/150?img=6"
    },
    date: "2025-04-08",
    time: "10:30 AM",
    pickup: "789 Pine St",
    dropoff: "246 Oak Ave",
    distance: "4.2 miles",
    amount: "$15.75",
    status: "active",
    startTime: "10:25 AM"
  }
];

const scheduledRides = [
  {
    id: "ride-003",
    rider: {
      name: "Michael Brown",
      image: "https://i.pravatar.cc/150?img=8"
    },
    driver: {
      name: "Michael Davis",
      image: "https://i.pravatar.cc/150?img=9"
    },
    date: "2025-04-09",
    time: "08:30 AM",
    pickup: "222 Elm St",
    dropoff: "333 Cedar Ave",
    distance: "2.8 miles",
    amount: "$10.25",
    status: "scheduled"
  },
  {
    id: "ride-004",
    rider: {
      name: "Jennifer Lee",
      image: "https://i.pravatar.cc/150?img=18"
    },
    driver: {
      name: "Dave Driver",
      image: "https://i.pravatar.cc/150?img=2"
    },
    date: "2025-04-09",
    time: "03:15 PM",
    pickup: "555 Maple Dr",
    dropoff: "777 Birch Rd",
    distance: "5.5 miles",
    amount: "$18.90",
    status: "scheduled"
  }
];

const completedRides = [
  {
    id: "ride-005",
    rider: {
      name: "Robert Davis",
      image: "https://i.pravatar.cc/150?img=12"
    },
    driver: {
      name: "Sarah Williams",
      image: "https://i.pravatar.cc/150?img=6"
    },
    date: "2025-04-07",
    time: "02:30 PM",
    pickup: "444 Cherry Ln",
    dropoff: "888 Walnut St",
    distance: "3.2 miles",
    amount: "$11.75",
    status: "completed",
    rating: 5
  },
  {
    id: "ride-006",
    rider: {
      name: "Sarah Wilson",
      image: "https://i.pravatar.cc/150?img=20"
    },
    driver: {
      name: "Michael Davis",
      image: "https://i.pravatar.cc/150?img=9"
    },
    date: "2025-04-07",
    time: "11:45 AM",
    pickup: "999 Rose Ave",
    dropoff: "111 Daisy Ln",
    distance: "7.1 miles",
    amount: "$24.50",
    status: "completed",
    rating: 4
  },
  {
    id: "ride-007",
    rider: {
      name: "Jennifer Thompson",
      image: "https://i.pravatar.cc/150?img=9"
    },
    driver: {
      name: "Dave Driver",
      image: "https://i.pravatar.cc/150?img=2"
    },
    date: "2025-04-06",
    time: "10:15 AM",
    pickup: "222 Tulip Dr",
    dropoff: "333 Orchid Ave",
    distance: "2.9 miles",
    amount: "$10.80",
    status: "cancelled"
  }
];

const RideManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedRide, setSelectedRide] = useState<(typeof activeRides)[0] | null>(null);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredActiveRides = activeRides.filter(ride => 
    ride.rider.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    ride.driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ride.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ride.dropoff.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredScheduledRides = scheduledRides.filter(ride => 
    ride.rider.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    ride.driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ride.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ride.dropoff.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredCompletedRides = completedRides.filter(ride => 
    ride.rider.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    ride.driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ride.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ride.dropoff.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleViewDetails = (ride: (typeof activeRides)[0]) => {
    setSelectedRide(ride);
    setShowDetailsDialog(true);
  };
  
  const handleRideAction = (action: string, rideId: string) => {
    switch(action) {
      case "reassign":
        toast.info(`Reassigning ride: ${rideId}`);
        break;
      case "cancel":
        toast.warning(`Cancelling ride: ${rideId}`);
        break;
      case "delete":
        toast.error(`Deleting ride: ${rideId}`);
        break;
      default:
        break;
    }
  };
  
  const getBadgeVariant = (status: string) => {
    switch(status) {
      case "active":
        return "default";
      case "scheduled":
        return "outline";
      case "completed":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  };
  
  return (
    <StaffLayout title="Ride Management">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search rides..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
      </div>
      
      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Rides</CardTitle>
              <CardDescription>
                Currently ongoing rides in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rider</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActiveRides.length > 0 ? (
                    filteredActiveRides.map((ride) => (
                      <TableRow key={ride.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={ride.rider.image} />
                              <AvatarFallback>{ride.rider.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium text-sm">{ride.rider.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={ride.driver.image} />
                              <AvatarFallback>{ride.driver.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium text-sm">{ride.driver.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center text-xs">
                              <Calendar className="mr-1 h-3 w-3" /> {ride.date}
                            </div>
                            <div className="flex items-center text-xs">
                              <Clock className="mr-1 h-3 w-3" /> {ride.time}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center text-xs">
                              <MapPin className="mr-1 h-3 w-3 text-gray-600" /> {ride.pickup}
                            </div>
                            <div className="flex items-center text-xs">
                              <MapPin className="mr-1 h-3 w-3 text-blue-600" /> {ride.dropoff}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{ride.amount}</TableCell>
                        <TableCell>
                          <Badge variant={getBadgeVariant(ride.status)}>
                            {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleViewDetails(ride)}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleRideAction("reassign", ride.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Reassign Driver</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleRideAction("cancel", ride.id)}
                                className="text-red-600"
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Cancel Ride</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                        No active rides found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Rides</CardTitle>
              <CardDescription>
                Upcoming rides that have been scheduled
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rider</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredScheduledRides.length > 0 ? (
                    filteredScheduledRides.map((ride) => (
                      <TableRow key={ride.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={ride.rider.image} />
                              <AvatarFallback>{ride.rider.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium text-sm">{ride.rider.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={ride.driver.image} />
                              <AvatarFallback>{ride.driver.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium text-sm">{ride.driver.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center text-xs">
                              <Calendar className="mr-1 h-3 w-3" /> {ride.date}
                            </div>
                            <div className="flex items-center text-xs">
                              <Clock className="mr-1 h-3 w-3" /> {ride.time}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center text-xs">
                              <MapPin className="mr-1 h-3 w-3 text-gray-600" /> {ride.pickup}
                            </div>
                            <div className="flex items-center text-xs">
                              <MapPin className="mr-1 h-3 w-3 text-blue-600" /> {ride.dropoff}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{ride.amount}</TableCell>
                        <TableCell>
                          <Badge variant={getBadgeVariant(ride.status)}>
                            {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleViewDetails(ride as any)}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleRideAction("reassign", ride.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Reassign Driver</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleRideAction("cancel", ride.id)}
                                className="text-red-600"
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Cancel Ride</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                        No scheduled rides found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Rides</CardTitle>
              <CardDescription>
                History of completed and cancelled rides
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rider</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompletedRides.length > 0 ? (
                    filteredCompletedRides.map((ride) => (
                      <TableRow key={ride.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={ride.rider.image} />
                              <AvatarFallback>{ride.rider.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium text-sm">{ride.rider.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={ride.driver.image} />
                              <AvatarFallback>{ride.driver.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium text-sm">{ride.driver.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center text-xs">
                              <Calendar className="mr-1 h-3 w-3" /> {ride.date}
                            </div>
                            <div className="flex items-center text-xs">
                              <Clock className="mr-1 h-3 w-3" /> {ride.time}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center text-xs">
                              <MapPin className="mr-1 h-3 w-3 text-gray-600" /> {ride.pickup}
                            </div>
                            <div className="flex items-center text-xs">
                              <MapPin className="mr-1 h-3 w-3 text-blue-600" /> {ride.dropoff}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{ride.amount}</TableCell>
                        <TableCell>
                          <Badge variant={getBadgeVariant(ride.status)}>
                            {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleViewDetails(ride as any)}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleRideAction("delete", ride.id)}
                                className="text-red-600"
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Delete Record</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                        No completed rides found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Ride Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ride Details</DialogTitle>
            <DialogDescription>
              Complete information about the selected ride.
            </DialogDescription>
          </DialogHeader>
          {selectedRide && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Rider</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar>
                      <AvatarImage src={selectedRide.rider.image} />
                      <AvatarFallback>{selectedRide.rider.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{selectedRide.rider.name}</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Driver</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar>
                      <AvatarImage src={selectedRide.driver.image} />
                      <AvatarFallback>{selectedRide.driver.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{selectedRide.driver.name}</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p className="mt-1">{selectedRide.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Time</h3>
                  <p className="mt-1">{selectedRide.time}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Pickup Location</h3>
                <p className="mt-1">{selectedRide.pickup}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Dropoff Location</h3>
                <p className="mt-1">{selectedRide.dropoff}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Distance</h3>
                  <p className="mt-1">{selectedRide.distance}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                  <p className="mt-1 font-semibold">{selectedRide.amount}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <Badge 
                    className="mt-1" 
                    variant={getBadgeVariant(selectedRide.status)}
                  >
                    {selectedRide.status.charAt(0).toUpperCase() + selectedRide.status.slice(1)}
                  </Badge>
                </div>
              </div>
              
              {'startTime' in selectedRide && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Started At</h3>
                  <p className="mt-1">{selectedRide.startTime}</p>
                </div>
              )}
              
              {'rating' in selectedRide && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Rating</h3>
                  <p className="mt-1">★ {(selectedRide as any).rating}/5</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowDetailsDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </StaffLayout>
  );
};

export default RideManagement;
