import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState, useCallback, useRef } from "react";

// 使用 Context API 替代全局变量
import { createContext, useContext } from 'react';

type ConfirmDialogContextType = {
  showConfirmDialog: (title: string, message?: string) => Promise<boolean>;
};

const ConfirmDialogContext = createContext<ConfirmDialogContextType | null>(null);

export function ConfirmDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState({ title: "", message: "" });
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const showConfirmDialog = useCallback((title: string, message?: string): Promise<boolean> => {
    setIsOpen(true);
    setDialogProps({ title, message: message || "" });
    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  }, []);

  const handleConfirm = useCallback(() => {
    resolveRef.current?.(true);
    setIsOpen(false);
  }, []);

  const handleCancel = useCallback(() => {
    resolveRef.current?.(false);
    setIsOpen(false);
  }, []);

  return (
    <ConfirmDialogContext.Provider value={{ showConfirmDialog }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogProps.title}</DialogTitle>
            <DialogDescription>{dialogProps.message}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleCancel} variant='outline'>取消</Button>
            <Button onClick={handleConfirm}>确认</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConfirmDialogContext.Provider>
  );
}

export function useConfirmDialog() {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error('useConfirmDialog must be used within a ConfirmDialogProvider');
  }
  return context.showConfirmDialog;
}

