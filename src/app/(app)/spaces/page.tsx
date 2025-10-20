import Image from 'next/image';
import { MapPin, SlidersHorizontal, Users } from 'lucide-react';
import type { Space } from '@/lib/definitions';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const spaces: Space[] = [
  {
    id: '1',
    name: 'The Grand Ballroom',
    location: 'Downtown Metro',
    capacity: 300,
    amenities: ['A/V Equipment', 'Full Bar', 'Stage'],
    imageId: 'space-2',
  },
  {
    id: '2',
    name: 'Modern Loft One',
    location: 'Arts District',
    capacity: 100,
    amenities: ['Rooftop Access', 'Kitchenette', 'Wi-Fi'],
    imageId: 'space-1',
  },
  {
    id: '3',
    name: 'The Secret Garden',
    location: 'Green Valley',
    capacity: 80,
    amenities: ['Outdoor Seating', 'Fountain', 'Heated Tents'],
    imageId: 'space-3',
  },
  {
    id: '4',
    name: 'Industrial Hub',
    location: 'Warehouse District',
    capacity: 500,
    amenities: ['High Ceilings', 'Projector', 'Parking'],
    imageId: 'space-4',
  },
  {
    id: '5',
    name: 'Skyline View Lounge',
    location: 'Uptown Financial',
    capacity: 150,
    amenities: ['Panoramic Views', 'Cocktail Bar', 'Valet'],
    imageId: 'space-5',
  },
  {
    id: '6',
    name: 'The Rustic Barn',
    location: 'Countryside',
    capacity: 200,
    amenities: ['Fire Pit', 'String Lights', 'Dance Floor'],
    imageId: 'space-6',
  },
];

export default function SpacesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-4xl font-bold">Find Your Perfect Space</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse our curated list of unique venues.
        </p>
      </div>
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Input placeholder="Search by location or name..." />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select capacity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="<50">&lt; 50 guests</SelectItem>
                <SelectItem value="50-100">50 - 100 guests</SelectItem>
                <SelectItem value="100-200">100 - 200 guests</SelectItem>
                <SelectItem value=">200">&gt; 200 guests</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select amenities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="av">A/V Equipment</SelectItem>
                <SelectItem value="bar">Full Bar</SelectItem>
                <SelectItem value="outdoor">Outdoor Space</SelectItem>
                <SelectItem value="kitchen">Kitchen</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <SlidersHorizontal className="mr-2" />
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {spaces.map((space) => {
          const image = PlaceHolderImages.find((img) => img.id === space.imageId);
          return (
            <Card key={space.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-56 w-full">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="font-headline text-2xl">{space.name}</CardTitle>
                <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-4" />
                    <span>{space.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="size-4" />
                    <span>Up to {space.capacity} guests</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-wrap gap-2 p-4 pt-0">
                {space.amenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary">
                    {amenity}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
