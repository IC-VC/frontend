import { useContext } from 'react'
import { ConfigContext } from '../providers/ConfigProvider'

export default function useConfig() {
  return useContext(ConfigContext)
}
