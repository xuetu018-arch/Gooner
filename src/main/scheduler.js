function getSecondsFromParts(hours, minutes, seconds) {
  return (Number(hours) * 3600) + (Number(minutes) * 60) + Number(seconds);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Scheduler {
  constructor({ getConfig, getMediaCount, getScheduledItemCount, getPopupCount, scanMedia, getNextPopupItem, createPopup, closeAllPopups, sendState, getPublicState }) {
    this.getConfig = getConfig;
    this.getMediaCount = getMediaCount;
    this.getScheduledItemCount = getScheduledItemCount;
    this.getPopupCount = getPopupCount;
    this.scanMedia = scanMedia;
    this.getNextPopupItem = getNextPopupItem;
    this.createPopup = createPopup;
    this.closeAllPopups = closeAllPopups;
    this.sendState = sendState;
    this.getPublicState = getPublicState;
    this.running = false;
    this.requestedRunning = false;
    this.gateBlocked = false;
    this.gateMessageKey = '';
    this.timer = null;
    this.currentBurstSize = 1;
  }

  get isRunning() {
    return this.running;
  }

  get isRequestedRunning() {
    return this.requestedRunning;
  }

  get gateState() {
    return {
      blocked: this.gateBlocked,
      messageKey: this.gateMessageKey
    };
  }

  getNextDelayMs() {
    const config = this.getConfig();
    const baseSeconds = getSecondsFromParts(config.intervalHours, config.intervalMinutes, config.intervalSeconds);
    const jitterSeconds = getSecondsFromParts(config.jitterHours, config.jitterMinutes, config.jitterSeconds);
    const offset = jitterSeconds > 0 ? randomInt(-jitterSeconds, jitterSeconds) : 0;
    return Math.max(1, baseSeconds + offset) * 1000;
  }

  scheduleNextTick() {
    clearTimeout(this.timer);
    
    const config = this.getConfig();
    const effectiveMinWindows = config.maxWindows === 'unlimited' ? config.minWindows : Math.min(config.minWindows, config.maxWindows);
    
    let delayMs = this.getNextDelayMs();
    if (effectiveMinWindows > 0 && this.getPopupCount() < effectiveMinWindows) {
      delayMs = 100;
    }

    this.timer = setTimeout(() => {
      void this.tick();
    }, delayMs);
  }

  async tick() {
    if (!this.running || this.gateBlocked || this.getScheduledItemCount() === 0) {
      return;
    }

    const config = this.getConfig();
    const availableSlots = config.maxWindows === 'unlimited'
      ? config.burstCount
      : Math.max(0, config.maxWindows - this.getPopupCount());
    const targetCount = config.gradual ? this.currentBurstSize : config.burstCount;
    const count = Math.min(availableSlots, targetCount);
    const maxAttempts = Math.max(this.getScheduledItemCount(), count);
    let spawned = 0;
    let attempts = 0;

    while (spawned < count && attempts < maxAttempts) {
      const created = await this.createPopup(this.getNextPopupItem());
      attempts += 1;
      if (created) {
        spawned += 1;
      }
    }

    if (config.gradual) {
      this.currentBurstSize = Math.min(config.burstCount, this.currentBurstSize + 1);
    }

    this.scheduleNextTick();
  }

  async start() {
    this.requestedRunning = true;

    if (this.gateBlocked) {
      this.running = false;
      clearTimeout(this.timer);
      this.timer = null;
      this.sendState({ messageKey: this.gateMessageKey });
      return this.getPublicState();
    }

    if (this.getMediaCount() === 0) {
      await this.scanMedia();
    }
    if (this.getScheduledItemCount() === 0) {
      this.running = false;
      this.sendState({ messageKey: 'message.noPlayableSources' });
      return this.getPublicState();
    }

    this.running = true;
    this.currentBurstSize = 1;
    void this.tick();
    this.sendState();
    return this.getPublicState();
  }

  pause() {
    this.requestedRunning = false;
    this.running = false;
    clearTimeout(this.timer);
    this.timer = null;
    this.sendState();
    return this.getPublicState();
  }

  stop() {
    this.pause();
    this.closeAllPopups();
    this.currentBurstSize = 1;
    return this.getPublicState();
  }

  async setGateBlocked(blocked, messageKey = '') {
    const nextBlocked = Boolean(blocked);
    this.gateBlocked = nextBlocked;
    this.gateMessageKey = nextBlocked ? messageKey : '';

    if (!this.requestedRunning) {
      this.sendState();
      return this.getPublicState();
    }

    if (nextBlocked) {
      this.running = false;
      clearTimeout(this.timer);
      this.timer = null;
      this.sendState({ messageKey: this.gateMessageKey });
      return this.getPublicState();
    }

    if (!this.running) {
      return this.start();
    }

    this.scheduleNextTick();
    this.sendState();
    return this.getPublicState();
  }
}

module.exports = {
  Scheduler
};