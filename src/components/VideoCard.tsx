import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface VideoCardProps {
  id: string;
  thumbnail: string;
  title: string;
  author: string;
  authorAvatar: string;
  views: number;
  likes: number;
  tags: string[];
  isLiked?: boolean;
  isSaved?: boolean;
}

export default function VideoCard({
  thumbnail,
  title,
  author,
  authorAvatar,
  views,
  likes,
  tags,
  isLiked: initialIsLiked = false,
  isSaved: initialIsSaved = false,
}: VideoCardProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [likesCount, setLikesCount] = useState(likes);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary animate-fade-in">
      <div className="relative aspect-[9/16] bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={handleLike}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isLiked 
                ? 'bg-pink-500 text-white scale-110' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Icon name="Heart" size={20} className={isLiked ? 'fill-current' : ''} />
          </button>
          <button
            onClick={handleSave}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isSaved 
                ? 'bg-purple-500 text-white scale-110' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Icon name="Bookmark" size={20} className={isSaved ? 'fill-current' : ''} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src={authorAvatar} />
              <AvatarFallback>{author[0]}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-sm">{author}</span>
          </div>
          
          <h3 className="font-semibold mb-2 line-clamp-2">{title}</h3>
          
          <div className="flex items-center gap-3 text-sm mb-2">
            <div className="flex items-center gap-1">
              <Icon name="Eye" size={16} />
              <span>{views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Heart" size={16} />
              <span>{likesCount.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="text-xs bg-white/20 backdrop-blur-sm border-white/30 text-white"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
