import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to your frontend assignment
          </h1>
          <p className="text-lg text-gray-600">
            This is a boilerplate Next.js application with Tailwind CSS and
            ShadCN UI components.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/profile">
            <Button size="lg" className="w-full">
              Go to Profile
            </Button>
          </Link>

          <div className="text-sm text-gray-500 space-y-2">
            <p>Features included:</p>
            <ul className="text-left space-y-1">
              <li>• User management with CRUD operations</li>
              <li>• Search and filter functionality</li>
              <li>• Responsive design with Tailwind CSS</li>
              <li>• ShadCN UI components</li>
              <li>• API routes for user management</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
