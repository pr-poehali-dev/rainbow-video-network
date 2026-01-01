import { useParams } from 'react-router-dom';
import VideoPlayer from '@/components/VideoPlayer';
import NavigationBar from '@/components/NavigationBar';
import { useState } from 'react';

const mockVideoData: Record<string, any> = {
  '1': {
    videoId: '1',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
    title: 'Закат над океаном с радужными бликами',
    author: 'SkyWatcher',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sky',
    subscribers: 125000,
    views: 45200,
    likes: 3800,
    description:
      'Потрясающий закат над океаном с красивыми радужными бликами на воде. Это видео было снято во время моего путешествия по западному побережью. Надеюсь, оно подарит вам минуты спокойствия и умиротворения. Подписывайтесь на канал, чтобы не пропустить новые видео о природе!',
    tags: ['природа', 'закат', 'океан'],
    isSubscribed: false,
    isLiked: false,
    uploadDate: '15 декабря 2025',
    earnings: 2260.5,
  },
  '2': {
    videoId: '2',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
    title: 'Городская жизнь в ярких красках',
    author: 'UrbanArt',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=urban',
    subscribers: 234000,
    views: 78900,
    likes: 6200,
    description:
      'Яркие неоновые огни большого города создают удивительную атмосферу. В этом видео я показываю ночную жизнь мегаполиса с его красками и энергией.',
    tags: ['город', 'искусство', 'неон'],
    isSubscribed: true,
    isLiked: false,
    uploadDate: '10 декабря 2025',
    earnings: 3945.0,
  },
  '3': {
    videoId: '3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
    title: 'Волшебство северного сияния',
    author: 'NorthernLights',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=north',
    subscribers: 456000,
    views: 123400,
    likes: 12100,
    description:
      'Северное сияние - одно из самых красивых природных явлений на Земле. Снято в Норвегии во время экспедиции.',
    tags: ['природа', 'сияние', 'ночь'],
    isSubscribed: false,
    isLiked: true,
    uploadDate: '5 декабря 2025',
    earnings: 6170.0,
  },
  '4': {
    videoId: '4',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    title: 'Горные вершины на рассвете',
    author: 'MountainHiker',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mountain',
    subscribers: 89000,
    views: 34200,
    likes: 2900,
    description: 'Восхождение на горные вершины на рассвете - незабываемое приключение!',
    tags: ['горы', 'рассвет', 'путешествия'],
    isSubscribed: false,
    isLiked: false,
    uploadDate: '1 декабря 2025',
    earnings: 1710.0,
  },
  '5': {
    videoId: '5',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    title: 'Радуга после летней грозы',
    author: 'WeatherChaser',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=weather',
    subscribers: 178000,
    views: 89700,
    likes: 8400,
    description: 'Красивейшая радуга после летней грозы - природа создает настоящие шедевры!',
    tags: ['радуга', 'погода', 'лето'],
    isSubscribed: true,
    isLiked: true,
    uploadDate: '28 ноября 2025',
    earnings: 4485.0,
  },
  '6': {
    videoId: '6',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    title: 'Портрет в неоновом свете',
    author: 'PortraitPro',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=portrait',
    subscribers: 345000,
    views: 56800,
    likes: 4700,
    description: 'Эксперименты с неоновым освещением в портретной съемке.',
    tags: ['портрет', 'неон', 'стиль'],
    isSubscribed: false,
    isLiked: false,
    uploadDate: '25 ноября 2025',
    earnings: 2840.0,
  },
};

export default function VideoPage() {
  const { id } = useParams<{ id: string }>();
  const [currentView, setCurrentView] = useState<'feed' | 'profile' | 'saved' | 'messages'>('feed');

  const videoData = id ? mockVideoData[id] : null;

  if (!videoData) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationBar 
          currentView={currentView} 
          onViewChange={setCurrentView}
          onSearch={() => {}}
        />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Видео не найдено</h2>
            <p className="text-muted-foreground">
              Возможно, оно было удалено или ссылка неверна
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar 
        currentView={currentView} 
        onViewChange={(view) => {
          if (view === 'feed') {
            window.location.href = '/#/';
          } else {
            setCurrentView(view);
          }
        }}
        onSearch={() => {}}
      />
      <VideoPlayer {...videoData} />
    </div>
  );
}