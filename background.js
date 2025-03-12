

// chrome.commands.onCommand.addListener(function(command) {
//     console.log('Command:', command);
//     async function grammar_checker_logic_wrapper(){
//         const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
//         await chrome.scripting.insertCSS({
//             files: ["styles/style.css"],
//             target: { tabId: tab.id },
//         });
    
//         logoElement = document.createElement('img');
//         logoElement.src = chrome.runtime.getURL('images/turing_logo.svg');
//         logoElement.setAttribute('alt', 'Turing Logo');
//         logoElement.setAttribute('width', '100px');
        
//         // if (window.monaco == null) {
//         //     alert("Please open a code editor window to use this feature");
//         //     return;
//         // }
//         logoURL = chrome.runtime.getURL('images/turing_logo.svg');
//         chrome.scripting.executeScript({
//             target: { tabId: tab.id },
//             args : [logoURL],
//             func: grammar_checker_logic,
//             world: 'MAIN',
//         });
    
        
//     }
    
//     function grammar_checker_logic(logoURL) {
//         if (document.getElementById('form_grammar') != null) {
//             return;
//         }
//         // console.log(logoURL);
//         if (window.monaco.editor.getEditors().length <= 1) {
//             alert("Please open a code editor window to use this feature");
//             return;
//         }
    
//         bodyElement = document.getElementsByTagName('body')[0];
//         bodyElement.setAttribute('position', 'relative');
//         formElement = document.createElement('form');
//         formElement.setAttribute('id', 'form_grammar');
    
//         logoElement = document.createElement('img');
//         logoElement.src = logoURL;
//         logoElement.setAttribute('alt', 'Turing Logo');
//         logoElement.setAttribute('width', '100px');
//         formElement.appendChild(logoElement);
    
//         editorWindow = document.createElement('textarea');
//         editorWindow.setAttribute('id', 'cell_content_grammar');
//         editorValue = window.monaco.editor.getEditors()[1].getValue()
//         editorWindow.value = editorValue;
//         formElement.appendChild(editorWindow);
    
//         // formElement.innerHTML += `<button id="cancel_btn_grammar" type="button">&#x2715; Cancel</button>`
//         cancelButton = document.createElement('button');
//         cancelButton.setAttribute('id', 'cancel_btn_grammar');
//         cancelButton.setAttribute('type', 'button');
//         cancelButton.innerHTML = '&#x2715; Cancel';
//         formElement.appendChild(cancelButton);
    
//         // formElement.innerHTML += `<button id="save_btn_grammar" type="button">&#128190; Save</button>`
//         saveButton = document.createElement('button');
//         saveButton.setAttribute('id', 'save_btn_grammar');
//         saveButton.setAttribute('type', 'button');
//         saveButton.innerHTML = '&#128190; Save';
//         formElement.appendChild(saveButton);
        
//         bodyElement.appendChild(formElement);
    
//         // editorWindow.value = "Enter your text here";
    
//         /////////////////////////////////////////////////////////////////////////////////////////////
//         var cancelBtnListener = document.getElementById('cancel_btn_grammar');
//         var saveBtnListener = document.getElementById('save_btn_grammar');
//         cancelBtnListener.addEventListener('click', async function () {
//             var formElement = document.getElementById('form_grammar');
//             formElement.remove();
//             // await chrome.scripting.removeCSS({
//             //     files: ["styles/style.css"],
//             //     target: { tabId: tab.id },
//             // });
//         });
//         saveBtnListener.addEventListener('click', async function () {
//             var formElement = document.getElementById('form_grammar');
//             var textArea = document.getElementById('cell_content_grammar');
//             var text = textArea.value;
//             formElement.remove();
//             console.log(text);
//             // await chrome.scripting.removeCSS({
//             //     files: ["styles/style.css"],
//             //     target: { tabId: tab.id },
//             // });
//             // return text;
//             text = editorWindow.value;
//             var editor = window.monaco.editor.getEditors()[1]
//             model = editor.getModel;
//             const selection = editor.getSelection();
//             const range = editor.getModel().getFullModelRange(); // magic
//             editor.executeEdits("", [{ range, text, forceMoveMarkers: true }]);
//         });
//     }

//     grammar_checker_logic_wrapper();
// });

// // chrome.commands.onCommand.addListener((check_grammar,tab) => {
// //     // alert("helllllllllloooooooooooooo")
// //     console.log("check_grammar")
// // }
// // );

// // chrome.commands.onCommand.addListener((hello,tab) => {
// //     // alert("helllllllllloooooooooooooo")
// //     console.log("hello")

// // }
// // );
