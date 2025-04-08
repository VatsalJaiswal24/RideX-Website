
import React, { useState } from "react";
import StaffLayout from "@/components/layouts/StaffLayout";
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
  Check, 
  Edit, 
  SearchIcon, 
  Trash, 
  User, 
  UserMinus, 
  UserPlus 
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
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Mock user data
const riders = [
  {
    id: "r1",
    name: "John Rider",
    email: "rider@example.com",
    joined: "2025-01-15",
    rides: 12,
    status: "active",
    profileImage: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "r2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    joined: "2025-02-22",
    rides: 8,
    status: "active",
    profileImage: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: "r3",
    name: "Robert Johnson",
    email: "robert.j@example.com",
    joined: "2025-03-10",
    rides: 5,
    status: "inactive",
    profileImage: "https://i.pravatar.cc/150?img=8"
  }
];

const drivers = [
  {
    id: "d1",
    name: "Dave Driver",
    email: "driver@example.com",
    joined: "2025-01-10",
    rides: 45,
    rating: 4.8,
    status: "active",
    profileImage: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: "d2",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    joined: "2025-02-05",
    rides: 36,
    rating: 4.6,
    status: "active",
    profileImage: "https://i.pravatar.cc/150?img=6"
  },
  {
    id: "d3",
    name: "Michael Davis",
    email: "michael.d@example.com",
    joined: "2025-03-01",
    rides: 20,
    rating: 4.9,
    status: "pending",
    profileImage: "https://i.pravatar.cc/150?img=9"
  }
];

const staff = [
  {
    id: "s1",
    name: "Sarah Staff",
    email: "staff@example.com",
    joined: "2025-01-01",
    role: "Admin",
    status: "active",
    profileImage: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: "s2",
    name: "Alex Rodriguez",
    email: "alex.r@example.com",
    joined: "2025-01-05",
    role: "Support",
    status: "active",
    profileImage: "https://i.pravatar.cc/150?img=7"
  }
];

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("riders");
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredRiders = riders.filter(rider => 
    rider.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    rider.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredDrivers = drivers.filter(driver => 
    driver.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    driver.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleUserAction = (action: string, userId: string, userType: string) => {
    switch(action) {
      case "edit":
        toast.info(`Editing ${userType} with ID: ${userId}`);
        break;
      case "suspend":
        toast.warning(`Suspended ${userType} with ID: ${userId}`);
        break;
      case "delete":
        toast.error(`Deleted ${userType} with ID: ${userId}`);
        break;
      case "approve":
        toast.success(`Approved ${userType} with ID: ${userId}`);
        break;
      default:
        break;
    }
  };
  
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("New user added successfully!");
    setShowAddUserDialog(false);
    // In a real app, you would add the user to your database
  };
  
  return (
    <StaffLayout title="User Management">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-80">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
        
        <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account. The user will receive an email to set their password.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddUser}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="userType" className="text-right">
                    User Type
                  </Label>
                  <select 
                    id="userType" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                    defaultValue="rider"
                    required
                  >
                    <option value="rider">Rider</option>
                    <option value="driver">Driver</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add User</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="riders" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="riders">Riders</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
        </TabsList>
        
        <TabsContent value="riders">
          <Card>
            <CardHeader>
              <CardTitle>Registered Riders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Rides</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRiders.length > 0 ? (
                    filteredRiders.map((rider) => (
                      <TableRow key={rider.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={rider.profileImage} />
                              <AvatarFallback>{rider.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{rider.name}</div>
                              <div className="text-sm text-gray-500">{rider.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{rider.joined}</TableCell>
                        <TableCell>{rider.rides}</TableCell>
                        <TableCell>
                          <Badge variant={rider.status === "active" ? "default" : "secondary"}>
                            {rider.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleUserAction("edit", rider.id, "rider")}>
                                <User className="mr-2 h-4 w-4" />
                                <span>Edit Details</span>
                              </DropdownMenuItem>
                              {rider.status === "active" ? (
                                <DropdownMenuItem onClick={() => handleUserAction("suspend", rider.id, "rider")}>
                                  <UserMinus className="mr-2 h-4 w-4" />
                                  <span>Suspend Account</span>
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handleUserAction("activate", rider.id, "rider")}>
                                  <Check className="mr-2 h-4 w-4" />
                                  <span>Activate Account</span>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem 
                                onClick={() => handleUserAction("delete", rider.id, "rider")}
                                className="text-red-600"
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Delete Account</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                        No riders found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="drivers">
          <Card>
            <CardHeader>
              <CardTitle>Registered Drivers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Rides</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDrivers.length > 0 ? (
                    filteredDrivers.map((driver) => (
                      <TableRow key={driver.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={driver.profileImage} />
                              <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{driver.name}</div>
                              <div className="text-sm text-gray-500">{driver.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{driver.joined}</TableCell>
                        <TableCell>{driver.rides}</TableCell>
                        <TableCell>★ {driver.rating}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              driver.status === "active" 
                                ? "default" 
                                : driver.status === "pending" 
                                  ? "outline" 
                                  : "secondary"
                            }
                          >
                            {driver.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleUserAction("edit", driver.id, "driver")}>
                                <User className="mr-2 h-4 w-4" />
                                <span>Edit Details</span>
                              </DropdownMenuItem>
                              {driver.status === "pending" && (
                                <DropdownMenuItem onClick={() => handleUserAction("approve", driver.id, "driver")}>
                                  <Check className="mr-2 h-4 w-4" />
                                  <span>Approve Driver</span>
                                </DropdownMenuItem>
                              )}
                              {driver.status === "active" ? (
                                <DropdownMenuItem onClick={() => handleUserAction("suspend", driver.id, "driver")}>
                                  <UserMinus className="mr-2 h-4 w-4" />
                                  <span>Suspend Account</span>
                                </DropdownMenuItem>
                              ) : (
                                driver.status !== "pending" && (
                                  <DropdownMenuItem onClick={() => handleUserAction("activate", driver.id, "driver")}>
                                    <Check className="mr-2 h-4 w-4" />
                                    <span>Activate Account</span>
                                  </DropdownMenuItem>
                                )
                              )}
                              <DropdownMenuItem 
                                onClick={() => handleUserAction("delete", driver.id, "driver")}
                                className="text-red-600"
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Delete Account</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                        No drivers found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <CardTitle>Staff Members</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.length > 0 ? (
                    filteredStaff.map((staffMember) => (
                      <TableRow key={staffMember.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={staffMember.profileImage} />
                              <AvatarFallback>{staffMember.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{staffMember.name}</div>
                              <div className="text-sm text-gray-500">{staffMember.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{staffMember.joined}</TableCell>
                        <TableCell>{staffMember.role}</TableCell>
                        <TableCell>
                          <Badge variant={staffMember.status === "active" ? "default" : "secondary"}>
                            {staffMember.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleUserAction("edit", staffMember.id, "staff")}>
                                <User className="mr-2 h-4 w-4" />
                                <span>Edit Details</span>
                              </DropdownMenuItem>
                              {staffMember.status === "active" ? (
                                <DropdownMenuItem onClick={() => handleUserAction("suspend", staffMember.id, "staff")}>
                                  <UserMinus className="mr-2 h-4 w-4" />
                                  <span>Suspend Account</span>
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handleUserAction("activate", staffMember.id, "staff")}>
                                  <Check className="mr-2 h-4 w-4" />
                                  <span>Activate Account</span>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem 
                                onClick={() => handleUserAction("delete", staffMember.id, "staff")}
                                className="text-red-600"
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Delete Account</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                        No staff members found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </StaffLayout>
  );
};

export default UserManagement;
