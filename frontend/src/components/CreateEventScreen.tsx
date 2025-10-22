import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Calendar, MapPin, Users, Clock, Upload, Plus, Award, Settings, Eye, Trash2 } from 'lucide-react';

interface CertificateTemplate {
  id: string;
  name: string;
  type: 'participation' | 'leadership' | 'excellence' | 'custom';
  description: string;
  template: string;
  customFields: Array<{
    name: string;
    placeholder: string;
    required: boolean;
  }>;
  backgroundColor: string;
  textColor: string;
  logoPosition: 'top' | 'left' | 'right' | 'bottom';
}

interface CreateEventScreenProps {
  userType: 'volunteer' | 'ngo';
}

export function CreateEventScreen({ userType }: CreateEventScreenProps) {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    duration: '',
    location: '',
    address: '',
    maxVolunteers: '',
    difficulty: '',
    requirements: '',
    materials: ''
  });

  const [certificateSettings, setCertificateSettings] = useState({
    enabled: false,
    automaticGeneration: true,
    templates: [] as CertificateTemplate[],
    selectedTemplate: '',
    customMessage: '',
    requiredHours: 0,
    conditions: [] as string[]
  });

  const [showCertificateEditor, setShowCertificateEditor] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<CertificateTemplate>({
    id: '',
    name: '',
    type: 'participation',
    description: '',
    template: '',
    customFields: [],
    backgroundColor: '#f0f9f2',
    textColor: '#16803d',
    logoPosition: 'top'
  });

  const defaultTemplates: CertificateTemplate[] = [
    {
      id: 'participation',
      name: 'Certificado de Participación',
      type: 'participation',
      description: 'Certificado estándar para todos los participantes que completen el evento',
      template: 'Se certifica que {nombre} ha participado exitosamente en el evento {evento} realizado el {fecha} en {ubicación}.',
      customFields: [],
      backgroundColor: '#f0f9f2',
      textColor: '#16803d',
      logoPosition: 'top'
    },
    {
      id: 'leadership',
      name: 'Certificado de Liderazgo',
      type: 'leadership',
      description: 'Para voluntarios que demostraron habilidades de liderazgo durante el evento',
      template: 'Se certifica que {nombre} ha demostrado excepcionales habilidades de liderazgo durante el evento {evento}, coordinando actividades y motivando al equipo.',
      customFields: [
        { name: 'Actividad liderada', placeholder: 'Ej: Coordinación del grupo de limpieza', required: true },
        { name: 'Número de voluntarios coordinados', placeholder: 'Ej: 15', required: false }
      ],
      backgroundColor: '#eff6ff',
      textColor: '#1d4ed8',
      logoPosition: 'top'
    },
    {
      id: 'excellence',
      name: 'Certificado de Excelencia',
      type: 'excellence',
      description: 'Para voluntarios que superaron las expectativas y mostraron dedicación excepcional',
      template: 'Se certifica que {nombre} ha demostrado un desempeño excepcional y dedicación extraordinaria durante el evento {evento}, superando las expectativas establecidas.',
      customFields: [
        { name: 'Logro específico', placeholder: 'Ej: Lideró la recolección de 200kg de residuos', required: true },
        { name: 'Reconocimiento especial', placeholder: 'Ej: Voluntario del mes', required: false }
      ],
      backgroundColor: '#fefce8',
      textColor: '#ca8a04',
      logoPosition: 'top'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const handleCertificateSettingChange = (field: string, value: any) => {
    setCertificateSettings(prev => ({ ...prev, [field]: value }));
  };

  const addCertificateTemplate = () => {
    const newTemplate: CertificateTemplate = {
      ...currentTemplate,
      id: Date.now().toString(),
    };
    setCertificateSettings(prev => ({
      ...prev,
      templates: [...prev.templates, newTemplate]
    }));
    setCurrentTemplate({
      id: '',
      name: '',
      type: 'participation',
      description: '',
      template: '',
      customFields: [],
      backgroundColor: '#f0f9f2',
      textColor: '#16803d',
      logoPosition: 'top'
    });
    setShowCertificateEditor(false);
  };

  const removeCertificateTemplate = (templateId: string) => {
    setCertificateSettings(prev => ({
      ...prev,
      templates: prev.templates.filter(t => t.id !== templateId)
    }));
  };

  const addCustomField = () => {
    setCurrentTemplate(prev => ({
      ...prev,
      customFields: [...prev.customFields, { name: '', placeholder: '', required: false }]
    }));
  };

  const updateCustomField = (index: number, field: string, value: any) => {
    setCurrentTemplate(prev => ({
      ...prev,
      customFields: prev.customFields.map((cf, i) => 
        i === index ? { ...cf, [field]: value } : cf
      )
    }));
  };

  const removeCustomField = (index: number) => {
    setCurrentTemplate(prev => ({
      ...prev,
      customFields: prev.customFields.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    console.log('Event created:', eventData);
    console.log('Certificate settings:', certificateSettings);
    // Here you would typically save the event and certificate settings
    alert('¡Evento creado exitosamente con configuración de certificados!');
  };

  if (userType === 'volunteer') {
    // For volunteers, show their registered events instead
    const myEvents = [
      {
        id: 1,
        title: 'Limpieza de Playa Pocitos',
        date: '15 Oct, 2024',
        status: 'Confirmado',
        organization: 'EcoUruguay'
      },
      {
        id: 2,
        title: 'Plantación de Árboles',
        date: '18 Oct, 2024',
        status: 'Pendiente',
        organization: 'Verde Futuro'
      }
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Mis Eventos</h2>
          <p className="text-muted-foreground">Eventos en los que participas</p>
        </div>

        <div className="space-y-4">
          {myEvents.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.organization}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      event.status === 'Confirmado' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {event.status}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button className="w-full" onClick={() => window.location.href = '#explore'}>
          <Plus className="h-4 w-4 mr-2" />
          Buscar más eventos
        </Button>
      </div>
    );
  }

  // For NGOs, show event creation form
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Crear Evento</h2>
        <p className="text-muted-foreground">Organiza una nueva actividad de voluntariado</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Evento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título del evento *</Label>
            <Input
              id="title"
              placeholder="Ej: Limpieza de Playa Pocitos"
              value={eventData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              placeholder="Describe el evento, objetivos y actividades..."
              rows={3}
              value={eventData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría *</Label>
            <Select value={eventData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cleanup">Limpieza ambiental</SelectItem>
                <SelectItem value="reforestation">Reforestación</SelectItem>
                <SelectItem value="recycling">Reciclaje</SelectItem>
                <SelectItem value="conservation">Conservación</SelectItem>
                <SelectItem value="education">Educación ambiental</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fecha y Ubicación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Fecha *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  className="pl-10"
                  value={eventData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Hora *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  className="pl-10"
                  value={eventData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duración estimada</Label>
            <Select value={eventData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona la duración" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2">1-2 horas</SelectItem>
                <SelectItem value="2-4">2-4 horas</SelectItem>
                <SelectItem value="4-6">4-6 horas</SelectItem>
                <SelectItem value="full-day">Día completo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Lugar *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Ej: Playa Pocitos"
                className="pl-10"
                value={eventData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Dirección completa</Label>
            <Input
              id="address"
              placeholder="Dirección exacta del punto de encuentro"
              value={eventData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detalles de Participación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="maxVolunteers">Número máximo de voluntarios *</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="maxVolunteers"
                type="number"
                placeholder="20"
                className="pl-10"
                value={eventData.maxVolunteers}
                onChange={(e) => handleInputChange('maxVolunteers', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Nivel de dificultad</Label>
            <Select value={eventData.difficulty} onValueChange={(value) => handleInputChange('difficulty', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el nivel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Fácil - Para todos</SelectItem>
                <SelectItem value="moderate">Moderado - Requiere esfuerzo físico</SelectItem>
                <SelectItem value="hard">Avanzado - Alta exigencia física</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requisitos para participar</Label>
            <Textarea
              id="requirements"
              placeholder="Edad mínima, experiencia previa, condición física, etc."
              rows={2}
              value={eventData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="materials">Materiales proporcionados/necesarios</Label>
            <Textarea
              id="materials"
              placeholder="Qué materiales proporcionarás y qué deben traer los voluntarios"
              rows={2}
              value={eventData.materials}
              onChange={(e) => handleInputChange('materials', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Imágenes del Evento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Sube imágenes para hacer tu evento más atractivo
            </p>
            <Button variant="outline" size="sm">
              Seleccionar imágenes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sección de Certificados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Certificados de Participación
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Configura certificados personalizados para los voluntarios
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Habilitar certificados</h4>
              <p className="text-sm text-muted-foreground">
                Generar certificados automáticamente para los participantes
              </p>
            </div>
            <Switch
              checked={certificateSettings.enabled}
              onCheckedChange={(value) => handleCertificateSettingChange('enabled', value)}
            />
          </div>

          {certificateSettings.enabled && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Generación automática</h4>
                  <p className="text-sm text-muted-foreground">
                    Generar certificados al confirmar asistencia del voluntario
                  </p>
                </div>
                <Switch
                  checked={certificateSettings.automaticGeneration}
                  onCheckedChange={(value) => handleCertificateSettingChange('automaticGeneration', value)}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Plantillas de Certificados</h4>
                  <Dialog open={showCertificateEditor} onOpenChange={setShowCertificateEditor}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Plantilla
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Crear Plantilla de Certificado</DialogTitle>
                      </DialogHeader>
                      
                      <Tabs defaultValue="basic" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="basic">Información Básica</TabsTrigger>
                          <TabsTrigger value="design">Diseño</TabsTrigger>
                          <TabsTrigger value="preview">Vista Previa</TabsTrigger>
                        </TabsList>

                        <TabsContent value="basic" className="space-y-4">
                          <div className="space-y-2">
                            <Label>Nombre de la plantilla</Label>
                            <Input
                              placeholder="Ej: Certificado de Liderazgo Ambiental"
                              value={currentTemplate.name}
                              onChange={(e) => setCurrentTemplate(prev => ({ ...prev, name: e.target.value }))}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Tipo de certificado</Label>
                            <Select 
                              value={currentTemplate.type} 
                              onValueChange={(value: any) => setCurrentTemplate(prev => ({ ...prev, type: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="participation">Participación</SelectItem>
                                <SelectItem value="leadership">Liderazgo</SelectItem>
                                <SelectItem value="excellence">Excelencia</SelectItem>
                                <SelectItem value="custom">Personalizado</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Descripción</Label>
                            <Textarea
                              placeholder="Describe cuándo se otorgará este certificado"
                              value={currentTemplate.description}
                              onChange={(e) => setCurrentTemplate(prev => ({ ...prev, description: e.target.value }))}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Texto del certificado</Label>
                            <Textarea
                              placeholder="Usa {nombre}, {evento}, {fecha}, {ubicación} como variables"
                              rows={4}
                              value={currentTemplate.template}
                              onChange={(e) => setCurrentTemplate(prev => ({ ...prev, template: e.target.value }))}
                            />
                            <p className="text-xs text-muted-foreground">
                              Variables disponibles: {'{nombre}'}, {'{evento}'}, {'{fecha}'}, {'{ubicación}'}, {'{organización}'}
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Label>Campos personalizados</Label>
                              <Button size="sm" variant="outline" onClick={addCustomField}>
                                <Plus className="h-3 w-3 mr-1" />
                                Agregar campo
                              </Button>
                            </div>
                            
                            {currentTemplate.customFields.map((field, index) => (
                              <div key={index} className="p-3 border rounded-lg space-y-2">
                                <div className="flex items-center justify-between">
                                  <h5 className="font-medium text-sm">Campo {index + 1}</h5>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => removeCustomField(index)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <Input
                                    placeholder="Nombre del campo"
                                    value={field.name}
                                    onChange={(e) => updateCustomField(index, 'name', e.target.value)}
                                  />
                                  <Input
                                    placeholder="Texto de ejemplo"
                                    value={field.placeholder}
                                    onChange={(e) => updateCustomField(index, 'placeholder', e.target.value)}
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    checked={field.required}
                                    onCheckedChange={(value) => updateCustomField(index, 'required', value)}
                                  />
                                  <Label className="text-sm">Campo obligatorio</Label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="design" className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Color de fondo</Label>
                              <div className="flex space-x-2">
                                <Input
                                  type="color"
                                  value={currentTemplate.backgroundColor}
                                  onChange={(e) => setCurrentTemplate(prev => ({ ...prev, backgroundColor: e.target.value }))}
                                  className="w-16"
                                />
                                <Input
                                  placeholder="#f0f9f2"
                                  value={currentTemplate.backgroundColor}
                                  onChange={(e) => setCurrentTemplate(prev => ({ ...prev, backgroundColor: e.target.value }))}
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Color del texto</Label>
                              <div className="flex space-x-2">
                                <Input
                                  type="color"
                                  value={currentTemplate.textColor}
                                  onChange={(e) => setCurrentTemplate(prev => ({ ...prev, textColor: e.target.value }))}
                                  className="w-16"
                                />
                                <Input
                                  placeholder="#16803d"
                                  value={currentTemplate.textColor}
                                  onChange={(e) => setCurrentTemplate(prev => ({ ...prev, textColor: e.target.value }))}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Posición del logo</Label>
                            <Select 
                              value={currentTemplate.logoPosition} 
                              onValueChange={(value: any) => setCurrentTemplate(prev => ({ ...prev, logoPosition: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="top">Arriba</SelectItem>
                                <SelectItem value="left">Izquierda</SelectItem>
                                <SelectItem value="right">Derecha</SelectItem>
                                <SelectItem value="bottom">Abajo</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TabsContent>

                        <TabsContent value="preview" className="space-y-4">
                          <div className="border-2 border-dashed border-border rounded-lg p-8">
                            <div 
                              className="p-8 rounded-lg text-center"
                              style={{ 
                                backgroundColor: currentTemplate.backgroundColor,
                                color: currentTemplate.textColor,
                                border: `2px solid ${currentTemplate.textColor}20`
                              }}
                            >
                              <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                  <Award className="h-8 w-8 text-white" />
                                </div>
                                <h2 className="text-xl font-bold mb-2">{currentTemplate.name || 'Nombre del Certificado'}</h2>
                                <p className="text-sm opacity-70">Red de Voluntariado Ambiental</p>
                              </div>
                              
                              <div className="space-y-4">
                                <p className="text-lg">Se certifica que</p>
                                <div className="text-2xl font-bold">
                                  [Nombre del Voluntario]
                                </div>
                                <p className="leading-relaxed">
                                  {currentTemplate.template || 'Texto del certificado aparecerá aquí...'}
                                </p>
                                
                                {currentTemplate.customFields.length > 0 && (
                                  <div className="mt-6 space-y-2">
                                    {currentTemplate.customFields.map((field, index) => (
                                      <div key={index} className="text-sm">
                                        <strong>{field.name}:</strong> {field.placeholder}
                                      </div>
                                    ))}
                                  </div>
                                )}
                                
                                <div className="mt-6 text-sm opacity-70">
                                  Emitido el [Fecha] por [Organización]
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>

                      <div className="flex space-x-2 pt-4">
                        <Button variant="outline" className="flex-1" onClick={() => setShowCertificateEditor(false)}>
                          Cancelar
                        </Button>
                        <Button className="flex-1" onClick={addCertificateTemplate}>
                          Guardar Plantilla
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Plantillas Predeterminadas */}
                <div className="space-y-3">
                  <h5 className="font-medium text-sm">Plantillas Predeterminadas</h5>
                  <div className="grid gap-3">
                    {defaultTemplates.map((template) => (
                      <div key={template.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h6 className="font-medium">{template.name}</h6>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Badge variant="secondary">
                              {template.type === 'participation' && 'Participación'}
                              {template.type === 'leadership' && 'Liderazgo'}
                              {template.type === 'excellence' && 'Excelencia'}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setCertificateSettings(prev => ({
                                  ...prev,
                                  templates: [...prev.templates, { ...template, id: Date.now().toString() }]
                                }));
                              }}
                            >
                              Usar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plantillas Personalizadas */}
                {certificateSettings.templates.length > 0 && (
                  <div className="space-y-3">
                    <h5 className="font-medium text-sm">Plantillas del Evento</h5>
                    <div className="space-y-3">
                      {certificateSettings.templates.map((template) => (
                        <div key={template.id} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <h6 className="font-medium">{template.name}</h6>
                              <p className="text-sm text-muted-foreground">{template.description}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Badge variant="outline">
                                {template.type === 'participation' && 'Participación'}
                                {template.type === 'leadership' && 'Liderazgo'}
                                {template.type === 'excellence' && 'Excelencia'}
                                {template.type === 'custom' && 'Personalizado'}
                              </Badge>
                              <Button size="sm" variant="ghost">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => removeCertificateTemplate(template.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Configuraciones Adicionales */}
                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label>Horas mínimas para certificado</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={certificateSettings.requiredHours}
                      onChange={(e) => handleCertificateSettingChange('requiredHours', parseInt(e.target.value) || 0)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Número mínimo de horas que debe participar el voluntario para recibir certificado
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Mensaje personalizado (opcional)</Label>
                    <Textarea
                      placeholder="Mensaje adicional que aparecerá en todos los certificados de este evento"
                      value={certificateSettings.customMessage}
                      onChange={(e) => handleCertificateSettingChange('customMessage', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex space-x-3">
        <Button variant="outline" className="flex-1">
          Guardar como borrador
        </Button>
        <Button className="flex-1" onClick={handleSubmit}>
          Publicar evento
        </Button>
      </div>
    </div>
  );
}