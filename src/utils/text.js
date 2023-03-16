import { createElement } from "react";
import uuid from "react-native-uuid";

export const splitParas = (p) => {
  const split = p.split(".").map((sentence) => <span className="sentence">{sentence}</span>);
  return split.map((sentence) => <span className="sentence">{sentence}</span>);
};

export const formatContent = (data) => {
  //bold: "##";
  //italic: "--";
  //underline: "__";

  var parserRules = [
    { pattern: /##(.*?)##/g, replacement: "|<strong>$1|" },
    { pattern: /--(.*?)--/g, replacement: "|<em>$1|" },
    { pattern: /__(.*?)__/g, replacement: "|<span>$1|" },
  ];

  parserRules.forEach(function (rule) {
    data.content = data.content.replace(rule.pattern, rule.replacement);
  });

  const formatted = data.content.split("|");
  const html = createElement(
    "p",
    { className: "mt-2", key: uuid.v4() },
    formatted.map((el) => {
      return el.includes("<span>")
        ? createElement(
            "span",
            { className: "text-underline", key: uuid.v4() },
            el.replace("<span>", "")
          )
        : el.includes("<em>")
        ? createElement("em", { key: uuid.v4() }, el.replace("<em>", ""))
        : el.includes("<strong>")
        ? createElement("strong", { key: uuid.v4() }, el.replace("<strong>", ""))
        : el;
    })
  );

  return html;
};
