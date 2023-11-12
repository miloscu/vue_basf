// export class Comment {
//   constructor(data?: Partial<Comment>) {
//     Object.assign(this, data)
//   }

//   id: string = ""
//   parent_id?: string = ""
//   author: { name: string; picture: string } = { name: "", picture: "", }
//   text: string = ""
//   timestamp: number = 0
// }

export interface Comment {
  id: string
  parent_id?: string
  author: { name: string; picture: string }
  text: string
  timestamp: number
}