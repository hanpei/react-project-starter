import { Button } from '@/components/ui/button';
import { DemoList } from '@/features/demo/demo-list';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => <IndexPage />,
});

const IndexPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-8">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <Link to="/dashboard">
        <Button>Go to Dashboard</Button>
      </Link>
      <DemoList />
    </div>
  );
};
