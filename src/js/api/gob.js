class GOB {
  constructor() {
    this.apiKey = process.env.VUE_APP_GOB_API_KEY;
    this.rootUrl = process.env.VUE_APP_GOB_ROOT_URL;
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      console.log(response);
      const status = { code: response.status, text: response.statusText };
      const data = await response.json();
      return { status, data };
    } catch (err) {
      console.log(err);
      const status = 400;
      return { status, err };
    }
  }

  fetchThemes() {
    const url = `${this.rootUrl}${this.apiKey}&getThemes`;
    return this.fetchData(url);
  }

  fetchSongs(round) {
    console.log(+round);
    if (round == 0 || isNaN(+round)) {
      console.log("Bad round number input");
      return { status: { code: 400 , text: 'Invalid round number'}};
    } else {
      const url = `${this.rootUrl}${this.apiKey}&round=${round}`;
      return this.fetchData(url);
    }
  }

  fetchBandits() {
    const url = `${this.rootUrl}${this.apiKey}&viewallbandits=1`;
    return this.fetchData(url);
  }

  fetchVeterans() {
    const url = `${this.rootUrl}${this.apiKey}&veterans=1`;
    return this.fetchData(url);
  }

}

export default new GOB();