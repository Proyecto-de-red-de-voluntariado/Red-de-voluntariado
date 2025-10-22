import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Calendar, MapPin, Users, Clock, Leaf, TreePine, Recycle, Droplets } from 'lucide-react';

interface HomeScreenProps {
  userType: 'volunteer' | 'ngo';
  onTabChange: (tab: string) => void;
}

export function HomeScreen({ userType, onTabChange }: HomeScreenProps) {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Limpieza de Playa Pocitos',
      organization: 'EcoUruguay',
      date: '15 Oct, 2024',
      time: '09:00',
      location: 'Playa Pocitos',
      volunteers: 12,
      maxVolunteers: 20,
      category: 'cleanup'
    },
    {
      id: 2,
      title: 'Plantación de Árboles en Parque Batlle',
      organization: 'Verde Futuro',
      date: '18 Oct, 2024',
      time: '08:00',
      location: 'Parque Batlle',
      volunteers: 8,
      maxVolunteers: 15,
      category: 'reforestation'
    },
    {
      id: 3,
      title: 'Reciclaje Comunitario',
      organization: 'Recicla Montevideo',
      date: '22 Oct, 2024',
      time: '10:00',
      location: 'Centro Comunitario',
      volunteers: 5,
      maxVolunteers: 10,
      category: 'recycling'
    }
  ];

  const getIcon = (category: string) => {
    switch (category) {
      case 'cleanup': return <Droplets className="h-4 w-4" />;
      case 'reforestation': return <TreePine className="h-4 w-4" />;
      case 'recycling': return <Recycle className="h-4 w-4" />;
      default: return <Leaf className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cleanup': return 'bg-blue-100 text-blue-700';
      case 'reforestation': return 'bg-green-100 text-green-700';
      case 'recycling': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-green-600 rounded-xl p-6 text-white">
        <h2 className="text-xl font-semibold mb-2">
          {userType === 'volunteer' ? '¡Hola, Voluntario!' : '¡Hola, Organización!'}
        </h2>
        <p className="opacity-90 mb-4">
          {userType === 'volunteer' 
            ? 'Descubre nuevas oportunidades para ayudar al medio ambiente'
            : 'Gestiona tus eventos y conecta con voluntarios'
          }
        </p>
        <div className="flex space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold">127</div>
            <div className="text-sm opacity-80">Puntos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm opacity-80">Eventos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm opacity-80">Insignias</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className="h-20 flex-col"
          onClick={() => onTabChange('explore')}
        >
          <Leaf className="h-6 w-6 mb-2" />
          Explorar Eventos
        </Button>
        <Button 
          variant="outline" 
          className="h-20 flex-col"
          onClick={() => onTabChange('create')}
        >
          <Calendar className="h-6 w-6 mb-2" />
          {userType === 'volunteer' ? 'Mis Eventos' : 'Crear Evento'}
        </Button>
      </div>

      {/* Upcoming Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Próximos Eventos</h3>
          <Button variant="ghost" size="sm" onClick={() => onTabChange('explore')}>
            Ver todos
          </Button>
        </div>
        
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getCategoryColor(event.category)}`}>
                    {getIcon(event.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{event.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{event.organization}</p>
                    
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {event.date} • {event.time}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-3 w-3 mr-1" />
                        {event.volunteers}/{event.maxVolunteers} voluntarios
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    {userType === 'volunteer' ? 'Unirse' : 'Ver'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="p-2 bg-primary rounded-full">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">¡Nueva insignia desbloqueada!</p>
              <p className="text-xs text-muted-foreground">Guardián del Agua - 5 eventos de limpieza</p>
            </div>
            <Badge variant="secondary">+50 pts</Badge>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-white text-xs">EU</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">EcoUruguay te invitó a un evento</p>
              <p className="text-xs text-muted-foreground">Limpieza de Playa Pocitos</p>
            </div>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}