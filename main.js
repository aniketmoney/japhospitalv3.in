const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

// =========================================================
// V3.4 SITE-WIDE TRUST + CONTACT SETTINGS
// Update the Google figures here after periodically checking
// the live Google Business profile.
// =========================================================
const SITE_TRUST = {
  rating: '4.9/5',
  reviews: '310+ Google Reviews',
  reviewUrl: 'https://www.google.com/maps/search/?api=1&query=JAP+Hospital+Bhogpur'
};

const SITE_CONTACT = {
  receptionPhone: '+917589100737',
  whatsappPhone: '919909916112'
};

// Keep the header Google-rating presentation identical on every page.
$$('.brand-strip-rating').forEach((rating) => {
  rating.classList.add('rating-enhanced', 'rating-mobile-card');
  rating.href = SITE_TRUST.reviewUrl;
  rating.target = '_blank';
  rating.rel = 'noopener';

  rating.setAttribute(
    'aria-label',
    `See JAP Hospital Google reviews — rated ${SITE_TRUST.rating} from ${SITE_TRUST.reviews}`
  );

  rating.innerHTML = `
    <span class="rating-stars" aria-hidden="true">★★★★★</span>
    <span class="rating-score"><strong>${SITE_TRUST.rating}</strong></span>
    <span class="rating-count">${SITE_TRUST.reviews}</span>
    <span class="rating-link">See what our patients say →</span>
  `;
});

// Keep the larger homepage Google proof card in sync with the header.
$$('.google-proof-card').forEach((card) => {
  card.href = SITE_TRUST.reviewUrl;
  card.target = '_blank';
  card.rel = 'noopener';

  card.setAttribute(
    'aria-label',
    `See JAP Hospital Google reviews — rated ${SITE_TRUST.rating} from ${SITE_TRUST.reviews}`
  );

  card.innerHTML = `
    <div class="google-proof-stars" aria-hidden="true">★★★★★</div>
    <div class="google-proof-score">${SITE_TRUST.rating}</div>

    <div class="google-proof-copy">
      <strong>${SITE_TRUST.reviews}</strong>
      <span>See what our patients say →</span>
    </div>
  `;
});

// Make the two phone purposes clear wherever these links appear.
$$(`a[href="tel:${SITE_CONTACT.receptionPhone}"]`).forEach((link) => {
  link.setAttribute(
    'aria-label',
    'Call JAP Hospital Reception / Emergency'
  );

  link.title = 'Reception / Emergency';
});

$$(`a[href*="wa.me/${SITE_CONTACT.whatsappPhone}"]`).forEach((link) => {
  if (!link.getAttribute('aria-label')) {
    link.setAttribute(
      'aria-label',
      'WhatsApp JAP Hospital Appointment Desk'
    );
  }

  link.title = 'WhatsApp Appointment Desk';
});

// =========================================================
// SIMPLIFIED SITE-WIDE NAVIGATION
// =========================================================
(() => {
  const desktopNav = $('.nav-links');
  const mobileNav = $('.mobile-links');

  const current =
    (
      window.location.pathname.split('/').pop() ||
      'index.html'
    ).toLowerCase();

  const treatmentPages = [
    'orthopaedics.html',
    'knee-replacement.html',
    'hip-replacement.html',
    'spine-surgery.html',
    'arthroscopy-sports-injury.html',
    'trauma-fracture-care.html',
    'physiotherapy-rehabilitation.html'
  ];

  if (desktopNav) {
    desktopNav.innerHTML = `
      <a
        href="index.html"
        ${current === 'index.html' ? 'class="active"' : ''}
      >
        Home
      </a>

      <div class="dropdown">
        <button
          type="button"
          ${treatmentPages.includes(current) ? 'class="active"' : ''}
        >
          Treatments ▾
        </button>

        <div class="dropdown-menu">
          <a href="orthopaedics.html">
            Orthopaedics Overview
          </a>

          <a href="robotic-knee-replacement.html">
            Robotic Knee Replacement
          </a>

          <a href="knee-replacement.html">
            Knee Replacement
          </a>

          <a href="hip-replacement.html">
            Hip Replacement
          </a>

          <a href="spine-surgery.html">
            Spine Surgery
          </a>

          <a href="arthroscopy-sports-injury.html">
            Arthroscopy & Sports Injury
          </a>

          <a href="trauma-fracture-care.html">
            Trauma & Fracture Care
          </a>

          <a href="physiotherapy-rehabilitation.html">
            Physiotherapy & Rehabilitation
          </a>
        </div>
      </div>

      <a
        href="robotic-knee-replacement.html"
        ${current === 'robotic-knee-replacement.html' ? 'class="active"' : ''}
      >
        Robotic Knee
      </a>

      <a
        href="doctor-aman-singh.html"
        ${current === 'doctor-aman-singh.html' ? 'class="active"' : ''}
      >
        Dr. Aman
      </a>

      <a
        href="about.html"
        ${current === 'about.html' ? 'class="active"' : ''}
      >
        About
      </a>

      <a href="index.html#patient-stories">
        Patient Stories
      </a>

      <a
        href="contact.html"
        ${current === 'contact.html' ? 'class="active"' : ''}
      >
        Contact
      </a>
    `;
  }

  if (mobileNav) {
    mobileNav.innerHTML = `
      <a href="index.html">
        Home
      </a>

      <a href="orthopaedics.html">
        Treatments
      </a>

      <a href="robotic-knee-replacement.html">
        Robotic Knee Replacement
      </a>

      <a href="doctor-aman-singh.html">
        Dr. Aman Singh
      </a>

      <a href="about.html">
        About JAP Hospital
      </a>

      <a href="index.html#patient-stories">
        Patient Stories
      </a>

      <a href="contact.html">
        Contact / Appointment
      </a>
    `;
  }
})();

