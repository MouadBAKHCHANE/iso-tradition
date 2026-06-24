'use client'

import { useEffect } from 'react'
import { createPopup } from '@typeform/embed'
import '@typeform/embed/build/css/popup.css'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Intercepte globalement les clics vers un lien Typeform (*.typeform.com/to/<id>)
 * et ouvre le formulaire en POPUP (l'utilisateur reste sur le domaine).
 *
 * IMPORTANT : on écoute en phase CAPTURE (3e arg = true) pour passer AVANT le
 * onClick du <Link> de Next.js, sinon Next gère le clic en premier et la page
 * part vers typeform.com.
 *
 * À la soumission réelle (callback onSubmit), conversion déclenchée UNE seule fois :
 *  - GA4  : generate_lead
 *  - Meta : Lead (seulement si un Pixel est chargé — window.fbq?.() no-op sinon)
 */
export default function TypeformLeadPopup() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      const target = e.target as HTMLElement | null
      const link = target?.closest('a[href*="typeform.com/to/"]') as HTMLAnchorElement | null
      if (!link) return

      const match = link.href.match(/typeform\.com\/to\/([A-Za-z0-9]+)/)
      if (!match) return

      e.preventDefault()
      e.stopPropagation()

      const popup = createPopup(match[1], {
        onSubmit: () => {
          window.gtag?.('event', 'generate_lead', { method: 'typeform' })
          window.fbq?.('track', 'Lead')
        },
      })
      popup.open()
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [])

  return null
}
