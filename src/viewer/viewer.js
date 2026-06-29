const stage = document.querySelector('#stage');
const message = document.querySelector('#message');
const closeButton = document.querySelector('#closeButton');
const params = new URLSearchParams(window.location.search);
const viewerId = params.get('id');
let mediaConfig = {};
let currentMediaElement = null;
let currentLocale = (window.appI18n && window.appI18n.resolveLanguage('system', navigator.language)) || 'zh-CN';
let detachCloseButtonListener = null;
let isClosing = false;

const { resolveLanguage, translate } = window.appI18n || {
  resolveLanguage: (value, fallback) => value || fallback || 'zh-CN',
  translate: (_locale, key) => key
};

function t(key, params) {
  return translate(currentLocale, key, params);
}

function applyLanguage(locale) {
  currentLocale = resolveLanguage(locale, navigator.language);
  document.documentElement.lang = currentLocale;
  document.title = t('app.title');
  applyCloseButtonAppearance();

  if (message.isConnected) {
    message.textContent = t('viewer.loading');
  }
}

function syncCloseButtonVisibility() {
  const hideCloseButton = Boolean(mediaConfig.clickToClose) || Boolean(mediaConfig.disableManualClose);
  closeButton.hidden = hideCloseButton;
}

function randomizeCloseButton() {
  const buttonRect = closeButton.getBoundingClientRect();
  const buttonWidth = Math.max(64, Math.ceil(buttonRect.width));
  const buttonHeight = Math.max(32, Math.ceil(buttonRect.height));
  const safeOffsetX = Number(mediaConfig.closeButtonOffsetX) || 10;
  const safeOffsetY = Number(mediaConfig.closeButtonOffsetY) || 10;
  const leftRange = Math.max(0, window.innerWidth - buttonWidth - (safeOffsetX * 2));
  const topRange = Math.max(0, window.innerHeight - buttonHeight - (safeOffsetY * 2));
  closeButton.style.left = `${safeOffsetX + Math.floor(Math.random() * (leftRange + 1))}px`;
  closeButton.style.top = `${safeOffsetY + Math.floor(Math.random() * (topRange + 1))}px`;
  closeButton.style.right = 'auto';
}

function showMessage(text) {
  stage.replaceChildren(message);
  message.textContent = text;
  currentMediaElement = null;
}

function closeViewer(useFade = false) {
  if (isClosing) {
    return;
  }

  if (!useFade) {
    window.viewerPopup.close();
    return;
  }

  isClosing = true;
  document.body.classList.add('is-closing');
  window.setTimeout(() => {
    window.viewerPopup.close();
  }, 1200);
}

async function fitWindowToMedia(mediaWidth, mediaHeight) {
  if (!window.viewerPopup || !window.viewerPopup.fitWindow) {
    return;
  }

  try {
    await window.viewerPopup.fitWindow(mediaWidth, mediaHeight);
  } catch (_error) {
    // Ignore window fit failures and keep normal rendering.
  }
}

function applyScaledFit(element, mediaWidth, mediaHeight) {
  if (!element || !mediaWidth || !mediaHeight) {
    return;
  }

  const stageWidth = Math.max(1, stage.clientWidth);
  const stageHeight = Math.max(1, stage.clientHeight);
  const scale = Math.min(stageWidth / mediaWidth, stageHeight / mediaHeight);
  const clampedScale = Number.isFinite(scale) && scale > 0 ? scale : 1;
  element.style.width = `${Math.max(1, Math.floor(mediaWidth * clampedScale))}px`;
  element.style.height = `${Math.max(1, Math.floor(mediaHeight * clampedScale))}px`;
}

function refreshCurrentMediaFit() {
  if (!currentMediaElement) {
    return;
  }

  if (currentMediaElement.tagName === 'VIDEO') {
    applyScaledFit(currentMediaElement, currentMediaElement.videoWidth, currentMediaElement.videoHeight);
    return;
  }

  applyScaledFit(currentMediaElement, currentMediaElement.naturalWidth, currentMediaElement.naturalHeight);
}

