import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = 'active' | 'draft' | 'paused' | 'archived' | 'pending' | 'running' | 'success' | 'failed' | 'timeout';

export function StatusBadge({ status }: { status: Status }) {
  const config = {
    active: 'bg-green-500/10 text-green-500 border-green-500/20',
    draft: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    paused: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
    archived: 'bg-red-500/10 text-red-500 border-red-500/20',
    pending: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    running: 'bg-brand-500/10 text-brand-500 border-brand-500/20 animate-pulse',
    success: 'bg-green-500/10 text-green-500 border-green-500/20',
    failed: 'bg-destructive/10 text-destructive border-destructive/20',
    timeout: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  };

  return (
    <Badge variant="outline" className={cn("capitalize px-2 py-0.5", config[status] || "bg-muted text-muted-foreground")}>
      {status === 'active' || status === 'running' ? (
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
      ) : null}
      {status}
    </Badge>
  );
}
