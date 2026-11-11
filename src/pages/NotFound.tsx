import { Link } from "react-router-dom"
import { useI18n } from "../i18n"

export default function NotFound() {
  const { t } = useI18n()
  return (
    <div className="py-16 text-center">
      <p className="text-6xl font-extrabold text-nl-blue">404</p>
      <p className="mt-4 text-lg text-ink-soft">
        Deze pagina bestaat niet. <a className="font-semibold text-nl-blue underline" href="/">← {t.nav.home}</a>
      </p>
      <Link to="/knm" className="mt-6 inline-block rounded-lg bg-nl-blue px-5 py-2.5 font-semibold text-white">
        {t.home.startKnm}
      </Link>
    </div>
  )
}
