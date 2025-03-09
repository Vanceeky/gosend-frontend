import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTASection({
  title = "Ready to Get Started?",
  description = "Download the app now and experience seamless transactions.",
  primaryButtonText = "Download Now",
  primaryButtonLink = "/download",
  secondaryButtonText = "Become a Member",
  secondaryButtonLink = "/signup",
}) {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          {title}
        </h2>
        <p className="text-lg text-white mb-8">{description}</p>
        <div className="flex justify-center space-x-4">
          <Button asChild>
            <Link to={primaryButtonLink} className="text-white">
              {primaryButtonText}
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={secondaryButtonLink} className="text-dark">
              {secondaryButtonText}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
