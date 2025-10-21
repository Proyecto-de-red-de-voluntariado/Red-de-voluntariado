import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, Clock, Plus, X } from 'lucide-react';

interface TimeSlot {
  id: string;
  start: string;
  end: string;
}

interface DayAvailability {
  isAvailable: boolean;
  timeSlots: TimeSlot[];
}

interface WeekAvailability {
  monday: DayAvailability;
  tuesday: DayAvailability;
  wednesday: DayAvailability;
  thursday: DayAvailability;
  friday: DayAvailability;
  saturday: DayAvailability;
  sunday: DayAvailability;
}

export function AvailabilityCalendar() {
  const [availability, setAvailability] = useState<WeekAvailability>({
    monday: { isAvailable: false, timeSlots: [] },
    tuesday: { isAvailable: false, timeSlots: [] },
    wednesday: { isAvailable: false, timeSlots: [] },
    thursday: { isAvailable: false, timeSlots: [] },
    friday: { isAvailable: false, timeSlots: [] },
    saturday: { isAvailable: true, timeSlots: [{ id: '1', start: '09:00', end: '17:00' }] },
    sunday: { isAvailable: true, timeSlots: [{ id: '2', start: '10:00', end: '16:00' }] }
  });

  const dayNames = {
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };

  const toggleDayAvailability = (day: keyof WeekAvailability) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        isAvailable: !prev[day].isAvailable,
        timeSlots: !prev[day].isAvailable ? [{ id: Date.now().toString(), start: '09:00', end: '17:00' }] : []
      }
    }));
  };

  const addTimeSlot = (day: keyof WeekAvailability) => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      start: '09:00',
      end: '17:00'
    };

    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: [...prev[day].timeSlots, newSlot]
      }
    }));
  };

  const removeTimeSlot = (day: keyof WeekAvailability, slotId: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: prev[day].timeSlots.filter(slot => slot.id !== slotId)
      }
    }));
  };

  const updateTimeSlot = (day: keyof WeekAvailability, slotId: string, field: 'start' | 'end', value: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: prev[day].timeSlots.map(slot =>
          slot.id === slotId ? { ...slot, [field]: value } : slot
        )
      }
    }));
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 6; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(timeString);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const getAvailabilityStats = () => {
    const availableDays = Object.values(availability).filter(day => day.isAvailable).length;
    const totalSlots = Object.values(availability).reduce((total, day) => total + day.timeSlots.length, 0);
    return { availableDays, totalSlots };
  };

  const { availableDays, totalSlots } = getAvailabilityStats();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Configurar Disponibilidad
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Define cuándo estás disponible para participar en actividades de voluntariado
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{availableDays}</div>
              <div className="text-sm text-muted-foreground">Días disponibles</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{totalSlots}</div>
              <div className="text-sm text-muted-foreground">Franjas horarias</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {Object.entries(availability).map(([day, dayData]) => (
          <Card key={day}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Label className="font-medium">{dayNames[day as keyof typeof dayNames]}</Label>
                  {dayData.isAvailable && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Disponible
                    </Badge>
                  )}
                </div>
                <Switch
                  checked={dayData.isAvailable}
                  onCheckedChange={() => toggleDayAvailability(day as keyof WeekAvailability)}
                />
              </div>

              {dayData.isAvailable && (
                <div className="space-y-3">
                  {dayData.timeSlots.map((slot) => (
                    <div key={slot.id} className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      
                      <Select
                        value={slot.start}
                        onValueChange={(value) => updateTimeSlot(day as keyof WeekAvailability, slot.id, 'start', value)}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <span className="text-muted-foreground">a</span>

                      <Select
                        value={slot.end}
                        onValueChange={(value) => updateTimeSlot(day as keyof WeekAvailability, slot.id, 'end', value)}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTimeSlot(day as keyof WeekAvailability, slot.id)}
                        className="ml-auto p-1"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addTimeSlot(day as keyof WeekAvailability)}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar horario
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" className="flex-1">
          Restablecer
        </Button>
        <Button className="flex-1">
          Guardar Disponibilidad
        </Button>
      </div>

      {/* Quick Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Plantillas Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              // Plantilla: Solo fines de semana
              const weekendTemplate: WeekAvailability = {
                monday: { isAvailable: false, timeSlots: [] },
                tuesday: { isAvailable: false, timeSlots: [] },
                wednesday: { isAvailable: false, timeSlots: [] },
                thursday: { isAvailable: false, timeSlots: [] },
                friday: { isAvailable: false, timeSlots: [] },
                saturday: { isAvailable: true, timeSlots: [{ id: Date.now().toString(), start: '09:00', end: '17:00' }] },
                sunday: { isAvailable: true, timeSlots: [{ id: (Date.now() + 1).toString(), start: '09:00', end: '17:00' }] }
              };
              setAvailability(weekendTemplate);
            }}
          >
            Solo Fines de Semana (Sáb-Dom 9:00-17:00)
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              // Plantilla: Tardes entre semana
              const eveningTemplate: WeekAvailability = {
                monday: { isAvailable: true, timeSlots: [{ id: Date.now().toString(), start: '17:00', end: '20:00' }] },
                tuesday: { isAvailable: true, timeSlots: [{ id: (Date.now() + 1).toString(), start: '17:00', end: '20:00' }] },
                wednesday: { isAvailable: true, timeSlots: [{ id: (Date.now() + 2).toString(), start: '17:00', end: '20:00' }] },
                thursday: { isAvailable: true, timeSlots: [{ id: (Date.now() + 3).toString(), start: '17:00', end: '20:00' }] },
                friday: { isAvailable: true, timeSlots: [{ id: (Date.now() + 4).toString(), start: '17:00', end: '20:00' }] },
                saturday: { isAvailable: false, timeSlots: [] },
                sunday: { isAvailable: false, timeSlots: [] }
              };
              setAvailability(eveningTemplate);
            }}
          >
            Tardes Entre Semana (Lun-Vie 17:00-20:00)
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              // Plantilla: Disponibilidad completa
              const fullTemplate: WeekAvailability = {
                monday: { isAvailable: true, timeSlots: [{ id: Date.now().toString(), start: '09:00', end: '17:00' }] },
                tuesday: { isAvailable: true, timeSlots: [{ id: (Date.now() + 1).toString(), start: '09:00', end: '17:00' }] },
                wednesday: { isAvailable: true, timeSlots: [{ id: (Date.now() + 2).toString(), start: '09:00', end: '17:00' }] },
                thursday: { isAvailable: true, timeSlots: [{ id: (Date.now() + 3).toString(), start: '09:00', end: '17:00' }] },
                friday: { isAvailable: true, timeSlots: [{ id: (Date.now() + 4).toString(), start: '09:00', end: '17:00' }] },
                saturday: { isAvailable: true, timeSlots: [{ id: (Date.now() + 5).toString(), start: '09:00', end: '17:00' }] },
                sunday: { isAvailable: true, timeSlots: [{ id: (Date.now() + 6).toString(), start: '09:00', end: '17:00' }] }
              };
              setAvailability(fullTemplate);
            }}
          >
            Todos los Días (9:00-17:00)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}