// =========================================================
// HEADER SCROLL EFFECT
// =========================================================
const header = $('.header');

window.addEventListener(
  'scroll',
  () =>
    header?.classList.toggle(
      'scrolled',
      window.scrollY > 8
    ),
  {
    passive: true
  }
);

// =========================================================
// MOBILE MENU
// =========================================================
const menu = $('#mobileMenu');

function openMenu() {
  menu?.classList.add('open');
  document.body.classList.add('no-scroll');
}

function closeMenu() {
  menu?.classList.remove('open');
  document.body.classList.remove('no-scroll');
}

$('#menuBtn')?.addEventListener(
  'click',
  openMenu
);

$('#mobileClose')?.addEventListener(
  'click',
  closeMenu
);

menu?.addEventListener(
  'click',
  (e) => {
    if (e.target === menu) {
      closeMenu();
    }
  }
);

$$('.mobile-links a').forEach((a) => {
  a.addEventListener(
    'click',
    closeMenu
  );
});

// =========================================================
// SCROLL REVEAL
// =========================================================
const revealItems = $$('[data-reveal]');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            'visible'
          );

          io.unobserve(
            entry.target
          );
        }
      }),
    {
      threshold: 0.12
    }
  );

  revealItems.forEach((el) => {
    io.observe(el);
  });
} else {
  revealItems.forEach((el) => {
    el.classList.add('visible');
  });
}

// =========================================================
// PATIENT VIDEO MODAL
// =========================================================
const modal = $('#videoModal');
const modalVideo = $('#patientVideo');
const modalTitle = $('#videoTitle');

$$('[data-video]').forEach((btn) => {
  btn.addEventListener(
    'click',
    () => {
      if (!modal || !modalVideo) {
        return;
      }

      modalTitle.textContent =
        btn.dataset.title ||
        'Patient Story';

      modalVideo.src =
        btn.dataset.video ||
        '';

      modal.classList.add(
        'open'
      );

      modal.setAttribute(
        'aria-hidden',
        'false'
      );

      document.body.classList.add(
        'no-scroll'
      );

      modalVideo
        .play()
        .catch(() => {});
    }
  );
});

function closeVideo() {
  if (!modal || !modalVideo) {
    return;
  }

  modal.classList.remove(
    'open'
  );

  modal.setAttribute(
    'aria-hidden',
    'true'
  );

  document.body.classList.remove(
    'no-scroll'
  );

  modalVideo.pause();

  modalVideo.removeAttribute(
    'src'
  );

  modalVideo.load();
}

$('#videoClose')?.addEventListener(
  'click',
  closeVideo
);

modal?.addEventListener(
  'click',
  (e) => {
    if (e.target === modal) {
      closeVideo();
    }
  }
);

document.addEventListener(
  'keydown',
  (e) => {
    if (e.key === 'Escape') {
      closeMenu();
      closeVideo();
    }
  }
);

// =========================================================
// KNEE PAIN CHECKER
// =========================================================
const checker = $('#kneeChecker');

