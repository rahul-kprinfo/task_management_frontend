import React, { useState } from "react";
import RichTextEditor, { EditorValue } from "react-rte";

export default function BodyTextEditor({ value, setValue }: any) {
  const [editorValue, setEditorValue] = React.useState(
    RichTextEditor.createValueFromString(value, "markdown")
  );

  const handleChange = (value: any) => {
    setEditorValue(value);
    setValue(value.toString("markdown"));
  };

  console.log("editorValue");

  return (
    <RichTextEditor
      value={editorValue}
      onChange={handleChange}
      // required
      // id="body-text"
      // name="bodyText"
      // type="string"
      // multiline
      // variant="filled"
      // style={{ minHeight: 410 }}
    />
  );
}
