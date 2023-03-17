import { useState, useEffect } from "react";
import uuid from "react-native-uuid";

const genKeys = (data) => {
  const _data = [];
  for (const item of data) {
    const entry = {
      key: uuid.v4(),
      content: item,
    };
    _data.push(entry);
  }
  return _data;
};

const useContent = (key, generateKey = false) => {
  const [content, setContent] = useState();

  useEffect(() => {
    fetch("/content.json")
      .then((res) => res.json())
      .then((content) => {
        generateKey ? setContent(genKeys(content[key])) : setContent(content[key]);
      });
  }, [generateKey, key]);

  return [content, setContent];
};

export default useContent;