if (checker) {
  const boxes =
    $$(
      'input[type=checkbox]',
      checker
    );

  const count =
    $('#checkerCount');

  const msg =
    $('#checkerMessage');

  const update = () => {
    const n =
      boxes.filter(
        (b) => b.checked
      ).length;

    if (count) {
      count.textContent = n;
    }

    if (!msg) {
      return;
    }

    if (n === 0) {
      msg.textContent =
        'Select any symptoms that apply to you.';
    } else if (n < 3) {
      msg.textContent =
        'A few symptoms can still be worth discussing if they persist or interfere with daily life.';
    } else {
      msg.textContent =
        'Several symptoms apply. An orthopaedic evaluation may help identify the cause and appropriate next steps.';
    }
  };

  boxes.forEach((b) => {
    b.addEventListener(
      'change',
      update
    );
  });

  update();
}

// =========================================================
// APPOINTMENT FORM -> WHATSAPP APPOINTMENT DESK
// =========================================================
const form = $('#appointmentForm');

if (form) {
  form.addEventListener(
    'submit',
    (e) => {
      e.preventDefault();

      const d =
        new FormData(form);

      const text =
        `Hello JAP Hospital, I would like to request an appointment.%0A%0A` +
        `Name: ${encodeURIComponent(d.get('name') || '')}%0A` +
        `Phone: ${encodeURIComponent(d.get('phone') || '')}%0A` +
        `Concern: ${encodeURIComponent(d.get('concern') || '')}%0A` +
        `Preferred date: ${encodeURIComponent(d.get('date') || '')}%0A` +
        `Message: ${encodeURIComponent(d.get('message') || '')}`;

      window.open(
        `https://wa.me/${SITE_CONTACT.whatsappPhone}?text=${text}`,
        '_blank',
        'noopener'
      );
    }
  );
}

// =========================================================
// ELDER-FRIENDLY MOBILE ACTION BAR
// Always keep this exactly: Call | WhatsApp | Book.
// =========================================================
const mobileActions =
  $('.mobile-actions');

if (mobileActions) {
  mobileActions.innerHTML = `
    <a
      href="tel:${SITE_CONTACT.receptionPhone}"
      aria-label="Call JAP Hospital Reception or Emergency desk"
    >
      <span aria-hidden="true">☎</span>
      Call
    </a>

    <a
      href="https://wa.me/${SITE_CONTACT.whatsappPhone}?text=Hello%20JAP%20Hospital%2C%20I%20would%20like%20to%20request%20a%20consultation."
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp JAP Hospital Appointment Desk"
    >
      <span aria-hidden="true">◉</span>
      WhatsApp
    </a>

    <a
      href="contact.html"
      aria-label="Book an appointment at JAP Hospital"
    >
      <span aria-hidden="true">▣</span>
      Book
    </a>
  `;
}

// =========================================================
// CONTEXTUAL ORTHOPAEDIC TEAM CTA
// =========================================================
const isHomePage =
  document.body.classList.contains(
    'home-page'
  );

const teamSections =
  isHomePage
    ? $$(
        'main > section.section[data-team-cta="true"]'
      )
    : $$(
        'main > section.section'
      );

teamSections.forEach((section) => {
  if (
    section.classList.contains(
      'no-team-cta'
    ) ||
    section.querySelector(
      '.cta'
    ) ||
    section.querySelector(
      '.section-team-cta'
    )
  ) {
    return;
  }

  const wrap =
    section.querySelector(
      '.container'
    );

  if (!wrap) {
    return;
  }

  const cta =
    document.createElement(
      'div'
    );

  cta.className =
    'section-team-cta';

  cta.innerHTML = `
    <a
      href="https://wa.me/${SITE_CONTACT.whatsappPhone}?text=Hello%20JAP%20Hospital%2C%20I%20would%20like%20to%20talk%20to%20the%20orthopaedic%20team."
      target="_blank"
      rel="noopener"
    >
      Talk to our Orthopaedic Team →
    </a>
  `;

  wrap.appendChild(
    cta
  );
});

