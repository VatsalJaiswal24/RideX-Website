
import { useNavigate } from "react-router-dom";
import StaffLayout from "@/components/layouts/StaffLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Calendar, 
  Car, 
  CreditCard, 
  DollarSign, 
  MapPin,
  Star, 
  TrendingUp, 
  Users 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock data
const recentUsers = [
  {
    id: "u1",
    name: "Michael Smith",
    type: "Rider",
    status: "Active",
    joined: "Today"
  },
  {
    id: "u2",
    name: "Sarah Johnson",
    type: "Driver",
    status: "Pending Approval",
    joined: "Yesterday"
  },
  {
    id: "u3",
    name: "Robert Williams",
    type: "Rider",
    status: "Active",
    joined: "3 days ago"
  }
];

const platformStats = [
  {
    title: "Total Users",
    value: "5,247",
    change: "+12%",
    icon: <Users className="h-5 w-5 text-primary" />
  },
  {
    title: "Total Rides",
    value: "18,392",
    change: "+8%",
    icon: <Car className="h-5 w-5 text-primary" />
  },
  {
    title: "Revenue",
    value: "$54,281",
    change: "+15%",
    icon: <DollarSign className="h-5 w-5 text-primary" />
  },
  {
    title: "Avg. Rating",
    value: "4.8/5",
    change: "+0.2",
    icon: <Star className="h-5 w-5 text-primary" />
  }
];

const StaffDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <StaffLayout title="Staff Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {platformStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-full bg-primary-50">
                  {stat.icon}
                </div>
                <div className="flex items-center px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg">Platform Activity</CardTitle>
                <CardDescription>Rides and revenue over time</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate("/staff/analytics")}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Full Analytics
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72 flex items-center justify-center text-gray-500">
              <BarChart3 className="h-full w-full text-gray-300" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg">Recent Users</CardTitle>
                <CardDescription>New platform registrations</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate("/staff/users")}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div 
                  key={user.id} 
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">
                      {user.type} • {user.joined}
                    </div>
                  </div>
                  <div className={`text-sm px-2 py-1 rounded-full ${
                    user.status === "Active" 
                      ? "bg-green-50 text-green-700" 
                      : "bg-yellow-50 text-yellow-700"
                  }`}>
                    {user.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Rides</CardTitle>
            <CardDescription>Current rides in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between mb-2">
                  <div className="text-sm font-medium">Ride #42851</div>
                  <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                    In Progress
                  </div>
                </div>
                <div className="text-sm mb-2">
                  <span className="text-gray-500">Driver:</span> John Driver
                </div>
                <div className="text-sm mb-2">
                  <span className="text-gray-500">Rider:</span> Alice Rider
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    Downtown
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="h-3 w-3 mr-1" />
                    $15.25
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between mb-2">
                  <div className="text-sm font-medium">Ride #42850</div>
                  <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                    In Progress
                  </div>
                </div>
                <div className="text-sm mb-2">
                  <span className="text-gray-500">Driver:</span> Sarah Driver
                </div>
                <div className="text-sm mb-2">
                  <span className="text-gray-500">Rider:</span> Bob Rider
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    Airport
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="h-3 w-3 mr-1" />
                    $28.50
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={() => navigate("/staff/rides")}>
                Manage All Rides
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Verification Queue</CardTitle>
            <CardDescription>Pending driver approvals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between mb-2">
                  <div className="text-sm font-medium">Mark Johnson</div>
                  <div className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full">
                    Pending
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  Submitted 2 days ago
                </div>
                <div className="flex space-x-2 mt-3">
                  <Button 
                    variant="outline" 
                    className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 flex-1"
                    size="sm"
                  >
                    Reject
                  </Button>
                  <Button 
                    className="bg-primary flex-1"
                    size="sm"
                  >
                    Approve
                  </Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between mb-2">
                  <div className="text-sm font-medium">Lisa Thompson</div>
                  <div className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full">
                    Pending
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  Submitted 3 days ago
                </div>
                <div className="flex space-x-2 mt-3">
                  <Button 
                    variant="outline" 
                    className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 flex-1"
                    size="sm"
                  >
                    Reject
                  </Button>
                  <Button 
                    className="bg-primary flex-1"
                    size="sm"
                  >
                    Approve
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={() => navigate("/staff/users")}>
                View All Verifications
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">System Health</CardTitle>
            <CardDescription>Platform performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Server Uptime</span>
                  <span className="font-medium">99.9%</span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>API Performance</span>
                  <span className="font-medium">94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Database Load</span>
                  <span className="font-medium">62%</span>
                </div>
                <Progress value={62} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>App Rating</span>
                  <span className="font-medium">4.8/5</span>
                </div>
                <Progress value={96} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">152</div>
                  <div className="text-xs text-gray-500">Active Drivers</div>
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">1.2k</div>
                  <div className="text-xs text-gray-500">Active Riders</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StaffLayout>
  );
};

export default StaffDashboard;
