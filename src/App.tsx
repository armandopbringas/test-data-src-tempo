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
    if (isLoading || data) return;

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

  if (!data && !isLoading) {
    fetchHomepageData();
  }

  // SDK
  const getBlockImageTextData = () => {
    try {
      if (!data?.fields) {
        console.log("No fields found");
        return {
          title: "Default Title",
          description: ["Default description"],
          imageUrl: "",
          imageDescription: "Image"
        };
      }

      // Find the first embedded-entry-block that is BlockImageText
      const contentBlocks = data.fields.content?.content || [];
      const blockImageText = contentBlocks.find((block: any) => {
        return block.nodeType === 'embedded-entry-block' &&
          block.data?.target?.sys?.contentType?.sys?.id === 'blockImageText';
      });

      if (blockImageText) {

        const blockFields = blockImageText.data?.target?.fields;
        if (blockFields) {
          // rich text
          const title = blockFields.text?.content?.[0]?.content?.[0]?.value || "Default Title";

          // paragraphs
          const paragraphs = blockFields.text?.content
            ?.filter((item: any) => item.nodeType === "paragraph")
            ?.map((paragraph: any) => paragraph.content?.[0]?.value)
            ?.filter((text: string) => text && text.trim() !== "") || ["Default description"];

          // Image
          const imageUrl = blockFields.image?.fields?.file?.url || "";
          const imageDescription = blockFields.image?.fields?.description || blockFields.image?.fields?.title || "Image";

          return {
            title,
            description: paragraphs,
            imageUrl: imageUrl ? `https:${imageUrl}` : "",
            imageDescription
          };
        }
      }

      // Fallback
      return {
        title: "Default Title",
        description: ["Default description"],
        imageUrl: "",
        imageDescription: "Image"
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
