import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ReviewList } from './ReviewSystem';
import { CertificateList } from './CertificateGenerator';
import { 
  User, 
  MapPin, 
  Calendar, 
  Award, 
  Star, 
  Clock, 
  Users, 
  Heart, 
  MessageSquare, 
  Share2,
  Building,
  Globe,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Leaf,
  TreePine,
  Recycle,
  Target
} from 'lucide-react';

interface PublicVolunteerProfileProps {
  volunteer: {
    id: string;
    name: string;
    bio: string;
    location: string;
    profileImage?: string;
    joinDate: string;
    stats: {
      eventsCompleted: number;
      totalHours: number;
      rating: number;
      points: number;
    };
    interests: string[];
    skills: string[];
    badges: Array<{
      id: string;
      name: string;
      icon: string;
      rarity: 'common' | 'rare' | 'epic' | 'legendary';
    }>;
    recentEvents: Array<{
      id: string;
      title: string;
      date: string;
      organization: string;
      role: 'participant' | 'leader';
    }>;
  };
}

interface PublicNGOProfileProps {
  organization: {
    id: string;
    name: string;
    mission: string;
    vision: string;
    description: string;
    logo?: string;
    location: string;
    foundedYear: string;
    website: string;
    phone: string;
    email: string;
    socialMedia: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
    stats: {
      totalEvents: number;
      totalVolunteers: number;
      completedEvents: number;
      rating: number;
      totalHours: number;
    };
    areas: string[];
    certifications: string[];
    achievements: Array<{
      id: string;
      title: string;
      description: string;
      date: string;
      image?: string;
    }>;
    recentEvents: Array<{
      id: string;
      title: string;
      date: string;
      volunteers: number;
      maxVolunteers: number;
      status: 'active' | 'completed';
    }>;
  };
}

export function PublicVolunteerProfile({ volunteer }: PublicVolunteerProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-800';
      case 'epic': return 'bg-gradient-to-r from-purple-200 to-purple-400 text-purple-800';
      case 'rare': return 'bg-gradient-to-r from-blue-200 to-blue-400 text-blue-800';
      default: return 'bg-gradient-to-r from-gray-200 to-gray-400 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarFallback className="bg-primary text-white text-4xl">
                {volunteer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{volunteer.name}</h1>
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{volunteer.location}</span>
              </div>
              <p className="text-lg mb-4">{volunteer.bio}</p>
              
              <div className="flex items-center justify-center md:justify-start space-x-1 mb-4">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{volunteer.stats.rating}</span>
                <span className="text-muted-foreground">• {volunteer.stats.eventsCompleted} eventos completados</span>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                {volunteer.interests.slice(0, 3).map((interest) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-center md:justify-start space-x-2">
                <Button>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contactar
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Voluntario desde</div>
              <div className="font-semibold">{volunteer.joinDate}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{volunteer.stats.eventsCompleted}</div>
            <div className="text-sm text-muted-foreground">Eventos</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">{volunteer.stats.totalHours}h</div>
            <div className="text-sm text-muted-foreground">Horas</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
            <div className="text-2xl font-bold">{volunteer.stats.points}</div>
            <div className="text-sm text-muted-foreground">Puntos</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">{volunteer.stats.rating}</div>
            <div className="text-sm text-muted-foreground">Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="badges">Insignias</TabsTrigger>
          <TabsTrigger value="activities">Actividades</TabsTrigger>
          <TabsTrigger value="skills">Habilidades</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Badges destacadas */}
          <Card>
            <CardHeader>
              <CardTitle>Insignias Destacadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {volunteer.badges.slice(0, 6).map((badge) => (
                  <div key={badge.id} className={`p-4 rounded-lg text-center ${getRarityColor(badge.rarity)}`}>
                    <div className="text-2xl mb-2">{badge.icon}</div>
                    <div className="font-medium text-sm">{badge.name}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Eventos recientes */}
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {volunteer.recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.organization}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={event.role === 'leader' ? 'default' : 'secondary'}>
                        {event.role === 'leader' ? 'Líder' : 'Participante'}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {volunteer.badges.map((badge) => (
              <Card key={badge.id} className={`${getRarityColor(badge.rarity)} border-2`}>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h4 className="font-medium">{badge.name}</h4>
                  <Badge className="mt-2" variant="outline">
                    {badge.rarity === 'legendary' && 'Legendario'}
                    {badge.rarity === 'epic' && 'Épico'}
                    {badge.rarity === 'rare' && 'Raro'}
                    {badge.rarity === 'common' && 'Común'}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activities" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {volunteer.recentEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{event.organization}</p>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{event.date}</span>
                        </div>
                      </div>
                      <Badge variant={event.role === 'leader' ? 'default' : 'secondary'}>
                        {event.role === 'leader' ? 'Líder' : 'Participante'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Áreas de Interés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {volunteer.interests.map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Habilidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {volunteer.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function PublicNGOProfile({ organization }: PublicNGOProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarFallback className="bg-primary text-white text-4xl">
                {organization.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{organization.name}</h1>
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-3">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Fundada en {organization.foundedYear}</span>
              </div>
              <p className="text-lg mb-4">{organization.description}</p>
              
              <div className="flex items-center justify-center md:justify-start space-x-1 mb-4">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{organization.stats.rating}</span>
                <span className="text-muted-foreground">• {organization.stats.totalVolunteers} voluntarios</span>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                {organization.areas.slice(0, 3).map((area) => (
                  <Badge key={area} variant="secondary">
                    {area}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-center md:justify-start space-x-2">
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Unirse como Voluntario
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle>Información de Contacto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{organization.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{organization.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{organization.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a href={`https://${organization.website}`} className="text-primary hover:underline">
                  {organization.website}
                </a>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Facebook className="h-4 w-4 text-blue-600" />
                <span>{organization.socialMedia.facebook || 'No disponible'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Instagram className="h-4 w-4 text-pink-600" />
                <span>{organization.socialMedia.instagram || 'No disponible'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Twitter className="h-4 w-4 text-blue-400" />
                <span>{organization.socialMedia.twitter || 'No disponible'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{organization.stats.totalEvents}</div>
            <div className="text-sm text-muted-foreground">Eventos</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">{organization.stats.totalVolunteers}</div>
            <div className="text-sm text-muted-foreground">Voluntarios</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">{organization.stats.totalHours}h</div>
            <div className="text-sm text-muted-foreground">Horas Impacto</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">{organization.stats.rating}</div>
            <div className="text-sm text-muted-foreground">Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Misión</TabsTrigger>
          <TabsTrigger value="events">Eventos</TabsTrigger>
          <TabsTrigger value="achievements">Logros</TabsTrigger>
          <TabsTrigger value="reviews">Reseñas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Nuestra Misión</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{organization.mission}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nuestra Visión</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{organization.vision}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Áreas de Trabajo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {organization.areas.map((area) => (
                  <Badge key={area} variant="secondary" className="bg-green-100 text-green-700">
                    {area}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {organization.certifications.map((cert) => (
                  <Badge key={cert} variant="outline">
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Eventos Próximos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {organization.recentEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={event.status === 'completed' ? 'default' : 'secondary'}>
                          {event.status === 'completed' ? 'Completado' : 'Próximo'}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {event.volunteers}/{event.maxVolunteers} voluntarios
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {organization.achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="p-4">
                  <div className="w-full h-32 bg-muted rounded-lg mb-3 flex items-center justify-center">
                    <Award className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h4 className="font-medium mb-2">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                  <p className="text-xs text-muted-foreground">{achievement.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <ReviewList reviews={[]} />
        </TabsContent>
      </Tabs>
    </div>
  );
}