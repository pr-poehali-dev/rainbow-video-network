import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ProfileHeaderProps {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  videos: number;
  isFollowing?: boolean;
}

export default function ProfileHeader({
  name,
  username,
  avatar,
  bio,
  followers,
  following,
  videos,
  isFollowing = false,
}: ProfileHeaderProps) {
  return (
    <div className="relative">
      <div className="h-48 gradient-rainbow" />
      
      <div className="max-w-6xl mx-auto px-4 -mt-20">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
          <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
            <AvatarImage src={avatar} />
            <AvatarFallback className="text-4xl">{name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-1">{name}</h1>
            <p className="text-muted-foreground mb-3">@{username}</p>
            <p className="text-sm max-w-2xl mb-4">{bio}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{videos}</div>
                <div className="text-sm text-muted-foreground">Видео</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{followers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Подписчики</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{following.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Подписки</div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              size="lg"
              className={isFollowing ? 'bg-muted hover:bg-muted/80' : 'gradient-rainbow'}
            >
              <Icon name={isFollowing ? 'UserCheck' : 'UserPlus'} size={20} className="mr-2" />
              {isFollowing ? 'Подписан' : 'Подписаться'}
            </Button>
            <Button size="lg" variant="outline">
              <Icon name="MessageCircle" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
