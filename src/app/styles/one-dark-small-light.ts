import {EditorView} from '@codemirror/view';
import { Extension } from '@codemirror/state';
import {HighlightStyle, syntaxHighlighting} from '@codemirror/language';
import {tags as t} from '@lezer/highlight';

// Using https://github.com/one-dark/vscode-one-dark-theme/ as reference for the colors

const mustard = "#ffe19b",
  coral = "#e06c98",
  cyan = "#70e0ee",
  invalid = "#ffffff",
  lightGreen = "#99ffcf",
  stone = "#7d8799", // Brightened compared to original to increase contrast
  malibu = "#61afef",
  tangerine = "#ffc19b",
  lilac = "#ba9ffb",
  darkBackground = "#100e17",
  highlightBackground = "#100e17",
  background = "#100e17",
  tooltipBackground = "#100e17",
  selection = "#3E4451",
  cursor = "#528bff"

/// The colors used in the theme, as CSS color strings.
export const color = {
  mustard,
  coral,
  cyan,
  invalid,
  lightGreen,
  stone,
  malibu,
  tangerine,
  lilac,
  darkBackground,
  highlightBackground,
  background,
  tooltipBackground,
  selection,
  cursor
}

/// The editor theme styles for One Dark.
export const oneDarkTheme = EditorView.theme({
  "&": {
    color: lightGreen,
    backgroundColor: background,
    fontSize: "10px",
  },

  ".cm-content": {
    caretColor: cursor
  },

  ".cm-cursor, .cm-dropCursor": {borderLeftColor: cursor},
  "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {backgroundColor: selection},

  ".cm-panels": {backgroundColor: darkBackground, color: lightGreen},
  ".cm-panels.cm-panels-top": {borderBottom: "2px solid black"},
  ".cm-panels.cm-panels-bottom": {borderTop: "2px solid black"},

  ".cm-searchMatch": {
    backgroundColor: "#72a1ff59",
    outline: "1px solid #457dff"
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: "#6199ff2f"
  },

  ".cm-activeLine": {backgroundColor: "#6699ff0b"},
  ".cm-selectionMatch": {backgroundColor: "#aafe661a"},

  "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
    backgroundColor: "#bad0f847"
  },

  ".cm-gutters": {
    backgroundColor: background,
    color: stone,
    border: "none"
  },

  ".cm-activeLineGutter": {
    backgroundColor: highlightBackground
  },

  ".cm-foldPlaceholder": {
    backgroundColor: "black",
    border: "none",
    color: "#ddd"
  },

  ".cm-tooltip": {
    border: "none",
    backgroundColor: tooltipBackground
  },
  ".cm-tooltip .cm-tooltip-arrow:before": {
    borderTopColor: "transparent",
    borderBottomColor: "transparent"
  },
  ".cm-tooltip .cm-tooltip-arrow:after": {
    borderTopColor: tooltipBackground,
    borderBottomColor: tooltipBackground
  },
  ".cm-tooltip-autocomplete": {
    "& > ul > li[aria-selected]": {
      backgroundColor: highlightBackground,
      color: lightGreen
    }
  }
}, {dark: true})

/// The highlighting style for code in the One Dark theme.
export const oneDarkHighlightStyle = HighlightStyle.define([
  {tag: t.keyword,
   color: lilac},
  {tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
   color: malibu},
  {tag: [t.function(t.variableName), t.labelName],
   color: coral},
  {tag: [t.color, t.constant(t.name), t.standard(t.name)],
   color: tangerine},
  {tag: [t.definition(t.name), t.separator],
   color: lightGreen},
  {tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
   color: mustard},
  {tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
   color: cyan},
  {tag: [t.meta, t.comment],
   color: stone},
  {tag: t.strong,
   fontWeight: "bold"},
  {tag: t.emphasis,
   fontStyle: "italic"},
  {tag: t.strikethrough,
   textDecoration: "line-through"},
  {tag: t.link,
   color: stone,
   textDecoration: "underline"},
  {tag: t.heading,
   fontWeight: "bold",
   color: malibu},
  {tag: [t.atom, t.bool, t.special(t.variableName)],
   color: tangerine },
  {tag: [t.processingInstruction, t.string, t.inserted],
   color: tangerine},
  {tag: t.invalid,
   color: invalid},
])

/// Extension to enable the One Dark theme (both the editor theme and
/// the highlight style).
export const oneDarkSmallLight: Extension = [oneDarkTheme, syntaxHighlighting(oneDarkHighlightStyle)];
