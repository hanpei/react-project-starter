import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function useConfirm(title: string, message?: string): [() => Promise<unknown>, () => JSX.Element] {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

  const confirm = () => new Promise((resolve) => {
    setPromise({ resolve })
  })

  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose();
  }

  const handleCancel = () => {
    promise?.resolve(false)
    handleClose();
  }

  const handleClose = () => {
    setPromise(null)
  }

  const ConfirmDialog = () => {
    return (
      <Dialog open={promise !== null}>
        <DialogContent>
          <DialogHeader >
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {message}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleCancel} variant='outline'>Cancel</Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  };


  return [confirm, ConfirmDialog]
}

