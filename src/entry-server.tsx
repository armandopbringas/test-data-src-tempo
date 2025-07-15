import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { getHomepage } from './services/contentfulservice'

export async function render(_url: string) {
  const homepageData = await getHomepage()
  
  const html = renderToString(
    <StrictMode>
      <App homepageData={homepageData} />
    </StrictMode>,
  )
  return { html }
}
