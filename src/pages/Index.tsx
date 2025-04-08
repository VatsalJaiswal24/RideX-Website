
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, Car, UserCheck, Users, Star, CreditCard, MapPin, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateToRole = () => {
    if (isAuthenticated && user) {
      navigate(`/${user.role}`);
    } else {
      navigate("/login");
    }
  };

  const features = [
    {
      icon: <Car className="h-12 w-12 text-primary" />,
      title: "Convenient Rides",
      description: "Book a ride easily and get to your destination comfortably and on time."
    },
    {
      icon: <UserCheck className="h-12 w-12 text-primary" />,
      title: "Verified Drivers",
      description: "All our drivers are thoroughly vetted and verified for your safety."
    },
    {
      icon: <CreditCard className="h-12 w-12 text-primary" />,
      title: "Easy Payments",
      description: "Multiple payment options including credit cards, digital wallets, and cash."
    },
    {
      icon: <Star className="h-12 w-12 text-primary" />,
      title: "Rate Your Experience",
      description: "Provide feedback and rate your rides to help us improve."
    }
  ];

  const testimonials = [
    {
      name: "Emily Johnson",
      role: "Regular Rider",
      quote: "RideX has transformed my daily commute. The app is so easy to use, and the drivers are always professional and punctual.",
      image: "https://i.pravatar.cc/150?img=5"
    },
    {
      name: "Michael Chen",
      role: "RideX Driver",
      quote: "Being a RideX driver has provided me with a flexible source of income. The platform is driver-friendly and the support team is responsive.",
      image: "https://i.pravatar.cc/150?img=8"
    },
    {
      name: "Sophia Rodriguez",
      role: "Business Traveler",
      quote: "I rely on RideX for all my business trips. The service is consistent, and I never have to worry about transportation.",
      image: "https://i.pravatar.cc/150?img=9"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="container py-4 px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
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
                    <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <nav className="flex flex-col gap-1 py-4">
                    <Button variant="ghost" className="justify-start" onClick={() => navigate("/")}>
                      Home
                    </Button>
                    {!isAuthenticated ? (
                      <>
                        <Button variant="ghost" className="justify-start" onClick={() => navigate("/login")}>
                          Login
                        </Button>
                        <Button variant="ghost" className="justify-start" onClick={() => navigate("/register")}>
                          Register
                        </Button>
                      </>
                    ) : (
                      <Button variant="ghost" className="justify-start" onClick={navigateToRole}>
                        Dashboard
                      </Button>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            
            {/* Logo */}
            <div className="font-bold text-xl">
              <span className="text-primary">Ride</span>
              <span className="text-accent">X</span>
            </div>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" onClick={() => navigate("/")}>
              Home
            </Button>
            {!isAuthenticated ? (
              <>
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button className="bg-primary hover:bg-primary-600" onClick={() => navigate("/register")}>
                  Register
                </Button>
              </>
            ) : (
              <Button className="bg-primary hover:bg-primary-600" onClick={navigateToRole}>
                Dashboard
              </Button>
            )}
          </nav>
        </div>
      </header>
      
      {/* Hero section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary text-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Your Journey, Our Priority
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                RideX connects you with reliable drivers for a seamless carpooling experience. Save money, reduce emissions, and travel comfortably.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100"
                  onClick={() => navigate("/register")}
                >
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1532975304279-a2d2febe3a20?auto=format&fit=crop&q=80&w=1000" 
                alt="Carpooling" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose RideX?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the best carpooling service with features designed for convenience, safety, and affordability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How it works */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How RideX Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get from point A to point B in just three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Set Your Location</h3>
              <p className="text-gray-600">
                Enter your pickup and drop-off locations to find available rides.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Choose Your Ride</h3>
              <p className="text-gray-600">
                Select from available drivers based on price, ratings, and arrival time.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Enjoy Your Ride</h3>
              <p className="text-gray-600">
                Sit back, relax, and rate your experience after reaching your destination.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our community of riders and drivers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-primary text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already enjoying a better way to travel with RideX.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100"
            onClick={() => navigate("/register")}
          >
            Sign Up Now
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">RideX</h3>
              <p className="text-gray-400">
                Your trusted carpooling platform for safe, affordable, and convenient rides.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Button variant="link" className="text-gray-400 hover:text-white p-0">
                    About Us
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="text-gray-400 hover:text-white p-0">
                    How It Works
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="text-gray-400 hover:text-white p-0">
                    Safety
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="text-gray-400 hover:text-white p-0">
                    Careers
                  </Button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Button variant="link" className="text-gray-400 hover:text-white p-0">
                    Help Center
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="text-gray-400 hover:text-white p-0">
                    Contact Us
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="text-gray-400 hover:text-white p-0">
                    FAQs
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="text-gray-400 hover:text-white p-0">
                    Privacy Policy
                  </Button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Download Our App</h4>
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="border-gray-600 text-white justify-start">
                  Google Play
                </Button>
                <Button variant="outline" className="border-gray-600 text-white justify-start">
                  App Store
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} RideX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
