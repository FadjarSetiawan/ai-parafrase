import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { cn } from '../utils/cn'

export const TextEditor = ({ content, onChange, readOnly = false, placeholder }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || '',
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm sm:prose lg:prose-lg dark:prose-invert focus:outline-none min-h-[200px] max-w-none',
          'p-4 rounded-lg border border-gray-200 dark:border-gray-700',
          'bg-white dark:bg-gray-800',
          readOnly ? '' : 'focus:ring-2 focus:ring-purple-500 focus:border-transparent'
        ),
      },
    },
    placeholder: placeholder || 'Mulai mengetik atau tempel teks di sini...',
  })

  return <EditorContent editor={editor} />
}

export default TextEditor
