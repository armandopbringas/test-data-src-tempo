import './App.css'
import { useState } from 'react'
import { getHomepage } from './services/contentfulservice.ts'
import IndexSectionInfo from './components/IndexSection/indexSectionInfo.tsx'

interface AppProps {
  homepageData?: any;
}

function App({ homepageData }: AppProps = {}) {
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

  // Función para extraer datos completos de BlockImageText
  const getBlockImageTextData = () => {
    try {
      const blocks = data?.homepageCollection?.items?.[0]?.content?.links?.entries?.block;
      if (!blocks || !Array.isArray(blocks)) {
        console.log("No blocks found");
        return {
          title: "Default Title",
          description: ["Default description"],
          imageUrl: "",
          imageDescription: "Image"
        };
      }

      // Buscar el primer bloque del tipo BlockImageText
      const blockImageText = blocks.find(block => block?.__typename === "BlockImageText");

      if (!blockImageText) {
        console.log("No BlockImageText found");
        return {
          title: "Default Title",
          description: ["Default description"],
          imageUrl: "",
          imageDescription: "Image"
        };
      }

      // Extraer título
      const title = blockImageText?.text?.json?.content?.[0]?.content?.[0]?.value || "Default Title";

      // Extraer párrafos
      const paragraphs = blockImageText?.text?.json?.content
        ?.filter((item: any) => item?.nodeType === "paragraph")
        ?.map((paragraph: any) => paragraph?.content?.[0]?.value)
        ?.filter((text: string) => text && text.trim() !== "") || ["Default description"];

      // Extraer datos de imagen
      const imageUrl = blockImageText?.image?.url || "";
      const imageDescription = blockImageText?.image?.description || blockImageText?.image?.title || "Image";

      return {
        title,
        description: paragraphs,
        imageUrl,
        imageDescription
      };
    } catch (error) {
      console.error("Error extracting BlockImageText data:", error);
      return {
        title: "Default Title",
        description: ["Default description"],
        imageUrl: "",
        imageDescription: "Image"
      };
    }
  };

  const blockData = getBlockImageTextData();

  return (
    <>
      <IndexSectionInfo
        title={blockData.title}
        description={blockData.description}
        imageSrc={blockData.imageUrl}
        imageAlt={blockData.imageDescription}
      />
    </>
  )
}

export default App
