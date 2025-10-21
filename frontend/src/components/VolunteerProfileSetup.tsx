import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { AvailabilityCalendar } from './AvailabilityCalendar';
import { User, Camera, MapPin, Heart, Calendar, CheckCircle } from 'lucide-react';

interface VolunteerProfileSetupProps {
  onComplete: () => void;
}

export function VolunteerProfileSetup({ onComplete }: VolunteerProfileSetupProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState({
    name: '',
    bio: '',
    location: '',
    phone: '',
    interests: [] as string[],
    skills: [] as string[],
    experience: '',
    motivation: '',
    profileImage: null as string | null
  });

  const steps = [
    { id: 'basic', title: 'Información Básica', icon: User },
    { id: 'interests', title: 'Intereses y Habilidades', icon: Heart },
    { id: 'availability', title: 'Disponibilidad', icon: Calendar }
  ];

  const availableInterests = [
    'Limpieza de playas',
    'Reforestación',
    'Educación ambiental',
    'Reciclaje',
    'Conservación marina',
    'Agricultura sostenible',
    'Energías renovables',
    'Protección de fauna',
    'Compostaje',
    'Huertos urbanos'
  ];

  const availableSkills = [
    'Fotografía',
    'Educación/Enseñanza',
    'Organización de eventos',
    'Redes sociales',
    'Primeros auxilios',
    'Cocina',
    'Traducción',
    'Diseño gráfico',
    'Construcción',
    'Jardinería'
  ];

  const handleInputChange = (field: string, value: any) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const toggleSkill = (skill: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Aquí guardarías los datos del perfil
    console.log('Perfil completado:', profileData);
    onComplete();
  };

  const isStepComplete = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return profileData.name && profileData.bio && profileData.location;
      case 1:
        return profileData.interests.length > 0;
      case 2:
        return true; // La disponibilidad es opcional
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-primary">Configurar tu Perfil</h1>
          <p className="text-muted-foreground">
            Completa tu información para conectar con las mejores oportunidades
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep || isStepComplete(index);
              
              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    isCompleted ? 'bg-primary text-white' :
                    isActive ? 'bg-primary/20 text-primary border-2 border-primary' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {isCompleted && index < currentStep ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className={`text-xs text-center ${
                    isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardContent className="p-6">
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">Cuéntanos sobre ti</h2>
                  <p className="text-muted-foreground">
                    Esta información aparecerá en tu perfil público
                  </p>
                </div>

                {/* Profile Photo */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="bg-primary text-white text-2xl">
                        {profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <button className="absolute -bottom-1 -right-1 p-2 bg-primary rounded-full text-white hover:bg-primary/90">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Toca el ícono para agregar una foto
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      placeholder="Tu nombre y apellido"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Descripción personal *</Label>
                    <Textarea
                      id="bio"
                      placeholder="Cuéntanos sobre ti, tus intereses ambientales y por qué quieres ser voluntario..."
                      rows={4}
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      {profileData.bio.length}/500 caracteres
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Ubicación *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="Ciudad, País"
                        className="pl-10"
                        value={profileData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono (opcional)</Label>
                    <Input
                      id="phone"
                      placeholder="+598 99 123 456"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">Tus intereses y habilidades</h2>
                  <p className="text-muted-foreground">
                    Esto nos ayudará a sugerirte actividades relevantes
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label>Áreas de interés ambiental *</Label>
                    <p className="text-sm text-muted-foreground">
                      Selecciona al menos 3 áreas que te interesen
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {availableInterests.map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox
                            id={interest}
                            checked={profileData.interests.includes(interest)}
                            onCheckedChange={() => toggleInterest(interest)}
                          />
                          <Label
                            htmlFor={interest}
                            className="text-sm cursor-pointer"
                          >
                            {interest}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {profileData.interests.map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Habilidades especiales (opcional)</Label>
                    <p className="text-sm text-muted-foreground">
                      ¿Tienes habilidades que puedan ser útiles en el voluntariado?
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {availableSkills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={skill}
                            checked={profileData.skills.includes(skill)}
                            onCheckedChange={() => toggleSkill(skill)}
                          />
                          <Label
                            htmlFor={skill}
                            className="text-sm cursor-pointer"
                          >
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {profileData.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experiencia previa (opcional)</Label>
                    <Textarea
                      id="experience"
                      placeholder="¿Has participado en voluntariados antes? Cuéntanos tu experiencia..."
                      rows={3}
                      value={profileData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation">¿Qué te motiva? (opcional)</Label>
                    <Textarea
                      id="motivation"
                      placeholder="¿Por qué quieres participar en voluntariado ambiental?"
                      rows={3}
                      value={profileData.motivation}
                      onChange={(e) => handleInputChange('motivation', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">Configura tu disponibilidad</h2>
                  <p className="text-muted-foreground">
                    Ayúdanos a encontrar actividades que se ajusten a tu horario
                  </p>
                </div>

                <AvailabilityCalendar />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Anterior
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleComplete}
              className="bg-primary hover:bg-primary/90"
            >
              Completar Perfil
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={!isStepComplete(currentStep)}
              className="bg-primary hover:bg-primary/90"
            >
              Siguiente
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}