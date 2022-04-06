import { useQuery } from 'react-query'
import { supabase } from '../utils/supabase'
import { Task } from '../types/types'

export const useQueryTasks = () => {
  const getTasks = async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }
    return data
  }
  return useQuery<Task[], Error>({
    queryKey: 'todos',
    queryFn: getTasks,
    staleTime: Infinity,
  })
}
