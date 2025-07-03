export const metadata = {
  title: 'Contáctanos | Krea Merch',
  description:
    'Comunícate con el equipo de Krea Merch para cotizaciones, asesoría o consultas. Estamos listos para ayudarte.',
  openGraph: {
    title: 'Contáctanos | Krea Merch',
    description:
      'Comunícate con el equipo de Krea Merch para cotizaciones, asesoría o consultas. Estamos listos para ayudarte.',
    url: 'https://www.kreamerch.com/contacto',
    siteName: 'Krea Merch',
    locale: 'es_PE',
    type: 'website',
  },
  alternates: {
    canonical: '/contacto',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
}


import ContactForm from '@/components/forms/ContactForm'

export default function ContactoPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Contáctanos</h1>
      <p className="text-center text-muted-foreground mb-10">
        Envíanos tu consulta, cotización o mensaje. Estamos para ayudarte.
      </p>

      <ContactForm />
    </main>
  )
}
