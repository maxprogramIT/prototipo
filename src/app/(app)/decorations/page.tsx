import { DecorationForm } from './decoration-form';

export default function DecorationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-4xl font-bold">Custom Decoration Ideas</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Bring your party vision to life with AI-generated decoration concepts.
        </p>
      </div>
      <DecorationForm />
    </div>
  );
}
