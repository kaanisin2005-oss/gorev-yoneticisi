import { useState } from 'react'
import { BOS_FORM, ONCELIKLER, DURUMLAR } from '../sabitler'

/**
 * CREATE ve UPDATE işlemlerinin arayüzü.
 *
 * Aynı form hem yeni kayıt oluşturmak hem de mevcut kaydı düzenlemek için kullanılır;
 * hangi modda olduğu `duzenlenen` prop'unun dolu olup olmamasıyla belirlenir.
 *
 * Not: Bu bileşen App tarafında `key` prop'u ile render edilir. Düzenlenen kayıt
 * değiştiğinde React bileşeni yeniden monte eder ve başlangıç durumu doğrudan
 * `duzenlenen` prop'undan kurulur. Bu, `useEffect` ile senkronizasyona kıyasla bir
 * render döngüsü kazandırır: aksi hâlde başlık "Görevi düzenle" olarak değişirken
 * alanlar bir kare boyunca eski değerini gösterirdi.
 */
export default function GorevFormu({ duzenlenen, onKaydet, onIptal }) {
  const [form, setForm] = useState(duzenlenen ?? BOS_FORM)
  const [hatalar, setHatalar] = useState({})

  const guncelle = (alan) => (olay) => {
    setForm((onceki) => ({ ...onceki, [alan]: olay.target.value }))
    setHatalar((onceki) => ({ ...onceki, [alan]: undefined }))
  }

  /** Form doğrulaması. Hata varsa alan adı -> mesaj eşlemesi döner. */
  const dogrula = () => {
    const yeni = {}
    const baslik = form.baslik.trim()

    if (!baslik) {
      yeni.baslik = 'Görev başlığı zorunludur.'
    } else if (baslik.length < 3) {
      yeni.baslik = 'Başlık en az 3 karakter olmalıdır.'
    } else if (baslik.length > 120) {
      yeni.baslik = 'Başlık en fazla 120 karakter olabilir.'
    }

    if (form.aciklama.length > 500) {
      yeni.aciklama = 'Açıklama en fazla 500 karakter olabilir.'
    }

    return yeni
  }

  const gonder = (olay) => {
    olay.preventDefault()
    const bulunanHatalar = dogrula()

    if (Object.keys(bulunanHatalar).length > 0) {
      setHatalar(bulunanHatalar)
      return
    }

    onKaydet({
      ...form,
      baslik: form.baslik.trim(),
      aciklama: form.aciklama.trim(),
    })

    // Düzenleme modunda bileşen zaten yeniden monte edilecek; yalnızca yeni kayıt
    // oluşturulurken formu elle temizlemek gerekir.
    if (!duzenlenen) {
      setForm(BOS_FORM)
      setHatalar({})
    }
  }

  const duzenlemeModu = Boolean(duzenlenen)

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">
        {duzenlemeModu ? 'Görevi düzenle' : 'Yeni görev ekle'}
      </h2>

      <form onSubmit={gonder} noValidate className="space-y-4">
        <div>
          <label className="etiket" htmlFor="baslik">
            Görev başlığı <span className="text-rose-500">*</span>
          </label>
          <input
            id="baslik"
            type="text"
            value={form.baslik}
            onChange={guncelle('baslik')}
            placeholder="Örn: Proje raporunu tamamla"
            aria-invalid={Boolean(hatalar.baslik)}
            aria-describedby={hatalar.baslik ? 'baslik-hata' : undefined}
            className={`alan ${hatalar.baslik ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-100' : ''}`}
          />
          {hatalar.baslik && (
            <p id="baslik-hata" role="alert" className="mt-1 text-xs text-rose-600">
              {hatalar.baslik}
            </p>
          )}
        </div>

        <div>
          <label className="etiket" htmlFor="aciklama">
            Açıklama
          </label>
          <textarea
            id="aciklama"
            rows={3}
            value={form.aciklama}
            onChange={guncelle('aciklama')}
            placeholder="İsteğe bağlı ayrıntılar"
            className={`alan resize-y ${hatalar.aciklama ? 'border-rose-400' : ''}`}
          />
          <div className="mt-1 flex justify-between text-xs">
            <span className="text-rose-600">{hatalar.aciklama}</span>
            <span className="text-slate-400">{form.aciklama.length} / 500</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="etiket" htmlFor="oncelik">
              Öncelik
            </label>
            <select id="oncelik" value={form.oncelik} onChange={guncelle('oncelik')} className="alan">
              {Object.entries(ONCELIKLER).map(([anahtar, { etiket }]) => (
                <option key={anahtar} value={anahtar}>
                  {etiket}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="etiket" htmlFor="durum">
              Durum
            </label>
            <select id="durum" value={form.durum} onChange={guncelle('durum')} className="alan">
              {Object.entries(DURUMLAR).map(([anahtar, { etiket }]) => (
                <option key={anahtar} value={anahtar}>
                  {etiket}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="etiket" htmlFor="bitisTarihi">
              Bitiş tarihi
            </label>
            <input
              id="bitisTarihi"
              type="date"
              value={form.bitisTarihi}
              onChange={guncelle('bitisTarihi')}
              className="alan"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-1 sm:flex-row">
          <button
            type="submit"
            className="rounded-lg bg-marka-600 px-5 py-2.5 text-sm font-semibold text-white
                       transition hover:bg-marka-700 focus:outline-none focus:ring-2
                       focus:ring-marka-500 focus:ring-offset-2"
          >
            {duzenlemeModu ? 'Değişiklikleri kaydet' : 'Görevi ekle'}
          </button>

          {duzenlemeModu && (
            <button
              type="button"
              onClick={onIptal}
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm
                         font-semibold text-slate-700 transition hover:bg-slate-50
                         focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              Vazgeç
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
