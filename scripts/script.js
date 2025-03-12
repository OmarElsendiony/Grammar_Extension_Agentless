async function grammar_checker_logic_wrapper(){
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    await chrome.scripting.insertCSS({
        files: ["styles/style.css"],
        target: { tabId: tab.id },
    });

    logoElement = document.createElement('img');
    logoElement.src = chrome.runtime.getURL('images/turing_logo.svg');
    logoElement.setAttribute('alt', 'Turing Logo');
    logoElement.setAttribute('width', '100px');
    
    // if (window.monaco == null) {
    //     alert("Please open a code editor window to use this feature");
    //     return;
    // }
    
    logoURL = chrome.runtime.getURL('images/turing_logo.svg');
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args : [logoURL],
        func: grammar_checker_logic,
        world: 'MAIN',
    });

    
}

function grammar_checker_logic(logoURL) {
    if (document.getElementById('form_grammar') != null) {
        return;
    }
    //////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////

    if (window.monaco.editor.getEditors().length < 1) {
        alert("Please click on a cell to use this feature");
        return;
    }

    bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.setAttribute('position', 'relative');
    formElement = document.createElement('form');
    formElement.setAttribute('id', 'form_grammar');

    logoElement = document.createElement('img');
    logoElement.src = logoURL;
    logoElement.setAttribute('alt', 'Turing Logo');
    logoElement.setAttribute('width', '100px');
    formElement.appendChild(logoElement);

    editorWindow = document.createElement('textarea');
    editorWindow.setAttribute('id', 'cell_content_grammar');
    editor = monaco.editor.getEditors().find(editor => 
        editor.getDomNode().contains(document.activeElement)
    ) || monaco.editor.getEditors()[monaco.editor.getEditors().length - 1];
    editorValue = editor.getValue();
    editorWindow.value = editorValue;
    formElement.appendChild(editorWindow);
    editorWindow.focus();

    cancelButton = document.createElement('button');
    cancelButton.setAttribute('id', 'cancel_btn_grammar');
    cancelButton.setAttribute('type', 'button');
    cancelButton.innerHTML = '&#x2715; Cancel';
    formElement.appendChild(cancelButton);

    saveButton = document.createElement('button');
    saveButton.setAttribute('id', 'save_btn_grammar');
    saveButton.setAttribute('type', 'button');
    saveButton.innerHTML = '&#128190; Save';
    formElement.appendChild(saveButton);
    
    markdownButton = document.createElement('button');
    markdownButton.setAttribute('id', 'mark_down_viewer_btn');
    markdownButton.setAttribute('type', 'button');
    markdownButton.innerHTML = 'Markdown';
    formElement.appendChild(markdownButton);

    bodyElement.appendChild(formElement);

    var markdownFormElement = null;

    /////////////////////////////////////////////////////////////////////////////////////////////
    var cancelBtnListener = document.getElementById('cancel_btn_grammar');
    var saveBtnListener = document.getElementById('save_btn_grammar');
    cancelBtnListener.addEventListener('click', async function () {
        var formElement = document.getElementById('form_grammar');
        formElement.remove();
        if (markdownFormElement != null) {
            markdownFormElement.remove();
        }
    });

    markdownButton.addEventListener('click', async function () {
        if (editorWindow.getAttribute('style') == 'display: none') {
            markdownFormElement.remove();
            markdownFormElement.setAttribute('style', 'display: None');
            editorWindow.setAttribute('style', 'display: block');
            return;
        }
        editorWindow.setAttribute('style', 'display: none');
        markdownFormElement = document.createElement('div');
        markdownFormElement.setAttribute('id', 'markdown_form');

        var htmlText = editorWindow.value;
        // htmlText = htmlText.replace(/\n/g, '</div><div>');
        // dotpyInstances = htmlText.match(/\b(?!\`)(\w|\/)+\.py(?!\`)\b/g);
        // console.log(dotpyInstances);

        htmlText = htmlText.replace(/\b(?!\`)(([\w\/]+\.py))(?!\`)\b/g, '<span style="text-decoration:underline; color:red">$1</span>');

        // htmlText = htmlText.replace(/\b(?!(?:The|This|There|A|An|And|But|Or|For|Nor|Yet|So|At|By|In|Of|On|To|With|Therefore|Hence|Since|^|^ |\.|\. |\>|\\n)\b(?!\`))([A-Z][a-zA-Z]*)(?!\`)\b/g, '<u>$1</u>');
        console.log(htmlText);
        htmlText = htmlText.replace(
            /(\s|^)(?!\b(?:The|This|There|A|An|And|But|Or|For|Nor|Yet|So|At|By|In|Of|On|To|With|Therefore|Hence|Since|I|You|He|She|It|We|They|However|Thus|After|Despite)\b)(\b[A-Z][a-zA-Z]*\b)(?!`)/g,
            function(match, prefix, word) {
                if (/[\.\n]\s*$/.test(prefix) || /\b[A-Z][a-zA-Z]*ing\b/.test(word)) {  
                    return match;
                }
                return prefix + '<u style="text-decoration-color: yellow; text-decoration-thickness: 3px !important;">' + word + '</u>';
            }
        );
        // console.log(htmlText);

        htmlText = htmlText.replace(/^# (.*)/g, '<h1>$1</h1>');
        htmlText = htmlText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // bold
        htmlText = htmlText.replace(/\`\`\`([\s\S\\n]*?)\`\`\`/g, '<section style="background-color: lightgrey; color: black;">$1</section>'); // backticks
        htmlText = htmlText.replace(/\`(.*?)\`/g, '<strong style="color:lightsalmon">$1</strong>'); // backticks

        htmlText = '<pre style="font-family: sans-serif">' + htmlText + '</pre>';
        markdownFormElement.innerHTML = htmlText;
        formElement.insertBefore(markdownFormElement, cancelButton);

    });

    saveBtnListener.addEventListener('click', async function () {
        var formElement = document.getElementById('form_grammar');
        var textArea = document.getElementById('cell_content_grammar');
        var text = textArea.value;
        formElement.remove();
        if (markdownFormElement != null) {
            markdownFormElement.remove();
        }
        text = editorWindow.value;
        // var editor = monaco.editor.getEditors().find(editor => 
        //     editor.getDomNode().contains(document.activeElement)
        // ) || monaco.editor.getEditors()[monaco.editor.getEditors().length - 1];
        model = editor.getModel;
        const selection = editor.getSelection();
        const range = editor.getModel().getFullModelRange(); // magic
        editor.executeEdits("", [{ range, text, forceMoveMarkers: true }]);
    });
    editorWindow.focus();
    // const position = { lineNumber: 1, column: 1 };
    // editorWindow.setPosition(position);
    // editorWindow.revealPositionNearIfOutsideViewport(position);
}

document.addEventListener('DOMContentLoaded', async function () {
    var checkButton = document.getElementById('check_grammar_btn');
    checkButton.addEventListener('click', grammar_checker_logic_wrapper);
});

chrome.commands.onCommand.addListener(function(command) {
    console.log('Command:', command);
    if (command == 'check_grammar') {
        grammar_checker_logic_wrapper();
    }
});
