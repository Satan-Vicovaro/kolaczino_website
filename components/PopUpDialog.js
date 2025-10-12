"use client";
import React from "react"
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button, Card, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/tokens/base.css";
import "@radix-ui/themes/components.css";
import "@radix-ui/themes/utilities.css";
import "@radix-ui/themes/styles.css";
import "./PopUpDialog.css"

function PopUpDialog({ open, setOpen, handleCancel, handleConfirm,
  children, description = "", title = "Are you sure?",
  cancelText = "Cancel", applyText = "Apply" }) {

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Portal>
        <Theme>
          <AlertDialog.Overlay className="AlertDialogOverlay" />
          <AlertDialog.Content
            className="AlertDialogContent"
            style={{ zIndex: 9999 }}
          >
            <AlertDialog.Title className="AlertDialogTitle text-4xl">
              {title}
            </AlertDialog.Title>
            <div>
              <AlertDialog.Description className="AlertDialogDescription">
                {description}
              </AlertDialog.Description>
              {children}
            </div>
            <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
              <AlertDialog.Cancel asChild>
                <Button className="AlertDialogCancelButton" onClick={handleCancel} >{cancelText}</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button className="AlertDialogApplyButton" onClick={handleConfirm} >{applyText}</Button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </Theme>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
export default PopUpDialog;

