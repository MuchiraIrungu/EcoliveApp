import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { User, UserRole } from '../App';
import { Wallet, Sprout } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (role: UserRole) => {
    if (!email || !password) return;
    
    // Simulate login/signup
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: name || email.split('@')[0],
      role,
    };
    
    onLogin(user);
  };

  const quickLogin = (role: UserRole, demoEmail: string, demoName: string) => {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: demoEmail,
      name: demoName,
      role,
    };
    onLogin(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sprout className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-green-800 mb-2">Ecolive Platform</h1>
          <p className="text-gray-600">Tokenized Beekeeping & Pollination Credits</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Sign in to access your portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="investor" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="investor">Investor</TabsTrigger>
                <TabsTrigger value="farmer">Farmer</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <TabsContent value="investor" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="investor-email">Email</Label>
                  <Input
                    id="investor-email"
                    type="email"
                    placeholder="investor@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="investor-password">Password</Label>
                  <Input
                    id="investor-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {isSignup && (
                  <div className="space-y-2">
                    <Label htmlFor="investor-name">Full Name</Label>
                    <Input
                      id="investor-name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                )}
                <Button 
                  className="w-full" 
                  onClick={() => handleSubmit('investor')}
                >
                  {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => quickLogin('investor', 'demo@investor.com', 'Demo Investor')}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Quick Demo Login
                </Button>
                <p className="text-center text-gray-600">
                  <button
                    type="button"
                    onClick={() => setIsSignup(!isSignup)}
                    className="text-green-600 hover:underline"
                  >
                    {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                  </button>
                </p>
              </TabsContent>

              <TabsContent value="farmer" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="farmer-email">Email</Label>
                  <Input
                    id="farmer-email"
                    type="email"
                    placeholder="farmer@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmer-password">Password</Label>
                  <Input
                    id="farmer-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleSubmit('farmer')}
                >
                  Sign In
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => quickLogin('farmer', 'demo@farmer.com', 'James Kamau')}
                >
                  Quick Demo Login
                </Button>
                <p className="text-center text-gray-600">
                  Farmers are added by Ecolive admin
                </p>
              </TabsContent>

              <TabsContent value="admin" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@ecolive.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleSubmit('admin')}
                >
                  Admin Sign In
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => quickLogin('admin', 'admin@ecolive.com', 'Ecolive Admin')}
                >
                  Quick Demo Login
                </Button>
                <p className="text-center text-gray-600">
                  Secure access for Ecolive staff only
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
