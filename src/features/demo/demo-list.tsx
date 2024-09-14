import { useGetDemos } from './api/use-get-demos';

export function DemoList() {
  const { data } = useGetDemos();

  if (!data) return null;

  return (
    <div className="container grid grid-cols-4 gap-4 ">
      {data.map((item) => (
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
    <div className="flex flex-col items-center justify-center w-full p-4 overflow-hidden rounded shadow aspect-square bg-zinc-100">
      <img
        src={thumbnailUrl}
        alt={title}
        className="object-cover w-full rounded h-3/4"
      />
      <h2 className="w-full mt-2 text-sm text-center truncate text-zinc-800">
        {title}
      </h2>
    </div>
  );
}
