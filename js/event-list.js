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

function createCard(event) {
  return `
    <article class="kart">
      <h2>${event.title}</h2>
      <span class="etiket">${event.category}</span>
      <p><strong>Tarih:</strong> ${formatTarih(event.date)}, ${event.time}</p>
      <p><strong>Yer:</strong> ${event.location}</p>
      <p><strong>Kontenjan:</strong> ${event.capacity ? event.capacity + " kişi" : "Belirtilmedi"}</p>
      <p>${event.description}</p>
      <a href="etkinlik-detay.html?id=${event.id}">Detayları gör</a>
    </article>
  `;
}

const listContainer = document.querySelector("#etkinlik-listesi");
const filtreFormu = document.querySelector("#filtre-formu");
const aramaInput = document.querySelector("#arama");
const kategoriSelect = document.querySelector("#kategori-filtre");
const sonucText = document.querySelector("#sonuc");

function render(dizi) {
  if (!listContainer) return;

  if (dizi.length === 0) {
    listContainer.innerHTML = "";
    if (sonucText) sonucText.textContent = "Aramanıza uygun etkinlik bulunamadı.";
  } else {
    listContainer.innerHTML = dizi.map(createCard).join("");
    if (sonucText && filtreFormu) {
      sonucText.textContent = `${dizi.length} etkinlik listeleniyor.`;
    }
  }
}

if (listContainer) {
  if (listContainer.dataset.limit) {
    // Ana Sayfa logic
    const limit = Number(listContainer.dataset.limit);
    const yaklasan = [...events]
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, limit);
    render(yaklasan);
  } else {
    // Etkinlikler logic
    render(events);

    if (kategoriSelect) {
      const kategoriler = [...new Set(events.map((e) => e.category))];
      kategoriler.forEach((kat) => {
        const option = document.createElement("option");
        option.value = kat;
        option.textContent = kat;
        kategoriSelect.appendChild(option);
      });
    }

    function filtrele() {
      const aranan = aramaInput ? aramaInput.value.trim().toLocaleLowerCase("tr-TR") : "";
      const secilenKategori = kategoriSelect ? kategoriSelect.value : "";

      const sonuc = events.filter((e) => {
        const metinUyuyor =
          aranan === "" ||
          e.title.toLocaleLowerCase("tr-TR").includes(aranan) ||
          e.description.toLocaleLowerCase("tr-TR").includes(aranan) ||
          e.location.toLocaleLowerCase("tr-TR").includes(aranan);

        const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;

        return metinUyuyor && kategoriUyuyor;
      });

      render(sonuc);
    }

    if (aramaInput) aramaInput.addEventListener("input", filtrele);
    if (kategoriSelect) kategoriSelect.addEventListener("change", filtrele);
    if (filtreFormu) filtreFormu.addEventListener("submit", (e) => e.preventDefault());
  }
}