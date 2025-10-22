import { useState } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { VolunteerProfileSetup } from './components/VolunteerProfileSetup';
import { HomeScreen } from './components/HomeScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { CreateEventScreen } from './components/CreateEventScreen';
import { AchievementsScreen } from './components/AchievementsScreen';
import { ForumScreen } from './components/ForumScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { Button } from './components/ui/button';
import { LogOut } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'volunteer' | 'ngo'>('volunteer');
  const [currentTab, setCurrentTab] = useState('home');
  const [needsProfileSetup, setNeedsProfileSetup] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const handleLogin = (type: 'volunteer' | 'ngo', userData?: any) => {
    setUserType(type);
    setUserData(userData);
    setIsAuthenticated(true);
    
    // Si es un voluntario nuevo, mostrar configuración de perfil
    if (type === 'volunteer' && userData?.isNewUser) {
      setNeedsProfileSetup(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setNeedsProfileSetup(false);
    setUserData(null);
    setCurrentTab('home');
  };

  const handleProfileSetupComplete = () => {
    setNeedsProfileSetup(false);
  };

  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  if (needsProfileSetup) {
    return <VolunteerProfileSetup onComplete={handleProfileSetupComplete} />;
  }

  const renderContent = () => {
    // Si es una ONG, mostrar el dashboard en lugar del HomeScreen
    if (userType === 'ngo' && currentTab === 'home') {
      const { NGODashboard } = require('./components/NGODashboard');
      return <NGODashboard />;
    }

    switch (currentTab) {
      case 'home':
        return <HomeScreen userType={userType} onTabChange={setCurrentTab} />;
      case 'explore':
        return <ExploreScreen />;
      case 'create':
        return <CreateEventScreen userType={userType} />;
      case 'achievements':
        return <AchievementsScreen />;
      case 'forum':
        return <ForumScreen />;
      case 'profile':
        return <ProfileScreen userType={userType} />;
      default:
        return <HomeScreen userType={userType} onTabChange={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌱</span>
            </div>
            <div>
              <h1 className="font-semibold text-primary">Red de Voluntariado</h1>
              <p className="text-xs text-muted-foreground">
                {userData?.email || 'Ambiental'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* User Type Badge */}
            <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
              {userType === 'volunteer' ? 'Voluntario' : 'ONG'}
            </div>
            
            {/* Logout Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="p-2"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
}