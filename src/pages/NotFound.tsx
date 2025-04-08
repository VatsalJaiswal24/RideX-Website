
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <Car className="h-24 w-24 text-primary mx-auto" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Oops! Wrong Turn</h1>
        <p className="text-xl text-gray-600 mb-8">
          We couldn't find the page you're looking for. It seems you've taken a detour!
        </p>
        <div className="space-y-4">
          <Button asChild className="w-full bg-primary hover:bg-primary-600">
            <Link to="/">Return to Home</Link>
          </Button>
          <div className="text-sm text-gray-500">
            Need help? <Link to="/" className="text-primary hover:underline">Contact Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
