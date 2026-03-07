const vscode = acquireVsCodeApi();
const input = document.getElementById("input");
const output = document.getElementById("output");
const autocompleteList = document.getElementById("autocomplete-list");
let history = [];
let historyIndex = -1;
let selectedIndex = -1;
let fontSize = 11;
let fgColor = "#d4d4d4"; // Default foreground color

// Themes
const themes = {
  vscode: {
    body: { background: "#1e1e1e", color: "#d4d4d4" },
    output: {
      background: "#1e1e1e",
      color: "#d4d4d4",
      borderBottom: "#222326",
    },
    inputRow: { background: "#222326", borderTop: "#333337" },
    input: { background: "#1e1e1e", color: "#d4d4d4" },
    autocomplete: {
      background: "#252526",
      color: "#d4d4d4",
      border: "#333337",
      selected: "#094771",
      selectedColor: "#fff",
    },
  },
  light: {
    body: { background: "#fff", color: "#222" },
    output: { background: "#fff", color: "#222", borderBottom: "#ccc" },
    inputRow: { background: "#f3f3f3", borderTop: "#ccc" },
    input: { background: "#fff", color: "#222" },
    autocomplete: {
      background: "#f3f3f3",
      color: "#222",
      border: "#ccc",
      selected: "#cce6ff",
      selectedColor: "#222",
    },
  },
  solarized: {
    body: { background: "#002b36", color: "#839496" },
    output: {
      background: "#002b36",
      color: "#839496",
      borderBottom: "#073642",
    },
    inputRow: { background: "#073642", borderTop: "#586e75" },
    input: { background: "#002b36", color: "#839496" },
    autocomplete: {
      background: "#073642",
      color: "#839496",
      border: "#586e75",
      selected: "#268bd2",
      selectedColor: "#fff",
    },
  },
  dracula: {
    body: { background: "#282a36", color: "#f8f8f2" },
    output: {
      background: "#282a36",
      color: "#f8f8f2",
      borderBottom: "#44475a",
    },
    inputRow: { background: "#44475a", borderTop: "#282a36" },
    input: { background: "#282a36", color: "#f8f8f2" },
    autocomplete: {
      background: "#44475a",
      color: "#f8f8f2",
      border: "#282a36",
      selected: "#bd93f9",
      selectedColor: "#fff",
    },
  },
  ayu: {
    body: { background: "#0A0E14", color: "#d4d4d4" },
    output: {
      background: "#0A0E14",
      color: "#d4d4d4",
      borderBottom: "#1A1E23",
    },
    inputRow: { background: "#161A1F", borderTop: "#1A1E23" },
    input: { background: "#0A0E14", color: "#d4d4d4" },
    autocomplete: {
      background: "#161A1F",
      color: "#d4d4d4",
      border: "#1A1E23",
      selected: "#d4d4d4",
      selectedColor: "#0A0E14",
    },
  },
};

function applyTheme(theme) {
  const t = themes[theme];
  if (!t) {
    return;
  }
  document.body.style.background = t.body.background;
  document.body.style.color = t.body.color;
  output.style.background = t.output.background;
  output.style.color = t.output.color;
  output.style.borderBottom = "1px solid " + t.output.borderBottom;
  const inputRow = document.getElementById("input-row");
  inputRow.style.background = t.inputRow.background;
  inputRow.style.borderTop = "1px solid " + t.inputRow.borderTop;
  input.style.background = t.input.background;
  input.style.color = t.input.color;
  autocompleteList.style.background = t.autocomplete.background;
  autocompleteList.style.color = t.autocomplete.color;
  autocompleteList.style.border = "1px solid " + t.autocomplete.border;

  // Set selected color via CSS variables to allow styling the selected item in autocomplete list
  autocompleteList.style.setProperty("--selected-bg", t.autocomplete.selected);
  autocompleteList.style.setProperty("--selected-color", t.autocomplete.selectedColor);
}
// Init theme
applyTheme("ayu");

