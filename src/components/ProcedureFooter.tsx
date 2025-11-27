import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Pie de página reutilizable para CTA complementarios.
 * Props:
 * - ctaLabel: Texto del botón principal.
 * - hint: Mensaje informativo bajo el botón.
 * - disabled: Indica si el CTA está deshabilitado.
 * - onClick: Acción al presionar el botón cuando no está deshabilitado.
 */
type ProcedureFooterProps = {
  ctaLabel: string;
  hint: string;
  disabled?: boolean;
  onClick?: () => void;
};

const ProcedureFooter: FC<ProcedureFooterProps> = ({ ctaLabel, hint, disabled = false, onClick }) => {
  return (
    <footer className="mt-10 flex flex-col items-center gap-3 animate-fade-up">
      <Button
        type="button"
        disabled={disabled}
        aria-disabled={disabled}
        onClick={disabled ? undefined : onClick}
        variant="secondary"
        className={cn(
          "h-16 w-full max-w-[480px] rounded-tablet-lg border-surface-muted/70 bg-surface-muted text-sm font-semibold uppercase tracking-[0.42em] text-foreground/75 transition-colors duration-300 hover:bg-surface-muted/80"
        )}
      >
        {ctaLabel}
      </Button>
      <p className="text-sm text-foreground/40">{hint}</p>
    </footer>
  );
};

export default ProcedureFooter;



