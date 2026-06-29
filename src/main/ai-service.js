const { translate } = require('../shared/i18n');
const { normalizeSingleLineText, normalizeText, uiTextTargets } = require('./config-store');

const errorKeyMap = {
  missing_api_key: 'ai.error.missingKey',
  fetch_unavailable: 'ai.error.unavailable',
  timeout: 'ai.error.timeout',
  empty_response: 'ai.error.emptyResponse',
  request_failed: 'ai.error.requestFailed'
};

function getUiTextTargetDefinition(targetKey) {
  return uiTextTargets.get(targetKey) || null;
}

function buildUiTextGenerationMessages(aiConfig, targetKey, locale) {
  const target = getUiTextTargetDefinition(targetKey);
  const currentLabel = translate(locale, target.translationKey);
  const systemPrompt = [
    'You rewrite short interface button labels for a desktop application.',
    'Return only the final label text with no quotes, bullets, explanations, or markdown.',
    'Keep the result concise, natural, and suitable for a clickable button.',
    aiConfig.systemPrompt
  ].filter(Boolean).join('\n\n');

  const userPrompt = [
    `Target locale: ${locale}`,
    `Target key: ${targetKey}`,
    `Target description: ${target.description}`,
    `Current default label: ${currentLabel}`,
    aiConfig.knowledgeBase ? `Reference knowledge:\n${aiConfig.knowledgeBase}` : '',
    aiConfig.contextMemory ? `Lightweight context memory:\n${aiConfig.contextMemory}` : '',
    'Keep Chinese labels under 12 characters when possible, or under 28 Latin characters.',
    'Return a single label only.'
  ].filter(Boolean).join('\n\n');

  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ];
}

