
import React from "react";
import style from "./IndexSectionInfo.module.css";

type IndexSectionInfoProps = {
  title: string;
  description: string[];
  imageSrc: string;
  imageAlt: string;
  reverseLayout?: boolean;
};

const IndexSectionInfo: React.FC<IndexSectionInfoProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  reverseLayout = false,
}) => {
  return (
    <div className={`${style.contentContainer} ${reverseLayout ? 'reverse' : ''}`}>
      <div className={style.textBox}>
        <h2>{title}</h2>
        <h2 className="text-green-800 text-2xl">{title}</h2>
        {description.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
      <div className={style.imageBox}>
        <img src={imageSrc} alt={imageAlt} style={{ width: '100%' }} />
      </div>
    </div>
  );
};

export default IndexSectionInfo;
