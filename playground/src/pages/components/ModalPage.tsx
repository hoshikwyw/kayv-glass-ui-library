import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from '../../../../src';
import type { ModalSize } from '../../../../src';

// ── Helpers ───────────────────────────────────────────────────────────────────

function SectionCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/60 dark:border-white/10 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm shadow-slate-100/50 dark:shadow-black/10">
      <div className="px-5 py-3.5 border-b border-slate-200/50 dark:border-white/5">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="px-5 py-6">{children}</div>
    </div>
  );
}

// ── Demos ─────────────────────────────────────────────────────────────────────

function BasicDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader>Welcome back</ModalHeader>
        <ModalBody>
          <p>
            This is a basic modal with a header, body, and footer. Click the X button,
            press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-xs font-mono">Esc</kbd>,
            or click the backdrop to dismiss it.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={() => setOpen(false)}>Got it</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

function ConfirmDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)} className="border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10">Delete item</Button>
      <Modal open={open} onClose={() => setOpen(false)} size="sm">
        <ModalHeader>Delete item?</ModalHeader>
        <ModalBody>
          <p>
            This action <span className="font-semibold text-slate-800 dark:text-slate-200">cannot be undone</span>.
            The item and all associated data will be permanently removed.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="secondary" size="sm" onClick={() => setOpen(false)} className="border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10">Delete</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

function FormDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Edit profile</Button>
      <Modal open={open} onClose={() => setOpen(false)} size="md">
        <ModalHeader>Edit profile</ModalHeader>
        <ModalBody>
          <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-3">
              <Input label="First name" defaultValue="Alice" placeholder="First name" />
              <Input label="Last name" defaultValue="Kim" placeholder="Last name" />
            </div>
            <Input label="Email" type="email" defaultValue="alice@example.com" placeholder="Email" />
            <Input label="Bio" placeholder="Tell us a bit about yourself…" />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={() => setOpen(false)}>Save changes</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

function ScrollDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Long content</Button>
      <Modal open={open} onClose={() => setOpen(false)} size="md">
        <ModalHeader>Terms of service</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            {Array.from({ length: 8 }, (_, i) => (
              <p key={i}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Decline</Button>
          <Button variant="primary" size="sm" onClick={() => setOpen(false)}>Accept</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

function SizesDemo() {
  const [openSize, setOpenSize] = useState<ModalSize | null>(null);
  const sizes: ModalSize[] = ['sm', 'md', 'lg', 'xl'];

  return (
    <>
      <div className="flex items-center gap-3 flex-wrap">
        {sizes.map(size => (
          <Button key={size} variant="secondary" size="sm" onClick={() => setOpenSize(size)}>
            {size}
          </Button>
        ))}
      </div>
      {sizes.map(size => (
        <Modal key={size} open={openSize === size} onClose={() => setOpenSize(null)} size={size}>
          <ModalHeader>Modal — {size}</ModalHeader>
          <ModalBody>
            <p>
              This is the <span className="font-semibold text-slate-800 dark:text-slate-200">{size}</span> size
              modal. Max-width is{' '}
              {size === 'sm' ? '384px' : size === 'md' ? '448px' : size === 'lg' ? '512px' : '576px'}.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" size="sm" onClick={() => setOpenSize(null)}>Close</Button>
          </ModalFooter>
        </Modal>
      ))}
    </>
  );
}

function NoBackdropDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>No backdrop close</Button>
      <Modal open={open} onClose={() => setOpen(false)} closeOnBackdrop={false} size="sm">
        <ModalHeader>Requires action</ModalHeader>
        <ModalBody>
          <p>
            Clicking the backdrop won't close this modal. You must use the button below.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" size="sm" onClick={() => setOpen(false)}>Dismiss</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ModalPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Modal</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Dialog overlay with glass backdrop, focus trap, scroll lock, and smooth animations.
        </p>
      </div>

      <SectionCard label="Basic">
        <BasicDemo />
      </SectionCard>

      <SectionCard label="Confirmation (destructive)">
        <ConfirmDemo />
      </SectionCard>

      <SectionCard label="Form">
        <FormDemo />
      </SectionCard>

      <SectionCard label="Scrollable body">
        <ScrollDemo />
      </SectionCard>

      <SectionCard label="Sizes">
        <SizesDemo />
      </SectionCard>

      <SectionCard label="Backdrop close disabled">
        <NoBackdropDemo />
      </SectionCard>

      <SectionCard label="API">
        <div className="flex flex-col gap-1 font-mono text-xs text-slate-600 dark:text-slate-400">
          {[
            ['open', 'boolean', 'required'],
            ['onClose', '() => void', 'required'],
            ['size', "'sm' | 'md' | 'lg' | 'xl'", "'md'"],
            ['closeOnBackdrop', 'boolean', 'true'],
            ['closeOnEsc', 'boolean', 'true'],
          ].map(([prop, type, def]) => (
            <div
              key={prop}
              className="grid grid-cols-[140px_1fr_80px] gap-4 py-1.5 border-b border-slate-100 dark:border-white/5 last:border-0"
            >
              <span className="text-indigo-600 dark:text-indigo-400">{prop}</span>
              <span className="text-slate-500 dark:text-slate-500 truncate">{type}</span>
              <span className="text-slate-400">{def}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
