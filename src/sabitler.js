// Uygulama genelinde kullanılan sabit tanımlar.
// Tek bir yerde tutulmaları, yeni bir öncelik veya durum eklemeyi
// tek satırlık bir değişikliğe indirger.

export const ONCELIKLER = {
  dusuk: {
    etiket: 'Düşük',
    rozet: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
    seritRengi: 'bg-emerald-500',
    sira: 1,
  },
  orta: {
    etiket: 'Orta',
    rozet: 'bg-amber-100 text-amber-700 ring-amber-200',
    seritRengi: 'bg-amber-500',
    sira: 2,
  },
  yuksek: {
    etiket: 'Yüksek',
    rozet: 'bg-rose-100 text-rose-700 ring-rose-200',
    seritRengi: 'bg-rose-500',
    sira: 3,
  },
}

export const DURUMLAR = {
  bekliyor: {
    etiket: 'Bekliyor',
    rozet: 'bg-slate-100 text-slate-600 ring-slate-200',
  },
  devam: {
    etiket: 'Devam ediyor',
    rozet: 'bg-blue-100 text-blue-700 ring-blue-200',
  },
  tamamlandi: {
    etiket: 'Tamamlandı',
    rozet: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  },
}

export const DEPOLAMA_ANAHTARI = 'gorev-yoneticisi:gorevler'

export const BOS_FORM = {
  baslik: '',
  aciklama: '',
  oncelik: 'orta',
  bitisTarihi: '',
  durum: 'bekliyor',
}

// Uygulama ilk kez açıldığında gösterilecek örnek kayıtlar.
// Kullanıcı boş bir ekranla karşılaşmasın diye eklenmiştir.
export const ORNEK_GOREVLER = [
  {
    id: 'ornek-1',
    baslik: 'Proje raporunu tamamla',
    aciklama: 'Giriş ve sonuç bölümleri yazılacak, kaynakça düzenlenecek.',
    oncelik: 'yuksek',
    bitisTarihi: '',
    durum: 'devam',
    olusturmaTarihi: '2026-01-05T09:00:00.000Z',
  },
  {
    id: 'ornek-2',
    baslik: 'Haftalık okuma listesini gözden geçir',
    aciklama: '',
    oncelik: 'dusuk',
    bitisTarihi: '',
    durum: 'bekliyor',
    olusturmaTarihi: '2026-01-05T09:05:00.000Z',
  },
]
