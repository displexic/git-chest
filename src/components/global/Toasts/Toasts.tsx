"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listen } from "@tauri-apps/api/event";

import { addToast, toastsState } from "@slices/toasts.slice";
import Toast from "./Toast";
import { ToastType } from "@typings/core";

interface AddToast {
  title: string;
  description?: string;
  level: ToastType;
}

const Toasts = () => {
  const toasts = useSelector(toastsState);
  const dispatch = useDispatch();

  useEffect(() => {
    type RemoveListenerBlock = () => void;
    let removeListener: RemoveListenerBlock | undefined;

    const setUpListener = async () => {
      removeListener = await listen<AddToast>("add-toast", (event) => {
        console.log("Added Toast: ", event.payload);
        dispatch(
          addToast({
            title: event.payload.title,
            description: event.payload.description,
            type: event.payload.level,
          }),
        );
      });
    };

    setUpListener().catch((error) => {
      console.error(
        `Could not set up window event listener for add-toast. ${error}`,
      );
    });

    return () => {
      removeListener?.();
    };
  }, [dispatch]);

  return (
    <>
      <div className="fixed top-4 right-4 h-full z-40 no-select">
        {toasts.map((toast) => (
          <Toast toast={toast} key={toast.id} />
        ))}
      </div>
    </>
  );
};

export default Toasts;
