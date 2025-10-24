document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const currentTime = document.getElementById("currentTime");
  const fadeElements = document.querySelectorAll(".fade-up, .fade-down, .fade-in-delay, .fade-in-delay2, .fade-in-delay3");
  const header = document.querySelector("header");
  const welcomeText = document.getElementById("welcomeText");
  const namaInput = document.getElementById("nama");

  // Minta nama di awal kunjungan 
  let userName = localStorage.getItem("userName"); // simpan di localStorage agar tidak hilang saat reload

  if (!userName) {
    userName = prompt("Hai! Siapa nama kamu?");
    if (!userName || userName.trim() === "") {
      userName = "Tamu";
    }
    localStorage.setItem("userName", userName);
  }

  // Tampilkan nama di hero section
  welcomeText.textContent = `Hi ${userName}, Welcome To Website`;

  // Isi otomatis input nama di form
  namaInput.value = userName;

  // Update jam real-time 
  const updateTime = () => {
    const now = new Date();
    currentTime.innerHTML = `Current Time: ${now.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}`;
  };
  updateTime();
  setInterval(updateTime, 1000);

  // Tangani pengiriman form
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const tglLahir = document.getElementById("tglLahir").value;
    const gender = document.querySelector("input[name='gender']:checked").value;
    const pesan = document.getElementById("pesan").value;

    document.getElementById("outNama").textContent = nama;
    document.getElementById("outTgl").textContent = tglLahir;
    document.getElementById("outGender").textContent = gender;
    document.getElementById("outPesan").textContent = pesan;

    form.reset();
    // setelah reset, isi ulang nama otomatis
    document.getElementById("nama").value = userName;
  });

  // Animasi saat scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeElements.forEach((el) => observer.observe(el));

  // Navbar berubah warna saat scroll 
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
});