// =========================================================
// V3.9 — FIVE-SLIDE HOSPITAL SHOWCASE
// Reliable 5-second autoplay.
// =========================================================
(() => {
  const slider =
    $('#japHomeSlider');

  if (!slider) {
    return;
  }

  const slides =
    $$('.home-slide', slider);

  const dots =
    $$('.home-slider-dot', slider);

  const prev =
    $('.home-slider-arrow.prev', slider);

  const next =
    $('.home-slider-arrow.next', slider);

  const progress =
    $('#homeSliderProgress');

  if (!slides.length) {
    return;
  }

  let index = Math.max(
    0,
    slides.findIndex(
      (slide) =>
        slide.classList.contains(
          'active'
        )
    )
  );

  let timer = null;
  let touchStartX = 0;

  const interval = 5000;

  // -----------------------------------------
  // PROGRESS BAR
  // -----------------------------------------
  const animateProgress = () => {
    if (!progress) {
      return;
    }

    progress.style.animation =
      'none';

    progress.style.width =
      '0';

    void progress.offsetWidth;

    progress.style.animation =
      `homeSliderProgress ${interval}ms linear forwards`;

    progress.style.animationPlayState =
      'running';
  };

  // -----------------------------------------
  // CLEAR TIMER
  // -----------------------------------------
  const clearTimer = () => {
    if (timer) {
      window.clearTimeout(
        timer
      );

      timer = null;
    }
  };

  // -----------------------------------------
  // SCHEDULE NEXT SLIDE
  // -----------------------------------------
  const scheduleNext = () => {
    clearTimer();

    if (document.hidden) {
      return;
    }

    animateProgress();

    timer =
      window.setTimeout(
        () => {
          showSlide(
            index + 1,
            true
          );
        },
        interval
      );
  };

  // -----------------------------------------
  // SHOW SLIDE
  // -----------------------------------------
  const showSlide = (
    newIndex,
    reschedule = true
  ) => {
    index =
      (
        newIndex +
        slides.length
      ) %
      slides.length;

    slides.forEach(
      (slide, i) => {
        const active =
          i === index;

        slide.classList.toggle(
          'active',
          active
        );

        slide.setAttribute(
          'aria-hidden',
          active
            ? 'false'
            : 'true'
        );
      }
    );

    dots.forEach(
      (dot, i) => {
        const active =
          i === index;

        dot.classList.toggle(
          'active',
          active
        );

        dot.setAttribute(
          'aria-current',
          active
            ? 'true'
            : 'false'
        );
      }
    );

    if (reschedule) {
      scheduleNext();
    }
  };

  // -----------------------------------------
  // PREVIOUS / NEXT
  // -----------------------------------------
  prev?.addEventListener(
    'click',
    () => {
      showSlide(
        index - 1
      );
    }
  );

  next?.addEventListener(
    'click',
    () => {
      showSlide(
        index + 1
      );
    }
  );

  // -----------------------------------------
  // DOT NAVIGATION
  // -----------------------------------------
  dots.forEach(
    (dot, i) => {
      dot.addEventListener(
        'click',
        () => {
          showSlide(i);
        }
      );
    }
  );

  // -----------------------------------------
  // MOBILE SWIPE
  // -----------------------------------------
  slider.addEventListener(
    'touchstart',
    (e) => {
      touchStartX =
        e.changedTouches[0]
          .clientX;

      clearTimer();

      if (progress) {
        progress.style
          .animationPlayState =
          'paused';
      }
    },
    {
      passive: true
    }
  );

  slider.addEventListener(
    'touchend',
    (e) => {
      const delta =
        e.changedTouches[0]
          .clientX -
        touchStartX;

      if (
        Math.abs(delta) > 45
      ) {
        showSlide(
          index +
          (
            delta < 0
              ? 1
              : -1
          )
        );
      } else {
        scheduleNext();
      }
    },
    {
      passive: true
    }
  );

  slider.addEventListener(
    'touchcancel',
    scheduleNext,
    {
      passive: true
    }
  );

  // -----------------------------------------
  // KEYBOARD NAVIGATION
  // -----------------------------------------
  slider.addEventListener(
    'keydown',
    (e) => {
      if (
        e.key === 'ArrowLeft'
      ) {
        e.preventDefault();

        showSlide(
          index - 1
        );
      }

      if (
        e.key === 'ArrowRight'
      ) {
        e.preventDefault();

        showSlide(
          index + 1
        );
      }
    }
  );

  // -----------------------------------------
  // TAB VISIBILITY
  // -----------------------------------------
  document.addEventListener(
    'visibilitychange',
    () => {
      if (document.hidden) {
        clearTimer();

        if (progress) {
          progress.style
            .animationPlayState =
            'paused';
        }
      } else {
        scheduleNext();
      }
    }
  );

  // Start the 5-second slideshow
  showSlide(
    index,
    true
  );
})();
