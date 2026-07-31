"use client";

import { useRef } from "react";

export function DeleteButton() {
  const confirmation = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={confirmation} type="hidden" name="confirm" value="" />
      <button
        className="danger"
        type="submit"
        onClick={(event) => {
          if (!window.confirm("Permanently delete this tour?")) {
            event.preventDefault();
            return;
          }
          if (confirmation.current) confirmation.current.value = "delete";
        }}
      >
        Delete
      </button>
    </>
  );
}
