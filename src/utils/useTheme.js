import { useEffect, useState } from 'react'

const DARK_MODE_QUERY = '(prefers-color-scheme: dark)'

function getSystemTheme() {
  return window.matchMedia(DARK_MODE_QUERY).matches ? 'dark' : 'light'
}

function useTheme() {
  const [theme, setTheme] = useState(getSystemTheme)

  useEffect(() => {
    const colorScheme = window.matchMedia(DARK_MODE_QUERY)
    const syncTheme = (event) => setTheme(event.matches ? 'dark' : 'light')
    colorScheme.addEventListener('change', syncTheme)
    return () => colorScheme.removeEventListener('change', syncTheme)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme

  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}

export default useTheme
