"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function EnterUserName() {
  const router = useRouter();
  const [name, setName] = useState("");

  const addName = api.user.addName.useMutation({
    onSuccess: () => {
      router.push("/upload-image");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addName.mutate({ name });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={addName.isLoading}
      >
        {addName.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
