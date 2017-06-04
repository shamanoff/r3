export interface FeedEntry {
  title: string,
  link: string,
  guid: string,
  pubDate: Date,
  author: string,
  thumbnail: string,
  description: string,
  enclosure: {
    link: string,
    type: string
  },
  categories: Array<string>

}
