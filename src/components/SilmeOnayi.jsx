import { useEffect } from 'react'

/**
 * Silme işlemi için uygulama içi onay penceresi.
 *
 * Tarayıcının window.confirm() çağrısı yerine bu bileşen kullanılır; böylece
 * pencere hem markanın görsel diliyle uyumlu olur hem de tarayıcının ana iş
 * parçacığını bloke etmez. Escape tuşu ile kapatma desteklenir.
 */
export default function SilmeOnayi({ gorev, onOnayla, onVazgec }) {
  useEffect(() => {
    const tusDinleyici = (olay) => {
      if (olay.key === 'Escape') onVazgec()
    }
    window.addEventListener('keydown', tusDinleyici)
    return () => window.removeEventListener('keydown', tusDinleyici)
  }, [onVazgec])

  if (!gorev) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="silme-basligi"
      onClick={onVazgec}
    >
      <div
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
        onClick={(olay) => olay.stopPropagation()}
      >
        <h3 id="silme-basligi" className="text-lg font-semibold text-slate-900">
          Görev silinsin mi?
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          <span className="font-medium text-slate-900">&ldquo;{gorev.baslik}&rdquo;</span> kalıcı
          olarak silinecek. Bu işlem geri alınamaz.
        </p>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onVazgec}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold
                       text-slate-700 transition hover:bg-slate-50 focus:outline-none
                       focus:ring-2 focus:ring-slate-300"
          >
            Vazgeç
          </button>
          <button
            type="button"
            autoFocus
            onClick={onOnayla}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white
                       transition hover:bg-rose-700 focus:outline-none focus:ring-2
                       focus:ring-rose-400 focus:ring-offset-2"
          >
            Evet, sil
          </button>
        </div>
      </div>
    </div>
  )
}
