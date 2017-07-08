export class Post{
  constructor(
    public id: string,
    author: string,
    authorId: string,
    date: number,
    title?: string,
    text?: string,
    url?: string,
    pic?: string,
  ){}
}
