import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { supabase } from '../utils/supabase'
import { Task, Notice } from '../types/types'
import { Layout } from '../components/Layout'

const Csr: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [notices, setNotices] = useState<Notice[]>([])
  useEffect(() => {
    const getTasks = async () => {
      const { data: tasks } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: true })
      setTasks(tasks as Task[])
    }
    const getNotices = async () => {
      const { data: notices } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: true })
      setNotices(notices as Notice[])
    }
    getTasks()
    getNotices()
  }, [])

  return (
    <Layout title="CSR">
      <p className="mb-3 text-blue-500">SSG + CSF</p>
      <ul className="mb-3">
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <p className="text-lg font-extrabold">{task.title}</p>
            </li>
          )
        })}
      </ul>
      <ul className="mb-3">
        {notices.map((notice) => {
          return (
            <li key={notice.id}>
              <p className="text-lg font-extrabold">{notice.content}</p>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Csr
