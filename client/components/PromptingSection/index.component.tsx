"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Zap } from "lucide-react";
import { ProgressSteps } from "../ProgressSteps/index.component";

const PromptingSection = () => {
  const [topic, setTopic] = useState("");
  const [isLoading] = useState(false);
  const [currentStep] = useState(0);

  return (
    <div className="">
      <div className="max-w-2xl mx-auto mb-16">
        <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-semibold">
              Whats your topic?
            </CardTitle>
            <CardDescription className="text-base">
              Enter any subject and watch AI craft platform-perfect posts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="topic" className="text-base font-medium">
                Topic or Subject:
              </Label>
              <Input
                id="topic"
                placeholder="e.g., AI in Healthcare, Remote Work Culture, Climate Technology..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="h-14 text-base border-2 focus:border-primary"
              />
            </div>
            <Button
              disabled={isLoading || !topic.trim()}
              className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Your Posts...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-5 w-5" />
                  Generate Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
      {/* Progress Steps */}
        {true && (
          <div className="max-w-2xl mx-auto mb-16">
            <Card className="border-0 shadow-lg bg-card/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <ProgressSteps currentStep={currentStep} />
              </CardContent>
            </Card>
          </div>
        )}
    </div>
  );
};

export default PromptingSection;
