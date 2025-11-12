import Image from "next/image";
import type { FC, ReactNode } from "react";

/**
 * Tarjeta de procedimiento reutilizable.
 * Props:
 * - label: Texto pequeño superior (ej. "Procedimiento").
 * - title: Nombre del procedimiento.
 * - description: Breve explicación para el paciente.
 * - image: Objeto con src, alt y sizes para el componente `Image`.
 * - footer: Slot opcional para contenido adicional al final de la tarjeta.
 * - onClick: Acción al seleccionar el procedimiento.
 * - ariaLabel: Descripción accesible para el botón.
 */
type ProcedureCardProps = {
  label: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    sizes: string;
  };
  footer?: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
};

const ProcedureCard: FC<ProcedureCardProps> = ({
  label,
  title,
  description,
  image,
  footer,
  onClick,
  ariaLabel,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? title}
      className="group relative flex min-h-[clamp(18rem,44vh,28rem)] flex-col justify-between overflow-hidden rounded-tablet-xl border border-surface-muted/60 bg-surface px-7 py-8 text-left shadow-tablet transition-all duration-300 hover:-translate-y-1 hover:shadow-tablet-glow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-muted via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        <span className="text-sm uppercase tracking-[0.35em] text-accent/70">{label}</span>
        <span className="text-[clamp(2rem,4vw,2.8rem)] font-semibold text-foreground">
          {title}
        </span>
        <p className="max-w-[36ch] text-base leading-relaxed text-foreground/70">{description}</p>
      </div>

      <div className="relative z-10 mt-6 h-[clamp(12rem,34vh,18rem)] w-full overflow-hidden rounded-tablet-lg border border-foreground/10 bg-[#010417] transition-colors duration-300 group-hover:border-foreground/20 group-hover:bg-[#010417]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-contain p-5 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
          sizes={image.sizes}
          priority
        />
      </div>

      {footer ? <div className="relative z-10 mt-6">{footer}</div> : null}
    </button>
  );
};

export default ProcedureCard;

