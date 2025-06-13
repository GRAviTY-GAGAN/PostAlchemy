import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"

interface Post {
  platform: string;
  content: string;
  hashtags: string[];
}

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(post.content);
      setCopied(true);
      toast.success("Copied!",{
        description: `${post.platform} post copied to clipboard`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
        console.error(err)
      toast.error("Failed to copy",{
        description: "Please try again"
      });
    }
  };

  const getPlatformConfig = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "linkedin":
        return {
          color: "bg-blue-500",
          gradient: "from-blue-500 to-blue-600",
          textColor: "text-blue-500"
        };
      case "twitter":
        return {
          color: "bg-sky-400",
          gradient: "from-sky-400 to-sky-500",
          textColor: "text-sky-400"
        };
      case "instagram":
        return {
          color: "bg-pink-500",
          gradient: "from-pink-500 to-purple-500",
          textColor: "text-pink-500"
        };
      default:
        return {
          color: "bg-gray-500",
          gradient: "from-gray-500 to-gray-600",
          textColor: "text-gray-500"
        };
    }
  };

  const platformConfig = getPlatformConfig(post.platform);

  return (
    <Card className="w-full border-0 shadow-xl bg-card/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle className="flex items-center gap-3">
          <div className={`w-4 h-4 rounded-full ${platformConfig.color} shadow-lg`} />
          <span className="text-xl font-semibold">{post.platform}</span>
          <Badge variant="secondary" className="ml-2 text-xs">
            Ready to Post
          </Badge>
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="flex items-center gap-2 hover:bg-primary/10 border-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Post
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gradient-to-br from-muted/50 to-muted/80 p-6 rounded-xl border border-muted/50">
          <p style={{wordSpacing: '3px'}} className="whitespace-pre-wrap text-sm leading-relaxed font-medium">
            {post.content}
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Hashtags
          </h4>
          <div className="flex flex-wrap gap-2">
            {post.hashtags.map((hashtag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className={`text-xs px-3 py-1 ${platformConfig.textColor} bg-primary/10 hover:bg-primary/20 transition-colors`}
              >
                #{hashtag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
