export const splitParas = (p) => {
  const split = p.split(".").map((sentence) => <span className="sentence">{sentence}</span>);
  console.log(split[0].props.children);
  return split.map((sentence) => <span className="sentence">{sentence}</span>);
};