document.querySelectorAll(".theme-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    applyTheme(btn.dataset.theme);
  });
});

/**
 * Extract unique words from the output content for autocomplete suggestions.
 * @returns {string[]} An array of unique words from the output content.
 */
function getOutputWords() {
  return Array.from(new Set(output.textContent.split(/\W+/).filter((w) => w.length > 2)));
}

/**
 * Check if the query is a fuzzy match for the word.
 * The query is a fuzzy match if all characters in the query appear in order in the word.
 * @param {string} word - The word to check against.
 * @param {string} query - The query to check.
 * @returns {boolean} True if the query is a fuzzy match for the word, false otherwise.
 */
function fuzzyMatch(word, query) {
  let i = 0;
  for (let c of word.toLowerCase()) {
    if (c === query[i]) {
      i++;
    }
    if (i === query.length) {
      return true;
    }
  }
  return query.length === 0;
}

/**
 * Show autocomplete suggestions based on the last word typed and the
 * output content.
 * @returns  {void}
 */
function showAutocomplete() {
  const val = input.value;
  const lastWord = val.split(/\s+/).pop().toLowerCase();
  if (!lastWord) {
    autocompleteList.style.display = "none";
    selectedIndex = -1;
    return;
  }
  const words = getOutputWords().filter((w) => fuzzyMatch(w, lastWord));
  if (words.length === 0) {
    autocompleteList.style.display = "none";
    selectedIndex = -1;
    return;
  }
  autocompleteList.innerHTML = words
    .map((w, i) => `<div class='${i === selectedIndex ? "selected" : ""}'>${w}</div>`)
    .join("");
  autocompleteList.style.display = "block";
  // Position autocomplete-list just above input-row
  const inputRow = document.getElementById("input-row");
  const rect = inputRow.getBoundingClientRect();
  const containerRect = document.getElementById("container").getBoundingClientRect();
  autocompleteList.style.position = "absolute";
  autocompleteList.style.left = rect.left - containerRect.left + "px";
  autocompleteList.style.width = rect.width + "px";
  autocompleteList.style.bottom = containerRect.height - (rect.top - containerRect.top) + "px";
}

/**
 * Handle input events to show autocomplete suggestions.
 */
input.addEventListener("input", function () {
  selectedIndex = -1;
  showAutocomplete();
});

/**
 * Handle clicks on autocomplete items.
 * We use mousedown instead of click to ensure it fires before the input loses focus.
 */
autocompleteList.addEventListener("mousedown", function (e) {
  if (e.target && e.target.textContent) {
    const val = input.value;
    const parts = val.split(/\s+/);
    parts[parts.length - 1] = e.target.textContent;
    input.value = parts.join(" ").replace(/ +/g, " ").trim() + " ";
    autocompleteList.style.display = "none";
    input.focus();
  }
});

/**
 * Hide autocomplete when clicking outside the input or autocomplete list.
 */
document.addEventListener("click", function (e) {
  if (e.target !== input) {
    autocompleteList.style.display = "none";
  }
});

/**
 * Handle keyboard navigation for autocomplete and input history.
 */
