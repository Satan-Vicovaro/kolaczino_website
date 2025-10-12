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
            className="AlertDialogContent w-11/12"
            style={{ zIndex: 9999 }}
          >
            <AlertDialog.Title className="AlertDialogTitle text-xl text-center">
              {title}
            </AlertDialog.Title>
            <div>
              <AlertDialog.Description className="AlertDialogDescription text-center">
                {description}
              </AlertDialog.Description>
              {children}
            </div>
            <div
              //style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}
              className="flex justify-center items-center gap-4"
            >
              <div className="m-1">
                <AlertDialog.Cancel asChild>
                  <Button className="AlertDialogCancelButton" onClick={handleCancel} >{cancelText}</Button>
                </AlertDialog.Cancel>
              </div>
              <div className="m-1">
                <AlertDialog.Action asChild>
                  <Button className="AlertDialogApplyButton" onClick={handleConfirm} >{applyText}</Button>
                </AlertDialog.Action>
              </div>
            </div>
          </AlertDialog.Content>
        </Theme>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
export default PopUpDialog;

