import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom"


export function TodayActivations({ activations }) {
  return (
    <div className="space-y-6 p-3">
      {activations.length > 0 ? (
        activations.map((activation, index) => (
          <div key={index} className="flex items-center">
            <Avatar className="h-9 w-9">
                <AvatarFallback>
                  {activation.full_name
                    .split(' ') // Split the full name into parts
                    .map(name => name.charAt(0).toUpperCase()) // Get the first letter of each part
                    .slice(0, 2) // Take the first two letters
                    .join('')} {/* Join the first two letters */}
                </AvatarFallback>
    
            </Avatar>

            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                <Link to={`member/${activation.member_id}`} className="hover:text-blue-500">
                {activation.full_name}
                </Link>
                </p>
              <p className="text-sm text-muted-foreground">{activation.mobile_number}</p>
            </div>
            <div className="ml-auto font-medium text-green-500">+₱{activation.amount.toLocaleString()}</div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No activations today.</p>
      )}
    </div>
  );
}
