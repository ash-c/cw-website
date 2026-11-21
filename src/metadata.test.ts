import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { afterEach, describe, expect, it, vi } from 'vitest';

const nodeRequire = createRequire(import.meta.url);
const configPath = nodeRequire.resolve('../webpack.config.js');
const templatePath = nodeRequire.resolve('../public/index.html');
const htmlLoader: (this: unknown, source: string) => string = nodeRequire(
  'html-webpack-plugin/lib/loader.js',
);

type HtmlPluginLike = { userOptions: { templateParameters: Record<string, unknown> } };

const description =
  'Full-stack software engineer based in Taranaki, New Zealand. I build software that solves real problems for people.';
const title = 'Ash Crockett | Full-stack software engineer';

const loadTemplateParameters = (siteUrl?: string) => {
  if (siteUrl === undefined) {
    vi.stubEnv('SITE_URL', undefined);
  } else {
    vi.stubEnv('SITE_URL', siteUrl);
  }
  delete nodeRequire.cache[configPath];
  const config: { plugins: HtmlPluginLike[] } = nodeRequire(configPath);
  return config.plugins[0].userOptions.templateParameters;
};

const renderTemplate = (templateParameters: Record<string, unknown>, imagePath: string) => {
  const moduleSource = htmlLoader.call(
    { getOptions: () => ({}), loaders: [], loaderIndex: 0, resourcePath: templatePath },
    readFileSync(templatePath, 'utf8'),
  );
  const stubRequire = (request: string) =>
    request.endsWith('mt-taranaki.jpg') ? imagePath : nodeRequire(request);
  const templateModule: { exports?: (params: Record<string, unknown>) => string } = {};
  new Function('module', 'require', moduleSource)(templateModule, stubRequire);
  const html = templateModule.exports!(templateParameters);
  return { html, document: new DOMParser().parseFromString(html, 'text/html') };
};

const meta = (document: Document, property: string) =>
  document.querySelector(`meta[property="${property}"]`)?.getAttribute('content');

afterEach(() => {
  vi.unstubAllEnvs();
  delete nodeRequire.cache[configPath];
});

describe('index.html metadata', () => {
  it('renders static title, description, and Open Graph fields without SITE_URL', () => {
    const { html, document } = renderTemplate(loadTemplateParameters(), '/hero.jpg');

    expect(document.title).toBe(title);
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      description,
    );
    expect(meta(document, 'og:type')).toBe('website');
    expect(meta(document, 'og:site_name')).toBe('Ash Crockett');
    expect(meta(document, 'og:title')).toBe(title);
    expect(meta(document, 'og:description')).toBe(description);

    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    expect(meta(document, 'og:url')).toBeUndefined();
    expect(meta(document, 'og:image')).toBeUndefined();
    expect(meta(document, 'og:image:alt')).toBeUndefined();
    expect(html).not.toMatch(/undefined|localhost|https?:\/\//);
  });

  it('renders absolute, escaped URLs for a normalized SITE_URL', () => {
    const { html, document } = renderTemplate(
      loadTemplateParameters('  https://Preview-Test.example.com/  '),
      '/abc123.jpg?a=1&b=2',
    );

    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://preview-test.example.com/',
    );
    expect(meta(document, 'og:url')).toBe('https://preview-test.example.com/');
    expect(meta(document, 'og:image')).toBe('https://preview-test.example.com/abc123.jpg?a=1&b=2');
    expect(html).toContain('content="https://preview-test.example.com/abc123.jpg?a=1&amp;b=2"');
    expect(meta(document, 'og:image:alt')).toMatch(/Mount Taranaki/);
  });

  it.each([
    'http://preview-test.example.com',
    'https://preview-test.example.com/blog',
    'https://preview-test.example.com/?ref=1',
    'https://localhost',
    'not a url',
  ])('rejects invalid SITE_URL %s', (siteUrl) => {
    expect(() => loadTemplateParameters(siteUrl)).toThrow(/SITE_URL must be a public HTTPS origin/);
  });
});
