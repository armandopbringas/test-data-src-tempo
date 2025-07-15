import './App.css'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { getHomepage } from './services/contentfulservice.ts'
import IndexSectionInfo from './components/IndexSection/indexSectionInfo.tsx'

interface AppProps {
  homepageData?: any;
}

function App({ homepageData }: AppProps = {}) {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<any>(homepageData)
  const [isLoading, setIsLoading] = useState(false)

  const fetchHomepageData = async () => {
    if (isLoading || data) return; // Evita múltiples llamadas
    
    setIsLoading(true);
    try {
      console.log('🚀 Fetching homepage data from Contentful...');
      const result = await getHomepage();
      console.log('✅ Homepage data received:', result);
      setData(result);
    } catch (error) {
      console.error('❌ Error fetching homepage data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Solo llamar si no hay datos del servidor
  if (!data && !isLoading) {
    fetchHomepageData();
  }

  const getBlockImageText = () => {
    try {
      const block = data?.homepageCollection?.items?.[0]?.content?.links?.entries?.block?.[2];
      return {
        title: block?.text?.json?.content?.[0]?.content?.[0]?.value || "Default Title",
        imageUrl: block?.image?.url || "",
        imageDescription: block?.image?.description || "Image"
      };
    } catch (error) {
      return {
        title: "Default Title",
        imageUrl: "",
        imageDescription: "Image"
      };
    }
  };

  console.log("data completo:", data);
  console.log("homepageCollection:", data?.homepageCollection);
  console.log("items:", data?.homepageCollection?.items);
  console.log("block array:", data?.homepageCollection?.items?.[0]?.content?.links?.entries?.block);
  
  const blockData = getBlockImageText();
  console.log("blog titulo", blockData)

  return (
    <>
      <IndexSectionInfo
        title={blockData.title}
        description={[
          "When a community has a vision — but lacks resources or meets systemic roadblocks — the Neighborhood Design Center can help.",
          "We bring people together, build capacity, conduct research, and provide top-notch design and planning services (often for pro bono).",
          "With the right tools, communities can secure funding for implementation and maintenance, and bring their dreams to life."
        ]}
        imageSrc={blockData.imageUrl}
        imageAlt={blockData.imageDescription}
      />
    </>
  )
}

export default App
