import styles from "./InputTag.module.css";
import React, { useState } from "react";
import Label, { LabelProps } from "./Label";

type InputTagProps = Omit<LabelProps, 'children'> & {
  tags: string[];
  setTags: (tag: string[]) => void;
};

type TagsProps = {
  children: string[];
};

export const Tags = ({ children }: TagsProps) => {
  return (
    <div className={styles.tags}>
      {children.map((tag, i) => <div className={styles.tag} key={i}>{tag}</div>)}
    </div>
  );
};

const InputTag = ({ dimensions = "s12 m6 l4", label, labelPosition = 'top', tags, setTags }: InputTagProps) => {

  const [text, setText] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = text.trim();
      if (trimmed && !tags.includes(trimmed)) {
        setTags([...tags, trimmed]);
      }
      setText("");
    }
  };

  const handleDelete = (index: number) => {
    const newArr = tags.filter((_, idx) => idx !== index);
    setTags(newArr);
  };

  return (
    <Label dimensions={dimensions} label={label} labelPosition={labelPosition}>
      <div className={`${styles.container} ${dimensions}`}>
        <input
          placeholder={'Digite e pressione "Enter"'}
          onKeyDown={handleKeyDown}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {tags.length > 0 &&
          <div className={styles.tags}>
            {tags.map((tag, i) => <div className={styles.tag} key={i}>{tag}<button type="button" onClick={() => handleDelete(i)}>x</button></div>)}
          </div>
        }
      </div>
    </Label>
  );
};

InputTag.displayName = "InputTag";

export default InputTag;
