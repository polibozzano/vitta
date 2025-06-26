export type StatusConsulta = 'Aberto' | 'Concluído' | 'Cancelado';

export type Especialidade =
  | "Clínico Geral"
  | "Cardiologista"
  | "Dermatologista"
  | "Neurologista"
  | "Oftalmologista"
  | "Ortopedista"
  | "Pediatra"
  | "Ginecologista"
  | "Psiquiatra"
  | "Urologista"
  | "Endocrinologista";

export type Consulta = {
    id: string,
    name: string,
    data: string,
    hora: string,
    status: StatusConsulta,
    justificativa?: string;
    especialidade?: Especialidade;
}
