import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { CertificateList } from './CertificateGenerator';
import { ReviewList, ReviewForm } from './ReviewSystem';
import { AvailabilityCalendar } from './AvailabilityCalendar';
import { Calendar, MapPin, Mail, Phone, Edit, Camera, Settings, Bell, Shield, LogOut, User, Building, Globe, Clock, Star, Award, MessageSquare } from 'lucide-react';

interface ProfileScreenProps {
  userType: 'volunteer' | 'ngo';
}

export function ProfileScreen({ userType }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const volunteerProfile = {
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '+598 99 123 456',
    location: 'Montevideo, Uruguay',
    bio: 'Apasionada por el medio ambiente y la conservación. Me encanta participar en actividades de limpieza de playas y reforestación urbana.',
    joinDate: 'Septiembre 2024',
    totalHours: 67,
    eventsCompleted: 8,
    points: 127,
    interests: ['Limpieza de playas', 'Reforestación', 'Educación ambiental'],
    availability: {
      monday: true,
      tuesday: false,
      wednesday: true,
      thursday: false,
      friday: true,
      saturday: true,
      sunday: true
    },
    preferredTimes: ['Mañana', 'Tarde'],
    skills: ['Fotografía', 'Educación', 'Organización de grupos'],
    emergencyContact: {
      name: 'Carlos González',
      phone: '+598 99 654 321',
      relation: 'Hermano'
    }
  };

  const ngoProfile = {
    organizationName: 'EcoUruguay',
    email: 'contacto@ecouruguay.org',
    phone: '+598 2 123 4567',
    website: 'www.ecouruguay.org',
    address: 'Av. 18 de Julio 1234, Montevideo',
    mission: 'Promover la conservación del medio ambiente a través del voluntariado y la educación ambiental en Uruguay.',
    foundedYear: '2018',
    eventsCreated: 24,
    totalVolunteers: 156,
    rating: 4.8,
    areas: ['Limpieza costera', 'Conservación marina', 'Educación ambiental'],
    certifications: ['ISO 14001', 'Certificación B Corp'],
    contactPerson: {
      name: 'Dr. Roberto Silva',
      position: 'Director Ejecutivo',
      email: 'roberto@ecouruguay.org'
    }
  };

  const profile = userType === 'volunteer' ? volunteerProfile : ngoProfile;

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save the profile data
    alert('Perfil actualizado exitosamente');
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary text-white text-xl">
                  {userType === 'volunteer' ? 'MG' : 'EU'}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <button className="absolute -bottom-1 -right-1 p-1 bg-primary rounded-full text-white">
                  <Camera className="h-3 w-3" />
                </button>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {userType === 'volunteer' ? profile.name : profile.organizationName}
                  </h2>
                  <p className="text-muted-foreground">
                    {userType === 'volunteer' ? profile.location : 'Organización sin fines de lucro'}
                  </p>
                </div>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                >
                  {isEditing ? (
                    'Guardar cambios'
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar perfil
                    </>
                  )}
                </Button>
              </div>
              
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">
                  {userType === 'volunteer' ? profile.bio : profile.mission}
                </p>
              </div>

              <div className="flex items-center space-x-6 mt-4">
                {userType === 'volunteer' ? (
                  <>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-primary">{profile.points}</div>
                      <div className="text-xs text-muted-foreground">Puntos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-primary">{profile.eventsCompleted}</div>
                      <div className="text-xs text-muted-foreground">Eventos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-primary">{profile.totalHours}h</div>
                      <div className="text-xs text-muted-foreground">Horas</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-primary">{profile.eventsCreated}</div>
                      <div className="text-xs text-muted-foreground">Eventos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-primary">{profile.totalVolunteers}</div>
                      <div className="text-xs text-muted-foreground">Voluntarios</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-lg font-semibold text-primary">{profile.rating}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-1" />
            Perfil
          </TabsTrigger>
          {userType === 'volunteer' && (
            <>
              <TabsTrigger value="certificates">
                <Award className="h-4 w-4 mr-1" />
                Certificados
              </TabsTrigger>
              <TabsTrigger value="reviews">
                <MessageSquare className="h-4 w-4 mr-1" />
                Reseñas
              </TabsTrigger>
              <TabsTrigger value="availability">
                <Calendar className="h-4 w-4 mr-1" />
                Disponibilidad
              </TabsTrigger>
            </>
          )}
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-1" />
            Ajustes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6 space-y-6">
          {userType === 'volunteer' ? (
            <>
              {/* Información Personal */}
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        disabled={!isEditing}
                        className={isEditing ? '' : 'bg-muted'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={profile.email}
                        disabled={!isEditing}
                        className={isEditing ? '' : 'bg-muted'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        disabled={!isEditing}
                        className={isEditing ? '' : 'bg-muted'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Ubicación</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        disabled={!isEditing}
                        className={isEditing ? '' : 'bg-muted'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografía</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        disabled={!isEditing}
                        className={isEditing ? '' : 'bg-muted'}
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Intereses */}
              <Card>
                <CardHeader>
                  <CardTitle>Áreas de Interés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <Button variant="outline" size="sm" className="mt-3">
                      Editar intereses
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Disponibilidad */}
              <Card>
                <CardHeader>
                  <CardTitle>Disponibilidad</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(profile.availability).map(([day, available]) => (
                      <div key={day} className="flex items-center justify-between">
                        <span className="capitalize">{
                          day === 'monday' ? 'Lunes' :
                          day === 'tuesday' ? 'Martes' :
                          day === 'wednesday' ? 'Miércoles' :
                          day === 'thursday' ? 'Jueves' :
                          day === 'friday' ? 'Viernes' :
                          day === 'saturday' ? 'Sábado' : 'Domingo'
                        }</span>
                        <Switch checked={available} disabled={!isEditing} />
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Horarios preferidos</Label>
                    <div className="flex space-x-2">
                      {profile.preferredTimes.map((time) => (
                        <Badge key={time} variant="outline">
                          {time}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contacto de Emergencia */}
              <Card>
                <CardHeader>
                  <CardTitle>Contacto de Emergencia</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergency-name">Nombre</Label>
                    <Input
                      id="emergency-name"
                      value={profile.emergencyContact.name}
                      disabled={!isEditing}
                      className={isEditing ? '' : 'bg-muted'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency-phone">Teléfono</Label>
                    <Input
                      id="emergency-phone"
                      value={profile.emergencyContact.phone}
                      disabled={!isEditing}
                      className={isEditing ? '' : 'bg-muted'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency-relation">Relación</Label>
                    <Input
                      id="emergency-relation"
                      value={profile.emergencyContact.relation}
                      disabled={!isEditing}
                      className={isEditing ? '' : 'bg-muted'}
                    />
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              {/* Información de la Organización */}
              <Card>
                <CardHeader>
                  <CardTitle>Información de la Organización</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Nombre de la organización</Label>
                    <Input
                      id="org-name"
                      value={profile.organizationName}
                      disabled={!isEditing}
                      className={isEditing ? '' : 'bg-muted'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-email">Email</Label>
                    <Input
                      id="org-email"
                      value={profile.email}
                      disabled={!isEditing}
                      className={isEditing ? '' : 'bg-muted'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-website">Sitio web</Label>
                    <Input
                      id="org-website"
                      value={profile.website}
                      disabled={!isEditing}
                      className={isEditing ? '' : 'bg-muted'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-address">Dirección</Label>
                    <Input
                      id="org-address"
                      value={profile.address}
                      disabled={!isEditing}
                      className={isEditing ? '' : 'bg-muted'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-mission">Misión</Label>
                    <Textarea
                      id="org-mission"
                      value={profile.mission}
                      disabled={!isEditing}
                      className={isEditing ? '' : 'bg-muted'}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Áreas de Trabajo */}
              <Card>
                <CardHeader>
                  <CardTitle>Áreas de Trabajo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.areas.map((area) => (
                      <Badge key={area} variant="secondary">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Persona de Contacto */}
              <Card>
                <CardHeader>
                  <CardTitle>Persona de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Nombre</Label>
                    <Input
                      id="contact-name"
                      value={profile.contactPerson.name}
                      disabled={!isEditing}
                      className={isEditing ? '' : 'bg-muted'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-position">Cargo</Label>
                    <Input
                      id="contact-position"
                      value={profile.contactPerson.position}
                      disabled={!isEditing}
                      className={isEditing ? '' : 'bg-muted'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      value={profile.contactPerson.email}
                      disabled={!isEditing}
                      className={isEditing ? '' : 'bg-muted'}
                    />
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {userType === 'volunteer' && (
          <>
            <TabsContent value="certificates" className="mt-6">
              <CertificateList certificates={[
                {
                  id: '1',
                  volunteerName: 'María González',
                  volunteerEmail: 'maria@email.com',
                  eventTitle: 'Limpieza de Playa Pocitos',
                  eventDate: '15 Oct 2024',
                  eventLocation: 'Playa Pocitos, Montevideo',
                  organizationName: 'EcoUruguay',
                  hoursCompleted: 4,
                  certificateType: 'participation',
                  issueDate: '16 Oct 2024',
                  certificateNumber: 'RVA-2024-001'
                },
                {
                  id: '2',
                  volunteerName: 'María González',
                  volunteerEmail: 'maria@email.com',
                  eventTitle: 'Plantación Comunitaria Parque Batlle',
                  eventDate: '22 Sep 2024',
                  eventLocation: 'Parque Batlle, Montevideo',
                  organizationName: 'Verde Futuro',
                  hoursCompleted: 6,
                  certificateType: 'leadership',
                  issueDate: '23 Sep 2024',
                  certificateNumber: 'RVA-2024-002'
                }
              ]} />
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mis Reseñas</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Comparte tu experiencia para ayudar a otros voluntarios
                    </p>
                  </CardHeader>
                </Card>

                <ReviewList reviews={[
                  {
                    id: '1',
                    volunteerId: 'vol1',
                    volunteerName: 'María González',
                    eventId: 'evt1',
                    eventTitle: 'Limpieza de Playa Pocitos',
                    organizationName: 'EcoUruguay',
                    rating: 5,
                    comment: 'Excelente organización, muy buena coordinación y materiales de calidad. El ambiente fue muy colaborativo.',
                    date: '16 Oct 2024',
                    likes: 12,
                    isHelpful: true
                  }
                ]} />

                {/* Formulario para nueva reseña */}
                <ReviewForm
                  eventTitle="Taller de Reciclaje Comunitario"
                  organizationName="Recicla Montevideo"
                  onSubmit={(reviewData) => {
                    console.log('Nueva reseña:', reviewData);
                  }}
                />
              </div>
            </TabsContent>

            <TabsContent value="availability" className="mt-6">
              <AvailabilityCalendar />
            </TabsContent>
          </>
        )}

        <TabsContent value="settings" className="mt-6 space-y-6">
          {/* Notificaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Notificaciones push</h4>
                  <p className="text-sm text-muted-foreground">Recibir notificaciones en el dispositivo</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Nuevos eventos</h4>
                  <p className="text-sm text-muted-foreground">Alertas sobre nuevos eventos</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Recordatorios</h4>
                  <p className="text-sm text-muted-foreground">Recordatorios de eventos próximos</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Actualizaciones de la comunidad</h4>
                  <p className="text-sm text-muted-foreground">Novedades del foro y logros</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Privacidad */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Privacidad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Perfil público</h4>
                  <p className="text-sm text-muted-foreground">Otros usuarios pueden ver tu perfil</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Mostrar estadísticas</h4>
                  <p className="text-sm text-muted-foreground">Mostrar puntos y logros públicamente</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Permitir mensajes directos</h4>
                  <p className="text-sm text-muted-foreground">Otros usuarios pueden contactarte</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Cuenta */}
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Cuenta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Cambiar contraseña
              </Button>
              
              <Button variant="outline" className="w-full">
                Descargar mis datos
              </Button>

              <Button variant="outline" className="w-full">
                Eliminar cuenta
              </Button>

              <div className="pt-4 border-t">
                <Button variant="destructive" className="w-full">
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar sesión
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}