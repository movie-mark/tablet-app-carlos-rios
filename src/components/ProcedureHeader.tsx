import type { FC } from "react";

/**
 * Encabezado reutilizable para la selección de procedimientos.
 * Props:
 * - tag: Texto corto sobre el título principal (ej. "Sala de espera").
 * - title: Título principal mostrado al usuario.
 * - description: Mensaje que contextualiza la acción para el paciente.
 */
type ProcedureHeaderProps = {
  tag: string;
  title: string;
  description: string;
};

const ProcedureHeader: FC<ProcedureHeaderProps> = ({ tag, title, description }) => {
  return (
    <header className="space-y-3">
      <p className="text-xs uppercase tracking-[0.4em] text-accent/80">{tag}</p>
      <h1 className="text-[clamp(2.6rem,5vw,3.4rem)] font-semibold leading-[1.05] text-foreground">
        {title}
      </h1>
      <p className="max-w-[32ch] text-base text-foreground/70">{description}</p>
    </header>
  );
};

export default ProcedureHeader;



