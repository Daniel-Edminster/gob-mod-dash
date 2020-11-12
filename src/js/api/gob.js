class GOB {
  constructor() {
    this.apiKey = process.env.VUE_APP_GAME_OF_BANDS_API_KEY;
    this.rootUrl = 'http://api.gameofbands.com/?api_key=';
  }

  async fetchThemes() {
    const url = `${this.rootUrl}${this.apiKey}&getThemes`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  async fetchSongs(round) {
    const url = `${this.rootUrl}${this.apiKey}&round=${round}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

}

export default new GOB();