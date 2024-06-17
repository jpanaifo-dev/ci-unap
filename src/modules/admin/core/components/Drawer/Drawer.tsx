import { Button, Divider } from '@nextui-org/react'

interface IProps {
  title: string | React.ReactNode
  content: React.ReactNode
  isOpen: boolean
  setOpen: (value: boolean) => void
}

export const DrawerCustom = (props: IProps) => {
  const { isOpen, setOpen, title, content } = props

  const drawerClasses = `fixed top-0 right-0 z-40 h-screen overflow-y-auto transition-transform ${
    isOpen ? 'translate-x-0' : 'translate-x-full hidden'
  } bg-white w-[520px] dark:bg-gray-800`

  const overlayClasses = `fixed top-0 right-0 bottom-0 left-0 z-40 transition-opacity ${
    isOpen ? 'opacity-50 ' : 'opacity-0 pointer-events-none'
  } bg-black`

  const isString = typeof title === 'string'

  return (
    <>
      <div
        className={overlayClasses}
        onClick={() => setOpen && setOpen(false)}
      />
      <div
        id="drawer"
        aria-label="drawer"
        className={drawerClasses}
        tabIndex={-1}
      >
        {!isString ? (
          <section className="px-4 py-2">{title}</section>
        ) : (
          <>
            <header className="px-4 py-2">
              <h2 className="text-lg text-gray-500 font-semibold">{title}</h2>
            </header>
            <Divider />
          </>
        )}
        <main className="overflow-y-auto h-[calc(100%-6rem)] p-4">
          {content}
        </main>
        <Divider />
        <footer className="flex justify-end gap-3 p-2">
          <Button
            size="sm"
            radius="sm"
            onPress={() => setOpen(false)}
            variant="bordered"
          >
            Cancelar
          </Button>
        </footer>
      </div>
    </>
  )
}
