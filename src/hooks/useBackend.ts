import { useContext } from 'react'
import { BackendContext } from '@/providers/BackendProvider'

export default function useBackend() {
  return useContext(BackendContext)
}
