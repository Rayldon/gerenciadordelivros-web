export interface Livro {
  id?: number;
  codl?: number;
  titulo: string;
  valor: number;
  autores: string[];
  assuntos: string[];
}

export interface LivroForm {
  titulo: string;
  valor: number;
  autores: string[];
  assuntos: string[];
}