function renderMedia(media) {
  if (!media) {
    showMessage(t('viewer.mediaMissing'));
    return;
  }

  const element = document.createElement(media.type === 'video' ? 'video' : 'img');
  element.className = 'media-element';
  element.src = media.url;
  element.title = media.name;

  if (media.type === 'video') {
    element.autoplay = true;
    element.loop = !Boolean(media.closeVideoOnEnded) && !Boolean(media.chaosVideo);
    element.controls = true;
    element.muted = Boolean(media.muted);
    element.playsInline = true;
    element.addEventListener('loadedmetadata', async () => {
      await fitWindowToMedia(element.videoWidth, element.videoHeight);
      refreshCurrentMediaFit();

      if (media.chaosVideo && element.duration > 0) {
        const safeDuration = Math.max(0, element.duration - 5);
        if (safeDuration > 0) {
          element.currentTime = Math.random() * safeDuration;
        }
      }
    });
    if (media.closeVideoOnEnded || media.chaosVideo) {
      element.addEventListener('ended', () => closeViewer(true));
    }
  } else {
    element.draggable = false;
    element.addEventListener('load', async () => {
      await fitWindowToMedia(element.naturalWidth, element.naturalHeight);
      refreshCurrentMediaFit();
    });
  }

  element.addEventListener('error', () => showMessage(t('viewer.loadFailed')));
  currentMediaElement = element;
  stage.replaceChildren(element);
}

closeButton.addEventListener('click', () => closeViewer(false));

document.body.addEventListener('contextmenu', (event) => {
  if (mediaConfig && mediaConfig.developerMode && mediaConfig.path) {
    event.preventDefault();
    if (window.viewerPopup && window.viewerPopup.showInFolder) {
      window.viewerPopup.showInFolder(mediaConfig.path);
    }
  }
});

window.addEventListener('resize', () => {
  if (!mediaConfig.clickToClose && mediaConfig.randomCloseButton) {
    randomizeCloseButton();
  }
  refreshCurrentMediaFit();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !mediaConfig.disableManualClose) {
    closeViewer(false);
  }
});

applyLanguage('system');

if (window.viewerPopup?.onCloseButtonTextUpdate) {
  detachCloseButtonListener = window.viewerPopup.onCloseButtonTextUpdate((payload) => {
    if (!payload || typeof payload.text !== 'string') {
      return;
    }

    mediaConfig = {
      ...mediaConfig,
      closeButtonText: payload.text
    };
    applyCloseButtonAppearance();
  });
}

let detachOpacityListener = null;
if (window.viewerPopup?.onOpacityUpdate) {
  detachOpacityListener = window.viewerPopup.onOpacityUpdate((opacity) => {
    if (currentMediaElement && currentMediaElement.tagName === 'VIDEO' && !mediaConfig.muted) {
      currentMediaElement.volume = Math.max(0, Math.min(1, opacity));
    }
  });
}

window.viewerPopup.getMedia(viewerId).then((media) => {
  mediaConfig = media;
  applyLanguage(media?.language || 'system');
  syncCloseButtonVisibility();
  renderMedia(media);
  if (mediaConfig.clickToClose && !mediaConfig.disableManualClose) {
    document.addEventListener('click', () => closeViewer(false));
  }
  if (!mediaConfig.clickToClose && mediaConfig.randomCloseButton) {
    randomizeCloseButton();
  }
}).catch(() => {
  showMessage(t('viewer.readFailed'));
});

function getCloseButtonLabel() {
  const customText = typeof mediaConfig.closeButtonText === 'string' ? mediaConfig.closeButtonText.trim() : '';
  return customText || t('viewer.close');
}

function applyCloseButtonAppearance() {
  const label = getCloseButtonLabel();
  closeButton.textContent = label;
  closeButton.title = label;
  closeButton.style.setProperty('--close-button-font-size', `${mediaConfig.closeButtonFontSize || 14}px`);
  closeButton.style.setProperty('--close-button-radius', `${mediaConfig.closeButtonBorderRadius || 6}px`);
  closeButton.style.setProperty('--close-button-padding-x', `${mediaConfig.closeButtonPaddingX || 16}px`);
  closeButton.style.setProperty('--close-button-padding-y', `${mediaConfig.closeButtonPaddingY || 8}px`);
  closeButton.style.setProperty('--close-button-offset-x', `${mediaConfig.closeButtonOffsetX || 10}px`);
  closeButton.style.setProperty('--close-button-offset-y', `${mediaConfig.closeButtonOffsetY || 10}px`);
  closeButton.style.setProperty('--close-button-background', mediaConfig.closeButtonBackgroundColor || '#000000');
  closeButton.style.setProperty('--close-button-text-color', mediaConfig.closeButtonTextColor || '#ffffff');
  closeButton.style.setProperty('--close-button-border-color', mediaConfig.closeButtonBorderColor || '#ffffff');
  closeButton.style.setProperty('--close-button-hover-background', mediaConfig.closeButtonHoverBackgroundColor || '#2f3b45');
  closeButton.style.setProperty('--close-button-hover-text-color', mediaConfig.closeButtonHoverTextColor || '#ffffff');
}

window.addEventListener('beforeunload', () => {
  if (typeof detachCloseButtonListener === 'function') {
    detachCloseButtonListener();
  }
  if (typeof detachOpacityListener === 'function') {
    detachOpacityListener();
  }
});