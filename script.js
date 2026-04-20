const scriptURL = 'URL_GOOGLE_APPS_SCRIPT_KAMU'; // Ganti dengan URL dari Google Apps Script
const form = document.getElementById('formPB');

// 1. Ambil Data Provinsi Otomatis
fetch('https://github.io')
    .then(response => response.json())
    .then(provinces => {
        let options = '<option value="">-- Pilih Provinsi --</option>';
        provinces.forEach(p => options += `<option value="${p.name}" data-id="${p.id}">${p.name}</option>`);
        document.getElementById('provinsi').innerHTML = options;
    });

// 2. Ambil Data Kabupaten berdasarkan Provinsi yang dipilih
document.getElementById('provinsi').addEventListener('change', function() {
    const provinceId = this.options[this.selectedIndex].getAttribute('data-id');
    fetch(`https://github.io{provinceId}.json`)
        .then(response => response.json())
        .then(regencies => {
            let options = '<option value="">-- Pilih Kabupaten --</option>';
            regencies.forEach(r => options += `<option value="${r.name}">${r.name}</option>`);
            document.getElementById('kabupaten').innerHTML = options;
        });
});

// 3. Kirim data ke Google Sheets
form.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('btnSubmit').disabled = true;
    document.getElementById('status').innerText = "Sedang mengirim...";

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            document.getElementById('status').innerText = "Data Berhasil Terkirim!";
            form.reset();
            document.getElementById('btnSubmit').disabled = false;
        })
        .catch(error => {
            document.getElementById('status').innerText = "Gagal mengirim data.";
            document.getElementById('btnSubmit').disabled = false;
        });
});
