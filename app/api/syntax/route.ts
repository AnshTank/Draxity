import { NextRequest, NextResponse } from "next/server";

const SYNTAX_PATTERNS: Record<string, any> = {
  python: {
    keywords: [
      "def",
      "class",
      "if",
      "else",
      "elif",
      "for",
      "while",
      "try",
      "except",
      "import",
      "from",
      "return",
      "yield",
      "lambda",
      "with",
      "as",
      "pass",
      "break",
      "continue",
      "and",
      "or",
      "not",
      "in",
      "is",
      "True",
      "False",
      "None",
    ],
    builtins: [
      "print",
      "len",
      "range",
      "str",
      "int",
      "float",
      "list",
      "dict",
      "set",
      "tuple",
      "type",
      "isinstance",
    ],
    colors: {
      keyword: "#569CD6",
      builtin: "#4EC9B0",
      string: "#CE9178",
      comment: "#6A9955",
      number: "#B5CEA8",
      operator: "#D4D4D4",
      function: "#DCDCAA",
      variable: "#9CDCFE",
    },
  },
  javascript: {
    keywords: [
      "function",
      "var",
      "let",
      "const",
      "if",
      "else",
      "for",
      "while",
      "do",
      "switch",
      "case",
      "return",
      "try",
      "catch",
      "class",
      "extends",
      "async",
      "await",
    ],
    builtins: [
      "console",
      "Array",
      "Object",
      "String",
      "Number",
      "Boolean",
      "Date",
      "Math",
      "JSON",
      "Promise",
    ],
    colors: {
      keyword: "#569CD6",
      builtin: "#4EC9B0",
      string: "#CE9178",
      comment: "#6A9955",
      number: "#B5CEA8",
      function: "#DCDCAA",
      variable: "#9CDCFE",
    },
  },
  java: {
    keywords: [
      "public",
      "private",
      "static",
      "class",
      "interface",
      "if",
      "else",
      "for",
      "while",
      "return",
      "new",
      "this",
      "super",
    ],
    types: ["int", "String", "boolean", "void", "double", "float", "long"],
    colors: {
      keyword: "#569CD6",
      type: "#4EC9B0",
      string: "#CE9178",
      comment: "#6A9955",
      number: "#B5CEA8",
      function: "#DCDCAA",
    },
  },
  cpp: {
    keywords: [
      "auto",
      "break",
      "case",
      "char",
      "const",
      "continue",
      "default",
      "do",
      "double",
      "else",
      "enum",
      "extern",
      "float",
      "for",
      "goto",
      "if",
      "inline",
      "int",
      "long",
      "register",
      "return",
      "short",
      "signed",
      "sizeof",
      "static",
      "struct",
      "switch",
      "typedef",
      "union",
      "unsigned",
      "void",
      "volatile",
      "while",
      "class",
      "namespace",
      "template",
      "typename",
      "using",
      "virtual",
      "public",
      "private",
      "protected",
      "new",
      "delete",
      "this",
      "try",
      "catch",
      "throw",
    ],
    types: [
      "bool",
      "char",
      "int",
      "float",
      "double",
      "void",
      "string",
      "vector",
      "map",
      "set",
      "pair",
      "queue",
      "stack",
      "list",
    ],
    builtins: [
      "std",
      "cout",
      "cin",
      "endl",
      "string",
      "vector",
      "map",
      "set",
      "pair",
      "make_pair",
      "sort",
      "find",
      "begin",
      "end",
      "size",
      "push_back",
      "pop_back",
    ],
    preprocessor: [
      "#include",
      "#define",
      "#ifdef",
      "#ifndef",
      "#endif",
      "#if",
      "#else",
      "#elif",
      "#pragma",
    ],
    colors: {
      keyword: "#569CD6",
      type: "#4EC9B0",
      builtin: "#4EC9B0",
      preprocessor: "#C586C0",
      string: "#CE9178",
      comment: "#6A9955",
      number: "#B5CEA8",
      function: "#DCDCAA",
      variable: "#9CDCFE",g
    },
  },
};

