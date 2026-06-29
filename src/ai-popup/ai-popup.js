const params = new URLSearchParams(window.location.search);
const popupId = params.get('id');
const text = document.querySelector('#text');
const closeButton = document.querySelector('#closeButton');
const replyForm = document.querySelector('#replyForm');
const replyInput = document.querySelector('#replyInput');
const replyButton = document.querySelector('#replyButton');
const replyStatus = document.querySelector('#replyStatus');

const { resolveLanguage, translate } = window.appI18n || {
  resolveLanguage: (value, fallback) => value || fallback || 'zh-CN',
  translate: (_locale, key) => key
};

let currentLocale = resolveLanguage('system', navigator.language);
let replyFormOpen = false;

function t(key, params) {
  return translate(currentLocale, key, params);
}

function clampOpacity(value, fallback = 1) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.min(1, Math.max(0, number));
}

function hexToRgba(hexColor, opacity = 1) {
  if (typeof hexColor !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(hexColor)) {
    return `rgba(0, 0, 0, ${clampOpacity(opacity, 1)})`;
  }

  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${clampOpacity(opacity, 1)})`;
}

function applyAppearance(appearance = {}) {
  const rootStyle = document.documentElement.style;
  const numberOr = (value, fallback) => (Number.isFinite(Number(value)) ? Number(value) : fallback);
  const textAlign = appearance.textAlign === 'center' || appearance.textAlign === 'right' ? appearance.textAlign : 'left';

  rootStyle.setProperty('--ai-popup-body-bg', hexToRgba(appearance.bodyBackgroundColor || '#050505', appearance.bodyBackgroundOpacity));
  rootStyle.setProperty('--ai-popup-text-color', hexToRgba(appearance.textColor || '#f4f7fb', appearance.textOpacity));
  rootStyle.setProperty('--ai-popup-text-size', `${numberOr(appearance.textFontSize, 16)}px`);
  rootStyle.setProperty('--ai-popup-line-height', String(numberOr(appearance.textLineHeight, 1.5)));
  rootStyle.setProperty('--ai-popup-text-align', textAlign);
  rootStyle.setProperty('--ai-popup-card-bg', hexToRgba(appearance.cardBackgroundColor || '#050505', appearance.cardBackgroundOpacity));
  rootStyle.setProperty('--ai-popup-card-border-color', hexToRgba(appearance.cardBorderColor || '#1f2b33', appearance.cardBorderOpacity));
  rootStyle.setProperty('--ai-popup-card-border-width', `${numberOr(appearance.cardBorderWidth, 0)}px`);
  rootStyle.setProperty('--ai-popup-card-radius', `${numberOr(appearance.cardBorderRadius, 8)}px`);
  rootStyle.setProperty('--ai-popup-card-padding-x', `${numberOr(appearance.cardPaddingX, 2)}px`);
  rootStyle.setProperty('--ai-popup-card-padding-y', `${numberOr(appearance.cardPaddingY, 0)}px`);
  const cardShadowColor = hexToRgba(appearance.cardShadowColor || '#000000', appearance.cardShadowOpacity);
  const cardShadowOffsetX = numberOr(appearance.cardShadowOffsetX, 0);
  const cardShadowOffsetY = numberOr(appearance.cardShadowOffsetY, 8);
  const cardShadowBlur = numberOr(appearance.cardShadowBlur, 24);
  const cardShadowSpread = numberOr(appearance.cardShadowSpread, 0);
  const cardShadowExtent = Math.max(0, cardShadowBlur + Math.abs(cardShadowSpread));
  rootStyle.setProperty('--ai-popup-card-shadow', `${cardShadowOffsetX}px ${cardShadowOffsetY}px ${cardShadowBlur}px ${cardShadowSpread}px ${cardShadowColor}`);
  const textShadowColor = hexToRgba(appearance.textShadowColor || '#000000', appearance.textShadowOpacity);
  const textShadowOffsetX = numberOr(appearance.textShadowOffsetX, 0);
  const textShadowOffsetY = numberOr(appearance.textShadowOffsetY, 2);
  const textShadowBlur = Math.max(0, numberOr(appearance.textShadowBlur, 10) + Math.abs(numberOr(appearance.textShadowSpread, 0)));
  rootStyle.setProperty('--ai-popup-text-shadow', `${textShadowOffsetX}px ${textShadowOffsetY}px ${textShadowBlur}px ${textShadowColor}`);
  rootStyle.setProperty('--ai-popup-close-font-size', `${numberOr(appearance.closeButtonFontSize, 13)}px`);
  rootStyle.setProperty('--ai-popup-close-radius', `${numberOr(appearance.closeButtonBorderRadius, 6)}px`);
  rootStyle.setProperty('--ai-popup-close-padding-x', `${numberOr(appearance.closeButtonPaddingX, 12)}px`);
  rootStyle.setProperty('--ai-popup-close-padding-y', `${numberOr(appearance.closeButtonPaddingY, 6)}px`);
  rootStyle.setProperty('--ai-popup-close-offset-x', `${numberOr(appearance.closeButtonOffsetX, 6)}px`);
  rootStyle.setProperty('--ai-popup-close-offset-y', `${numberOr(appearance.closeButtonOffsetY, 6)}px`);
  rootStyle.setProperty('--ai-popup-close-bg', hexToRgba(appearance.closeButtonBackgroundColor || '#000000', appearance.closeButtonBackgroundOpacity));
  rootStyle.setProperty('--ai-popup-close-text', hexToRgba(appearance.closeButtonTextColor || '#ffffff', appearance.closeButtonTextOpacity));
  rootStyle.setProperty('--ai-popup-close-border', hexToRgba(appearance.closeButtonBorderColor || '#ffffff', appearance.closeButtonBorderOpacity));
  rootStyle.setProperty('--ai-popup-close-hover-bg', hexToRgba(appearance.closeButtonHoverBackgroundColor || '#2f3b45', appearance.closeButtonHoverBackgroundOpacity));
  rootStyle.setProperty('--ai-popup-close-hover-text', hexToRgba(appearance.closeButtonHoverTextColor || '#ffffff', appearance.closeButtonHoverTextOpacity));

  const closeFontSize = numberOr(appearance.closeButtonFontSize, 13);
  const closePaddingY = numberOr(appearance.closeButtonPaddingY, 6);
  const closeOffsetY = numberOr(appearance.closeButtonOffsetY, 6);
  const closeButtonExtent = closeOffsetY + closePaddingY + closePaddingY + closeFontSize + 12;
  const shadowPaddingLeft = Math.max(6, cardShadowExtent + Math.max(0, -cardShadowOffsetX));
  const shadowPaddingRight = Math.max(6, cardShadowExtent + Math.max(0, cardShadowOffsetX));
  const shadowPaddingBottom = Math.max(6, cardShadowExtent + Math.max(0, cardShadowOffsetY));
  const shadowPaddingTop = Math.max(6, cardShadowExtent + Math.max(0, -cardShadowOffsetY));
  const topPadding = Math.max(closeButtonExtent, shadowPaddingTop);
  rootStyle.setProperty('--ai-popup-body-padding-top', `${Math.max(34, Math.round(topPadding))}px`);
  rootStyle.setProperty('--ai-popup-body-padding-x', `${Math.round(Math.max(shadowPaddingLeft, shadowPaddingRight))}px`);
  rootStyle.setProperty('--ai-popup-body-padding-bottom', `${Math.round(shadowPaddingBottom)}px`);
}

function applyLocale(locale) {
  currentLocale = resolveLanguage(locale, navigator.language);
  document.documentElement.lang = currentLocale;
  document.title = t('ai.popup.title');
  const closeLabel = t('viewer.close');
  closeButton.textContent = closeLabel;
  closeButton.title = closeLabel;
  closeButton.setAttribute('aria-label', closeLabel);
  replyInput.placeholder = t('ai.reply.placeholder');
  replyButton.textContent = t('ai.reply.send');
}

function scheduleWindowFit() {
  if (!window.aiTextPopup?.fitWindow) {
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const bodyStyle = window.getComputedStyle(document.body);
      const paddingTop = parseFloat(bodyStyle.paddingTop) || 0;
      const paddingBottom = parseFloat(bodyStyle.paddingBottom) || 0;
      const closeAreaHeight = closeButton.offsetTop + closeButton.offsetHeight + paddingBottom;
      const contentHeight = Math.ceil(Math.max(closeAreaHeight, document.body.scrollHeight));
      window.aiTextPopup.fitWindow(contentHeight);
    });
  });
}

function hideReplyForm() {
  if (!replyFormOpen) {
    return;
  }

  replyFormOpen = false;
  replyForm.hidden = true;
  replyForm.classList.remove('is-open');
  setReplyStatus('');
  scheduleWindowFit();
}

function showReplyForm(clientX = 0, clientY = 0) {
  replyFormOpen = true;
  replyForm.hidden = false;
  replyForm.classList.add('is-open');

  requestAnimationFrame(() => {
    const margin = 8;
    const bounds = replyForm.getBoundingClientRect();
    const left = Math.min(Math.max(margin, clientX), Math.max(margin, window.innerWidth - bounds.width - margin));
    const top = Math.min(Math.max(margin, clientY), Math.max(margin, window.innerHeight - bounds.height - margin));
    replyForm.style.left = `${Math.round(left)}px`;
    replyForm.style.top = `${Math.round(top)}px`;
    replyInput.focus();
    scheduleWindowFit();
  });
}

function setReplyStatus(message, level = 'muted') {
  replyStatus.textContent = message;
  replyStatus.dataset.level = level;
}

replyForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const reply = replyInput.value.trim();
  if (!reply) {
    setReplyStatus(t('ai.reply.empty'), 'error');
    return;
  }

  replyButton.disabled = true;
  setReplyStatus(t('ai.reply.saving'));

  try {
    const result = await window.aiTextPopup.reply(popupId, reply);
    if (!result?.ok) {
      setReplyStatus(t(result?.errorKey || 'ai.reply.error.failed'), 'error');
      return;
    }

    replyInput.value = '';

    if (result.immediateResponseEnabled) {
      if (result.immediateResponseCreated) {
        setReplyStatus(t('ai.reply.replied'), 'success');
        setTimeout(hideReplyForm, 300);
        return;
      }

      setReplyStatus(t(result.errorKey || 'ai.reply.error.immediateFailed'), 'error');
      return;
    }

    setReplyStatus(t('ai.reply.saved'), 'success');
    setTimeout(hideReplyForm, 700);
  } catch (_error) {
    setReplyStatus(t('ai.reply.error.failed'), 'error');
  } finally {
    replyButton.disabled = false;
  }
});

window.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  showReplyForm(event.clientX, event.clientY);
});

window.addEventListener('pointerdown', (event) => {
  if (!replyFormOpen || replyForm.contains(event.target)) {
    return;
  }

  hideReplyForm();
});

replyInput.addEventListener('input', () => {
  if (replyStatus.textContent) {
    setReplyStatus('');
  }
  scheduleWindowFit();
});

closeButton.addEventListener('click', () => {
  window.aiTextPopup.close();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (replyFormOpen) {
      hideReplyForm();
      return;
    }

    window.aiTextPopup.close();
  }
});

window.aiTextPopup.getPayload(popupId).then((payload) => {
  if (!payload) {
    applyLocale('system');
    text.textContent = t('viewer.readFailed');
    scheduleWindowFit();
    return;
  }

  applyLocale(payload.locale || 'system');
  applyAppearance(payload.appearance || {});
  text.textContent = payload.text;
  scheduleWindowFit();
}).catch(() => {
  applyLocale('system');
  text.textContent = t('viewer.readFailed');
  scheduleWindowFit();
});
