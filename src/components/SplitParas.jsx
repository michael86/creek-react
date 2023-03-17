const SplitParas = (p) => {
  const split = p.split(".");
  return split.map((sentence) => <span className="sentence">{sentence}</span>);
};

export default SplitParas;
