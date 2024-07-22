import useBackend from '@/hooks/useBackend'
import { Category } from '@/idls/backend.did'
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react'

interface ConfigProviderType {
  categories: Category[]
}

export const ConfigContext = createContext<ConfigProviderType>(null as any)

const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const { backendActor } = useBackend()

  useEffect(() => {
    backendActor
      .getAllCategories()
      .then((categoryResponse) => {
        if ('Ok' in categoryResponse) {
          setCategories(categoryResponse.Ok)
        }
      })
      .catch(console.log)
  }, [backendActor])

  return (
    <ConfigContext.Provider value={{ categories }}>
      {children}
    </ConfigContext.Provider>
  )
}

export default ConfigProvider
