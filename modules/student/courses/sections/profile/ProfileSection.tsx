import { Button, Input, Textarea } from '@nextui-org/react'
import React from 'react'

export const StudentProfileSection = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-8 max-w-screen-lg">
        <Input
          labelPlacement="outside"
          label="Nombre de usuario"
          readOnly
          value={'Nombre'}
          description="This is your public display name. It can be your real name or a
            pseudonym. You can only change this once every 30 days."
        />
        <Input
          labelPlacement="outside"
          label="Email"
          readOnly
          value={'Email'}
          description="You can manage verified email addresses in your email settings."
        />
        <Textarea
          label="Bio"
          labelPlacement="outside"
          readOnly
          value={'I own a computer'}
          description="You can @mention other users and organizations to link to them."
        />
        <div>
          <h3 className="text-slate-950 text-sm font-medium">URLs</h3>
          <span className="text-slate-500 text-xs font-normal">
            Add links to your website, blog, or social media profiles.
          </span>
          <div className="space-y-2">
            <Input
              readOnly
              value={'https://shadcn.com'}
            />
            <Input
              readOnly
              value={'http://twitter.com/shadcn'}
            />
            <Button
              variant="bordered"
              radius="sm"
            >
              Agregar url
            </Button>
          </div>
        </div>
        <div>
          <Button className="bg-black text-white">Actualizar perfil</Button>
        </div>
      </div>
    </div>
  )
}
