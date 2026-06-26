import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

/** Resolves a public-folder asset path against Vite's configured base (needed for GitHub Pages subpath deploys). */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

/**
 * Salta para o topo da página instantaneamente, ignorando o `scroll-behavior: smooth`
 * global do html — esse CSS faz `scrollTo({ behavior: 'auto' })` continuar a animar
 * (por spec, "auto" significa "respeita o CSS"), por isso desligamos o CSS por um instante.
 */
export function scrollToTopInstant(): void {
  const html = document.documentElement
  const prev = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'
  window.scrollTo(0, 0)
  // Repõe o estilo só depois do browser processar o scroll instantâneo —
  // revertê-lo na mesma tarefa síncrona faz alguns browsers ignorarem a
  // mudança e animar com o `scroll-behavior: smooth` do CSS de qualquer forma.
  requestAnimationFrame(() => {
    html.style.scrollBehavior = prev
  })
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
