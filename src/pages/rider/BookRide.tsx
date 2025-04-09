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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Calendar,
  Car, 
  Clock, 
  CreditCard, 
  MapPin, 
  Route, 
  Star, 
  Users 
} from "lucide-react";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

// Mock ride options
const rideOptions = [
  {
    id: "ride-1",
    type: "Standard",
    price: 950,
    time: "3 min away",
    seats: 4,
    icon: <Car className="h-8 w-8" />
  },
  {
    id: "ride-2",
    type: "Premium",
    price: 1450,
    time: "5 min away",
    seats: 4,
    icon: <Car className="h-8 w-8" />
  },
  {
    id: "ride-3",
    type: "XL",
    price: 1890,
    time: "8 min away",
    seats: 6,
    icon: <Users className="h-8 w-8" />
  }
];

// Mock drivers
const availableDrivers = [
  {
    id: "driver-1",
    name: "Rajesh Kumar",
    car: "Maruti Swift",
    plate: "MH02 AB1234",
    rating: 4.9,
    price: 950,
    eta: "3 min away",
    imgUrl: "https://i.pravatar.cc/150?img=60"
  },
  {
    id: "driver-2",
    name: "Sunil Verma",
    car: "Hyundai i20",
    plate: "DL01 XY7890",
    rating: 4.8,
    price: 1025,
    eta: "6 min away",
    imgUrl: "https://i.pravatar.cc/150?img=32"
  },
  {
    id: "driver-3",
    name: "Amit Patel",
    car: "Honda City",
    plate: "KA05 MN4567",
    rating: 4.7,
    price: 980,
    eta: "8 min away",
    imgUrl: "https://i.pravatar.cc/150?img=69"
  }
];

