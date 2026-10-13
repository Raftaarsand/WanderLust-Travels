import { cva } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-sans text-sm font-bold whitespace-nowrap',
    'transition-[background-color,color,border-color,transform] duration-fast ease-brand',
    'active:scale-97 disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        primary: 'bg-accent text-accent-foreground hover:bg-accent-hover',
        secondary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        inverse: 'bg-primary-foreground text-primary hover:bg-muted',
        outline: 'border-[1.5px] border-primary text-primary hover:bg-primary hover:text-primary-foreground',
        ghost: 'hover:bg-current/10 active:bg-current/15',
      },
      size: {
        default: 'h-11 px-6',
        lg: 'h-14 px-8 text-base',
        icon: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
