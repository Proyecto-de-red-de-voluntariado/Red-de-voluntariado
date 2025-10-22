import { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Award, Trophy, Download, Star, Leaf, TreePine, Recycle, Droplets, Heart, Users, Calendar, Target } from 'lucide-react';

export function AchievementsScreen() {
  const [activeTab, setActiveTab] = useState('badges');

  const badges = [
    {
      id: 1,
      name: 'Eco Guerrero',
      description: 'Participa en tu primer evento',
      icon: Leaf,
      earned: true,
      earnedDate: '10 Sep, 2024',
      rarity: 'common'
    },
    {
      id: 2,
      name: 'Guardián del Agua',
      description: 'Completa 5 eventos de limpieza',
      icon: Droplets,
      earned: true,
      earnedDate: '28 Sep, 2024',
      rarity: 'rare',
      progress: 5,
      total: 5
    },
    {
      id: 3,
      name: 'Sembrador Verde',
      description: 'Planta 50 árboles',
      icon: TreePine,
      earned: false,
      rarity: 'epic',
      progress: 23,
      total: 50
    },
    {
      id: 4,
      name: 'Reciclador Master',
      description: 'Participa en 10 eventos de reciclaje',
      icon: Recycle,
      earned: false,
      rarity: 'rare',
      progress: 3,
      total: 10
    },
    {
      id: 5,
      name: 'Conservacionista',
      description: 'Dedica 100 horas al voluntariado',
      icon: Heart,
      earned: false,
      rarity: 'legendary',
      progress: 67,
      total: 100
    },
    {
      id: 6,
      name: 'Líder Comunitario',
      description: 'Organiza tu primer evento',
      icon: Users,
      earned: false,
      rarity: 'epic',
      progress: 0,
      total: 1
    }
  ];

  const [certificates, setCertificates] = useState<any[]>([]);
  const [loadingCertificates, setLoadingCertificates] = useState(false);
  const [errorCertificates, setErrorCertificates] = useState<string | null>(null);

  useEffect(() => {
    setLoadingCertificates(true);
    apiRequest('/certificates')
      .then((data) => {
        // Adaptar los datos si es necesario
        setCertificates(Array.isArray(data) ? data : []);
        setErrorCertificates(null);
      })
      .catch((err) => {
        setErrorCertificates(err.message || 'Error al cargar certificados');
        setCertificates([]);
      })
      .finally(() => setLoadingCertificates(false));
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCertificateColor = (type: string) => {
    switch (type) {
      case 'participation': return 'bg-green-100 text-green-700 border-green-300';
      case 'leadership': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'excellence': return 'bg-purple-100 text-purple-700 border-purple-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Logros y Certificados</h2>
        <p className="text-muted-foreground">Tu progreso en el voluntariado ambiental</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">127</div>
            <div className="text-sm text-muted-foreground">Puntos Totales</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">8</div>
            <div className="text-sm text-muted-foreground">Eventos Completados</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">67</div>
            <div className="text-sm text-muted-foreground">Horas de Voluntariado</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="badges">Insignias</TabsTrigger>
          <TabsTrigger value="certificates">Certificados</TabsTrigger>
          <TabsTrigger value="ranking">Ranking</TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="mt-6">
          <div className="space-y-4">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <Card key={badge.id} className={`${badge.earned ? 'bg-gradient-to-r from-green-50 to-green-100' : 'opacity-75'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${badge.earned ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{badge.name}</h4>
                          <Badge className={getRarityColor(badge.rarity)} variant="outline">
                            {badge.rarity === 'common' && 'Común'}
                            {badge.rarity === 'rare' && 'Raro'}
                            {badge.rarity === 'epic' && 'Épico'}
                            {badge.rarity === 'legendary' && 'Legendario'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                        
                        {badge.earned ? (
                          <div className="flex items-center text-sm text-primary">
                            <Award className="h-3 w-3 mr-1" />
                            Desbloqueado el {badge.earnedDate}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progreso</span>
                              <span>{badge.progress}/{badge.total}</span>
                            </div>
                            <Progress value={(badge.progress! / badge.total!) * 100} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="mt-6">
          {loadingCertificates && (
            <div className="text-center py-6 text-muted-foreground">Cargando certificados...</div>
          )}
          {errorCertificates && (
            <div className="text-center py-6 text-red-500">{errorCertificates}</div>
          )}
          <div className="space-y-4">
            {!loadingCertificates && !errorCertificates && certificates.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">No hay certificados disponibles.</div>
            )}
            {certificates.map((certificate) => (
              <Card key={certificate.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary rounded-lg">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{certificate.title || certificate.name}</h4>
                        <p className="text-sm text-muted-foreground">{certificate.event || certificate.projectTitle}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                          <span>{certificate.organization || certificate.orgName}</span>
                          <span>{certificate.date || certificate.issuedAt}</span>
                          <span>{certificate.hours || certificate.hoursCompleted || certificate.requiredHours} horas</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getCertificateColor(certificate.type || certificate.certificateType)} variant="outline">
                        {(certificate.type || certificate.certificateType) === 'participation' && 'Participación'}
                        {(certificate.type || certificate.certificateType) === 'leadership' && 'Liderazgo'}
                        {(certificate.type || certificate.certificateType) === 'excellence' && 'Excelencia'}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 border-dashed">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <h4 className="font-medium mb-2">Gana más certificados</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Participa en eventos para obtener certificados oficiales de voluntariado
              </p>
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Explorar eventos
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ranking" className="mt-6">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                  Tu Posición
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">#23</div>
                  <p className="text-sm text-muted-foreground">de 1,247 voluntarios activos</p>
                  <div className="flex justify-center space-x-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium">127</div>
                      <div className="text-muted-foreground">Puntos</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">67h</div>
                      <div className="text-muted-foreground">Horas</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">8</div>
                      <div className="text-muted-foreground">Eventos</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top 10 Voluntarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { position: 1, name: 'María González', points: 342, events: 15 },
                    { position: 2, name: 'Carlos Rodríguez', points: 298, events: 12 },
                    { position: 3, name: 'Ana Martínez', points: 276, events: 14 },
                    { position: 4, name: 'Luis Pérez', points: 234, events: 9 },
                    { position: 5, name: 'Sofia López', points: 198, events: 8 }
                  ].map((user) => (
                    <div key={user.position} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        user.position === 1 ? 'bg-yellow-100 text-yellow-700' :
                        user.position === 2 ? 'bg-gray-100 text-gray-700' :
                        user.position === 3 ? 'bg-orange-100 text-orange-700' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {user.position}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.points} puntos • {user.events} eventos
                        </div>
                      </div>
                      {user.position <= 3 && (
                        <Trophy className={`h-4 w-4 ${
                          user.position === 1 ? 'text-yellow-500' :
                          user.position === 2 ? 'text-gray-400' :
                          'text-orange-500'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Desafíos del Mes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Octubre Verde</h4>
                    <Badge>15 días restantes</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Participa en 3 eventos este mes para ganar 50 puntos extra
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progreso</span>
                      <span>2/3 eventos</span>
                    </div>
                    <Progress value={66.7} className="h-2" />
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Eco Mentor</h4>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Invita a 2 amigos para ganar la insignia "Eco Mentor"
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}