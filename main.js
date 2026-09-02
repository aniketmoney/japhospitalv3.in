const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

// =========================================================
// SITE-WIDE TRUST + CONTACT SETTINGS
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

// =========================================================
// GOOGLE REVIEW BADGE
// =========================================================
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
    <span class="rating-score">
      <strong>${SITE_TRUST.rating}</strong>
    </span>
    <span class="rating-count">
      ${SITE_TRUST.reviews}
    </span>
    <span class="rating-link">
      See what our patients say →
    </span>
  `;
});

// =========================================================
// HOMEPAGE GOOGLE REVIEW CARD
// =========================================================
$$('.google-proof-card').forEach((card) => {
  card.href = SITE_TRUST.reviewUrl;
  card.target = '_blank';
  card.rel = 'noopener';

  card.setAttribute(
    'aria-label',
    `See JAP Hospital Google reviews — rated ${SITE_TRUST.rating} from ${SITE_TRUST.reviews}`
  );

  card.innerHTML = `
    <div class="google-proof-stars" aria-hidden="true">
      ★★★★★
    </div>

    <div class="google-proof-score">
      ${SITE_TRUST.rating}
    </div>

    <div class="google-proof-copy">
      <strong>
        ${SITE_TRUST.reviews}
      </strong>

      <span>
        See what our patients say →
      </span>
    </div>
  `;
});

// =========================================================
// PHONE PURPOSE LABELS
// =========================================================
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
// HEADER SCROLL EFFECT
// =========================================================
const header = $('.header');

window.addEventListener(
  'scroll',
  () => {
    header?.classList.toggle(
      'scrolled',
      window.scrollY > 8
    );
  },
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

menu?.addEventListener('click', (e) => {
  if (e.target === menu) {
    closeMenu();
  }
});

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
    (entries) => {
      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            'visible'
          );

          io.unobserve(
            entry.target
          );
        }

      });
    },
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

  btn.addEventListener('click', () => {

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

  });

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
// APPOINTMENT FORM -> WHATSAPP
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
// MOBILE BOTTOM BAR
// Call | WhatsApp | Book
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
// ORTHOPAEDIC TEAM CTA
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
// V3.5 FIVE-SLIDE HOSPITAL SHOWCASE
// Auto changes every 7 seconds.
// Supports arrows, dots, keyboard and mobile swipe.
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

  let index = 0;
  let timer = null;
  let touchStartX = 0;

  const interval = 7000;

  // Reset and start the progress animation.
  const animateProgress = () => {

    if (!progress) {
      return;
    }

    progress.style.animation =
      'none';

    void progress.offsetWidth;

    progress.style.animation =
      `homeSliderProgress ${interval}ms linear forwards`;

  };

  // Stop automatic slide movement.
  const stopAuto = () => {

    if (timer) {

      clearInterval(timer);

      timer = null;
    }

    if (progress) {

      progress.style.animationPlayState =
        'paused';
    }

  };

  // Start automatic slide movement.
  const startAuto = () => {

    stopAuto();

    animateProgress();

    timer = setInterval(
      () => {

        showSlide(
          index + 1,
          false
        );

        animateProgress();

      },
      interval
    );

  };

  // Show a selected slide.
  const showSlide = (
    newIndex,
    restart = true
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

    if (restart) {
      startAuto();
    }

  };

  // Previous / next buttons.
  prev?.addEventListener(
    'click',
    () => {
      showSlide(index - 1);
    }
  );

  next?.addEventListener(
    'click',
    () => {
      showSlide(index + 1);
    }
  );

  // Slider dots.
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

  // Pause while mouse is over slider.
  slider.addEventListener(
    'mouseenter',
    stopAuto
  );

  slider.addEventListener(
    'mouseleave',
    startAuto
  );

  // Pause while keyboard focus is inside slider.
  slider.addEventListener(
    'focusin',
    stopAuto
  );

  slider.addEventListener(
    'focusout',
    startAuto
  );

  // Mobile swipe start.
  slider.addEventListener(
    'touchstart',
    (e) => {

      touchStartX =
        e.changedTouches[0].clientX;

      stopAuto();

    },
    {
      passive: true
    }
  );

  // Mobile swipe end.
  slider.addEventListener(
    'touchend',
    (e) => {

      const delta =
        e.changedTouches[0].clientX -
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

        startAuto();

      }

    },
    {
      passive: true
    }
  );

  slider.addEventListener(
    'touchcancel',
    startAuto,
    {
      passive: true
    }
  );

  // Keyboard arrows.
  slider.addEventListener(
    'keydown',
    (e) => {

      if (
        e.key === 'ArrowLeft'
      ) {

        showSlide(
          index - 1
        );

      }

      if (
        e.key === 'ArrowRight'
      ) {

        showSlide(
          index + 1
        );

      }

    }
  );

  // Pause slider when browser tab is not visible.
  document.addEventListener(
    'visibilitychange',
    () => {

      if (document.hidden) {

        stopAuto();

      } else {

        startAuto();

      }

    }
  );

  // Start slideshow.
  startAuto();

})();
