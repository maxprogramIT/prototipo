'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Sparkles } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  getVendorRecommendations,
  type VendorRecommendationsOutput,
} from '@/ai/flows/vendor-recommendations';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  eventType: z.string().min(1, 'Please select an event type.'),
  budget: z.coerce.number().min(1, 'Please enter a valid budget.'),
  venue: z.string().min(3, 'Please describe your venue.'),
});

export function VendorForm() {
  const [isPending, startTransition] = useTransition();
  const [recommendations, setRecommendations] =
    useState<VendorRecommendationsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventType: '',
      budget: 1000,
      venue: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      setRecommendations(null);
      try {
        const result = await getVendorRecommendations(values);
        setRecommendations(result);
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'An error occurred',
          description: 'Failed to get vendor recommendations. Please try again.',
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
              <CardTitle>Event Details</CardTitle>
              <CardDescription>
                Provide some details about your event to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an event type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="birthday">Birthday Party</SelectItem>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="corporate">Corporate Event</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget (USD)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 5000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="venue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue Description</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Outdoor garden, Downtown loft" {...field} />
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
                Get Recommendations
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="lg:col-span-2">
        <Card className="min-h-full">
          <CardHeader>
            <CardTitle>Recommended Vendors</CardTitle>
            <CardDescription>
              Here are some vendors we think would be a great fit for your event.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isPending ? (
              <div className="flex h-64 items-center justify-center">
                <Loader2 className="size-12 animate-spin text-primary" />
              </div>
            ) : recommendations ? (
              <ul className="space-y-4">
                {recommendations.vendorRecommendations.map((rec, index) => (
                  <li key={index} className="rounded-lg border bg-secondary/30 p-4">
                    <p className="font-semibold">{rec}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed">
                <ShoppingBag className="size-12 text-muted-foreground" />
                <p className="mt-4 text-center text-muted-foreground">
                  Your vendor recommendations will appear here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
