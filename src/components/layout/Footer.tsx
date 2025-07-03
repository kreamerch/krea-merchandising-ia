'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="bg-white/70 dark:bg-background border-t border-border text-sm text-muted-foreground backdrop-blur-xl"
      aria-label="Pie de página"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Logo y redes sociales */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <Link href="/" aria-label="Inicio">
              <Image
                src="/logo-krea-merchandising.svg"
                alt="Logo Krea Merch"
                width={140}
                height={40}
                className="dark:invert mx-auto"
                priority
              />
            </Link>

            <div className="flex gap-4 pt-2">
              <SocialIcon href="https://facebook.com/kreamerch" label="Facebook"><Facebook /></SocialIcon>
              <SocialIcon href="https://instagram.com/kreamerch" label="Instagram"><Instagram /></SocialIcon>
              <SocialIcon href="https://linkedin.com/company/krea-merchandising-sac" label="LinkedIn"><Linkedin /></SocialIcon>
            </div>
          </div>

          {/* Columnas de navegación */}
          <FooterColumn
            title="Empresa"
            links={[
              { label: 'Nosotros', href: '/nosotros' },
              { label: 'Servicios', href: '/servicios' },
              { label: 'Catálogo', href: '/productos' },
            ]}
          />
          <FooterColumn
            title="Recursos"
            links={[
              { label: 'Blog', href: '/blog' },
              { label: 'Preguntas frecuentes', href: '/faq' },
              { label: 'Mapa del sitio', href: '/mapa-del-sitio' },
            ]}
          />
          <FooterColumn
            title="Legal"
            links={[
              { label: 'Política de privacidad', href: '/politica-de-privacidad' },
              { label: 'Términos y condiciones', href: '/terminos-y-condiciones' },
            ]}
          />

          {/* Contacto */}
          <address className="not-italic space-y-2 text-foreground">
            <h4 className="text-foreground font-semibold">Contacto</h4>
            <p className="font-semibold">+51 955 876 887</p>
            <p>
              <a href="mailto:ventas@kreamerch.com" className="hover:underline">
                ventas@kreamerch.com
              </a>
            </p>
            <p>
              <a
                href="https://goo.gl/maps/pUbUwoXKXsXPR2eXA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Maps
              </a>
            </p>
          </address>
        </div>

        {/* Derechos reservados */}
        <div className="text-center text-xs text-muted-foreground pt-10">
          &copy; {year} Krea Merchandising. Todos los derechos reservados.{' '}
          <Link href="/politica-de-privacidad" className="underline hover:text-primary">
            Política de privacidad
          </Link>
        </div>
      </div>

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Krea Merchandising",
            url: "https://www.kreamerch.com",
            logo: "https://www.kreamerch.com/logo-krea-merchandising.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+51 955 876 887",
              contactType: "customer support",
              areaServed: "PE",
              availableLanguage: "Spanish"
            },
            sameAs: [
              "https://facebook.com/kreamerch",
              "https://instagram.com/kreamerch",
              "https://linkedin.com/company/krea-merchandising-sac"
            ]
          }),
        }}
      />
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <nav aria-label={title} className="space-y-2">
      <h4 className="text-foreground font-semibold">{title}</h4>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-primary transition"
    >
      {children}
    </a>
  )
}
