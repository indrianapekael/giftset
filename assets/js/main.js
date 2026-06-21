/**
* Template Name: Clarity
* Template URL: https://bootstrapmade.com/clarity-bootstrap-agency-template/
* Updated: Sep 13 2025 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

/**
 * -----------------------------------------------------
 * Custom Script: Direct WhatsApp Form Submission
 * -----------------------------------------------------
 */
document.addEventListener("DOMContentLoaded", function() {
  const waForm = document.getElementById('waForm');
  
  if (waForm) {
    waForm.addEventListener('submit', function(event) {
      // Mencegah form memuat ulang halaman
      event.preventDefault();

      // Mengambil data dari input form
      const name = document.getElementById('waName').value;
      const email = document.getElementById('waEmail').value;
      const subject = document.getElementById('waSubject').value;
      const message = document.getElementById('waMessage').value;

      // Nomor WhatsApp Tujuan (sesuai nomor web Anda)
      const phoneNumber = "62999979876543";

      // Menyusun isi pesan untuk WhatsApp
      const textMessage = `Halo tim Gifting.id, saya ingin mengirimkan briefing kebutuhan:%0A%0A` +
                          `*Nama Lengkap:* ${name}%0A` +
                          `*Email:* ${email}%0A` +
                          `*Jenis Paket:* ${subject}%0A` +
                          `*Detail Pesanan:* ${message}`;

      // Membuka WhatsApp di tab baru dengan membawa pesan
      const waUrl = `https://wa.me/${phoneNumber}?text=${textMessage}`;
      window.open(waUrl, '_blank');
    });
  }

  // Tambahkan tombol WhatsApp melayang otomatis jika belum ada
  if (!document.querySelector('.whatsapp-float')) {
    const phoneNumber = '6281123456789';
    const whatsappButton = document.createElement('a');
    whatsappButton.href = `https://wa.me/${phoneNumber}`;
    whatsappButton.target = '_blank';
    whatsappButton.rel = 'noopener noreferrer';
    whatsappButton.className = 'whatsapp-float';
    whatsappButton.title = 'Hubungi Kami via WhatsApp';
    whatsappButton.innerHTML = '<i class="bi bi-whatsapp"></i>';
    document.body.appendChild(whatsappButton);
  }
});

/**
 * -----------------------------------------------------
 * Custom Script: Menghubungkan Link Footer ke Filter Isotope (Lintas Halaman)
 * -----------------------------------------------------
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Cek URL saat halaman baru dimuat (berguna jika pindah dari index.html ke products.html)
  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get('filter'); // Mendapatkan parameter filter, misal: .filter-tumbler
  
  const mainFilters = document.querySelectorAll('.portfolio-filters li');
  const productsSection = document.querySelector('#products');

  // Jika ada parameter filter di URL DAN kita sedang berada di halaman products.html
  if (filterParam && mainFilters.length > 0 && productsSection) {
    // Beri jeda 500ms agar plugin Isotope (layouting gambar) selesai memuat terlebih dahulu
    setTimeout(() => {
      mainFilters.forEach(mainFilter => {
        if (mainFilter.getAttribute('data-filter') === filterParam) {
          mainFilter.click(); // Otomatis mengklik label filter yang sesuai
        }
      });
      // Scroll perlahan ke bagian produk
      let scrollMarginTop = getComputedStyle(productsSection).scrollMarginTop || "0px";
      window.scrollTo({
        top: productsSection.offsetTop - parseInt(scrollMarginTop),
        behavior: 'smooth'
      });
    }, 500);
  }

  // 2. Aksi jika tombol footer diklik (Berguna jika sudah berada di dalam products.html)
  const footerFilterBtns = document.querySelectorAll('.footer-filter-btn');
  
  footerFilterBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Cek apakah kita SEDANG berada di halaman produk
      if (productsSection && mainFilters.length > 0) {
        e.preventDefault(); // Mencegah loading ulang halaman
        
        const filterValue = this.getAttribute('data-filter');
        
        mainFilters.forEach(mainFilter => {
          if (mainFilter.getAttribute('data-filter') === filterValue) {
            mainFilter.click();
          }
        });

        let scrollMarginTop = getComputedStyle(productsSection).scrollMarginTop || "0px";
        window.scrollTo({
          top: productsSection.offsetTop - parseInt(scrollMarginTop),
          behavior: 'smooth'
        });
        
        // Memperbarui URL di browser tanpa reload halaman (agar rapi)
        window.history.pushState({}, '', `products.html?filter=${filterValue}#products`);
      }
      // CATATAN: Jika kita di index.html, JavaScript akan membiarkan link bekerja normal
      // dan browser akan berpindah ke products.html membawa parameter ?filter=...
    });
  });
});

/**
 * -----------------------------------------------------
 * Custom Script: Keep Home Nav Active
 * -----------------------------------------------------
 */
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('#navmenu ul li a');
  const homeLink = document.querySelector('#navmenu ul li a[href="#hero"]');
  
  // Observer untuk memaksa class 'active' tetap ada meski dihapus oleh script scrollspy
  if (homeLink) {
    const observer = new MutationObserver(function() {
      if (!homeLink.classList.contains('active')) {
        homeLink.classList.add('active');
      }
    });
    observer.observe(homeLink, { attributes: true, attributeFilter: ['class'] });
  }

  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      // Hanya memproses link yang mengarah ke bagian halaman yang sama (anchors)
      if(this.getAttribute('href').startsWith('#')) {
        // Hapus class active dari link lain, tapi pastikan Home tidak ikut terhapus logic-nya
        navLinks.forEach(nav => {
           if (nav !== homeLink) {
             nav.classList.remove('active');
           }
        });
        this.classList.add('active');
      }
    });
  });
});

