import React, { useState } from "react";
import RiderLayout from "@/components/layouts/RiderLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar, Clock, MapPin } from "lucide-react";

// Mock ride history data
const rideHistoryData = [
  {
    id: "ride-001",
    date: "2025-04-07",
    time: "09:15 AM",
    from: "Home",
    to: "Office",
    driver: "Rahul Sharma",
    amount: "₹950.00",
    status: "completed"
  },
  {
    id: "ride-002",
    date: "2025-04-05",
    time: "06:30 PM",
    from: "Office",
    to: "Home",
    driver: "Vikram Singh",
    amount: "₹1250.00",
    status: "completed"
  },
  {
    id: "ride-003",
    date: "2025-04-03",
    time: "08:00 PM",
    from: "Home",
    to: "Restaurant",
    driver: "Arjun Mehta",
    amount: "₹980.00",
    status: "completed"
  },
  {
    id: "ride-004",
    date: "2025-04-01",
    time: "07:45 AM",
    from: "Home",
    to: "Gym",
    driver: "Deepak Gupta",
    amount: "₹850.00",
    status: "cancelled"
  }
];

const RideHistory = () => {
  const [filter, setFilter] = useState("all");
  
  const filteredRides = filter === "all" 
    ? rideHistoryData 
    : rideHistoryData.filter(ride => ride.status === filter);
  
  return (
    <RiderLayout title="Ride History">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Your Past Rides</CardTitle>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rides</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRides.length > 0 ? (
                filteredRides.map((ride) => (
                  <TableRow key={ride.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="mr-1 h-3 w-3" /> {ride.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="mr-1 h-3 w-3" /> {ride.time}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-1 h-3 w-3 text-gray-600" /> From: {ride.from}
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-1 h-3 w-3 text-blue-600" /> To: {ride.to}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{ride.driver}</TableCell>
                    <TableCell className="font-medium">{ride.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={ride.status === "completed" ? "default" : "destructive"}
                      >
                        {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                    No rides found matching your filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </RiderLayout>
  );
};

export default RideHistory;
