
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { ArrowDown, ArrowUp, DollarSign, MapPin, Users } from "lucide-react";

// Mock data for analytics
const revenueData = [
  { name: "Jan", value: 15000 },
  { name: "Feb", value: 18000 },
  { name: "Mar", value: 22000 },
  { name: "Apr", value: 28000 },
  { name: "May", value: 33000 },
  { name: "Jun", value: 40000 },
  { name: "Jul", value: 45000 },
  { name: "Aug", value: 42000 },
  { name: "Sep", value: 48000 },
  { name: "Oct", value: 51000 },
  { name: "Nov", value: 55000 },
  { name: "Dec", value: 60000 },
];

const ridesData = [
  { name: "Jan", rides: 450 },
  { name: "Feb", rides: 520 },
  { name: "Mar", rides: 610 },
  { name: "Apr", rides: 780 },
  { name: "May", rides: 890 },
  { name: "Jun", rides: 1050 },
  { name: "Jul", rides: 1200 },
  { name: "Aug", rides: 1150 },
  { name: "Sep", rides: 1300 },
  { name: "Oct", rides: 1420 },
  { name: "Nov", rides: 1500 },
  { name: "Dec", rides: 1650 },
];

const weeklyRidesData = [
  { name: "Mon", completed: 145, cancelled: 12 },
  { name: "Tue", completed: 132, cancelled: 8 },
  { name: "Wed", completed: 148, cancelled: 10 },
  { name: "Thu", completed: 167, cancelled: 15 },
  { name: "Fri", completed: 195, cancelled: 18 },
  { name: "Sat", completed: 210, cancelled: 20 },
  { name: "Sun", completed: 178, cancelled: 16 },
];

const ridesByLocationData = [
  { name: "Downtown", value: 35 },
  { name: "Uptown", value: 25 },
  { name: "Midtown", value: 20 },
  { name: "Suburbs", value: 15 },
  { name: "Airport", value: 5 },
];

const userGrowthData = [
  { name: "Jan", riders: 1200, drivers: 180 },
  { name: "Feb", riders: 1350, drivers: 210 },
  { name: "Mar", riders: 1500, drivers: 240 },
  { name: "Apr", riders: 1680, drivers: 265 },
  { name: "May", riders: 1850, drivers: 290 },
  { name: "Jun", riders: 2100, drivers: 320 },
  { name: "Jul", riders: 2300, drivers: 350 },
  { name: "Aug", riders: 2450, drivers: 380 },
  { name: "Sep", riders: 2600, drivers: 410 },
  { name: "Oct", riders: 2850, drivers: 450 },
  { name: "Nov", riders: 3100, drivers: 480 },
  { name: "Dec", riders: 3400, drivers: 510 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const Analytics = () => {
  const [timeframe, setTimeframe] = useState("year");
  
  // Calculate summary statistics
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.value, 0);
  const totalRides = ridesData.reduce((sum, item) => sum + item.rides, 0);
  const avgRidesPerMonth = Math.round(totalRides / ridesData.length);
  const totalUsers = userGrowthData[userGrowthData.length - 1].riders + userGrowthData[userGrowthData.length - 1].drivers;
  
  return (
    <StaffLayout title="Analytics Dashboard">
      <div className="flex justify-end mb-4">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-1">${totalRevenue.toLocaleString()}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm text-green-600">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>12.5% from previous {timeframe}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Rides</p>
                <h3 className="text-2xl font-bold mt-1">{totalRides.toLocaleString()}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm text-green-600">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>8.3% from previous {timeframe}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Rides/Month</p>
                <h3 className="text-2xl font-bold mt-1">{avgRidesPerMonth.toLocaleString()}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm text-green-600">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>5.7% from previous {timeframe}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <h3 className="text-2xl font-bold mt-1">{totalUsers.toLocaleString()}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm text-red-600">
              <ArrowDown className="h-4 w-4 mr-1" />
              <span>2.1% decrease in driver growth</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="revenue">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="rides">Rides</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>
                  Monthly revenue over the {timeframe}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      fill="#93c5fd" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>
                  Revenue sources
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Regular Rides", value: 65 },
                        { name: "Premium Rides", value: 25 },
                        { name: "Subscription", value: 10 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { name: "Regular Rides", value: 65 },
                        { name: "Premium Rides", value: 25 },
                        { name: "Subscription", value: 10 },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Revenue Proportion"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue per Quarter</CardTitle>
                <CardDescription>
                  Quarterly performance
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Q1", value: revenueData.slice(0, 3).reduce((sum, item) => sum + item.value, 0) },
                      { name: "Q2", value: revenueData.slice(3, 6).reduce((sum, item) => sum + item.value, 0) },
                      { name: "Q3", value: revenueData.slice(6, 9).reduce((sum, item) => sum + item.value, 0) },
                      { name: "Q4", value: revenueData.slice(9, 12).reduce((sum, item) => sum + item.value, 0) },
                    ]}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="rides">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Ride Trends</CardTitle>
                <CardDescription>
                  Monthly rides over the {timeframe}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={ridesData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="rides"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Weekly Performance</CardTitle>
                <CardDescription>
                  Rides completed vs cancelled
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyRidesData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#4ade80" />
                    <Bar dataKey="cancelled" fill="#f87171" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Ride Types</CardTitle>
                <CardDescription>
                  Distribution by ride category
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Standard", value: 70 },
                        { name: "Premium", value: 20 },
                        { name: "Shared", value: 10 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { name: "Standard", value: 70 },
                        { name: "Premium", value: 20 },
                        { name: "Shared", value: 10 },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Proportion"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>
                  Growth of riders and drivers over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={userGrowthData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="riders"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="drivers"
                      stroke="#82ca9d"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>
                  Breakdown by user type
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Riders", value: 85 },
                        { name: "Drivers", value: 15 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill="#8884d8" />
                      <Cell fill="#82ca9d" />
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Proportion"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Acquisition</CardTitle>
                <CardDescription>
                  New users by acquisition channel
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Organic", value: 42 },
                      { name: "Referral", value: 28 },
                      { name: "Social", value: 18 },
                      { name: "Ads", value: 12 },
                    ]}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                    <Bar dataKey="value" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="locations">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Popular Ride Locations</CardTitle>
                <CardDescription>
                  Distribution of rides by location
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={ridesByLocationData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                    <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Peak Hours by Location</CardTitle>
                <CardDescription>
                  When each location is busiest
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] pt-0">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Downtown</span>
                      <span className="font-medium">8-9 AM, 5-6 PM</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Uptown</span>
                      <span className="font-medium">7-8 PM, 10-11 PM</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Midtown</span>
                      <span className="font-medium">12-1 PM, 6-7 PM</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Suburbs</span>
                      <span className="font-medium">7-8 AM, 6-7 PM</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "55%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Airport</span>
                      <span className="font-medium">5-7 AM, 9-11 PM</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Trip Duration by Location</CardTitle>
                <CardDescription>
                  Average ride time by area
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Downtown", value: 18 },
                      { name: "Uptown", value: 22 },
                      { name: "Midtown", value: 15 },
                      { name: "Suburbs", value: 28 },
                      { name: "Airport", value: 35 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} mins`, "Average Time"]} />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </StaffLayout>
  );
};

export default Analytics;