/**
 * -----------------------------------------------------
 * Custom Script: Menghubungkan Link Footer ke Filter Isotope (Lintas Halaman)
 * -----------------------------------------------------
 */
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get('filter'); 
  
  const mainFilters = document.querySelectorAll('.portfolio-filters li');
  const targetSection = document.querySelector('#products') || document.querySelector('#portfolio');

  // 1. Aksi JIKA halaman BARU DIBUKA dan memiliki parameter '?filter=' di URL
  if (filterParam && mainFilters.length > 0 && targetSection) {
    // Jeda 500ms agar susunan grid gambar (Isotope) selesai termuat
    setTimeout(() => {
      mainFilters.forEach(mainFilter => {
        if (mainFilter.getAttribute('data-filter') === filterParam) {
          mainFilter.click(); 
        }
      });
      let scrollMarginTop = getComputedStyle(targetSection).scrollMarginTop || "0px";
      window.scrollTo({
        top: targetSection.offsetTop - parseInt(scrollMarginTop),
        behavior: 'smooth'
      });
    }, 500);
  }

  // 2. Aksi JIKA tombol footer diklik
  const footerFilterBtns = document.querySelectorAll('.footer-filter-btn');
  
  footerFilterBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const hrefValue = this.getAttribute('href'); // cth: "portfolio.html?filter=.filter-web#portfolio"

      // Deteksi kita sedang di halaman mana vs tujuan linknya ke halaman mana
      const linkPath = hrefValue.split('?')[0].split('#')[0]; // cth: "portfolio.html"
      const currentPath = window.location.pathname.split('/').pop(); // cth: "index.html" atau "portfolio.html"

      // Cek apakah user SUDAH BERADA di halaman yang sama dengan tujuan link
      // Jika linkPath kosong (misal cuma "#portfolio"), anggap itu halaman yang sama
      const isSamePage = (linkPath === currentPath) || (linkPath === '');

      // JIKA DI HALAMAN YANG SAMA: Filter langsung tanpa reload
      if (isSamePage) {
        e.preventDefault(); // Jangan reload/pindah halaman

        const filterValue = this.getAttribute('data-filter');
        const targetId = hrefValue.includes('#') ? hrefValue.split('#')[1] : '';
        const section = document.getElementById(targetId);

        if (mainFilters.length > 0) {
          mainFilters.forEach(mainFilter => {
            if (mainFilter.getAttribute('data-filter') === filterValue) {
              mainFilter.click();
            }
          });

          if (section) {
            let scrollMarginTop = getComputedStyle(section).scrollMarginTop || "0px";
            window.scrollTo({
              top: section.offsetTop - parseInt(scrollMarginTop),
              behavior: 'smooth'
            });
          }
          
          // Update URL di browser tanpa reload
          window.history.pushState({}, '', hrefValue);
        }
      } 
      // JIKA DI HALAMAN BERBEDA (cth: dari index.html klik link ke portfolio.html):
      // Kita biarkan browser bekerja normal memuat halaman portfolio.html.
      // Setelah halaman portfolio.html terbuka, blok kode #1 di atas akan otomatis berjalan.
    });
  });
});