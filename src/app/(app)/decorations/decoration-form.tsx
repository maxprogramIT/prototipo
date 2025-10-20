'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Link, Loader2, Sparkles, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  generateDecorationIdeas,
  type GenerateDecorationIdeasOutput,
} from '@/ai/flows/generate-decoration-ideas';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  themeDescription: z
    .string()
    .min(10, 'Please provide a more detailed theme description.'),
  colorPalette: z.string().min(3, 'Please specify your color palette.'),
  venueDescription: z.string().min(10, 'Please describe your venue.'),
});

export function DecorationForm() {
  const [isPending, startTransition] = useTransition();
  const [ideas, setIdeas] = useState<GenerateDecorationIdeasOutput | null>(
    null
  );
  const { toast } = useToast();
  const ideaImage = PlaceHolderImages.find((img) => img.id === 'deco-idea-1');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      themeDescription: '',
      colorPalette: '',
      venueDescription: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      setIdeas(null);
      try {
        const result = await generateDecorationIdeas(values);
        setIdeas(result);
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'An error occurred',
          description:
            'Failed to generate decoration ideas. Please try again.',
        });
      }
    });
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Party Vision</CardTitle>
              <CardDescription>
                Describe your dream party and let AI handle the details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="themeDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Theme Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., A magical forest theme with fairy lights and rustic elements."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colorPalette"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color Palette</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Emerald green, gold, and cream"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="venueDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., A spacious backyard with a large oak tree."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Sparkles className="mr-2" />
                )}
                Generate Ideas
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="lg:col-span-2">
        <Card className="min-h-full">
          <CardHeader>
            <CardTitle>Your Custom Decoration Plan</CardTitle>
            <CardDescription>
              Here are some AI-generated ideas to get you started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isPending ? (
              <div className="flex h-96 items-center justify-center">
                <Loader2 className="size-12 animate-spin text-primary" />
              </div>
            ) : ideas ? (
              <div className="space-y-4">
                <div className="relative h-64 w-full overflow-hidden rounded-lg">
                  {ideaImage && (
                    <Image
                      src={ideaImage.imageUrl}
                      alt={ideaImage.description}
                      fill
                      className="object-cover"
                      data-ai-hint={ideaImage.imageHint}
                    />
                  )}
                </div>
                <div className="rounded-lg border bg-secondary/30 p-4">
                  <p className="whitespace-pre-wrap font-sans">
                    {ideas.decorationIdeas}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-96 flex-col items-center justify-center rounded-lg border-2 border-dashed">
                <Wand2 className="size-12 text-muted-foreground" />
                <p className="mt-4 text-center text-muted-foreground">
                  Your decoration ideas will appear here.
                </p>
              </div>
            )}
          </CardContent>
          {ideas && (
            <CardFooter className="gap-4">
              <Button className="w-full">
                <ShoppingCart className="mr-2" />
                Buy Supplies Online
              </Button>
              <Button variant="outline" className="w-full">
                <Link className="mr-2" />
                Save to My Layout
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
