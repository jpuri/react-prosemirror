const {Schema} = require("prosemirror-model")

const nodes = {
  doc: {
    content: "block+"
  },
  paragraph: {
    content: "inline<_>*",
    group: "block",
    parseDOM: [{tag: "p"}],
    toDOM() { return ["p", 0] }
  },
  blockquote: {
    content: "block+",
    group: "block",
    defining: true,
    parseDOM: [{tag: "blockquote"}],
    toDOM() { return ["blockquote", 0] }
  },
  horizontal_rule: {
    group: "block",
    parseDOM: [{tag: "hr"}],
    toDOM() { return ["hr"] }
  },
  heading: {
    attrs: {level: {default: 1}},
    content: "inline<_>*",
    group: "block",
    defining: true,
    parseDOM: [{tag: "h1", attrs: {level: 1}},
               {tag: "h2", attrs: {level: 2}},
               {tag: "h3", attrs: {level: 3}},
               {tag: "h4", attrs: {level: 4}},
               {tag: "h5", attrs: {level: 5}},
               {tag: "h6", attrs: {level: 6}}],
    toDOM(node) { return ["h" + node.attrs.level, 0] }
  },
  code_block: {
    content: "text*",
    group: "block",
    code: true,
    defining: true,
    parseDOM: [{tag: "pre", preserveWhitespace: true}],
    toDOM() { return ["pre", ["code", 0]] }
  },
  text: {
    group: "inline",
    toDOM(node) { return node.text }
  },
  image: {
    inline: true,
    attrs: {
      src: {},
      alt: {default: null},
      title: {default: null}
    },
    group: "inline",
    draggable: true,
    parseDOM: [{tag: "img[src]", getAttrs(dom) {
      return {
        src: dom.getAttribute("src"),
        title: dom.getAttribute("title"),
        alt: dom.getAttribute("alt")
      }
    }}],
    toDOM(node) { return ["img", node.attrs] }
  },
  hard_break: {
    inline: true,
    group: "inline",
    selectable: false,
    parseDOM: [{tag: "br"}],
    toDOM() { return ["br"] }
  }
}

const marks = {
  em: {
    parseDOM: [{tag: "i"}, {tag: "em"},
               {style: "font-style", getAttrs: value => value == "italic" && null}],
    toDOM() { return ["em"] }
  },

  strong: {
    parseDOM: [{tag: "strong"},
               {tag: "b", getAttrs: node => node.style.fontWeight != "normal" && null},
               {style: "font-weight", getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null}],
    toDOM() { return ["strong"] }
  },

  code: {
    parseDOM: [{tag: "code"}],
    toDOM() { return ["code"] }
  },

  u: {
    parseDOM: [{tag: "u"},
               {style: "text-decoration", getAttrs: value => value === 'underline'}],
    toDOM() { return ["u"] }
  }
}

const schema = new Schema({nodes, marks})
exports.schema = schema
