export function mapFriendlyErrorMessage(error: { message?: string } | null | undefined): string {
  const raw = error?.message ?? 'Erro inesperado. Tente novamente.';
  const normalized = raw.toLowerCase();

  if (normalized.includes('livro nao encontrado')) {
    return 'Livro nao encontrado. Atualize a lista e tente novamente.';
  }

  if (normalized.includes('autor nao encontrado')) {
    return 'Autor nao encontrado. Atualize a lista e tente novamente.';
  }

  if (normalized.includes('assunto nao encontrado')) {
    return 'Assunto nao encontrado. Atualize a lista e tente novamente.';
  }

  if (normalized.includes('autor possui livros vinculados')) {
    return 'Nao foi possivel excluir o autor porque ele possui livros vinculados.';
  }

  if (normalized.includes('assunto possui livros vinculados')) {
    return 'Nao foi possivel excluir o assunto porque ele possui livros vinculados.';
  }

  if (normalized.includes('corpo da requisicao invalido')) {
    return 'Dados invalidos. Revise o preenchimento e tente novamente.';
  }

  return raw;
}
