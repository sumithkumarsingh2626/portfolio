'use client';

import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/utils/cn';

export function TimeWidget() {
  const [now, setNow] = useState(() => new Date());

  const zone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local';
    } catch {
      return 'Local';
    }
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const time = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      }).format(now);
    } catch {
      return now.toLocaleTimeString();
    }
  }, [now]);

  return (
    <div className="fixed left-4 bottom-4 z-[55] hidden md:block">
      <div className={cn('rounded-2xl glass px-4 py-3')}>
        <div className="text-[10px] tracking-[0.28em] text-white/45">LOCAL TIME</div>
        <div className="mt-1 flex items-baseline gap-2">
          <div className="text-sm font-semibold text-white/90 tabular-nums">{time}</div>
          <div className="text-[10px] tracking-[0.18em] text-white/45 truncate max-w-[120px]">
            {zone}
          </div>
        </div>
      </div>
    </div>
  );
}

