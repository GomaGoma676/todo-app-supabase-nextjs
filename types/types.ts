export type Task = {
  id: string
  created_at: string
  title: string
  user_id: string | undefined
}
export type Notice = {
  id: string
  created_at: string
  content: string
  user_id: string | undefined
}
