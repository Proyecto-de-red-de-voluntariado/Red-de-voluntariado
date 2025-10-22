import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Download, Award, Calendar, Clock, MapPin, Leaf } from 'lucide-react';
import { apiRequest } from '../utils/api';

interface Certificate {
  id: string;
  volunteerName: string;
  volunteerEmail: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  organizationName: string;
  organizationLogo?: string;
  hoursCompleted: number;
  certificateType: 'participation' | 'leadership' | 'excellence';
  issueDate: string;
  certificateNumber: string;
}

interface CertificateGeneratorProps {
  certificate: Certificate;
  onDownload?: () => void;
}

export function CertificateGenerator({ certificate, onDownload }: CertificateGeneratorProps) {
  // Ejemplo de integración real: obtener certificado por ID
  const [cert, setCert] = useState<Certificate | null>(certificate || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!certificate?.id) return;
    setLoading(true);
    apiRequest(`/certificates/${certificate.id}`)
      .then((data) => {
        setCert(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'Error al cargar certificado');
        setCert(null);
      })
      .finally(() => setLoading(false));
  }, [certificate?.id]);

  const getCertificateTypeInfo = (type: string) => {
    switch (type) {
      case 'leadership':
        return {
          title: 'Certificado de Liderazgo',
          color: 'bg-blue-50 border-blue-200 text-blue-800',
          icon: '👑'
        };
      case 'excellence':
        return {
          title: 'Certificado de Excelencia',
          color: 'bg-purple-50 border-purple-200 text-purple-800',
          icon: '🏆'
        };
      default:
        return {
          title: 'Certificado de Participación',
          color: 'bg-green-50 border-green-200 text-green-800',
          icon: '🌿'
        };
    }
  };

  if (loading) {
    return <div className="text-center py-6 text-muted-foreground">Cargando certificado...</div>;
  }
  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }
  if (!cert) {
    return <div className="text-center py-6 text-muted-foreground">No se encontró el certificado.</div>;
  }

  const typeInfo = getCertificateTypeInfo(cert.certificateType);

  const handleDownloadPDF = () => {
    // Aquí implementarías la generación del PDF
    console.log('Generando PDF para certificado:', cert.id);
    if (onDownload) onDownload();
  };

  return (
    <div className="space-y-4">
      {/* Certificate Preview */}
      <Card className={`${typeInfo.color} border-2`}>
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mr-4">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-primary">Red de Voluntariado Ambiental</h1>
                <p className="text-sm text-muted-foreground">Certificado Oficial</p>
              </div>
            </div>
            
            <div className="text-4xl mb-2">{typeInfo.icon}</div>
            <h2 className="text-xl font-bold mb-2">{typeInfo.title}</h2>
            <p className="text-sm text-muted-foreground">
              Certificado N° {cert.certificateNumber}
            </p>
          </div>

          {/* Content */}
          <div className="text-center space-y-4">
            <p className="text-lg">
              Se certifica que
            </p>
            
            <div className="my-6">
              <h3 className="text-2xl font-bold text-primary mb-2">
                {cert.volunteerName}
              </h3>
              <p className="text-sm text-muted-foreground">
                {cert.volunteerEmail}
              </p>
            </div>

            <p className="text-base leading-relaxed">
              Ha participado exitosamente en la actividad de voluntariado ambiental
            </p>

            <div className="bg-white/70 rounded-lg p-4 my-6">
              <h4 className="font-semibold text-lg mb-2">{cert.eventTitle}</h4>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {cert.eventDate}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {cert.eventLocation}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {cert.hoursCompleted} horas
                </div>
              </div>
            </div>

            <p className="text-base">
              Contribuyendo al cuidado del medio ambiente y la construcción de un futuro sostenible.
            </p>

            {/* Organization Info */}
            <div className="flex items-center justify-center mt-8 pt-4 border-t">
              <Avatar className="h-12 w-12 mr-3">
                <AvatarFallback className="bg-primary text-white">
                  {cert.organizationName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-semibold">{cert.organizationName}</p>
                <p className="text-sm text-muted-foreground">
                  Emitido el {cert.issueDate}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex space-x-3">
        <Button onClick={handleDownloadPDF} className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          Descargar PDF
        </Button>
        
        <Button variant="outline" className="flex-1">
          Compartir
        </Button>
      </div>

      {/* Certificate Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Detalles del Certificado
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tipo:</span>
            <Badge className={typeInfo.color}>
              {typeInfo.title}
            </Badge>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Número:</span>
            <span className="font-mono text-sm">{cert.certificateNumber}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Fecha de emisión:</span>
            <span>{cert.issueDate}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Horas completadas:</span>
            <span>{cert.hoursCompleted}h</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Organización emisora:</span>
            <span>{cert.organizationName}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Component for displaying a list of certificates
interface CertificateListProps {
  certificates: Certificate[];
}

export function CertificateList({ certificates }: CertificateListProps) {
  return (
    <div className="space-y-4">
      {certificates.map((cert) => {
        const typeInfo = getCertificateTypeInfo(cert.certificateType);
        
        return (
          <Card key={cert.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{typeInfo.icon}</div>
                  <div>
                    <h4 className="font-medium">{cert.eventTitle}</h4>
                    <p className="text-sm text-muted-foreground">{cert.organizationName}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs text-muted-foreground">{cert.eventDate}</span>
                      <span className="text-xs text-muted-foreground">{cert.hoursCompleted}h</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={typeInfo.color} variant="outline">
                    {typeInfo.title.split(' ')[2]} {/* Solo el tipo */}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function getCertificateTypeInfo(type: string) {
  switch (type) {
    case 'leadership':
      return {
        title: 'Certificado de Liderazgo',
        color: 'bg-blue-50 border-blue-200 text-blue-800',
        icon: '👑'
      };
    case 'excellence':
      return {
        title: 'Certificado de Excelencia',
        color: 'bg-purple-50 border-purple-200 text-purple-800',
        icon: '🏆'
      };
    default:
      return {
        title: 'Certificado de Participación',
        color: 'bg-green-50 border-green-200 text-green-800',
        icon: '🌿'
      };
  }
}