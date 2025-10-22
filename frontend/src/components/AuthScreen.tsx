import { useState } from 'react';
import { apiRequest, setAuthToken } from '../utils/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Leaf, Building, User, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (userType: 'volunteer' | 'ngo', userData?: any) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [userType, setUserType] = useState<'volunteer' | 'ngo'>('volunteer');
  const [step, setStep] = useState(1);
  const [ngoValidationStatus, setNgoValidationStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    ruc: '',
    organizationName: '',
    corporateEmail: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVolunteerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((data) => {
        setAuthToken(data.access_token);
        onLogin('volunteer', { email: formData.email });
      })
      .catch((err) => {
        alert(err.message || 'Error al iniciar sesión');
      });
  };

  const handleVolunteerSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    apiRequest('/auth/register/volunteer', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        name: formData.email.split('@')[0],
      }),
    })
      .then((data) => {
        setAuthToken(data.access_token);
        onLogin('volunteer', { email: formData.email, isNewUser: true });
      })
      .catch((err) => {
        alert(err.message || 'Error al registrar voluntario');
      });
  };

  const handleNgoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.corporateEmail,
        password: formData.password,
      }),
    })
      .then((data) => {
        setAuthToken(data.access_token);
        onLogin('ngo', { email: formData.corporateEmail, status: 'approved' });
      })
      .catch((err) => {
        alert(err.message || 'Error al iniciar sesión ONG');
      });
  };

  const handleNgoSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      // Validar RUC (simulado)
      if (formData.ruc.length < 8) {
        alert('El RUC debe tener al menos 8 dígitos');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Registro ONG en backend
      apiRequest('/auth/register/ong', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.organizationName,
          email: formData.corporateEmail,
          password: formData.password,
          ruc: formData.ruc ? parseInt(formData.ruc, 10) : undefined,
        }),
      })
        .then((data) => {
          setAuthToken(data.access_token);
          setNgoValidationStatus('pending');
          setStep(3);
        })
        .catch((err) => {
          alert(err.message || 'Error al registrar ONG');
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-primary">Red de Voluntariado</h1>
          <p className="text-muted-foreground">Conectando voluntarios con causas ambientales</p>
        </div>

        <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'login' | 'signup')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="signup">Registrarse</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Tabs value={userType} onValueChange={(value) => setUserType(value as 'volunteer' | 'ngo')}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="volunteer">
                  <User className="h-4 w-4 mr-2" />
                  Voluntario
                </TabsTrigger>
                <TabsTrigger value="ngo">
                  <Building className="h-4 w-4 mr-2" />
                  ONG
                </TabsTrigger>
              </TabsList>

              <TabsContent value="volunteer">
                <Card>
                  <CardHeader>
                    <CardTitle>Acceso Voluntarios</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleVolunteerLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="volunteer-email">Email</Label>
                        <Input
                          id="volunteer-email"
                          type="email"
                          placeholder="tu@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="volunteer-password">Contraseña</Label>
                        <Input
                          id="volunteer-password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Iniciar Sesión como Voluntario
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ngo">
                <Card>
                  <CardHeader>
                    <CardTitle>Acceso ONGs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleNgoLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="ngo-email">Email Corporativo</Label>
                        <Input
                          id="ngo-email"
                          type="email"
                          placeholder="contacto@ong.org"
                          value={formData.corporateEmail}
                          onChange={(e) => handleInputChange('corporateEmail', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ngo-password">Contraseña</Label>
                        <Input
                          id="ngo-password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Iniciar Sesión como ONG
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="signup">
            <Tabs value={userType} onValueChange={(value) => setUserType(value as 'volunteer' | 'ngo')}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="volunteer">
                  <User className="h-4 w-4 mr-2" />
                  Voluntario
                </TabsTrigger>
                <TabsTrigger value="ngo">
                  <Building className="h-4 w-4 mr-2" />
                  ONG
                </TabsTrigger>
              </TabsList>

              <TabsContent value="volunteer">
                <Card>
                  <CardHeader>
                    <CardTitle>Registro de Voluntario</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Únete a nuestra comunidad de voluntarios ambientales
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleVolunteerSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="vol-email">Email</Label>
                        <Input
                          id="vol-email"
                          type="email"
                          placeholder="tu@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vol-password">Contraseña</Label>
                        <Input
                          id="vol-password"
                          type="password"
                          placeholder="Mínimo 8 caracteres"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vol-confirm">Confirmar Contraseña</Label>
                        <Input
                          id="vol-confirm"
                          type="password"
                          placeholder="Repite tu contraseña"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Crear Cuenta de Voluntario
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ngo">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Registro de ONG - Paso {step} de 3
                    </CardTitle>
                    <div className="flex space-x-2 mt-2">
                      <div className={`h-2 w-full rounded ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
                      <div className={`h-2 w-full rounded ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
                      <div className={`h-2 w-full rounded ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {step === 1 && (
                      <form onSubmit={handleNgoSignup} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="org-name">Nombre de la Organización</Label>
                          <Input
                            id="org-name"
                            placeholder="Fundación Verde Futuro"
                            value={formData.organizationName}
                            onChange={(e) => handleInputChange('organizationName', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="org-ruc">RUC de la Organización</Label>
                          <Input
                            id="org-ruc"
                            placeholder="21234567890123"
                            value={formData.ruc}
                            onChange={(e) => handleInputChange('ruc', e.target.value)}
                            required
                          />
                          <p className="text-xs text-muted-foreground">
                            Necesario para verificar la legitimidad de tu organización
                          </p>
                        </div>
                        <Button type="submit" className="w-full">
                          Verificar RUC
                        </Button>
                      </form>
                    )}

                    {step === 2 && (
                      <form onSubmit={handleNgoSignup} className="space-y-4">
                        <Alert>
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>
                            RUC verificado correctamente. Completa tu registro.
                          </AlertDescription>
                        </Alert>
                        
                        <div className="space-y-2">
                          <Label htmlFor="corp-email">Email Corporativo</Label>
                          <Input
                            id="corp-email"
                            type="email"
                            placeholder="contacto@ong.org"
                            value={formData.corporateEmail}
                            onChange={(e) => handleInputChange('corporateEmail', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="corp-password">Contraseña</Label>
                          <Input
                            id="corp-password"
                            type="password"
                            placeholder="Mínimo 8 caracteres"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="corp-confirm">Confirmar Contraseña</Label>
                          <Input
                            id="corp-confirm"
                            type="password"
                            placeholder="Repite tu contraseña"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Enviar para Validación
                        </Button>
                      </form>
                    )}

                    {step === 3 && (
                      <div className="text-center space-y-4">
                        {ngoValidationStatus === 'pending' && (
                          <>
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                              <Clock className="h-8 w-8 text-yellow-600" />
                            </div>
                            <h3 className="font-semibold">Solicitud Enviada</h3>
                            <p className="text-sm text-muted-foreground">
                              Tu cuenta está siendo revisada por nuestro equipo. Te notificaremos por email cuando esté lista.
                            </p>
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                              En revisión (2-3 días hábiles)
                            </Badge>
                          </>
                        )}
                        
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => {
                            setStep(1);
                            setAuthMode('login');
                          }}
                        >
                          Volver al Login
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}