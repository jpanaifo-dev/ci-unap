interface IProps {
  title?: React.ReactNode
  content?: React.ReactNode
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
}
import { IconInfoCircle } from '@tabler/icons-react'

const colors = {
  primary: {
    header: 'bg-primary-500 text-white',
    content: 'bg-primary-50 text-primary-800',
    border: 'border-primary-500',
  },
  secondary: {
    header: 'bg-secondary-500 text-white',
    content: 'bg-secondary-50 text-secondary-800',
    border: 'border-secondary-500',
  },
  success: {
    header: 'bg-success-500 text-white',
    content: 'bg-success-50 text-success-800',
    border: 'border-success-500',
  },
  danger: {
    header: 'bg-danger-500 text-white',
    content: 'bg-danger-50 text-danger-800',
    border: 'border-danger-500',
  },
  warning: {
    header: 'bg-warning-500 text-white',
    content: 'bg-warning-50 text-warning-800',
    border: 'border-warning-500',
  },
  info: {
    header: 'bg-info-500 text-white',
    content: 'bg-info-50 text-info-800',
    border: 'border-info-500',
  },
}

export const AlertCustom = (props: IProps) => {
  const { title, content, color = 'primary' } = props

  const colorClass = colors[color]

  return (
    <div className={`rounded-md border ${colorClass.border}`}>
      {title && (
        <header
          className={`flex rounded-t-md items-center justify-between px-4 py-3 font-medium text-sm ${colorClass.header}`}
        >
          <div className="flex items-center gap-3">
            <IconInfoCircle size={20} />
            {title}
          </div>
        </header>
      )}
      {content && (
        <div className={`p-4 text-xs rounded-b-md    ${colorClass.content}`}>
          {content}
        </div>
      )}
    </div>
  )
}
