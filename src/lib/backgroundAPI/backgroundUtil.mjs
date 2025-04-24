import { WordStorageService } from '../storage/WordStorageService.mjs';
import { ExtSettingsService } from '../storage/ExtSettingsService.mjs';

async function createWindow(onCloseCallback) {
  let window = await browser.windows.create({
    url: [],
    type: 'popup',
    focused: true,
    height: 1200,
    width: 550,
    left: 0,
    top: 0,
  });

  browser.windows.update(window.id, { left: 0, top: 100 });
  browser.windows.onRemoved.addListener(onCloseCallback);

  console.info('Fenster geöffnet');
  return window;
}

async function showUebersetzung(words, window) {
  new WordStorageService().appendWord(words);
  const translator = await new ExtSettingsService().getTranslator();
  console.info('Aktualisiere Fenster mit Übersetzung...');
  console.log(`W-Id: ${window.id}`);
  console.log(`Translator: ${translator}`)
  browser.tabs
    .query({ windowId: window.id, active: true })
    .then(
      (t) => {
        browser.tabs.update(t[0].id, {
          url: `${translator}${words}`
        });
      },
      (err) => console.error(err)
    )
    .catch((err) => console.error(err));
  console.info('Aktualisierung abgeschlossen');
}

export { showUebersetzung, createWindow };
