import { create } from 'zustand'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Zustand store
type ConfirmDialogStore = {
  isOpen: boolean
  title: string
  message?: string
  resolve: ((value: boolean) => void) | null
  showDialog: (title: string, message?: string) => Promise<boolean>
  handleConfirm: () => void
  handleCancel: () => void
}

const useConfirmDialogStore = create<ConfirmDialogStore>()((set, get) => ({
  isOpen: false,
  title: '',
  message: '',
  resolve: null,
  showDialog: (title, message) =>
    new Promise((resolve) => {
      set({ isOpen: true, title, message, resolve })
    }),
  handleConfirm: () => {
    get().resolve?.(true)
    set({ isOpen: false, resolve: null })
  },
  handleCancel: () => {
    get().resolve?.(false)
    set({ isOpen: false, resolve: null })
  }
}))

// ConfirmDialog 组件
export function ConfirmDialog() {
  const { isOpen, title, message, handleConfirm, handleCancel } = useConfirmDialogStore()
  
  const handleOpenChange = (open: boolean) => {
    if (!open) handleCancel();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleCancel} variant='outline'>取消</Button>
          <Button onClick={handleConfirm}>确认</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 导出 showConfirmDialog 函数
export const confirm = useConfirmDialogStore.getState().showDialog
