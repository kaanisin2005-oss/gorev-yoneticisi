import { useEffect, useState } from 'react'

/**
 * Bir state değerini tarayıcının localStorage'ı ile eşitleyen özel kanca (custom hook).
 *
 * Neden ayrı bir kanca?
 *  - App bileşenini depolama ayrıntılarından arındırır.
 *  - Okuma/yazma işlemleri try-catch ile korunur: gizli sekmede veya site verileri
 *    engellendiğinde localStorage erişimi hata fırlatabilir. Bu durumda uygulama
 *    çökmez, yalnızca kalıcılık özelliği devre dışı kalır.
 *
 * @param {string} anahtar   localStorage anahtarı
 * @param {*}      baslangic Depolamada kayıt yoksa kullanılacak başlangıç değeri
 */
export function useYerelDepolama(anahtar, baslangic) {
  const [deger, setDeger] = useState(() => {
    try {
      const kayitli = window.localStorage.getItem(anahtar)
      return kayitli ? JSON.parse(kayitli) : baslangic
    } catch {
      // Bozuk JSON veya erişim hatası: başlangıç değerine dön.
      return baslangic
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(anahtar, JSON.stringify(deger))
    } catch {
      // Kota dolu veya depolama engelli. Uygulama çalışmaya devam eder.
    }
  }, [anahtar, deger])

  return [deger, setDeger]
}
