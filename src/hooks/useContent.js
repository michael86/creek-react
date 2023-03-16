import { useState, useEffect } from "react";

const useContent = (key) => {
  const [content, setContent] = useState(key);

  useEffect(() => {
    fetch("/content.json")
      .then((res) => res.json())
      .then((content) => setContent(content[key]));
  }, []);

  return [content, setContent];
};

export default useContent;
