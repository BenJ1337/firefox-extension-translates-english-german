export class ExtSettingsService {
  #STORAGE_KEY_DOPPELKLICK_AKTIV = 'doppelKlickActive';
  #STORAGE_KEY_TRANSLATOR = 'translatorSelected';

  setStatusDoubleClick = async (val) => {
    console.debug(`SETTER: Translate with doubleclick: ${val}`);
    let setting = {};
    setting[this.#STORAGE_KEY_DOPPELKLICK_AKTIV] = val;
    browser.storage.local.set(setting);
  };

  getStatusDoubleClick = async () => {
    const status = (
      await browser.storage.local.get(this.#STORAGE_KEY_DOPPELKLICK_AKTIV)
    )[this.#STORAGE_KEY_DOPPELKLICK_AKTIV];
    console.debug(`GETTER: Translate with doubleclick: ${status}`);
    return status;
  };

  setTranslator = async (val) => {
    console.debug(`SETTER: Translater: ${val}`);
    let setting = {};
    setting[this.#STORAGE_KEY_TRANSLATOR] = val;
    browser.storage.local.set(setting);
  };

  getTranslator = async () => {
    const status = (
      await browser.storage.local.get(this.#STORAGE_KEY_TRANSLATOR)
    )[this.#STORAGE_KEY_TRANSLATOR];
    console.debug(`GETTER: Translater: ${status}`);
    if(status === undefined) {
      return 'https://translate.google.com/?sl=en&tl=de&text=';
    }
    return status;
  };
}
