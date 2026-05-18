/**
 * Runtime config adapter.
 *
 * Canonical project data lives in JSON files:
 * - configs/author.config.json
 * - projects/sap/project.config.json
 * - projects/sap/topics.index.json
 *
 * This file loads those schema files and exposes a legacy-compatible
 * RESEARCH_CONFIG object while the static site is being migrated.
 */

const SITE_CONFIG_PATHS = {
  author: 'configs/author.config.json',
  project: 'projects/sap/project.config.json',
  topics: 'projects/sap/topics.index.json'
};

const SITE_CONFIG_ROOT = new URL('.', document.currentScript?.src || window.location.href);

const SITE_CONTEXT = {
  author: null,
  project: null,
  topicsIndex: null,
  loaded: false
};

let RESEARCH_CONFIG = null;
let _siteContextPromise = null;

function _configBaseUrl() {
  return SITE_CONFIG_ROOT;
}

async function _loadJson(path) {
  const url = new URL(path, _configBaseUrl());
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Unable to load ${path}: HTTP ${res.status}`);
  return res.json();
}

function _metadataLabels(project, lang) {
  const labels = {};
  (project.metadata || []).forEach(item => {
    labels[item.key] = item.label && item.label[lang] !== undefined ? item.label[lang] : item.key;
  });
  return labels;
}

function _metadataValue(project, key, lang) {
  const item = (project.metadata || []).find(m => m.key === key);
  if (!item) return '';
  return item.value && item.value[lang] !== undefined ? item.value[lang] : item.value;
}

function _topicLang(topic, lang) {
  return {
    title: topic.title && topic.title[lang] !== undefined ? topic.title[lang] : topic.title?.zh || '',
    subtitle: topic.subtitle && topic.subtitle[lang] !== undefined ? topic.subtitle[lang] : topic.subtitle?.zh || '',
    summary: topic.summary && topic.summary[lang] !== undefined ? topic.summary[lang] : topic.summary?.zh || '',
    tags: topic.tags && topic.tags[lang] !== undefined ? topic.tags[lang] : topic.tags?.zh || []
  };
}

function _toLegacyConfig(author, project, topicsIndex) {
  const subject = project.subject || {};
  const positioning = project.positioning || {};
  const site = project.site || {};

  return {
    researcher: {
      name: author.name,
      zh: {
        aboutTitle: author.aboutTitle?.zh || '关于作者与研究说明',
        intro: author.bio?.zh || '',
        focusLabel: author.focusLabel?.zh || '',
        focusItems: author.focusAreas?.zh || [],
        coreLabel: author.coreLabel?.zh || '',
        coreInsight: author.coreInsight?.zh || '',
        aiNote: author.aiNote?.zh || '',
        disclaimer: author.disclaimer?.zh || ''
      },
      en: {
        aboutTitle: author.aboutTitle?.en || 'About the Author',
        intro: author.bio?.en || '',
        focusLabel: author.focusLabel?.en || '',
        focusItems: author.focusAreas?.en || [],
        coreLabel: author.coreLabel?.en || '',
        coreInsight: author.coreInsight?.en || '',
        aiNote: author.aiNote?.en || '',
        disclaimer: author.disclaimer?.en || ''
      },
      contact: author.links?.email || ''
    },

    subject: {
      ...subject,
      zh: {
        sector: positioning.zh?.sector || '',
        marketCap: _metadataValue(project, 'marketCap', 'zh'),
        description: positioning.zh?.description || '',
        motivation: positioning.zh?.researchMotivation || '',
        coreQuestions: positioning.zh?.coreQuestions || [],
        metaLabels: _metadataLabels(project, 'zh')
      },
      en: {
        sector: positioning.en?.sector || '',
        marketCap: _metadataValue(project, 'marketCap', 'en'),
        description: positioning.en?.description || '',
        motivation: positioning.en?.researchMotivation || '',
        coreQuestions: positioning.en?.coreQuestions || [],
        metaLabels: _metadataLabels(project, 'en')
      }
    },

    topics: (topicsIndex.topics || []).map(topic => ({
      ...topic,
      readingTimeByLang: topic.readingTime || {},
      readingTime: topic.readingTime?.zh || topic.readingTime?.en || 0,
      zh: _topicLang(topic, 'zh'),
      en: _topicLang(topic, 'en')
    })),

    site: {
      name: site.name?.en || site.name?.zh || 'Research',
      zh: {
        tagline: site.tagline?.zh || '',
        copyright: site.copyright?.zh || '',
        license: site.license?.zh || ''
      },
      en: {
        tagline: site.tagline?.en || '',
        copyright: site.copyright?.en || '',
        license: site.license?.en || ''
      }
    }
  };
}

async function loadSiteContext() {
  if (_siteContextPromise) return _siteContextPromise;

  _siteContextPromise = Promise.all([
    _loadJson(SITE_CONFIG_PATHS.author),
    _loadJson(SITE_CONFIG_PATHS.project),
    _loadJson(SITE_CONFIG_PATHS.topics)
  ]).then(([author, project, topicsIndex]) => {
    SITE_CONTEXT.author = author;
    SITE_CONTEXT.project = project;
    SITE_CONTEXT.topicsIndex = topicsIndex;
    SITE_CONTEXT.loaded = true;
    RESEARCH_CONFIG = _toLegacyConfig(author, project, topicsIndex);
    window.SITE_CONTEXT = SITE_CONTEXT;
    window.RESEARCH_CONFIG = RESEARCH_CONFIG;
    return SITE_CONTEXT;
  });

  return _siteContextPromise;
}
