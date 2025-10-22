import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Building, 
  Users, 
  Calendar, 
  Award, 
  Star, 
  Edit, 
  Eye, 
  Camera, 
  Globe, 
  Phone, 
  Mail,
  Download,
  UserCheck,
  UserX,
  MessageSquare,
  TrendingUp,
  BarChart3,
  Plus
} from 'lucide-react';

export function NGODashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const ngoData = {
    name: 'Fundación Verde Futuro',
    logo: null,
    mission: 'Promover la conservación del medio ambiente a través de la educación y acción comunitaria.',
    vision: 'Un mundo donde las comunidades vivan en armonía con la naturaleza.',
    phone: '+598 2 123 4567',
    email: 'contacto@verdefuturo.org',
    website: 'www.verdefuturo.org',
    socialMedia: {
      facebook: '@VerdefuturoUY',
      instagram: '@verdefuturo_uy',
      twitter: '@VerdefuturoUY'
    },
    stats: {
      totalEvents: 24,
      totalVolunteers: 156,
      completedEvents: 18,
      rating: 4.8,
      totalHours: 1240
    }
  };

  const recentEvents = [
    {
      id: 1,
      title: 'Limpieza Playa Pocitos',
      date: '2024-10-15',
      volunteers: 12,
      maxVolunteers: 20,
      status: 'active',
      applicants: 18
    },
    {
      id: 2,
      title: 'Plantación Parque Batlle',
      date: '2024-10-22',
      volunteers: 8,
      maxVolunteers: 15,
      status: 'active',
      applicants: 22
    },
    {
      id: 3,
      title: 'Taller de Reciclaje',
      date: '2024-10-08',
      volunteers: 15,
      maxVolunteers: 15,
      status: 'completed',
      applicants: 15
    }
  ];

  const pendingApplications = [
    {
      id: 1,
      volunteer: 'María González',
      event: 'Limpieza Playa Pocitos',
      appliedDate: '2024-10-10',
      rating: 4.7,
      completedEvents: 5
    },
    {
      id: 2,
      volunteer: 'Carlos Rodríguez',
      event: 'Plantación Parque Batlle',
      appliedDate: '2024-10-11',
      rating: 4.9,
      completedEvents: 12
    }
  ];

  const eventReviews = [
    {
      id: 1,
      volunteer: 'Ana Martínez',
      event: 'Taller de Reciclaje',
      rating: 5,
      comment: 'Excelente organización, aprendí mucho sobre técnicas de compostaje.',
      date: '2024-10-09'
    },
    {
      id: 2,
      volunteer: 'Luis Pérez',
      event: 'Taller de Reciclaje',
      rating: 4,
      comment: 'Muy buena iniciativa, me gustaría más eventos como este.',
      date: '2024-10-09'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Premio Medioambiental 2024',
      description: 'Reconocimiento por contribución excepcional a la conservación marina',
      image: '/api/placeholder/300/200',
      date: '2024-09-15'
    },
    {
      id: 2,
      title: 'Certificación ISO 14001',
      description: 'Certificación en sistemas de gestión ambiental',
      image: '/api/placeholder/300/200',
      date: '2024-07-20'
    }
  ];

  const approveApplication = (applicationId: number) => {
    console.log('Aprobar aplicación:', applicationId);
    // Aquí implementarías la lógica para aprobar
  };

  const rejectApplication = (applicationId: number) => {
    console.log('Rechazar aplicación:', applicationId);
    // Aquí implementarías la lógica para rechazar
  };

  const generateCertificate = (volunteerId: number, eventId: number) => {
    console.log('Generar certificado para:', volunteerId, eventId);
    // Aquí implementarías la generación de certificado
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Panel de Gestión</h2>
          <p className="text-muted-foreground">Gestiona tu organización y eventos</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Crear Evento
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="events">Eventos</TabsTrigger>
          <TabsTrigger value="volunteers">Voluntarios</TabsTrigger>
          <TabsTrigger value="reviews">Reseñas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{ngoData.stats.totalEvents}</div>
                <div className="text-sm text-muted-foreground">Eventos Total</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{ngoData.stats.totalVolunteers}</div>
                <div className="text-sm text-muted-foreground">Voluntarios</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">{ngoData.stats.rating}</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{ngoData.stats.totalHours}h</div>
                <div className="text-sm text-muted-foreground">Horas Impacto</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Events */}
          <Card>
            <CardHeader>
              <CardTitle>Eventos Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={event.status === 'completed' ? 'default' : 'secondary'}>
                        {event.status === 'completed' ? 'Completado' : 'Activo'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {event.volunteers}/{event.maxVolunteers} voluntarios
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Applications */}
          <Card>
            <CardHeader>
              <CardTitle>Solicitudes Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{app.volunteer}</h4>
                      <p className="text-sm text-muted-foreground">{app.event}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{app.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          • {app.completedEvents} eventos completados
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => approveApplication(app.id)}>
                        <UserCheck className="h-3 w-3 mr-1" />
                        Aprobar
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => rejectApplication(app.id)}>
                        <UserX className="h-3 w-3 mr-1" />
                        Rechazar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="bg-primary text-white text-2xl">
                        VF
                      </AvatarFallback>
                    </Avatar>
                    <button className="absolute -bottom-1 -right-1 p-1 bg-primary rounded-full text-white">
                      <Camera className="h-3 w-3" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-semibold">{ngoData.name}</h3>
                    <p className="text-sm text-muted-foreground">Logo de la organización</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Misión</Label>
                    <Textarea value={ngoData.mission} rows={3} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Visión</Label>
                    <Textarea value={ngoData.vision} rows={3} />
                  </div>
                </div>

                <Button className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Actualizar Información
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <Input value={ngoData.phone} />
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input value={ngoData.email} />
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <Input value={ngoData.website} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Redes Sociales</Label>
                  <div className="space-y-2">
                    <Input placeholder="Facebook" value={ngoData.socialMedia.facebook} />
                    <Input placeholder="Instagram" value={ngoData.socialMedia.instagram} />
                    <Input placeholder="Twitter" value={ngoData.socialMedia.twitter} />
                  </div>
                </div>

                <Button className="w-full">
                  Actualizar Contacto
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Achievements Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Logros y Reconocimientos
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Logro
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Nuevo Logro</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Título</Label>
                        <Input placeholder="Premio o reconocimiento" />
                      </div>
                      <div className="space-y-2">
                        <Label>Descripción</Label>
                        <Textarea placeholder="Describe el logro..." />
                      </div>
                      <div className="space-y-2">
                        <Label>Fecha</Label>
                        <Input type="date" />
                      </div>
                      <Button className="w-full">Publicar Logro</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="border rounded-lg p-4">
                    <div className="w-full h-32 bg-muted rounded-lg mb-3 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground">{achievement.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evento</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Voluntarios</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>{event.volunteers}/{event.maxVolunteers}</TableCell>
                      <TableCell>
                        <Badge variant={event.status === 'completed' ? 'default' : 'secondary'}>
                          {event.status === 'completed' ? 'Completado' : 'Activo'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            Ver
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
                            Editar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="volunteers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Voluntarios</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Voluntario</TableHead>
                    <TableHead>Evento</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Eventos Completados</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.volunteer}</TableCell>
                      <TableCell>{app.event}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          {app.rating}
                        </div>
                      </TableCell>
                      <TableCell>{app.completedEvents}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={() => generateCertificate(app.id, 1)}>
                            <Download className="h-3 w-3 mr-1" />
                            Certificado
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Reseñas y Evaluaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventReviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{review.volunteer}</h4>
                        <p className="text-sm text-muted-foreground">{review.event}</p>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm mb-2">{review.comment}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}