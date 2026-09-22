import { useMemo, useState } from 'react'
import { useYerelDepolama } from './useYerelDepolama'
import { DEPOLAMA_ANAHTARI, ORNEK_GOREVLER, ONCELIKLER } from './sabitler'
import GorevFormu from './components/GorevFormu'
import GorevKarti from './components/GorevKarti'
import FiltreCubugu from './components/FiltreCubugu'
import Istatistikler from './components/Istatistikler'
import SilmeOnayi from './components/SilmeOnayi'

export default function App() {
  const [gorevler, setGorevler] = useYerelDepolama(DEPOLAMA_ANAHTARI, ORNEK_GOREVLER)

  const [duzenlenen, setDuzenlenen] = useState(null)
  const [silinecek, setSilinecek] = useState(null)
  const [arama, setArama] = useState('')
  const [filtre, setFiltre] = useState('hepsi')
  const [siralama, setSiralama] = useState('yeni')

  /* ------------------------------------------------------------------ *
   *  CREATE  /  UPDATE
   *  Aynı işleyici her iki durumu da karşılar: formda bir kimlik (id)
   *  varsa güncelleme, yoksa yeni kayıt oluşturma yapılır.
   * ------------------------------------------------------------------ */
  const gorevKaydet = (form) => {
    if (form.id) {
      setGorevler((onceki) =>
        onceki.map((g) => (g.id === form.id ? { ...g, ...form } : g)),
      )
      setDuzenlenen(null)
      return
    }

    const yeniGorev = {
      ...form,
      id: crypto.randomUUID(),
      olusturmaTarihi: new Date().toISOString(),
    }
    setGorevler((onceki) => [yeniGorev, ...onceki])
  }

  /* ------------------------------------------------------------------ *
   *  UPDATE — kart üzerinden hızlı durum değişikliği
   * ------------------------------------------------------------------ */
  const durumDegistir = (id, yeniDurum) => {
    setGorevler((onceki) =>
      onceki.map((g) => (g.id === id ? { ...g, durum: yeniDurum } : g)),
    )
  }

  /* ------------------------------------------------------------------ *
   *  DELETE — onay penceresinden geçerek
   * ------------------------------------------------------------------ */
  const silmeyiOnayla = () => {
    setGorevler((onceki) => onceki.filter((g) => g.id !== silinecek.id))
    if (duzenlenen?.id === silinecek.id) setDuzenlenen(null)
    setSilinecek(null)
  }

  const duzenlemeyeBasla = (gorev) => {
    setDuzenlenen(gorev)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* ------------------------------------------------------------------ *
   *  READ — arama, filtreleme ve sıralama
   *  useMemo: bu hesaplama yalnızca bağımlılıklar değiştiğinde yeniden
   *  yapılır, her yeniden çizimde değil.
   * ------------------------------------------------------------------ */
  const sayimlar = useMemo(() => {
    const sonuc = { hepsi: gorevler.length, bekliyor: 0, devam: 0, tamamlandi: 0 }
    for (const g of gorevler) sonuc[g.durum] = (sonuc[g.durum] ?? 0) + 1
    return sonuc
  }, [gorevler])

  const gosterilecekler = useMemo(() => {
    const aranan = arama.trim().toLocaleLowerCase('tr')

    const suzulmus = gorevler.filter((g) => {
      const filtreUyumu = filtre === 'hepsi' || g.durum === filtre
      if (!filtreUyumu) return false
      if (!aranan) return true
      return (
        g.baslik.toLocaleLowerCase('tr').includes(aranan) ||
        g.aciklama.toLocaleLowerCase('tr').includes(aranan)
      )
    })

    const siralayicilar = {
      yeni: (a, b) => new Date(b.olusturmaTarihi) - new Date(a.olusturmaTarihi),
      eski: (a, b) => new Date(a.olusturmaTarihi) - new Date(b.olusturmaTarihi),
      oncelik: (a, b) =>
        (ONCELIKLER[b.oncelik]?.sira ?? 0) - (ONCELIKLER[a.oncelik]?.sira ?? 0),
      tarih: (a, b) => {
        // Bitiş tarihi olmayan görevler listenin sonuna gider.
        if (!a.bitisTarihi) return 1
        if (!b.bitisTarihi) return -1
        return new Date(a.bitisTarihi) - new Date(b.bitisTarihi)
      },
    }

    return [...suzulmus].sort(siralayicilar[siralama] ?? siralayicilar.yeni)
  }, [gorevler, arama, filtre, siralama])

  const bosMu = gorevler.length === 0
  const sonucYok = !bosMu && gosterilecekler.length === 0

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-marka-600 to-violet-600 text-white">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Görev Yöneticisi</h1>
          <p className="mt-2 max-w-xl text-sm text-marka-100 sm:text-base">
            Yapılacaklarınızı ekleyin, önceliklendirin ve tamamlanma durumunu takip edin.
            Kayıtlar tarayıcınızda saklanır.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        <Istatistikler
          toplam={sayimlar.hepsi}
          tamamlanan={sayimlar.tamamlandi}
          devamEden={sayimlar.devam}
        />

        <GorevFormu
          key={duzenlenen?.id ?? 'yeni-gorev'}
          duzenlenen={duzenlenen}
          onKaydet={gorevKaydet}
          onIptal={() => setDuzenlenen(null)}
        />

        <FiltreCubugu
          arama={arama}
          onAramaDegis={setArama}
          aktifFiltre={filtre}
          onFiltreDegis={setFiltre}
          siralama={siralama}
          onSiralamaDegis={setSiralama}
          sayimlar={sayimlar}
        />

        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Görevler
            <span className="ml-2 text-sm font-normal text-slate-500">
              ({gosterilecekler.length} kayıt)
            </span>
          </h2>

          {bosMu && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <p className="font-medium text-slate-700">Henüz görev yok</p>
              <p className="mt-1 text-sm text-slate-500">
                Yukarıdaki formu kullanarak ilk görevinizi ekleyin.
              </p>
            </div>
          )}

          {sonucYok && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <p className="font-medium text-slate-700">Sonuç bulunamadı</p>
              <p className="mt-1 text-sm text-slate-500">
                Arama teriminizi veya filtrenizi değiştirmeyi deneyin.
              </p>
            </div>
          )}

          {gosterilecekler.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gosterilecekler.map((gorev) => (
                <GorevKarti
                  key={gorev.id}
                  gorev={gorev}
                  onDurumDegistir={durumDegistir}
                  onDuzenle={duzenlemeyeBasla}
                  onSil={setSilinecek}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-slate-500 sm:px-6">
          Görev Yöneticisi · React ve Tailwind CSS ile geliştirildi
        </div>
      </footer>

      <SilmeOnayi
        gorev={silinecek}
        onOnayla={silmeyiOnayla}
        onVazgec={() => setSilinecek(null)}
      />
    </div>
  )
}
