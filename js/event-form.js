import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesajKutusu = document.querySelector("#form-mesaj");

if (form) {
  const isGuncelle = form.dataset.mode === "guncelle";
  const id = new URLSearchParams(window.location.search).get("id");
  let mevcutEtkinlik = null;

  if (isGuncelle) {
    mevcutEtkinlik = events.find((e) => e.id === id);

    if (!mevcutEtkinlik) {
      form.outerHTML = `
        <div class="hata-kutusu">
          <p>Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
        </div>
        <a href="etkinlikler.html" class="btn" style="margin-top:16px;">Etkinliklere git</a>
      `;
    } else {
      if (form.elements["ad"]) form.elements["ad"].value = mevcutEtkinlik.title;
      if (form.elements["kategori"]) form.elements["kategori"].value = mevcutEtkinlik.category;
      if (form.elements["tarih"]) form.elements["tarih"].value = mevcutEtkinlik.date;
      if (form.elements["saat"]) form.elements["saat"].value = mevcutEtkinlik.time;
      if (form.elements["yer"]) form.elements["yer"].value = mevcutEtkinlik.location;
      if (form.elements["kontenjan"]) form.elements["kontenjan"].value = mevcutEtkinlik.capacity || "";
      if (form.elements["aciklama"]) form.elements["aciklama"].value = mevcutEtkinlik.description || "";
    }
  }

  // Yazmaya başlayınca kırmızı hata çerçevesini sil
  const formElemanlari = form.querySelectorAll("input, select, textarea");
  formElemanlari.forEach((alan) => {
    const temizle = () => {
      alan.removeAttribute("aria-invalid");
      const hataSpan = document.querySelector(`#${alan.name}-hata`);
      if (hataSpan) hataSpan.textContent = "";
    };
    alan.addEventListener("input", temizle);
    alan.addEventListener("change", temizle);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    formElemanlari.forEach((alan) => {
      alan.removeAttribute("aria-invalid");
      const hataSpan = document.querySelector(`#${alan.name}-hata`);
      if (hataSpan) hataSpan.textContent = "";
    });

    const fd = new FormData(form);

    const title = (fd.get("ad") || "").trim();
    const category = fd.get("kategori") || "";
    const date = fd.get("tarih") || "";
    const time = fd.get("saat") || "";
    const location = (fd.get("yer") || "").trim();
    const capacityVal = (fd.get("kontenjan") || "").trim();
    const description = (fd.get("aciklama") || "").trim();

    const errors = {};

    if (title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
    if (!category) errors.kategori = "Bir kategori seçin.";
    if (!date) errors.tarih = "Tarih seçin.";
    if (!time) errors.saat = "Saat seçin.";
    if (!location) errors.yer = "Yer bilgisini yazın.";
    
    if (capacityVal !== "") {
      const cap = Number(capacityVal);
      if (isNaN(cap) || cap < 1 || cap > 1000) {
        errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalıdır.";
      }
    }

    if (Object.keys(errors).length > 0) {
      for (const [alanAdi, hataMesaji] of Object.entries(errors)) {
        const hataSpan = document.querySelector(`#${alanAdi}-hata`);
        if (hataSpan) hataSpan.textContent = hataMesaji;

        const alanElem = form.elements[alanAdi];
        if (alanElem) alanElem.setAttribute("aria-invalid", "true");
      }

      if (mesajKutusu) {
        mesajKutusu.innerHTML = `
          <div class="hata-kutusu">
            <p>Formda hatalı alanlar var. Lütfen eksik veya hatalı yerleri düzeltin.</p>
          </div>
        `;
      }
      return;
    }

    const yeniId = isGuncelle && mevcutEtkinlik ? mevcutEtkinlik.id : `event-${events.length + 1}`;
    const capacity = capacityVal !== "" ? Number(capacityVal) : null;

    const eventData = {
      id: yeniId,
      title: title,
      category: category,
      date: date,
      time: time,
      location: location,
      capacity: capacity,
      description: description
    };

    if (mesajKutusu) {
      const baslik = isGuncelle
        ? "Etkinlik güncellendi (bu sprintte kaydedilmez):"
        : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";

      mesajKutusu.innerHTML = `
        <div class="basari-kutusu">
          <p class="basari-kutusu-baslik">${baslik}</p>
          <pre>${JSON.stringify(eventData, null, 2)}</pre>
        </div>
      `;
    }
  });
}