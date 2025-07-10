import styles from "./InputMarkdown.module.css";
import React from "react";
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import Label, { LabelProps } from "./Label";

type InputMarkdownProps = Omit<LabelProps, 'children'> & React.ComponentProps<typeof MdEditor>;

type MarkdownProps = {
  children: string;
};

export const Markdown = ({ children }: MarkdownProps) => {
  const mdParser = new MarkdownIt();
  return (
    <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: mdParser.render(children) }} />
  );
}

const InputMarkdown = ({ dimensions = "s12", label, labelPosition = 'top', ...props }: InputMarkdownProps) => {

  const mdParser = new MarkdownIt();

  return (
    <Label dimensions={dimensions} label={label} labelPosition={labelPosition}>
      <MdEditor
        {...props}
        className={`s12 ${styles.inputMarkdown}`}
        renderHTML={text => mdParser.render(text)}
      />
    </Label>
  );
};

InputMarkdown.displayName = "InputMarkdown";

export default InputMarkdown;
