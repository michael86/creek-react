import { createElement } from "react";

export const splitParas = (p) => {
  const split = p.split(".").map((sentence) => <span className="sentence">{sentence}</span>);
  console.log(split[0].props.children);
  return split.map((sentence) => <span className="sentence">{sentence}</span>);
};

export const formatContent = (content) => {
  //bold: "##";
  //italic: "--";
  //underline: "__";

  var parserRules = [
    { pattern: /##(.*?)##/g, replacement: "|<strong>$1|" },
    { pattern: /--(.*?)--/g, replacement: "|<em>$1|" },
    { pattern: /__(.*?)__/g, replacement: "|<span>$1|" },
  ];

  parserRules.forEach(function (rule) {
    content = content.replace(rule.pattern, rule.replacement);
  });

  const formatted = content.split("|");
  const html = createElement(
    "p",
    { className: "mt-2" },
    formatted.map((el) => {
      if (el.includes("<span>")) {
        return createElement("span", { className: "text-underline" }, el.replace("<span>", ""));
      }
      if (el.includes("<em>")) {
        return createElement("em", {}, el.replace("<em>", ""));
      }
      if (el.includes("<strong>")) {
        return createElement("strong", {}, el.replace("<strong>", ""));
      }
      return el;
    })
  );

  return html;
};
