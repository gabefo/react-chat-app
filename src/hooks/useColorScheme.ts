import { useContext } from 'react'
import ColorSchemeContext from '@/contexts/ColorSchemeContext'

export default function useColorScheme() {
  return useContext(ColorSchemeContext)
}
