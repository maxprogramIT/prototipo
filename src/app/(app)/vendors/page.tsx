import { VendorForm } from './vendor-form';

export default function VendorsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-4xl font-bold">Vendor Recommendations</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Let our AI help you find the perfect vendors for your event.
        </p>
      </div>
      <VendorForm />
    </div>
  );
}
