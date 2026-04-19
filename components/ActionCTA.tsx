import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRightCircle } from "lucide-react";

const avatars = [
  { src: "https://i.pravatar.cc/150?u=1", fallback: "JD" },
  { src: "https://i.pravatar.cc/150?u=2", fallback: "AS" },
  { src: "https://i.pravatar.cc/150?u=3", fallback: "MK" },
  { src: "https://i.pravatar.cc/150?u=4", fallback: "RL" },
];

const ActionCTA = () => {
  return (
    <Card className="bg-slate-100/80 border-slate-200 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
      <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-4">
            {avatars.map((avatar, i) => (
              <Avatar key={i} className="border-2 border-white w-10 h-10 shadow-sm">
                <AvatarImage src={avatar.src} />
                <AvatarFallback>{avatar.fallback}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <p className="text-sm md:text-base font-medium text-slate-600">
            Align with Businesses that{" "}
            <span className="text-slate-900 font-bold underline decoration-purple-500 underline-offset-4">
              Choose Quality
            </span>
          </p>
        </div>

        <Button size={"lg"}>
          Start Now
          <ChevronRightCircle className="w-5 h-5" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActionCTA;
