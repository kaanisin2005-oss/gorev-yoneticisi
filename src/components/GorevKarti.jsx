import { ONCELIKLER, DURUMLAR } from '../sabitler'

/** ISO tarihini Türkçe biçimde gösterir. Geçersiz değerlerde boş döner. */
function tarihiBicimle(isoTarih) {
  if (!isoTarih) return null
  const tarih = new Date(isoTarih)
  if (Number.isNaN(tarih.getTime())) return null
  return tarih.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

/** Bitiş tarihi bugünden önce mi? (tamamlanmış görevler için gecikme gösterilmez) */
function gecikmisMi(gorev) {
  if (!gorev.bitisTarihi || gorev.durum === 'tamamlandi') return false
  const bugun = new Date()
  bugun.setHours(0, 0, 0, 0)
  return new Date(gorev.bitisTarihi) < bugun
}

/**
 * Tek bir görevin görüntülendiği kart.
 * READ (gösterim), UPDATE (durum değiştirme, düzenleme) ve DELETE eylemlerini barındırır.
 */
export default function GorevKarti({ gorev, onDurumDegistir, onDuzenle, onSil }) {
  const oncelik = ONCELIKLER[gorev.oncelik] ?? ONCELIKLER.orta
  const durum = DURUMLAR[gorev.durum] ?? DURUMLAR.bekliyor
  const tamamlandi = gorev.durum === 'tamamlandi'
  const gecikmis = gecikmisMi(gorev)
  const tarih = tarihiBicimle(gorev.bitisTarihi)

  return (
    <article
      className={`animate-giris relative flex h-full flex-col overflow-hidden rounded-xl border
                  bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md
                  ${tamamlandi ? 'border-slate-200 opacity-75' : 'border-slate-200'}`}
    >
      {/* Sol kenardaki öncelik şeridi */}
      <span className={`absolute inset-y-0 left-0 w-1 ${oncelik.seritRengi}`} aria-hidden="true" />

      <div className="flex items-start justify-between gap-3">
        <h3
          className={`font-semibold leading-snug text-slate-900 ${
            tamamlandi ? 'text-slate-500 line-through' : ''
          }`}
        >
          {gorev.baslik}
        </h3>

        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${oncelik.rozet}`}
        >
          {oncelik.etiket}
        </span>
      </div>

      {gorev.aciklama && (
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">
          {gorev.aciklama}
        </p>
      )}

      <div className="mb-4 mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className={`rounded-full px-2.5 py-0.5 font-medium ring-1 ${durum.rozet}`}>
          {durum.etiket}
        </span>

        {tarih && (
          <span
            className={`rounded-full px-2.5 py-0.5 font-medium ring-1 ${
              gecikmis
                ? 'bg-rose-50 text-rose-700 ring-rose-200'
                : 'bg-slate-50 text-slate-600 ring-slate-200'
            }`}
          >
            {gecikmis ? 'Gecikti · ' : 'Bitiş · '}
            {tarih}
          </span>
        )}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
        <label className="sr-only" htmlFor={`durum-${gorev.id}`}>
          Görev durumu
        </label>
        <select
          id={`durum-${gorev.id}`}
          value={gorev.durum}
          onChange={(olay) => onDurumDegistir(gorev.id, olay.target.value)}
          className="flex-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs
                     outline-none transition focus:border-marka-500 focus:ring-2 focus:ring-marka-100"
        >
          {Object.entries(DURUMLAR).map(([anahtar, { etiket }]) => (
            <option key={anahtar} value={anahtar}>
              {etiket}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => onDuzenle(gorev)}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold
                     text-slate-700 transition hover:border-marka-500 hover:bg-marka-50
                     hover:text-marka-700 focus:outline-none focus:ring-2 focus:ring-marka-100"
        >
          Düzenle
        </button>

        <button
          type="button"
          onClick={() => onSil(gorev)}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold
                     text-slate-700 transition hover:border-rose-400 hover:bg-rose-50
                     hover:text-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-100"
        >
          Sil
        </button>
      </div>
    </article>
  )
}
