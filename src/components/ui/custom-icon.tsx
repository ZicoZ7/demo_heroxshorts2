import Image from 'next/image';
import { cn } from '@/lib/utils/utils';

interface CustomIconProps {
  className?: string;
  size?: number;
}

export const HeroxShortsIcon = ({ className, size = 50 }: CustomIconProps) => {
  return (
    <div className={cn('relative', className)} style={{ width: size, height: size }}>
      <Image
        src="/heroxshorts.ico"
        alt="HeroxShorts"
        width={size}
        height={size}
        className="object-contain"
      />
    </div>
  );
};
