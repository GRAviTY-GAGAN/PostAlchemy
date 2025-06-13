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
import { Loader2, Rocket, Search, Target, Zap } from "lucide-react";
import { ProgressSteps } from "../ProgressSteps/index.component";
import { Badge } from "../ui/badge";
import { PostCard } from "../PostCard/index.component";
import { toast } from "sonner";

const PromptingSection = () => {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [posts, setPosts] = useState<any[]>([]);
  const [summary, setSummary] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    window.scroll({top: 1000 , behavior: 'smooth'})

    setIsLoading(true);
    setCurrentStep(0);
    setPosts([]);
    setSummary("");

    try {
      const url = process.env.NEXT_PUBLIC_API_URL;
      const data = await fetch(`${url}/query`, {
        method: "post",
        body: JSON.stringify({ input: topic }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const posts = await data.json();

      // Simulate the generation process
      const steps = [
        "Researching topic...",
        "Generating LinkedIn post...",
        "Creating Twitter post...",
        "Crafting Instagram post...",
        "Polishing content...",
      ];

      for (let i = 0; i < steps.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setCurrentStep(i + 1);
      }

      // Mock generated posts
      //     const mockPosts = [
      //       {
      //         platform: "LinkedIn",
      //         content: `🚀 Exciting developments in ${topic}!

      // The landscape is rapidly evolving, and professionals need to stay ahead of the curve. Here are 3 key insights:

      // 1. Innovation is driving unprecedented change
      // 2. Collaboration across industries is essential
      // 3. Continuous learning is more important than ever

      // What trends are you seeing in your field? Let's discuss in the comments!

      // #${topic.replace(/\s+/g, '')} #Innovation #ProfessionalDevelopment`,
      //         hashtags: ["Innovation", "ProfessionalDevelopment", topic.replace(/\s+/g, '')]
      //       },
      //       {
      //         platform: "Twitter",
      //         content: `🔥 ${topic} is reshaping everything we know about innovation!

      // Key takeaway: The future belongs to those who adapt quickly and think differently.

      // What's your take? 👇

      // #${topic.replace(/\s+/g, '')} #Innovation #TechTrends`,
      //         hashtags: ["Innovation", "TechTrends", topic.replace(/\s+/g, '')]
      //       },
      //       {
      //         platform: "Instagram",
      //         content: `✨ Diving deep into ${topic} today!

      // The possibilities are endless when we embrace change and innovation. Every challenge is an opportunity to grow and learn something new.

      // Swipe to see the key insights that are shaping the future! 📸

      // What inspires you most about emerging trends? Share your thoughts below! 👇

      // #${topic.replace(/\s+/g, '')} #Innovation #Inspiration #Growth #TechLife #Future`,
      //         hashtags: ["Innovation", "Inspiration", "Growth", "TechLife", "Future", topic.replace(/\s+/g, '')]
      //       }
      //     ];

      setPosts(posts.polishedPosts);
      setSummary(posts.summary);
      setIsLoading(false);
    } catch (error) {
      console.error(`Error while generating posts: ${error}`);
      toast.error("Failed to generate posts", {
        description:
          "Something went wrong while generating the posts. Please try again in some time.",
      });
    }
  };

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
              onClick={handleGenerate}
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
      {isLoading && (
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="border-0 shadow-lg bg-card/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <ProgressSteps currentStep={currentStep} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Generated Posts */}
      {posts.length > 0 && (
        <div className="space-y-12 mb-12">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
              Content Ready
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Your Social Media Posts</h2>
            <p className=" p-1.5 text-lg text-muted-foreground max-w-2xl mx-auto">
              Each post is optimized for its platform&apos;s unique audience and
              format
            </p>
          </div>
          <div className=" max-w-[90%] m-auto text-center mb-10 bg-gradient-to-br from-muted/50 to-muted/80 md:p-12 p-3 rounded-xl">
            <span className=" flex items-center font-bold mb-3">
              <Search className="h-8 w-8 text-primary" /> Content Summary:{" "}
            </span>
            <p>{summary}</p>
          </div>
          <div className="grid gap-8 max-w-5xl mx-auto">
            {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* Features Section */}
      {posts.length === 0 && !isLoading && (
        <div className="max-w-6xl mx-auto mt-20 mb-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Three simple steps to professional social media content
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/80">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Deep Research</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  AI analyzes your topic across multiple sources to gather the
                  latest insights, trends, and expert perspectives.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/80">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Smart Generation</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  Creates platform-specific content that matches each
                  network&apos;s style, audience, and engagement patterns.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/80">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Rocket className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Ready to Publish</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  Polished, professional content with optimized hashtags and
                  formatting, ready to copy and post.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptingSection;
