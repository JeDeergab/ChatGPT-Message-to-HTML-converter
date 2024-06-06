function generateHTML() {
    const message = document.getElementById('messageInput').value;
    const outputContainer = document.getElementById('output');

    if (message.trim() === "") {
        outputContainer.innerHTML = "<p>Please enter a message.</p>";
        return;
    }

    const htmlContent = convertToHTML(message);
    outputContainer.innerHTML = `<div class="chat-message"><pre><code>${htmlEscape(htmlContent)}</code></pre></div>`;
}

function convertToHTML(message) {
    return message
        .replace(/^###\s*(.*)$/gm, '<h3>$1</h3>')  // Level 3 headers
        .replace(/^##\s*(.*)$/gm, '<h2>$1</h2>')   // Level 2 headers
        .replace(/^#\s*(.*)$/gm, '<h1>$1</h1>')    // Level 1 headers
        .replace(/^-\s\*\*(.*)\*\*:\s*(.*)$/gm, '<ul><li><b>$1</b>: $2</li></ul>')  // Unordered lists with bold items
        .replace(/^\d+\.\s\*\*(.*)\*\*:\s*(.*)$/gm, '<ol><li><b>$1</b>: $2</li></ol>') // Ordered lists with bold items
        .replace(/```(html|css|js|javascript|python|c\+\+|c#|java|bash|shell|sql)\s*([^`]+)```/gm, (match, p1, p2) => {
            return `<div class="code-block"><div class="code-label">${p1}</div><pre><code>${htmlEscape(p2)}</code></pre></div>`;
        }) // Code blocks with language labels
        .replace(/```\s*([^`]+)```/gm, (match, p1) => {
            return `<div class="code-block"><pre><code>${htmlEscape(p1)}</code></pre></div>`;
        }) // Code blocks without language labels
        .replace(/\*\*(.*?)\*\*/gm, '<b>$1</b>')   // Bold text
        .replace(/\n/g, '<br>');   // Line breaks
}

function htmlEscape(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
}
