import { Plus, Trash2 } from 'lucide-react';
import type { Guest } from '@/lib/definitions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const guests: Guest[] = [
  { id: '1', name: 'Alice Johnson', status: 'Accepted', notified: true },
  { id: '2', name: 'Bob Williams', status: 'Pending', notified: true },
  { id: '3', name: 'Charlie Brown', status: 'Declined', notified: true },
  { id: '4', name: 'Diana Miller', status: 'Accepted', notified: true },
  { id: '5', name: 'Ethan Davis', status: 'Pending', notified: false },
];

const tables = Array.from({ length: 8 }, (_, i) => ({
  id: `T${i + 1}`,
  guests: guests.slice(i % 3, (i % 3) + 2).map((g) => g.name),
}));

export default function PlanningPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-4xl font-bold">Event Planning Tools</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Manage your guests and seating arrangements with ease.
        </p>
      </div>
      <Tabs defaultValue="guests">
        <TabsList className="grid w-full grid-cols-2 md:w-96">
          <TabsTrigger value="guests">Guest List</TabsTrigger>
          <TabsTrigger value="seating">Seating Arrangement</TabsTrigger>
        </TabsList>
        <TabsContent value="guests">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Guest List ({guests.length})</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2" /> Add Guest
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add a New Guest</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" defaultValue="Pedro Pascal" className="col-span-3" />
                    </div>
                  </div>
                   <Button>Save Guest</Button>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guests.map((guest) => (
                    <TableRow key={guest.id}>
                      <TableCell className="font-medium">{guest.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            guest.status === 'Accepted'
                              ? 'default'
                              : guest.status === 'Declined'
                              ? 'destructive'
                              : 'secondary'
                          }
                          className={guest.status === 'Accepted' ? 'bg-green-500/20 text-green-700 border-green-500/20' : ''}
                        >
                          {guest.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {guest.notified ? 'Yes' : 'No'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="seating">
          <Card>
            <CardHeader>
              <CardTitle>Seating Chart</CardTitle>
            </CardHeader>
            <CardContent className="h-[600px] w-full rounded-lg bg-muted/50 p-4">
              <div className="grid h-full grid-cols-4 grid-rows-2 gap-4">
                {tables.map((table) => (
                  <div key={table.id} className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-background p-4">
                    <p className="font-bold">{table.id}</p>
                    <div className="text-center text-sm text-muted-foreground">
                      {table.guests.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
