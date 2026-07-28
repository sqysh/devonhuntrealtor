import Image from "next/image";
import { CSSProperties, FC } from "react";

interface PitureProps {
  src: string;
  alt: string;
  className: string;
  priority: boolean;
  imgRef?: any;
  style?: CSSProperties;
}

const Picture: FC<PitureProps> = ({
  src,
  alt,
  className,
  priority = false,
  imgRef,
  style,
}) => {
  return (
    <Image
      ref={imgRef}
      src={src}
      alt={alt}
      width="0"
      height="0"
      sizes="100vw"
      className={className}
      priority={priority}
      style={style}
    />
  );
};

export default Picture;
