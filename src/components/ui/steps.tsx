// src/components/ui/steps.tsx
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/utils";

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: {
    title: string;
    description?: string;
  }[];
  currentStep: number;
}

export function Steps({ steps, currentStep, className, ...props }: StepsProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex w-full gap-4">
        {steps.map((step, index) => {
          const stepCompleted = index < currentStep;
          const stepCurrent = index === currentStep;

          return (
            <div
              key={step.title}
              className="flex-1 group flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full font-semibold text-sm flex items-center justify-center border-2 shrink-0 transition-colors",
                    stepCompleted && "border-primary bg-primary text-primary-foreground",
                    stepCurrent && "border-primary",
                    !stepCompleted && !stepCurrent && "border-muted text-muted-foreground"
                  )}
                >
                  {stepCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div>
                  <p 
                    className={cn(
                      "text-sm font-medium transition-colors",
                      stepCompleted || stepCurrent ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p
                      className={cn(
                        "text-xs transition-colors",
                        stepCompleted || stepCurrent ? "text-muted-foreground" : "text-muted-foreground/60"
                      )}
                    >
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    "h-[2px] w-full bg-muted transition-colors mt-1",
                    (stepCompleted || (index === currentStep - 1)) && "bg-primary"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}