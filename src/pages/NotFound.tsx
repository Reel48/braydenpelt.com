import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-tan">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue">h1 Header</h1>
        <p className="text-xl text-blue mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <Button asChild variant="secondary">
          <a href="/">
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
