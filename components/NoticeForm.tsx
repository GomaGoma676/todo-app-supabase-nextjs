import { FormEvent, VFC } from 'react'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { useMutateNotice } from '../hooks/useMutateNotice'

export const NoticeForm: VFC = () => {
  const { editedNotice } = useStore()
  const update = useStore((state) => state.updateEditedNotice)
  const { createNoticeMutation, updateNoticeMutation } = useMutateNotice()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedNotice.id === '')
      createNoticeMutation.mutate({
        content: editedNotice.content,
        user_id: supabase.auth.user()?.id,
      })
    else {
      updateNoticeMutation.mutate({
        id: editedNotice.id,
        content: editedNotice.content,
      })
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="my-2 rounded border border-gray-300 px-3  py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="New notice ?"
        value={editedNotice.content}
        onChange={(e) => update({ ...editedNotice, content: e.target.value })}
      />
      <button
        type="submit"
        className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium  text-white hover:bg-indigo-700 "
      >
        {editedNotice.id ? 'Update' : 'Create'}
      </button>
    </form>
  )
}
