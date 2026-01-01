import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface NavigationBarProps {
  currentView: 'feed' | 'profile' | 'saved' | 'messages';
  onViewChange: (view: 'feed' | 'profile' | 'saved' | 'messages') => void;
  onSearch: (query: string) => void;
}

export default function NavigationBar({ currentView, onViewChange, onSearch }: NavigationBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold gradient-text">Rainbow</div>
            <Badge variant="secondary" className="gradient-rainbow text-white border-0">
              Beta
            </Badge>
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
              />
              <Input
                type="text"
                placeholder="Поиск видео, тегов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </form>

          <div className="flex items-center gap-2">
            <Button
              variant={currentView === 'feed' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => onViewChange('feed')}
              className={currentView === 'feed' ? 'gradient-rainbow' : ''}
            >
              <Icon name="Home" size={20} />
            </Button>
            
            <Button
              variant={currentView === 'saved' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => onViewChange('saved')}
              className={currentView === 'saved' ? 'gradient-rainbow' : ''}
            >
              <Icon name="Bookmark" size={20} />
            </Button>
            
            <Button
              variant={currentView === 'messages' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => onViewChange('messages')}
              className={currentView === 'messages' ? 'gradient-rainbow' : ''}
            >
              <Icon name="MessageCircle" size={20} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onViewChange('profile')}
              className="ml-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=rainbow" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>

        <form onSubmit={handleSearch} className="md:hidden mt-3">
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="text"
              placeholder="Поиск видео, тегов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </form>
      </div>
    </nav>
  );
}
