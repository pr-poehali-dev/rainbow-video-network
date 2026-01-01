import { useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import VideoCard from '@/components/VideoCard';
import ProfileHeader from '@/components/ProfileHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const mockVideos = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
    title: 'Закат над океаном с радужными бликами',
    author: 'SkyWatcher',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sky',
    views: 45200,
    likes: 3800,
    tags: ['природа', 'закат', 'океан'],
    isLiked: false,
    isSaved: false,
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
    title: 'Городская жизнь в ярких красках',
    author: 'UrbanArt',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=urban',
    views: 78900,
    likes: 6200,
    tags: ['город', 'искусство', 'неон'],
    isLiked: true,
    isSaved: false,
  },
  {
    id: '3',
    thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
    title: 'Волшебство северного сияния',
    author: 'NorthernLights',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=north',
    views: 123400,
    likes: 12100,
    tags: ['природа', 'сияние', 'ночь'],
    isLiked: false,
    isSaved: true,
  },
  {
    id: '4',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    title: 'Горные вершины на рассвете',
    author: 'MountainHiker',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mountain',
    views: 34200,
    likes: 2900,
    tags: ['горы', 'рассвет', 'путешествия'],
    isLiked: false,
    isSaved: false,
  },
  {
    id: '5',
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    title: 'Радуга после летней грозы',
    author: 'WeatherChaser',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=weather',
    views: 89700,
    likes: 8400,
    tags: ['радуга', 'погода', 'лето'],
    isLiked: true,
    isSaved: true,
  },
  {
    id: '6',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    title: 'Портрет в неоновом свете',
    author: 'PortraitPro',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=portrait',
    views: 56800,
    likes: 4700,
    tags: ['портрет', 'неон', 'стиль'],
    isLiked: false,
    isSaved: false,
  },
];

const popularTags = [
  'природа', 'город', 'искусство', 'музыка', 'танцы', 
  'еда', 'путешествия', 'мода', 'спорт', 'технологии'
];

export default function Index() {
  const [currentView, setCurrentView] = useState<'feed' | 'profile' | 'saved' | 'messages'>('feed');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  const filteredVideos = selectedTag
    ? mockVideos.filter(video => video.tags.includes(selectedTag))
    : mockVideos;

  const savedVideos = mockVideos.filter(video => video.isSaved);

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        onSearch={handleSearch}
      />

      {currentView === 'feed' && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Icon name="TrendingUp" size={28} className="text-primary" />
              Популярные теги
            </h2>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedTag === tag ? 'gradient-rainbow text-white' : ''
                  }`}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">
            {selectedTag ? `Видео по тегу #${selectedTag}` : 'Рекомендации для вас'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </div>
      )}

      {currentView === 'profile' && (
        <div className="animate-fade-in">
          <ProfileHeader
            name="Rainbow User"
            username="rainbow_creator"
            avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=rainbow"
            bio="Создаю яркий контент для вас! 🌈 Подписывайтесь и делитесь радостью!"
            followers={128500}
            following={342}
            videos={156}
            isFollowing={false}
          />

          <div className="max-w-6xl mx-auto px-4 py-8">
            <Tabs defaultValue="videos" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="videos" className="flex items-center gap-2">
                  <Icon name="Video" size={18} />
                  Видео
                </TabsTrigger>
                <TabsTrigger value="liked" className="flex items-center gap-2">
                  <Icon name="Heart" size={18} />
                  Понравилось
                </TabsTrigger>
                <TabsTrigger value="about" className="flex items-center gap-2">
                  <Icon name="Info" size={18} />
                  О себе
                </TabsTrigger>
              </TabsList>

              <TabsContent value="videos">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {mockVideos.slice(0, 4).map((video) => (
                    <VideoCard key={video.id} {...video} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="liked">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {mockVideos.filter(v => v.isLiked).map((video) => (
                    <VideoCard key={video.id} {...video} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="about">
                <div className="max-w-2xl mx-auto space-y-4">
                  <div className="p-6 rounded-lg border bg-card">
                    <h3 className="text-lg font-semibold mb-2">О пользователе</h3>
                    <p className="text-muted-foreground">
                      Привет! Я создаю контент о природе, путешествиях и всём, что наполняет жизнь яркими красками. 
                      Присоединяйтесь к моему путешествию! 🌈
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}

      {currentView === 'saved' && (
        <div className="max-w-7xl mx-auto px-4 py-6 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Icon name="Bookmark" size={28} className="text-primary" />
            Сохранённые видео
          </h2>
          {savedVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {savedVideos.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Icon name="Bookmark" size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg">У вас пока нет сохранённых видео</p>
            </div>
          )}
        </div>
      )}

      {currentView === 'messages' && (
        <div className="max-w-4xl mx-auto px-4 py-16 text-center animate-fade-in">
          <Icon name="MessageCircle" size={64} className="mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Сообщения</h2>
          <p className="text-muted-foreground">Функция обмена сообщениями скоро появится</p>
        </div>
      )}
    </div>
  );
}
