import Input, { InputProps } from "./Input";
import styles from "./InputFile.module.css";
import { ChangeEvent, forwardRef } from "react";

export type ImageProps = {
  id?: string;
  deleted?: boolean;
  file?: File;
  preview: string;
};

type InputFileProps = Omit<InputProps, 'type' | 'value' | 'onChange'> & {
  images: ImageProps[];
  setImages: (images: ImageProps[]) => void
};

const InputFile = forwardRef<HTMLInputElement, InputFileProps>(
  ({ dimensions = "s12 m6 l3", images, setImages, ...props }: InputFileProps) => {

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);

      const validImages = selectedFiles.filter(file =>
        file.type.startsWith("image/")
      );

      const newImages = validImages.map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      if (props.multiple) {
        setImages([...images, ...newImages]);
      } else {
        if (images.length) {
          URL.revokeObjectURL(images[0].preview);
        }
        setImages(newImages);
      }

    };

    const handleRemove = (indexToRemove: number) => {
      const imageToRemove = images[indexToRemove];
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }

      const newImages = images.map((image, index) => {
        if (index === indexToRemove) {
          return { ...image, deleted: true };
        } else {
          return image;
        }
      });
      setImages(newImages);
    };

    return (
      <div className={`${styles.inputFileContainer} ${dimensions}`}>
        <Input {...props} type="file" onChange={handleFileChange} />
        {images.length > 0 && (
          <>
            <div className={styles.previewContainer}>
              {images.filter(img => img.deleted !== true).map((img, index) => (
                <div key={index} className={styles.image}>
                  <img
                    src={img.preview}
                    alt={`Preview ${index}`}
                  />
                  <button type="button" onClick={() => handleRemove(index)}>X</button>
                </div>
              ))}
            </div>

          </>
        )}
      </div>
    );
  }
);

Input.displayName = "InputFile";

export default InputFile;
