import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Building,
  ClipboardList,
  ShoppingBag,
  Wand2,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'Browse Spaces',
    description: 'Find the perfect venue for your event.',
    href: '/spaces',
    icon: Building,
  },
  {
    title: 'Find Vendors',
    description: 'Discover top-rated caterers, DJs, and more.',
    href: '/vendors',
    icon: ShoppingBag,
  },
  {
    title: 'Plan Your Event',
    description: 'Manage guests, RSVPs, and seating.',
    href: '/planning',
    icon: ClipboardList,
  },
  {
    title: 'Get Decoration Ideas',
    description: 'Use AI to design your perfect party theme.',
    href: '/decorations',
    icon: Wand2,
  },
];

export default function DashboardPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'dashboard-hero');

  return (
    <div className="flex flex-col gap-8">
      <div className="relative h-96 w-full overflow-hidden rounded-lg">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="font-headline text-5xl font-bold text-white">
            Your Party, Simplified
          </h1>
          <p className="mt-2 max-w-lg text-lg text-white/90">
            Welcome to Fiesta Fácil. Let&apos;s plan an unforgettable event
            together.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="group flex transform flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <CardHeader className="flex-row items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <feature.icon className="size-6 text-primary" />
              </div>
              <CardTitle className="font-headline text-2xl">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between">
              <p className="text-muted-foreground">{feature.description}</p>
              <Button asChild variant="ghost" className="mt-4 justify-start p-0">
                <Link href={feature.href}>
                  Get Started <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
