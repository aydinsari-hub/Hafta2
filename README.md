# Kampüs Etkinlikleri - Sprint 2 (CSS ve Responsive Tasarım)

Bu proje, "CSS ve Responsive Tasarım" (Sprint 2) görevi kapsamında geliştirilmiştir. Projede herhangi bir CSS kütüphanesi (Bootstrap, Tailwind vb.) kullanılmadan, tamamen saf (vanilla) HTML ve CSS ile mobil öncelikli (mobile-first) ve duyarlı (responsive) bir arayüz tasarlanmıştır.

## 🚀 Projenin Özellikleri

* **Mobil Uyumlu Tasarım:** Slayt görevlerine uygun olarak CSS Grid kullanılmış, telefonda tek sütun, masaüstü ekranlarda ise yan yana dizilen kart yapıları oluşturulmuştur.
* **Form Validasyonu:** Etkinlik Ekle ve Güncelle sayfalarında HTML5 zorunluluk (required) kuralları uygulanmış, boş bırakılan alanların CSS `:invalid` seçicisi ile kırmızı çerçeveyle uyarılması sağlanmıştır.
* **Kişiselleştirilmiş Tasarım Kuralları:** CSS değişkenleri (`:root`) kullanılarak proje sahibinin öğrenci numarasına göre dinamik renk ve font atamaları yapılmıştır.
* **Sayfa Yapıları:**
  * `index.html` (Ana Sayfa - Etkinlik listesi)
  * `etkinlik-detay.html` (Grid yapısı ile afiş ve detay ekranı)
  * `etkinlik-ekle.html` (Yeni etkinlik formu)
  * `etkinlik-guncelle.html` (Mevcut etkinlik formu)

## 🎨 Tasarım Detayları (Öğrenci Numarasına Göre)

Görev gereksinimlerine göre tasarım tamamen öğrenci numarasına (2416501056) göre şekillendirilmiştir:

* **Renk Hesaplaması:** Öğrenci numarasının 360'a göre modu hesaplanmış (**336** tonu) ve HSL formatında renk paleti oluşturulmuştur.
  * Ana Renk: `hsl(336, 60%, 35%)`
  * Zemin Rengi: `hsl(336, 30%, 97%)`
* **Tipografi:** Öğrenci numarasının son hanesi (**6**) baz alınarak tablo kurallarına göre font ailesi `"Courier New", monospace` olarak belirlenmiştir.

## 🛠️ Kullanılan Teknolojiler

* HTML5
* CSS3 (Flexbox & CSS Grid)
* Git & GitHub
* Vercel (Canlıya Alma)

## 🔗 Canlı Demo

Projenin çalışan canlı haline Vercel üzerinden ulaşabilirsiniz: 
👉 [Kampüs Etkinlikleri - Vercel Demo](https://hafta2-gamma.vercel.app)

## 👨‍💻 Geliştirici

**Aydın Sarı**  
Öğrenci No: 2416501056