const BookRide = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedTab, setSelectedTab] = useState("now");
  const [selectedRide, setSelectedRide] = useState<string | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  
  const handleBookRide = () => {
    if (!pickup || !destination) {
      toast.error("Please enter pickup and destination locations");
      return;
    }
    
    if (selectedTab === "schedule" && (!scheduledDate || !scheduledTime)) {
      toast.error("Please select date and time for scheduled ride");
      return;
    }
    
    if (!selectedRide && !selectedDriver) {
      toast.error("Please select a ride or driver");
      return;
    }
    
    setIsBookingConfirmed(true);
  };
  
  const handleConfirmRide = () => {
    setIsBookingConfirmed(false);
    
    toast.success("Ride booked successfully!");
    
    setPickup("");
    setDestination("");
    setSelectedRide(null);
    setSelectedDriver(null);
    setScheduledDate("");
    setScheduledTime("");
  };
  
  return (
    <RiderLayout title="Book a Ride">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Ride Details</CardTitle>
              <CardDescription>
                Enter your pickup and destination locations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                  <div className="w-0.5 h-16 bg-gray-300 my-1"></div>
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pickup Location</label>
                    <div className="flex">
                      <Input
                        placeholder="Enter pickup location"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        variant="ghost"
                        className="ml-2"
                        onClick={() => setPickup("Current Location")}
                      >
                        <MapPin className="h-4 w-4 text-primary" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Destination</label>
                    <Input
                      placeholder="Enter destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="now" value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="now">Ride Now</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>
                <TabsContent value="now" className="pt-4">
                  <div className="text-center text-sm text-gray-500">
                    Your ride will arrive as soon as possible
                  </div>
                </TabsContent>
                <TabsContent value="schedule" className="pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date</label>
                      <div className="flex">
                        <Input
                          type="date"
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                          className="flex-1"
                          min={new Date().toISOString().split('T')[0]}
                        />
                        <Button 
                          variant="ghost"
                          className="ml-2"
                        >
                          <Calendar className="h-4 w-4 text-primary" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time</label>
                      <div className="flex">
                        <Input
                          type="time"
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                          className="flex-1"
                        />
                        <Button 
                          variant="ghost"
                          className="ml-2"
                        >
                          <Clock className="h-4 w-4 text-primary" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Select Ride Type</CardTitle>
              <CardDescription>
                Choose from available ride options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rideOptions.map((option) => (
                  <div 
                    key={option.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedRide === option.id ? 'border-primary bg-primary-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setSelectedRide(option.id);
                      setSelectedDriver(null);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-gray-100 p-3 rounded-full mr-4">
                          {option.icon}
                        </div>
                        <div>
                          <div className="font-medium">{option.type}</div>
                          <div className="text-sm text-gray-500">
                            {option.time} • {option.seats} seats
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold">₹{option.price.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Available Drivers</CardTitle>
              <CardDescription>
                Select a specific driver for your ride
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableDrivers.map((driver) => (
                  <div 
                    key={driver.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedDriver === driver.id ? 'border-primary bg-primary-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setSelectedDriver(driver.id);
                      setSelectedRide(null);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img 
                          src={driver.imgUrl} 
                          alt={driver.name} 
                          className="w-12 h-12 rounded-full mr-4 object-cover"
                        />
                        <div>
                          <div className="font-medium">{driver.name}</div>
                          <div className="text-sm text-gray-500">
                            {driver.car} • {driver.plate}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Star className="h-3 w-3 text-yellow-500 mr-1 fill-yellow-500" />
                            {driver.rating} • {driver.eta}
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold">₹{driver.price.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-xl">Ride Summary</CardTitle>
              <CardDescription>
                Review your ride details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {(pickup && destination) ? (
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Pickup</div>
                    <div className="font-medium flex items-center">
                      <MapPin className="h-4 w-4 text-primary mr-1" />
                      {pickup}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Destination</div>
                    <div className="font-medium flex items-center">
                      <Route className="h-4 w-4 text-primary mr-1" />
                      {destination}
                    </div>
                  </div>
                  
                  {selectedTab === "schedule" && scheduledDate && scheduledTime && (
                    <div>
                      <div className="text-sm text-gray-500">Scheduled Time</div>
                      <div className="font-medium flex items-center">
                        <Calendar className="h-4 w-4 text-primary mr-1" />
                        {new Date(scheduledDate).toLocaleDateString()} at {scheduledTime}
                      </div>
                    </div>
                  )}
                  
                  {selectedRide && (
                    <div>
                      <div className="text-sm text-gray-500">Ride Type</div>
                      <div className="font-medium">
                        {rideOptions.find(option => option.id === selectedRide)?.type}
                      </div>
                    </div>
                  )}
                  
                  {selectedDriver && (
                    <div>
                      <div className="text-sm text-gray-500">Driver</div>
                      <div className="font-medium">
                        {availableDrivers.find(driver => driver.id === selectedDriver)?.name}
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm">Ride Fare</div>
                      <div className="font-medium">
                        ₹{selectedRide 
                          ? rideOptions.find(option => option.id === selectedRide)?.price.toFixed(2)
                          : selectedDriver
                            ? availableDrivers.find(driver => driver.id === selectedDriver)?.price.toFixed(2)
                            : '0.00'
                        }
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm">Service Fee</div>
                      <div className="font-medium">₹99.00</div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t mt-2">
                      <div className="font-medium">Total</div>
                      <div className="font-bold text-lg">
                        ₹{selectedRide 
                          ? (rideOptions.find(option => option.id === selectedRide)?.price || 0 + 99).toFixed(2)
                          : selectedDriver
                            ? (availableDrivers.find(driver => driver.id === selectedDriver)?.price || 0 + 99).toFixed(2)
                            : '0.00'
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Route className="h-16 w-16 mx-auto text-gray-300 mb-2" />
                  <h3 className="text-lg font-medium mb-1">No ride details yet</h3>
                  <p className="text-sm">
                    Enter your pickup and destination locations to see a summary of your ride.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="w-full flex items-center space-x-2 text-sm text-gray-500">
                <CreditCard className="h-4 w-4" />
                <span>Payment: UPI / Wallet</span>
                <Button variant="link" className="ml-auto p-0 h-auto">
                  Change
                </Button>
              </div>
              
              <Button 
                className="w-full bg-primary"
                disabled={!pickup || !destination || (!selectedRide && !selectedDriver)}
                onClick={handleBookRide}
              >
                Book Ride
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Dialog open={isBookingConfirmed} onOpenChange={setIsBookingConfirmed}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Ride</DialogTitle>
            <DialogDescription>
              Review the details of your ride before confirming
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Pickup</div>
              <div className="font-medium">{pickup}</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Destination</div>
              <div className="font-medium">{destination}</div>
            </div>
            
            {selectedTab === "schedule" && scheduledDate && scheduledTime && (
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Scheduled Time</div>
                <div className="font-medium">
                  {new Date(scheduledDate).toLocaleDateString()} at {scheduledTime}
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                {selectedRide ? "Ride Type" : "Driver"}
              </div>
              <div className="font-medium">
                {selectedRide 
                  ? rideOptions.find(option => option.id === selectedRide)?.type
                  : availableDrivers.find(driver => driver.id === selectedDriver)?.name
                }
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Total Cost</div>
              <div className="font-bold text-lg">
                ₹{selectedRide 
                  ? (rideOptions.find(option => option.id === selectedRide)?.price || 0 + 99).toFixed(2)
                  : selectedDriver
                    ? (availableDrivers.find(driver => driver.id === selectedDriver)?.price || 0 + 99).toFixed(2)
                    : '0.00'
                }
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingConfirmed(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmRide}>
              Confirm Ride
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </RiderLayout>
  );
};

export default BookRide;
