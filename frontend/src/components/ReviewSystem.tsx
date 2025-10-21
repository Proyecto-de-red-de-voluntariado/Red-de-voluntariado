import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Star, MessageSquare, ThumbsUp, Flag, Calendar, MapPin, Users } from 'lucide-react';

interface Review {
  id: string;
  volunteerId: string;
  volunteerName: string;
  volunteerAvatar?: string;
  eventId: string;
  eventTitle: string;
  organizationName: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  isHelpful: boolean;
  photos?: string[];
}

interface ReviewFormProps {
  eventTitle: string;
  organizationName: string;
  onSubmit: (review: { rating: number; comment: string; photos?: string[] }) => void;
}

export function ReviewForm({ eventTitle, organizationName, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Por favor selecciona una calificación');
      return;
    }
    onSubmit({ rating, comment, photos });
    setRating(0);
    setComment('');
    setPhotos([]);
  };

  const StarRating = () => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className="focus:outline-none"
        >
          <Star
            className={`h-8 w-8 transition-colors ${
              star <= (hoverRating || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
      <span className="ml-2 text-sm text-muted-foreground">
        {rating > 0 && (
          <>
            {rating === 1 && 'Muy malo'}
            {rating === 2 && 'Malo'}
            {rating === 3 && 'Regular'}
            {rating === 4 && 'Bueno'}
            {rating === 5 && 'Excelente'}
          </>
        )}
      </span>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calificar Evento</CardTitle>
        <div>
          <h3 className="font-medium">{eventTitle}</h3>
          <p className="text-sm text-muted-foreground">{organizationName}</p>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Tu calificación *</Label>
            <StarRating />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Tu reseña *</Label>
            <Textarea
              id="comment"
              placeholder="Comparte tu experiencia: ¿qué te gustó?, ¿qué se podría mejorar?, ¿recomendarías este evento?"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              {comment.length}/500 caracteres
            </p>
          </div>

          <div className="space-y-2">
            <Label>Fotos del evento (opcional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="cursor-pointer text-sm text-muted-foreground"
              >
                Haz clic para agregar fotos del evento
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Publicar Reseña
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

interface ReviewDisplayProps {
  review: Review;
  showModeration?: boolean;
  onModerate?: (reviewId: string, action: 'approve' | 'reject' | 'hide') => void;
}

export function ReviewDisplay({ review, showModeration, onModerate }: ReviewDisplayProps) {
  const [liked, setLiked] = useState(false);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-white">
              {review.volunteerName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium">{review.volunteerName}</h4>
                <p className="text-xs text-muted-foreground">{review.date}</p>
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

            <div className="mb-3">
              <h5 className="font-medium text-sm">{review.eventTitle}</h5>
              <p className="text-xs text-muted-foreground">{review.organizationName}</p>
            </div>

            <p className="text-sm text-gray-700 mb-3">{review.comment}</p>

            {review.photos && review.photos.length > 0 && (
              <div className="flex space-x-2 mb-3">
                {review.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center"
                  >
                    <span className="text-xs text-muted-foreground">📷</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center space-x-1 text-sm ${
                    liked ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <ThumbsUp className={`h-3 w-3 ${liked ? 'fill-current' : ''}`} />
                  <span>{review.likes + (liked ? 1 : 0)}</span>
                </button>
                
                <button className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <MessageSquare className="h-3 w-3" />
                  <span>Responder</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                {showModeration && onModerate && (
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" onClick={() => onModerate(review.id, 'approve')}>
                      ✓
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onModerate(review.id, 'hide')}>
                      👁
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onModerate(review.id, 'reject')}>
                      ✗
                    </Button>
                  </div>
                )}
                
                <button className="text-xs text-muted-foreground">
                  <Flag className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ReviewListProps {
  reviews: Review[];
  showModeration?: boolean;
  onModerate?: (reviewId: string, action: 'approve' | 'reject' | 'hide') => void;
}

export function ReviewList({ reviews, showModeration, onModerate }: ReviewListProps) {
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'helpful'>('recent');

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'helpful':
        return b.likes - a.likes;
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
              <div className="flex items-center justify-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">{reviews.length} reseñas</div>
            </div>
            
            <div className="flex-1 ml-6 space-y-1">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter(r => r.rating === rating).length;
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                
                return (
                  <div key={rating} className="flex items-center space-x-2 text-sm">
                    <span className="w-8">{rating}★</span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-muted-foreground text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Reseñas de voluntarios</h3>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant={sortBy === 'recent' ? 'default' : 'outline'}
            onClick={() => setSortBy('recent')}
          >
            Recientes
          </Button>
          <Button
            size="sm"
            variant={sortBy === 'rating' ? 'default' : 'outline'}
            onClick={() => setSortBy('rating')}
          >
            Mejor valoradas
          </Button>
          <Button
            size="sm"
            variant={sortBy === 'helpful' ? 'default' : 'outline'}
            onClick={() => setSortBy('helpful')}
          >
            Más útiles
          </Button>
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-3">
        {sortedReviews.map((review) => (
          <ReviewDisplay
            key={review.id}
            review={review}
            showModeration={showModeration}
            onModerate={onModerate}
          />
        ))}
      </div>

      {reviews.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="font-medium mb-2">Aún no hay reseñas</h3>
            <p className="text-sm text-muted-foreground">
              Sé el primero en compartir tu experiencia sobre este evento
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}