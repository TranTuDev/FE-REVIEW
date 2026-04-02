"use client";

import { useState } from "react";

type Props = {
  onSubmit: (file: File | null, note: string) => void;
};

export default function SubmissionForm({ onSubmit }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [note, setNote] = useState("");

  return (
    <form onSubmit={(e) => {
      e.preventDefault(); onSubmit(file, note);
    }}
      className="flex flex-col gap-4"
    >
      <label className="border p-2 rounded cursor-pointer">
        {file ? file.name : "tải file len cmm"}
        <input
          type="file"
          hidden
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </label>


      <textarea
        placeholder="Write note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="border p-2 rounded"
      />

      <button type="submit" className="bg-amber-400 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
