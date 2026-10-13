import { Compass } from 'lucide-react';

export default function BrandMark() {
  return (
    <span
      className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground"
      aria-hidden="true"
    >
      <Compass size={20} />
    </span>
  );
}
