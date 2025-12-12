import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";

type Props = {
  value?: string[] | string | null;
  onChange: (v: string[]) => void;
  onBlur?: () => void;
};

export default function EventMeetingAttendeesInput({ value, onChange, onBlur }: Props) {
  const [text, setText] = useState<string>(() => {
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "string") return value;
    return "";
  });

  useEffect(() => {
    if (Array.isArray(value)) setText(value.join(", "));
    else if (typeof value === "string") setText(value);
    else setText("");
  }, [value]);

  const commit = (t: string) => {
    const arr = t
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    onChange(arr);
  };

  return (
    <TextField
      label="Attendees (comma separated emails)"
      fullWidth
      value={text}
      onChange={(e) => setText(e.target.value)}          
      onBlur={(e) => {
        commit(e.target.value);                         
        onBlur?.();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commit((e.target as HTMLInputElement).value);
        }
      }}
    />
  );
}