input.addEventListener("keydown", function (e) {
  // Get the current autocomplete items.
  const items = autocompleteList.querySelectorAll("div");

  // If autocomplete is open and user presses ArrowDown or ArrowUp, navigate the suggestions.
  if (autocompleteList.style.display === "block" && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
    //  Navigate autocomplete suggestions with arrow keys.
    if (e.key === "ArrowDown") {
      selectedIndex = (selectedIndex + 1) % items.length;
      showAutocomplete();
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      selectedIndex = (selectedIndex - 1 + items.length) % items.length;
      showAutocomplete();
      e.preventDefault();
    }
    // We handle Enter and Tab separately to allow selecting the autocomplete item.
  } else if (e.key === "Tab" && autocompleteList.style.display === "block") {
    let chosen;
    if (selectedIndex >= 0 && items[selectedIndex]) {
      chosen = items[selectedIndex].textContent;
    } else if (items[0]) {
      chosen = items[0].textContent;
    }
    if (chosen) {
      const val = input.value;
      const parts = val.split(/\s+/);
      parts[parts.length - 1] = chosen;
      input.value = parts.join(" ").replace(/ +/g, " ").trim() + " ";
      autocompleteList.style.display = "none";
      selectedIndex = -1;
      e.preventDefault();
    }
  }
  // If user presses Enter, send the input and hide autocomplete.
  if (e.key === "Enter") {
    sendInput();
    autocompleteList.style.display = "none";
    selectedIndex = -1;
  }
  // If autocomplete is not open, allow navigating input history with ArrowUp and ArrowDown.
  if (e.key === "ArrowUp" && autocompleteList.style.display !== "block") {
    if (history.length > 0) {
      if (historyIndex === -1) {
        historyIndex = history.length - 1;
      } else if (historyIndex > 0) {
        historyIndex--;
      }
      // Set the input value to the selected history item and move the cursor to the end.

      input.value = history[historyIndex];

      // Use setTimeout to ensure the cursor moves after the input value is updated.
      setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
      e.preventDefault();
    }
    // If user presses ArrowDown and we're navigating history, move down the history or clear the input if we're at the end.
  } else if (e.key === "ArrowDown" && autocompleteList.style.display !== "block") {
    if (history.length > 0 && historyIndex !== -1) {
      // If we're navigating history and not at the end, move down. If we're at the end, reset historyIndex and clear input.
      if (historyIndex < history.length - 1) {
        historyIndex++;
        input.value = history[historyIndex];
      } else {
        historyIndex = -1;
        input.value = "";
      }
      // Move the cursor to the end of the input after updating the value.
      setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
      e.preventDefault();
    }
  }
});

const promptRegexp = /\s*[>]\s*$/;

// Listen for messages from the extension to update the output content or clear it.
window.addEventListener("message", (event) => {
  const message = event.data;
  if (message.command === "update") {
    // TODO: remove the last row if it matches '>'
    let msg = message.data;
    const result = promptRegexp.exec(msg);
    if (result) {
      // Remove the prompt from the end of the message
      msg = msg.substring(0, result.index);
    }

    output.textContent += msg + "\n";
    output.scrollTop = output.scrollHeight;
  } else if (message.command === "clear") {
    output.textContent = "";
  }
});

// Send the input value to the extension and add it to the history when the user presses Enter.
function sendInput() {
  const value = input.value;
  if (value.trim() !== "") {
    history.push(value);
    if (history.length > 100) {
      history.shift();
    }
  }
  historyIndex = -1;
  vscode.postMessage({ command: "input", text: value });
  input.value = "";
}

// Make textarea auto-resize up to 2 rows
input.addEventListener("input", function () {
  input.style.height = "auto";
  const max = parseInt(getComputedStyle(input).maxHeight) || 48;
  input.style.height = Math.min(input.scrollHeight, max) + "px";
});

// Öka/minska fontstorlek med knapparna A- och A+
function setFontSize(size) {
  fontSize = Math.max(10, Math.min(32, size));
  output.style.fontSize = fontSize + "px";
  input.style.fontSize = fontSize + "px";
  autocompleteList.style.fontSize = fontSize + "px";
}
document.getElementById("font-inc").addEventListener("click", () => setFontSize(fontSize + 1));
document.getElementById("font-dec").addEventListener("click", () => setFontSize(fontSize - 1));
// Initiera fontstorlek
setFontSize(fontSize);

// Byta förgrundsfärg med färgknapparna
function setFgColor(color) {
  fgColor = color;
  output.style.color = color;
  input.style.color = color;
  autocompleteList.style.color = color;
  document.querySelectorAll(".fg-btn").forEach((btn) => {
    btn.classList.toggle("selected", btn.dataset.fg === color);
  });
}
document.querySelectorAll(".fg-btn").forEach((btn) => {
  btn.addEventListener("click", () => setFgColor(btn.dataset.fg));
});
// Initiera fg-färg
setFgColor(fgColor);
