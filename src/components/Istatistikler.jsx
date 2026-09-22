/**
 * Görev sayıları ve tamamlanma oranının özetlendiği bilgi şeridi.
 */
export default function Istatistikler({ toplam, tamamlanan, devamEden }) {
  const oran = toplam === 0 ? 0 : Math.round((tamamlanan / toplam) * 100)

  const kartlar = [
    { etiket: 'Toplam görev', deger: toplam },
    { etiket: 'Devam eden', deger: devamEden },
    { etiket: 'Tamamlanan', deger: tamamlanan },
  ]

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid grid-cols-3 gap-4">
        {kartlar.map(({ etiket, deger }) => (
          <div key={etiket}>
            <p className="text-2xl font-bold text-slate-900 sm:text-3xl">{deger}</p>
            <p className="text-xs text-slate-500 sm:text-sm">{etiket}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex justify-between text-xs font-medium text-slate-600">
          <span>Tamamlanma oranı</span>
          <span>%{oran}</span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuenow={oran}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Tamamlanma oranı"
        >
          <div
            className="h-full rounded-full bg-marka-600 transition-all duration-500"
            style={{ width: `${oran}%` }}
          />
        </div>
      </div>
    </section>
  )
}
