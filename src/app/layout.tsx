import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Danilo Henrique | Desenvolvedor Full Stack & Automação Industrial',
  description: 'Portfólio profissional de Danilo Henrique - Especialista em automação industrial, desenvolvimento web e sistemas PLC. Experiência com Go, React, TypeScript, Siemens S7 e muito mais.',
  keywords: 'desenvolvedor full stack, automação industrial, PLC, Siemens S7, Go, React, TypeScript, portfolio',
  authors: [{ name: 'Danilo Henrique' }],
  creator: 'Danilo Henrique',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://danilohenrique.dev',
    title: 'Danilo Henrique | Desenvolvedor Full Stack & Automação Industrial',
    description: 'Portfólio profissional de Danilo Henrique - Especialista em automação industrial e desenvolvimento web.',
    siteName: 'Danilo Henrique Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Danilo Henrique | Desenvolvedor Full Stack & Automação Industrial',
    description: 'Portfólio profissional de Danilo Henrique - Especialista em automação industrial e desenvolvimento web.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#191919" />
      </head>
      <body className={`${poppins.className} min-h-screen bg-primary text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}