function tokenizeCode(code: string, language: string) {
  const patterns = SYNTAX_PATTERNS[language];
  if (!patterns) return [{ type: "text", value: code, color: "#D4D4D4" }];

  const tokens = [];
  const lines = code.split("\n");

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    let position = 0;

    while (position < line.length) {
      const remaining = line.slice(position);

      // Comments
      if (language === "python" && remaining.startsWith("#")) {
        const comment = remaining.match(/^#.*/)?.[0] || "#";
        tokens.push({
          type: "comment",
          value: comment,
          color: patterns.colors.comment,
        });
        position += comment.length;
        continue;
      }

      if (
        (language === "cpp" ||
          language === "java" ||
          language === "javascript") &&
        remaining.startsWith("//")
      ) {
        const comment = remaining.match(/^\/\/.*/)?.[0] || "//";
        tokens.push({
          type: "comment",
          value: comment,
          color: patterns.colors.comment,
        });
        position += comment.length;
        continue;
      }

      // C++ preprocessor directives
      if (language === "cpp" && remaining.startsWith("#")) {
        const preprocessor = remaining.match(/^#\w+/)?.[0] || "#";
        tokens.push({
          type: "preprocessor",
          value: preprocessor,
          color: patterns.colors.preprocessor,
        });
        position += preprocessor.length;
        continue;
      }

      // Strings - C++ style
      if (remaining.startsWith('"')) {
        let stringEnd = 1;
        while (stringEnd < remaining.length && remaining[stringEnd] !== '"') {
          if (remaining[stringEnd] === "\\") stringEnd += 2;
          else stringEnd++;
        }
        if (stringEnd < remaining.length) stringEnd++;
        const stringValue = remaining.substring(0, stringEnd);
        tokens.push({
          type: "string",
          value: stringValue,
          color: patterns.colors.string,
        });
        position += stringEnd;
        continue;
      }

      if (remaining.startsWith("'")) {
        let stringEnd = 1;
        while (stringEnd < remaining.length && remaining[stringEnd] !== "'") {
          if (remaining[stringEnd] === "\\") stringEnd += 2;
          else stringEnd++;
        }
        if (stringEnd < remaining.length) stringEnd++;
        const stringValue = remaining.substring(0, stringEnd);
        tokens.push({
          type: "string",
          value: stringValue,
          color: patterns.colors.string,
        });
        position += stringEnd;
        continue;
      }

      // Numbers
      const numberMatch = remaining.match(/^\d+(\.\d+)?/);
      if (numberMatch) {
        tokens.push({
          type: "number",
          value: numberMatch[0],
          color: patterns.colors.number,
        });
        position += numberMatch[0].length;
        continue;
      }

      // Keywords and identifiers
      const identifierMatch = remaining.match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
      if (identifierMatch) {
        const identifier = identifierMatch[0];
        let color = patterns.colors.variable || "#9CDCFE";

        if (patterns.keywords.includes(identifier)) {
          color = patterns.colors.keyword;
        } else if (
          patterns.builtins &&
          patterns.builtins.includes(identifier)
        ) {
          color = patterns.colors.builtin;
        } else if (patterns.types && patterns.types.includes(identifier)) {
          color = patterns.colors.type;
        }

        tokens.push({ type: "identifier", value: identifier, color });
        position += identifier.length;
        continue;
      }

      // Default character
      tokens.push({ type: "char", value: remaining[0], color: "#D4D4D4" });
      position += 1;
    }

    if (lineIndex < lines.length - 1) {
      tokens.push({ type: "newline", value: "\n", color: "#D4D4D4" });
    }
  }

  return tokens;
}

export async function POST(request: NextRequest) {
  try {
    const { code, language } = await request.json();

    if (!code || !language) {
      return NextResponse.json(
        { error: "Missing code or language" },
        { status: 400 }
      );
    }

    const tokens = tokenizeCode(code, language);

    return NextResponse.json({ tokens, language });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Syntax highlighting API",
    supportedLanguages: Object.keys(SYNTAX_PATTERNS),
  });
}
