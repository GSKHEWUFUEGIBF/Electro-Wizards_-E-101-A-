import { Scale } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 text-lg font-bold text-primary',
        className
      )}
    >
      <div className="rounded-lg bg-primary p-2 text-primary-foreground">
        <Scale className="h-5 w-5" />
      </div>
      <span className="text-foreground">FairShare</span>
    </div>
  );
}
