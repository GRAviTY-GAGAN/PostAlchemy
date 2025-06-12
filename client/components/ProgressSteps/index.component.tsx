import { Check, Loader2 } from "lucide-react";

interface ProgressStepsProps {
  currentStep: number;
}

export const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  const steps = [
    "Researching topic",
    "Generating LinkedIn post",
    "Creating Twitter post", 
    "Crafting Instagram post",
    "Polishing content"
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold mb-2">Creating Your Content</h3>
        <p className="text-muted-foreground">
          Step {currentStep} of {steps.length} • This usually takes 30-45 seconds
        </p>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-6">
        <div 
          className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
        //   const isPending = index > currentStep;

          return (
            <div key={index} className="flex items-center gap-4">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isCompleted 
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg" 
                  : isCurrent 
                    ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md" 
                    : "bg-muted border-2 border-muted-foreground text-muted-foreground"
              }`}>
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span className="text-xs font-bold">{index + 1}</span>
                )}
              </div>
              <span className={`text-base transition-all duration-300 ${
                isCompleted 
                  ? "text-foreground font-semibold" 
                  : isCurrent 
                    ? "text-primary font-semibold" 
                    : "text-muted-foreground"
              }`}>
                {step}
              </span>
              {isCurrent && (
                <div className="flex-1 flex justify-end">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
