'use client'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react'

interface IProps {
  isOpen: boolean
  title: string
  message: string
  setOpen: (value: boolean) => void
  onPress: () => void
}

export const DialogAction = ({
  isOpen,
  setOpen,
  title,
  message,
  onPress,
}: IProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setOpen(false)
      }}
      radius="sm"
    >
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <div>
            <p>{message}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onPress={onPress}
            radius="sm"
          >
            Aceptar
          </Button>
          <Button
            onPress={() => {
              setOpen(false)
            }}
            radius="sm"
            variant="ghost"
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
