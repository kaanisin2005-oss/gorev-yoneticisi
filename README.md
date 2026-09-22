# Görev Yöneticisi

React ve Tailwind CSS ile geliştirilmiş, tam CRUD işlevine sahip görev yönetim uygulaması.

![Uygulama ekran görüntüsü](ekran_goruntusu.png)

## Özellikler

**CRUD işlemleri**

| İşlem | Nasıl çalışır |
|-------|---------------|
| **Create** | Form üzerinden başlık, açıklama, öncelik, durum ve bitiş tarihi girilerek yeni görev eklenir. Başlık doğrulamadan geçmeden kayıt oluşmaz. |
| **Read** | Görevler kart düzeninde listelenir; başlık/açıklama üzerinden arama, duruma göre filtreleme ve dört farklı ölçüte göre sıralama yapılabilir. |
| **Update** | "Düzenle" düğmesi kaydı forma taşır; ayrıca kart üzerindeki açılır listeden durum tek tıkla değiştirilebilir. |
| **Delete** | "Sil" düğmesi uygulama içi bir onay penceresi açar; silme yalnızca onaydan sonra gerçekleşir. |

**Diğer özellikler**

- Kayıtlar `localStorage`'da saklanır, sayfa yenilense de korunur
- Öncelik seviyeleri renk şeridi ve rozetle gösterilir
- Bitiş tarihi geçmiş görevler "Gecikti" olarak işaretlenir
- Tamamlanma oranını gösteren istatistik şeridi
- Mobil, tablet ve masaüstü için duyarlı (responsive) tasarım
- Klavye erişilebilirliği: odak halkaları, `aria` etiketleri, Escape ile pencere kapatma

## Teknolojiler

- **React 18** — bileşen tabanlı arayüz, `useState` / `useEffect` / `useMemo` kancaları
- **Tailwind CSS 3** — yardımcı sınıf tabanlı stil altyapısı
- **Vite 6** — geliştirme sunucusu ve üretim derlemesi
- **localStorage** — istemci tarafı kalıcı depolama

## Kurulum

Node.js 18 veya üzeri gereklidir.

```bash
git clone https://github.com/KULLANICI_ADI/gorev-yoneticisi.git
cd gorev-yoneticisi
npm install
npm run dev
```

Uygulama `http://localhost:5173` adresinde açılır.

## Komutlar

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusunu başlatır |
| `npm run build` | Üretim derlemesini `dist/` klasörüne üretir |
| `npm run preview` | Üretim derlemesini yerelde önizler |

## Dosya yapısı

```
gorev-yoneticisi/
├── index.html                    Giriş noktası
├── package.json                  Bağımlılıklar ve komutlar
├── vite.config.js                Vite yapılandırması
├── tailwind.config.js            Tailwind teması ve içerik yolları
├── postcss.config.js             PostCSS eklentileri
├── netlify.toml                  Netlify derleme ve yönlendirme ayarları
└── src/
    ├── main.jsx                  React kök bağlama
    ├── index.css                 Tailwind katmanları ve özel sınıflar
    ├── App.jsx                   Ana bileşen, durum yönetimi ve CRUD işleyicileri
    ├── sabitler.js               Öncelik/durum tanımları ve varsayılanlar
    ├── useYerelDepolama.js       localStorage senkronizasyonu için özel kanca
    └── components/
        ├── GorevFormu.jsx        Create ve Update arayüzü, form doğrulaması
        ├── GorevKarti.jsx        Tek görev kartı
        ├── FiltreCubugu.jsx      Arama, filtreleme ve sıralama
        ├── Istatistikler.jsx     Sayaçlar ve ilerleme çubuğu
        └── SilmeOnayi.jsx        Silme onay penceresi
```

## Netlify ile yayına alma

1. Projeyi GitHub'a herkese açık (public) bir depo olarak yükleyin.
2. [netlify.com](https://netlify.com) üzerinde **Add new site → Import an existing project** yolunu izleyin.
3. GitHub hesabınızı bağlayıp bu depoyu seçin.
4. Derleme ayarları `netlify.toml` dosyasından otomatik okunur:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Deploy** düğmesine basın.

## Veri saklama hakkında

Görevler tarayıcının `localStorage` alanında tutulur. Bu, verilerin yalnızca ilgili
tarayıcıda ve cihazda bulunduğu anlamına gelir; farklı bir cihazdan aynı listeye
erişilemez. Tarayıcı site verileri temizlendiğinde kayıtlar silinir.

Çok cihazlı kullanım için bir arka uç (örneğin Node.js + PostgreSQL) ve kullanıcı
kimlik doğrulaması eklenmesi gerekir.

## Lisans

Eğitim amaçlı geliştirilmiştir.
