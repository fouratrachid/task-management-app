'use client';

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function AuthForm() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignIn) {
        await signIn({ email, password });
        toast({ title: 'Success', description: 'Signed in successfully' });
      } else {
        await signUp({ email, password });
        toast({ title: 'Success', description: 'Account created and signed in successfully' });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Authentication failed',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center">
        {isSignIn ? 'Sign In' : 'Create Account'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>
      <Button
        variant="link"
        className="w-full"
        onClick={() => setIsSignIn(!isSignIn)}
      >
        {isSignIn ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
      </Button>
    </div>
  );
}