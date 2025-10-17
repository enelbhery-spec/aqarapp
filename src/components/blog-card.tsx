import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays } from "lucide-react";
import imageData from "@/lib/placeholder-images.json";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  image: string;
  imageHint: string;
};

export function BlogCard({ slug, title, description, author, date, category, image, imageHint }: BlogPost) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-0 relative">
        <Link href={`/blog/${slug}`} className="block aspect-video relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            data-ai-hint={imageHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <Badge variant="outline" className="mb-2">{category}</Badge>
        <CardTitle className="font-headline text-lg mb-2 leading-tight h-14">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground h-20 overflow-hidden">
            {description}
        </p>
      </CardContent>
      <CardFooter className="p-4 bg-muted/30 flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
                <AvatarImage src={imageData.blog.generic_author.src} alt={author} width={imageData.blog.generic_author.width} height={imageData.blog.generic_author.height} data-ai-hint="person portrait" />
                <AvatarFallback>{author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{author}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>{new Date(date).toLocaleDateString('ar-EG', { month: 'long', day: 'numeric' })}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
