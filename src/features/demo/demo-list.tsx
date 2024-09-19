import { useSuspenseQuery } from "@tanstack/react-query";
import { demosQueryOptions } from "./api/get-demos";
import { Suspense } from "react";

export function DemoList() {
  const { data: items } = useSuspenseQuery(demosQueryOptions());

  return (
    <div className="grid container grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 ">
      {items.map((item) => (
        <DemoCard key={item.id} {...item} />
      ))}
    </div>
  );
}

type DemoCardProps = {
  id: number;
  title: string;
  thumbnailUrl: string;
};

function DemoCard({ title, thumbnailUrl }: DemoCardProps) {
  return (
    <Suspense fallback={<Pending />}>
      <div className="flex flex-col items-center justify-center w-full p-4 overflow-hidden rounded shadow  bg-zinc-100">
        <img
          src={thumbnailUrl}
          alt={title}
          className="object-cover w-full rounded aspect-square"
        />
        <h2 className="w-full mt-2 text-sm text-center truncate text-zinc-800">
          {title}
        </h2>
      </div>
    </Suspense>
  );
}

function Pending() {
  return <div>Loading...</div>;
}