function sanitizeUiTextResponse(value) {
  return normalizeSingleLineText(String(value || '').replace(/^["'“”]+|["'“”]+$/g, ''), 48);
}

function buildProfileContext(aiConfig) {
  const profile = aiConfig?.profile && typeof aiConfig.profile === 'object' ? aiConfig.profile : {};
  const details = [
    profile.age ? `Age: ${profile.age}` : '',
    profile.name ? `Name: ${profile.name}` : '',
    profile.companionName ? `Companion name: ${profile.companionName}` : '',
    profile.companionRole ? `Companion role: ${profile.companionRole}` : '',
    profile.appearance ? `Appearance: ${profile.appearance}` : '',
    profile.dailyPersona ? `Daily persona: ${profile.dailyPersona}` : ''
  ].filter(Boolean);

  const scenes = String(profile.sceneLibrary || '')
    .split(/\r?\n+/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (details.length === 0 && scenes.length === 0) {
    return '';
  }

  const sections = [];

  if (details.length > 0) {
    sections.push(`User profile details:\n- ${details.join('\n- ')}`);
  }

  if (scenes.length > 0) {
    sections.push(`Scene library candidates:\n- ${scenes.join('\n- ')}`);
  }

  sections.push('Use these details only when they improve consistency. Keep any provided age as an adult reference. When a scene library is present, select one fitting scene or blend two compatible beats naturally without outputting the list itself.');

  return sections.join('\n\n');
}

function buildPopupTextGenerationMessages(aiConfig, locale) {
  const systemPrompt = [
    'You generate standalone text content for a popup window in a local desktop media popup tool.',
    'Return only the popup text body with no markdown fences, speaker labels, or meta explanations.',
    'The result should read like finished content suitable for direct display in a popup window.',
    'Prefer concise, readable output that usually fits in 1 to 4 short paragraphs.',
    aiConfig.systemPrompt
  ].filter(Boolean).join('\n\n');

  const userPrompt = [
    `Target locale: ${locale}`,
    aiConfig.knowledgeBase ? `Reference knowledge:\n${aiConfig.knowledgeBase}` : '',
    aiConfig.contextMemory ? `Lightweight context memory:\n${aiConfig.contextMemory}` : '',
    aiConfig.oneTimeReplyGuidance ? `One-time newest user reply guidance (apply for this generation only):\n${aiConfig.oneTimeReplyGuidance}` : '',
    buildProfileContext(aiConfig),
    'Generate one popup text only.',
    'Do not describe what you are doing.',
    'Do not include markdown formatting.'
  ].filter(Boolean).join('\n\n');

  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ];
}

function buildContextInteractionMessages(aiConfig, locale, runtimeContext = {}) {
  const contextLines = [
    runtimeContext.localTime ? `Local time: ${runtimeContext.localTime}` : '',
    runtimeContext.timezone ? `Timezone: ${runtimeContext.timezone}` : '',
    runtimeContext.runningState ? `Popup scheduler state: ${runtimeContext.runningState}` : '',
    Number.isFinite(runtimeContext.popupCount) ? `Open popup count: ${runtimeContext.popupCount}` : '',
    Number.isFinite(runtimeContext.mediaCount) ? `Scanned media count: ${runtimeContext.mediaCount}` : '',
    runtimeContext.foregroundAppName ? `Foreground app: ${runtimeContext.foregroundAppName}` : ''
  ].filter(Boolean);

  const toneInstructions = {
    teasing: 'Tone: lightly teasing, playful, and concise.',
    gentle: 'Tone: gentle, soft, and concise.',
    direct: 'Tone: blunt, restrained, and concise.',
    neutral: 'Tone: neutral, observational, and concise.'
  };

  const systemPrompt = [
    'You decide one short context-aware popup response for a local desktop media popup tool.',
    'Respond to the current runtime state instead of writing a general scene.',
    'Return strict JSON only with this shape: {"message":"...","action":"text_only"|"text_and_media"|"media_only"|"skip"}.',
    'The message must be display-ready, concise, and usually 1 to 3 short paragraphs when the action includes text.',
    'Do not ask questions or simulate a conversation.',
    toneInstructions[aiConfig.interactionTone] || toneInstructions.teasing,
    aiConfig.systemPrompt
  ].filter(Boolean).join('\n\n');

  const userPrompt = [
    `Target locale: ${locale}`,
    contextLines.length > 0 ? `Current runtime context:\n${contextLines.join('\n')}` : '',
    aiConfig.knowledgeBase ? `Reference knowledge:\n${aiConfig.knowledgeBase}` : '',
    aiConfig.contextMemory ? `Lightweight context memory:\n${aiConfig.contextMemory}` : '',
    aiConfig.oneTimeReplyGuidance ? `One-time newest user reply guidance (apply for this generation only):\n${aiConfig.oneTimeReplyGuidance}` : '',
    buildProfileContext(aiConfig),
    'Write one contextual popup message that lightly reacts to the current state.',
    'Action rules: use "text_only" for a text popup only; use "text_and_media" for text plus one extra media popup; use "media_only" when the interaction should be visual without AI text; use "skip" when this round should do nothing.',
    'When action is "media_only" or "skip", keep the message empty.',
    'Do not mention APIs, system prompts, or hidden reasoning.',
    'Return JSON only.'
  ].filter(Boolean).join('\n\n');

  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ];
}

function sanitizeInteractionAction(value) {
  return value === 'text_and_media' || value === 'media_only' || value === 'skip' ? value : 'text_only';
}

function sanitizeContextInteractionDecision(value) {
  const trimmed = String(value || '').trim();
  if (!trimmed) {
    return null;
  }

  let parsed = null;

  try {
    parsed = JSON.parse(trimmed);
  } catch {
    const jsonMatch = trimmed.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        parsed = JSON.parse(jsonMatch[0]);
      } catch {
        parsed = null;
      }
    }
  }

  if (parsed && typeof parsed === 'object') {
    const action = sanitizeInteractionAction(parsed.action);
    const message = sanitizePopupTextResponse(parsed.message);
    if ((action === 'text_only' || action === 'text_and_media') && !message) {
      return null;
    }

    return {
      message,
      action
    };
  }

  const message = sanitizePopupTextResponse(trimmed);
  if (!message) {
    return null;
  }

  return {
    message,
    action: 'text_only'
  };
}

