const SplitPara = ({ content }) => {
  const sentences = content.split(".");

  return sentences.map((sentence) => {
    <span>{sentence}</span>;
  });
};

export default SplitPara;
