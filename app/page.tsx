import { Button } from '@/components/ui/button';
import SignInBtn from './components/SignInBtn';

export default function Home() {
  return (
    <main className="flex flex-col gap-5 items-center justify-center h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-400 to-rose-800">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl front-semibold text-white drop-shadow-md">
          Auth
        </h1>
        <p className="text-white">A simple authentication service</p>
      </div>

      <SignInBtn>
        <Button variant="secondary" size="lg">
          Sign In
        </Button>
      </SignInBtn>
    </main>
  );
}
