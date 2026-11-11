import { useI18n } from "../i18n"

export default function Disclaimer() {
  const { t } = useI18n()
  return (
    <aside
      role="note"
      className="my-4 rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink-soft"
    >
      <p>ℹ️ {t.knm.disclaimer}</p>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        <a
          className="font-semibold text-nl-blue underline underline-offset-2 hover:text-nl-blue-dark"
          href="https://www.inburgeren.nl/examen-doen/"
          target="_blank"
          rel="noreferrer noopener"
        >
          inburgeren.nl
        </a>
        <a
          className="font-semibold text-nl-blue underline underline-offset-2 hover:text-nl-blue-dark"
          href="https://www.staatsexamensnt2.nl/"
          target="_blank"
          rel="noreferrer noopener"
        >
          staatsexamensnt2.nl
        </a>
        <span className="text-ink-soft">({t.common.external})</span>
      </p>
    </aside>
  )
}
