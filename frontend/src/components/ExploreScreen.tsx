import { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Calendar, MapPin, Users, Search, Filter, Leaf, TreePine, Recycle, Droplets, Heart, Star, Clock } from 'lucide-react';

export function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [events, setEvents] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [errorEvents, setErrorEvents] = useState<string | null>(null);

  useEffect(() => {
    setLoadingEvents(true);
    apiRequest('/projects')
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
        setErrorEvents(null);
      })
      .catch((err) => {
        setErrorEvents(err.message || 'Error al cargar eventos');
        setEvents([]);
      })
      .finally(() => setLoadingEvents(false));
  }, []);

  const getIcon = (category: string) => {
    switch (category) {
      case 'cleanup': return <Droplets className="h-4 w-4" />;
      case 'reforestation': return <TreePine className="h-4 w-4" />;
      case 'recycling': return <Recycle className="h-4 w-4" />;
      case 'conservation': return <Heart className="h-4 w-4" />;
      default: return <Leaf className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cleanup': return 'bg-blue-100 text-blue-700';
      case 'reforestation': return 'bg-green-100 text-green-700';
      case 'recycling': return 'bg-yellow-100 text-yellow-700';
      case 'conservation': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-100 text-green-700';
      case 'Moderado': return 'bg-yellow-100 text-yellow-700';
      case 'Avanzado': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.organization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || 
                           event.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesDate = !selectedDate || event.date.includes(selectedDate.split('-').reverse().join(' '));
    
    return matchesSearch && matchesCategory && matchesLocation && matchesDate;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Explorar Eventos</h2>
        <p className="text-muted-foreground">Encuentra oportunidades de voluntariado ambiental</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar eventos, organizaciones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex space-x-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="cleanup">Limpieza</SelectItem>
              <SelectItem value="reforestation">Reforestación</SelectItem>
              <SelectItem value="recycling">Reciclaje</SelectItem>
              <SelectItem value="conservation">Conservación</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Ubicación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="montevideo">Montevideo</SelectItem>
              <SelectItem value="canelones">Canelones</SelectItem>
              <SelectItem value="maldonado">Maldonado</SelectItem>
              <SelectItem value="colonia">Colonia</SelectItem>
              <SelectItem value="paysandu">Paysandú</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={showFilters} onOpenChange={setShowFilters}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filtros Avanzados</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha específica</label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rango de fechas</label>
                  <div className="flex space-x-2">
                    <Input type="date" placeholder="Desde" />
                    <Input type="date" placeholder="Hasta" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Nivel de dificultad</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Cualquier nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Cualquier nivel</SelectItem>
                      <SelectItem value="easy">Fácil</SelectItem>
                      <SelectItem value="moderate">Moderado</SelectItem>
                      <SelectItem value="hard">Avanzado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Duración</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Cualquier duración" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Cualquier duración</SelectItem>
                      <SelectItem value="1-2">1-2 horas</SelectItem>
                      <SelectItem value="2-4">2-4 horas</SelectItem>
                      <SelectItem value="4-6">4-6 horas</SelectItem>
                      <SelectItem value="full">Día completo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1" onClick={() => {
                    setSelectedCategory('all');
                    setSelectedLocation('all');
                    setSelectedDate('');
                  }}>
                    Limpiar
                  </Button>
                  <Button className="flex-1" onClick={() => setShowFilters(false)}>
                    Aplicar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Filters */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className="whitespace-nowrap"
          >
            Todos
          </Button>
          <Button
            variant={selectedCategory === 'cleanup' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('cleanup')}
            className="whitespace-nowrap"
          >
            <Droplets className="h-3 w-3 mr-1" />
            Limpieza
          </Button>
          <Button
            variant={selectedCategory === 'reforestation' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('reforestation')}
            className="whitespace-nowrap"
          >
            <TreePine className="h-3 w-3 mr-1" />
            Reforestación
          </Button>
          <Button
            variant={selectedCategory === 'recycling' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('recycling')}
            className="whitespace-nowrap"
          >
            <Recycle className="h-3 w-3 mr-1" />
            Reciclaje
          </Button>
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredEvents.length} evento{filteredEvents.length !== 1 ? 's' : ''} encontrado{filteredEvents.length !== 1 ? 's' : ''}
          </p>
          <Button variant="ghost" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filtros
          </Button>
        </div>

        {loadingEvents && (
          <div className="text-center py-6 text-muted-foreground">Cargando eventos...</div>
        )}
        {errorEvents && (
          <div className="text-center py-6 text-red-500">{errorEvents}</div>
        )}
        <div className="space-y-4">
          {!loadingEvents && !errorEvents && filteredEvents.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">No hay eventos disponibles.</div>
          )}
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-24 h-24 bg-muted flex items-center justify-center">
                    <div className={`p-3 rounded-lg ${getCategoryColor(event.category)}`}>
                      {getIcon(event.category)}
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium line-clamp-2">{event.title || event.name}</h4>
                        <p className="text-sm text-muted-foreground">{event.organization || event.orgName}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{event.rating || event.status}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-1 mb-3">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {event.date || event.startDate} • {event.time || event.endDate}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Users className="h-3 w-3 mr-1" />
                        {event.volunteersNeeded || event.volunteers}/{event.maxVolunteers} voluntarios
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        <Badge variant="secondary" className={getCategoryColor(event.category)}>
                          {event.category === 'cleanup' && 'Limpieza'}
                          {event.category === 'reforestation' && 'Reforestación'}
                          {event.category === 'recycling' && 'Reciclaje'}
                          {event.category === 'conservation' && 'Conservación'}
                        </Badge>
                        <Badge variant="outline" className={getDifficultyColor(event.difficulty)}>
                          {event.difficulty}
                        </Badge>
                      </div>
                      <Button size="sm">
                        Unirse
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}