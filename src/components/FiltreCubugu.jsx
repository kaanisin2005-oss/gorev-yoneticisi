import { DURUMLAR } from '../sabitler'

/**
 * READ işlemini destekleyen arama ve filtreleme çubuğu.
 * Filtre düğmeleri, o filtreye kaç görev düştüğünü de gösterir.
 */
export default function FiltreCubugu({
  arama,
  onAramaDegis,
  aktifFiltre,
  onFiltreDegis,
  siralama,
  onSiralamaDegis,
  sayimlar,
}) {
  const filtreler = [
    { anahtar: 'hepsi', etiket: 'Tümü' },
    ...Object.entries(DURUMLAR).map(([anahtar, { etiket }]) => ({ anahtar, etiket })),
  ]

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label className="sr-only" htmlFor="arama">
            Görevlerde ara
          </label>
          <input
            id="arama"
            type="search"
            value={arama}
            onChange={(olay) => onAramaDegis(olay.target.value)}
            placeholder="Başlık veya açıklamada ara..."
            className="alan"
          />
        </div>

        <div className="sm:w-56">
          <label className="sr-only" htmlFor="siralama">
            Sıralama ölçütü
          </label>
          <select
            id="siralama"
            value={siralama}
            onChange={(olay) => onSiralamaDegis(olay.target.value)}
            className="alan"
          >
            <option value="yeni">En yeni eklenen</option>
            <option value="eski">En eski eklenen</option>
            <option value="oncelik">Önceliğe göre</option>
            <option value="tarih">Bitiş tarihine göre</option>
          </select>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {filtreler.map(({ anahtar, etiket }) => {
          const aktif = aktifFiltre === anahtar
          return (
            <button
              key={anahtar}
              type="button"
              onClick={() => onFiltreDegis(anahtar)}
              aria-pressed={aktif}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition
                          focus:outline-none focus:ring-2 focus:ring-marka-200
                          ${
                            aktif
                              ? 'bg-marka-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
            >
              {etiket}
              <span className={aktif ? 'ml-1.5 text-marka-100' : 'ml-1.5 text-slate-400'}>
                {sayimlar[anahtar] ?? 0}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
