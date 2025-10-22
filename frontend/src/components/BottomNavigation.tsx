import { Home, Search, Plus, Award, MessageSquare, User } from "lucide-react";

interface BottomNavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ currentTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'explore', icon: Search, label: 'Explorar' },
    { id: 'create', icon: Plus, label: 'Crear' },
    { id: 'achievements', icon: Award, label: 'Logros' },
    { id: 'forum', icon: MessageSquare, label: 'Foro' },
    { id: 'profile', icon: User, label: 'Perfil' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
      <div className="flex justify-around items-center py-2 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'fill-current' : ''}`} />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}