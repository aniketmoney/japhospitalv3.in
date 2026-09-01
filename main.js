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
  { passive: true }
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

$$('.mobile-links a').forEach((a) =>
  a.addEventListener(
    'click',
    closeMenu
  )
);


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

  revealItems.forEach((el) =>
    io.observe(el)
  );

} else {

  revealItems.forEach((el) =>
    el.classList.add('visible')
  );

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

  boxes.forEach((b) =>
    b.addEventListener(
      'change',
      update
    )
  );

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
// Homepage: only sections deliberately marked
// data-team-cta="true"
// to keep the page human and less repetitive.
// Internal pages retain the previous behavior.
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
