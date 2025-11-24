import type { FC } from "react";

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
    <footer className="mt-10 flex flex-col items-center gap-3">
      <button
        type="button"
        disabled={disabled}
        aria-disabled={disabled}
        onClick={disabled ? undefined : onClick}
        className="flex h-16 w-full max-w-[480px] items-center justify-center rounded-tablet-lg border border-surface-muted/70 bg-surface-muted text-sm font-semibold uppercase tracking-[0.42em] text-foreground/75 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-60"
      >
        {ctaLabel}
      </button>
      <p className="text-sm text-foreground/40">{hint}</p>
    </footer>
  );
};

export default ProcedureFooter;



