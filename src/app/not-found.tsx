﻿import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Página não encontrada</h2>
        <p className="text-muted-foreground mb-4">
          A página que você está procurando não existe.
        </p>
        <Link
          href="/"
          className="text-primary hover:text-primary/80 underline"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}