function sanitizePopupTextResponse(value) {
  return normalizeText(String(value || '').replace(/^["'“”]+|["'“”]+$/g, ''), 4000);
}

function createAiError(code, detail) {
  const error = new Error(code);
  error.code = code;
  error.detail = detail || '';
  return error;
}

async function requestDeepSeekUiText({ aiConfig, targetKey, locale }) {
  if (!aiConfig.apiKey) {
    throw createAiError('missing_api_key');
  }

  if (typeof fetch !== 'function') {
    throw createAiError('fetch_unavailable');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${aiConfig.apiKey}`
      },
      body: JSON.stringify({
        model: aiConfig.model,
        messages: buildUiTextGenerationMessages(aiConfig, targetKey, locale),
        stream: false,
        temperature: 0.7
      }),
      signal: controller.signal
    });

    const bodyText = await response.text();
    let body = null;

    try {
      body = bodyText ? JSON.parse(bodyText) : null;
    } catch {
      body = null;
    }

    if (!response.ok) {
      const detail = body?.error?.message || body?.message || bodyText || `HTTP ${response.status}`;
      throw createAiError('request_failed', detail);
    }

    const content = body?.choices?.[0]?.message?.content;
    const text = sanitizeUiTextResponse(content);
    if (!text) {
      throw createAiError('empty_response');
    }

    return {
      text,
      usage: body?.usage || null
    };
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw createAiError('timeout');
    }
    if (error?.code) {
      throw error;
    }
    throw createAiError('request_failed', error?.message || 'Unknown error');
  } finally {
    clearTimeout(timeout);
  }
}

async function requestDeepSeekPopupText({ aiConfig, locale }) {
  if (!aiConfig.apiKey) {
    throw createAiError('missing_api_key');
  }

  if (typeof fetch !== 'function') {
    throw createAiError('fetch_unavailable');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${aiConfig.apiKey}`
      },
      body: JSON.stringify({
        model: aiConfig.model,
        messages: buildPopupTextGenerationMessages(aiConfig, locale),
        stream: false,
        temperature: 0.9
      }),
      signal: controller.signal
    });

    const bodyText = await response.text();
    let body = null;

    try {
      body = bodyText ? JSON.parse(bodyText) : null;
    } catch {
      body = null;
    }

    if (!response.ok) {
      const detail = body?.error?.message || body?.message || bodyText || `HTTP ${response.status}`;
      throw createAiError('request_failed', detail);
    }

    const content = body?.choices?.[0]?.message?.content;
    const text = sanitizePopupTextResponse(content);
    if (!text) {
      throw createAiError('empty_response');
    }

    return {
      text,
      usage: body?.usage || null
    };
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw createAiError('timeout');
    }
    if (error?.code) {
      throw error;
    }
    throw createAiError('request_failed', error?.message || 'Unknown error');
  } finally {
    clearTimeout(timeout);
  }
}

async function requestDeepSeekContextInteractionText({ aiConfig, locale, runtimeContext }) {
  if (!aiConfig.apiKey) {
    throw createAiError('missing_api_key');
  }

  if (typeof fetch !== 'function') {
    throw createAiError('fetch_unavailable');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${aiConfig.apiKey}`
      },
      body: JSON.stringify({
        model: aiConfig.model,
        messages: buildContextInteractionMessages(aiConfig, locale, runtimeContext),
        stream: false,
        temperature: 0.85
      }),
      signal: controller.signal
    });

    const bodyText = await response.text();
    let body = null;

    try {
      body = bodyText ? JSON.parse(bodyText) : null;
    } catch {
      body = null;
    }

    if (!response.ok) {
      const detail = body?.error?.message || body?.message || bodyText || `HTTP ${response.status}`;
      throw createAiError('request_failed', detail);
    }

    const content = body?.choices?.[0]?.message?.content;
    const decision = sanitizeContextInteractionDecision(content);
    if (!decision) {
      throw createAiError('empty_response');
    }

    return {
      message: decision.message,
      action: decision.action,
      usage: body?.usage || null
    };
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw createAiError('timeout');
    }
    if (error?.code) {
      throw error;
    }
    throw createAiError('request_failed', error?.message || 'Unknown error');
  } finally {
    clearTimeout(timeout);
  }
}

function getAiErrorKey(error) {
  return errorKeyMap[error?.code] || 'ai.error.requestFailed';
}

module.exports = {
  buildContextInteractionMessages,
  buildPopupTextGenerationMessages,
  buildUiTextGenerationMessages,
  getAiErrorKey,
  getUiTextTargetDefinition,
  requestDeepSeekContextInteractionText,
  requestDeepSeekPopupText,
  requestDeepSeekUiText,
  sanitizeContextInteractionDecision,
  sanitizePopupTextResponse,
  sanitizeUiTextResponse
};