export type showElement = {
  id : number,
  url : string,
  name : string,
  language : string,
  genres : string[],
  status : string,
  runtime : number,
  premiered : string,
  officialSit : string,
  schedule : {
    time : string,
    days : string[]
  },
  rating : any,
  network : {
    id : number,
    name : string,
    country : {
      name : string,
      code : string,
      timezone : string
    },
    webChannel : boolean,
    externals : {
      tvrage : number,
      thetvdb : number,
      imdb : string
    },
    image? : {
      medium : string,
      original : string
    },
    summary : string,
    updated : number,
    _links : {
      self : {
        href : string
      },
      previousepisode : {
        href : string
      }
    }
  }
}
