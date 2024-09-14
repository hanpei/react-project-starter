import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type Props = {
  className?: string;
};
export const Spinner = ({ className }: Props) => {
  return <Loader2 className={cn('w-6 h-6 animate-spin', className)} />;
};
