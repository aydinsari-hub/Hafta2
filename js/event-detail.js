import { events } from "./data.js";

function formatTarih(tarihStr) {
  if (!tarihStr) return "";
  const [yil, ay, gun] = tarihStr.split("-");
  const dateObj = new Date(yil, ay - 1, gun);
  return dateObj.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

const container = document.querySelector("#detay");
const id = new URLSearchParams(window.location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
  document.title = "Etkinlik bulunamadı";
  if (container) {
    container.innerHTML = `
      <div class="hata-kutusu" style="max-width:100%; margin-bottom:20px;">
        <p>"${id || 'Geçersiz'}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.</p>
      </div>
      <a href="etkinlikler.html" class="btn">← Listeye dön</a>
    `;
  }
} else {
  document.title = event.title;
  if (container) {
    container.innerHTML = `
      <div class="detay-layout">
        <div class="detay-sol">
          <div class="afis-kutu">
            <h2>${event.title}</h2>
            <p>${formatTarih(event.date)} · ${event.location}</p>
          </div>
          <small class="afis-alti">${event.title} afişi</small>

          <section class="aciklama-bolumu">
            <h3>Açıklama</h3>
            <p>${event.description}</p>
          </section>

          <div class="detay-butonlar">
            <a href="etkinlikler.html" class="btn">← Listeye dön</a>
            <a href="etkinlik-guncelle.html?id=${event.id}" class="btn">Bu etkinliği güncelle</a>
          </div>
        </div>

        <aside class="detay-sag">
          <div class="kunye-kutusu">
            <h3>Etkinlik Künyesi</h3>
            <dl class="kunye">
              <dt>Tarih</dt>
              <dd>${formatTarih(event.date)}, ${event.time}</dd>

              <dt>Yer</dt>
              <dd>${event.location}</dd>

              <dt>Kategori</dt>
              <dd>${event.category}</dd>

              <dt>Kontenjan</dt>
              <dd>${event.capacity ? event.capacity + " kişi" : "Belirtilmedi"}</dd>
            </dl>
          </div>
        </aside>
      </div>
    `;
  }
}