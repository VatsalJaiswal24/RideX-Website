
import React, { useState } from "react";
import DriverLayout from "@/components/layouts/DriverLayout";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock earnings data
const weeklyEarnings = [
  { day: "Mon", amount: 45.50 },
  { day: "Tue", amount: 68.75 },
  { day: "Wed", amount: 52.20 },
  { day: "Thu", amount: 75.80 },
  { day: "Fri", amount: 120.50 },
  { day: "Sat", amount: 145.25 },
  { day: "Sun", amount: 98.30 },
];

const monthlyEarnings = [
  { name: "Week 1", value: 428.50 },
  { name: "Week 2", value: 562.75 },
  { name: "Week 3", value: 498.30 },
  { name: "Week 4", value: 605.25 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const recentPayouts = [
  {
    id: "payout-001",
    date: "2025-04-01",
    amount: "$525.80",
    rides: 18,
    status: "completed"
  },
  {
    id: "payout-002",
    date: "2025-03-15",
    amount: "$612.45",
    rides: 22,
    status: "completed"
  },
  {
    id: "payout-003",
    date: "2025-03-01",
    amount: "$498.30",
    rides: 16,
    status: "completed"
  },
];

const Earnings = () => {
  const [timeframe, setTimeframe] = useState("weekly");
  
  const totalWeeklyEarnings = weeklyEarnings.reduce((sum, day) => sum + day.amount, 0).toFixed(2);
  const totalMonthlyEarnings = monthlyEarnings.reduce((sum, week) => sum + week.value, 0).toFixed(2);
  
  const currentEarnings = timeframe === "weekly" ? totalWeeklyEarnings : totalMonthlyEarnings;
  
  return (
    <DriverLayout title="Your Earnings">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Earnings Overview</CardTitle>
              <CardDescription>
                Your {timeframe} earnings at a glance
              </CardDescription>
            </div>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="h-[300px]">
            {timeframe === "weekly" ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weeklyEarnings}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, "Earnings"]}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#0070f3"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col md:flex-row items-center justify-center gap-8">
                <ResponsiveContainer width="50%" height="100%">
                  <PieChart>
                    <Pie
                      data={monthlyEarnings}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {monthlyEarnings.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, "Earnings"]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-2">
                  {monthlyEarnings.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span>
                        {entry.name}: ${entry.value.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
            <CardDescription>
              {timeframe === "weekly" ? "This week" : "This month"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">${currentEarnings}</div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Rides Completed:</span>
                <span className="font-semibold">{timeframe === "weekly" ? "28" : "92"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Avg. per Ride:</span>
                <span className="font-semibold">
                  ${(timeframe === "weekly" ? Number(totalWeeklyEarnings) / 28 : Number(totalMonthlyEarnings) / 92).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Next Payout:</span>
                <span className="font-semibold">Apr 15, 2025</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Payouts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Rides</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPayouts.map((payout) => (
                <TableRow key={payout.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                      {payout.date}
                    </div>
                  </TableCell>
                  <TableCell>{payout.rides} rides</TableCell>
                  <TableCell className="font-semibold">{payout.amount}</TableCell>
                  <TableCell className="capitalize text-green-600">
                    {payout.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DriverLayout>
  );
};

export default Earnings;
