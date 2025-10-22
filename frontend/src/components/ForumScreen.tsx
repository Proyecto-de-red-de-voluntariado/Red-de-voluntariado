import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MessageSquare, Plus, Heart, Reply, Search, TrendingUp, Clock, Users, Leaf } from 'lucide-react';

export function ForumScreen() {
  const [activeTab, setActiveTab] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');

  const forumPosts = [
    {
      id: 1,
      title: '¿Mejores prácticas para limpiezas de playa?',
      author: 'María González',
      authorInitials: 'MG',
      category: 'Limpieza',
      content: 'Hola comunidad! Estoy organizando mi primera limpieza de playa y me gustaría conocer sus experiencias. ¿Qué materiales recomiendan llevar? ¿Cómo organizan a los voluntarios?',
      time: '2 horas',
      replies: 8,
      likes: 15,
      tags: ['limpieza', 'playa', 'consejos'],
      trending: true
    },
    {
      id: 2,
      title: 'Especies nativas para reforestación urbana',
      author: 'Carlos Verde',
      authorInitials: 'CV',
      category: 'Reforestación',
      content: '¿Alguien tiene experiencia plantando árboles nativos en Montevideo? Estoy buscando especies que se adapten bien al clima urbano y no requieran mucho mantenimiento.',
      time: '5 horas',
      replies: 12,
      likes: 23,
      tags: ['reforestación', 'especies-nativas', 'montevideo'],
      trending: false
    },
    {
      id: 3,
      title: 'Proyecto de compostaje comunitario',
      author: 'Ana Ecología',
      authorInitials: 'AE',
      category: 'Reciclaje',
      content: 'Queremos iniciar un proyecto de compostaje en nuestro barrio. ¿Alguien tiene experiencia con composteras comunitarias? ¿Qué permisos necesitamos?',
      time: '1 día',
      replies: 6,
      likes: 18,
      tags: ['compostaje', 'comunidad', 'reciclaje'],
      trending: false
    },
    {
      id: 4,
      title: '¡Gran éxito en la limpieza de Pocitos!',
      author: 'EcoUruguay',
      authorInitials: 'EU',
      category: 'Celebración',
      content: 'Quería agradecer a todos los 25 voluntarios que participaron en la limpieza de Playa Pocitos. Recolectamos más de 150kg de residuos. ¡Fotos en los comentarios!',
      time: '2 días',
      replies: 24,
      likes: 87,
      tags: ['limpieza', 'pocitos', 'éxito'],
      trending: true
    }
  ];

  const categories = [
    { id: 'all', name: 'Todas', count: 156 },
    { id: 'cleanup', name: 'Limpieza', count: 43 },
    { id: 'reforestation', name: 'Reforestación', count: 28 },
    { id: 'recycling', name: 'Reciclaje', count: 35 },
    { id: 'education', name: 'Educación', count: 22 },
    { id: 'celebration', name: 'Celebración', count: 18 },
    { id: 'questions', name: 'Preguntas', count: 10 }
  ];

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'limpieza': return 'bg-blue-100 text-blue-700';
      case 'reforestación': return 'bg-green-100 text-green-700';
      case 'reciclaje': return 'bg-yellow-100 text-yellow-700';
      case 'educación': return 'bg-purple-100 text-purple-700';
      case 'celebración': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredPosts = forumPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Foro Comunitario</h2>
          <p className="text-muted-foreground">Conecta con otros voluntarios ambientales</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nueva publicación
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nueva Publicación</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="post-title">Título</Label>
                <Input id="post-title" placeholder="¿Sobre qué quieres hablar?" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="post-category">Categoría</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cleanup">Limpieza</SelectItem>
                    <SelectItem value="reforestation">Reforestación</SelectItem>
                    <SelectItem value="recycling">Reciclaje</SelectItem>
                    <SelectItem value="education">Educación</SelectItem>
                    <SelectItem value="questions">Preguntas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="post-content">Contenido</Label>
                <Textarea 
                  id="post-content"
                  placeholder="Comparte tu experiencia, haz una pregunta o inicia una discusión..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="post-tags">Etiquetas</Label>
                <Input id="post-tags" placeholder="Ejemplo: limpieza, montevideo, consejos" />
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">Cancelar</Button>
                <Button className="flex-1">Publicar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar en el foro..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            size="sm"
            className="whitespace-nowrap"
          >
            {category.name}
            <Badge variant="secondary" className="ml-2">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recent" className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Recientes
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Tendencias
          </TabsTrigger>
          <TabsTrigger value="my-posts" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Mis posts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="mt-6">
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-white text-sm">
                        {post.authorInitials}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium line-clamp-1">{post.title}</h4>
                        {post.trending && (
                          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium">{post.author}</span>
                        <Badge className={getCategoryColor(post.category)} variant="outline">
                          {post.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">hace {post.time}</span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {post.content}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-1">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <button className="flex items-center space-x-1 hover:text-red-500">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-primary">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.replies}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-primary">
                            <Reply className="h-4 w-4" />
                            <span>Responder</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="mt-6">
          <div className="space-y-4">
            {filteredPosts.filter(post => post.trending).map((post) => (
              <Card key={post.id} className="border-orange-200 bg-orange-50/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-600">Trending</span>
                  </div>
                  <h4 className="font-medium mb-1">{post.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{post.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{post.author}</span>
                      <Badge className={getCategoryColor(post.category)} variant="outline">
                        {post.category}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <span>{post.likes} likes</span>
                      <span>{post.replies} respuestas</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-posts" className="mt-6">
          <Card className="text-center p-8">
            <Leaf className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">Aún no has publicado nada</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Comparte tu experiencia con la comunidad de voluntarios
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear primera publicación
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Nueva Publicación</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-title">Título</Label>
                    <Input id="post-title" placeholder="¿Sobre qué quieres hablar?" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="post-content">Contenido</Label>
                    <Textarea 
                      id="post-content"
                      placeholder="Comparte tu experiencia, haz una pregunta o inicia una discusión..."
                      rows={4}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">Cancelar</Button>
                    <Button className="flex-1">Publicar</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}