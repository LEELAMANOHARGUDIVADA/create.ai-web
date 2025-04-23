import { Highlight, themes } from "prism-react-renderer";

interface Props {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: Props) {
  return (
    <Highlight
    theme={themes.oneLight}
    code={code}
    language={language}
  >
    {({ style, tokens, getLineProps, getTokenProps }) => (
      <pre style={style} className="whitespace-pre-wrap p-5 rounded-xl shadow-sm">
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line })}>
            {/* <span>{i + 1}</span> */}
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
  );
}
