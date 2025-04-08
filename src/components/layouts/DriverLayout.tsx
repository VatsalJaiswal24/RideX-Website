
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Car, 
  DollarSign, 
  Home, 
  LogOut, 
  Menu, 
  X
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

interface DriverLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DriverLayout: React.FC<DriverLayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: <Home className="mr-2 h-4 w-4" />, label: "Dashboard", path: "/driver" },
    { icon: <Car className="mr-2 h-4 w-4" />, label: "Manage Rides", path: "/driver/rides" },
    { icon: <DollarSign className="mr-2 h-4 w-4" />, label: "Earnings", path: "/driver/earnings" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[320px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xl">RideX</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <nav className="flex flex-col gap-1 py-4">
                    {navItems.map((item) => (
                      <Button
                        key={item.path}
                        variant="ghost"
                        className="justify-start h-10"
                        onClick={() => handleNavigation(item.path)}
                      >
                        {item.icon}
                        {item.label}
                      </Button>
                    ))}
                  </nav>
                  
                  <div className="mt-auto border-t py-4">
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      className="w-full justify-start"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            {/* Desktop logo */}
            <div 
              className="font-bold text-xl cursor-pointer" 
              onClick={() => navigate("/")}
            >
              <span className="text-primary">Ride</span>
              <span className="text-accent">X</span>
            </div>
          </div>
          
          {/* Profile dropdown */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
            
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.profileImage} />
              <AvatarFallback className="bg-primary text-white">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            
            <div className="hidden md:block">
              <Button 
                variant="ghost" 
                className="text-red-500" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container py-6">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        {children}
      </main>
      
      {/* Footer */}
      <footer className="mt-auto py-6 border-t text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} RideX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DriverLayout;
