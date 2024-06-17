// 'use client'

// import { useState } from 'react';
// import { Editor, EditorState, RichUtils } from 'draft-js';
// import 'draft-js/dist/Draft.css';

// const RichTextEditor = () => {
//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty()
//   );

//   const handleKeyCommand = (command: string, editorState: EditorState) => {
//     const newState = RichUtils.handleKeyCommand(editorState, command);
//     if (newState) {
//       setEditorState(newState);
//       return 'handled';
//     }
//     return 'not-handled';
//   };

//   const onBoldClick = () => {
//     setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
//   };

//   const onItalicClick = () => {
//     setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
//   };

//   const onUnderlineClick = () => {
//     setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
//   };

//   const onStrikeThroughClick = () => {
//     setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
//   };


//   return (
//     <div className="mt-10 p-5 bg-white shadow-lg rounded-lg">
//       <div className="flex justify-start mb-4 gap-2">
//         <button onClick={onBoldClick} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">Bold</button>
//         <button onClick={onItalicClick} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700">Italic</button>
//         <button onClick={onUnderlineClick} className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-700">Underline</button>
//         <button onClick={onStrikeThroughClick} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700">Strike</button>
//       </div>
//       <div className="border border-gray-300 rounded p-3 min-h-[200px]">
//         <Editor
//           editorState={editorState}
//           handleKeyCommand={handleKeyCommand}
//           onChange={setEditorState}
//         />
//       </div>
//     </div>
//   );
// };

// export default RichTextEditor;
