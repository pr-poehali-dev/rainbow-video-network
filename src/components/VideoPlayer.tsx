import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ShareDialog from '@/components/ShareDialog';
import DonateDialog from '@/components/DonateDialog';

interface VideoPlayerProps {
  videoId: string;
  videoUrl: string;
  thumbnail: string;
  title: string;
  author: string;
  authorAvatar: string;
  subscribers: number;
  views: number;
  likes: number;
  description: string;
  tags: string[];
  isSubscribed: boolean;
  isLiked: boolean;
  uploadDate: string;
  earnings?: number;
}

export default function VideoPlayer({
  videoUrl,
  thumbnail,
  title,
  author,
  authorAvatar,
  subscribers,
  views,
  likes: initialLikes,
  description,
  tags,
  isSubscribed: initialSubscribed,
  isLiked: initialLiked,
  uploadDate,
  earnings = 0,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(initialLikes);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showDonateDialog, setShowDonateDialog] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = value[0];
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isMuted) {
      video.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const toggleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div
            ref={containerRef}
            className="relative bg-black rounded-lg overflow-hidden aspect-video group"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
          >
            <video
              ref={videoRef}
              className="w-full h-full"
              poster={thumbnail}
              onClick={togglePlay}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>

            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
                showControls ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {!isPlaying && (
                  <Button
                    size="lg"
                    className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary"
                    onClick={togglePlay}
                  >
                    <Icon name="Play" size={32} />
                  </Button>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={0.1}
                  onValueChange={handleSeek}
                  className="cursor-pointer"
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={togglePlay}
                    >
                      <Icon name={isPlaying ? 'Pause' : 'Play'} size={20} />
                    </Button>

                    <div className="flex items-center gap-2 group/volume">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={toggleMute}
                      >
                        <Icon
                          name={isMuted ? 'VolumeX' : volume > 0.5 ? 'Volume2' : 'Volume1'}
                          size={20}
                        />
                      </Button>
                      <div className="w-0 group-hover/volume:w-24 transition-all overflow-hidden">
                        <Slider
                          value={[isMuted ? 0 : volume]}
                          max={1}
                          step={0.01}
                          onValueChange={handleVolumeChange}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>

                    <span className="text-white text-sm font-medium">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={toggleFullscreen}
                  >
                    <Icon name={isFullscreen ? 'Minimize' : 'Maximize'} size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <h1 className="text-2xl font-bold">{title}</h1>

            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary/20">
                  #{tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={authorAvatar} alt={author} />
                  <AvatarFallback>{author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{author}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatNumber(subscribers)} подписчиков
                  </p>
                </div>
                <Button
                  className={`ml-2 ${
                    isSubscribed ? 'bg-muted hover:bg-muted/80' : 'gradient-rainbow'
                  }`}
                  onClick={toggleSubscribe}
                >
                  {isSubscribed ? 'Вы подписаны' : 'Подписаться'}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={isLiked ? 'default' : 'outline'}
                  className={`flex items-center gap-2 ${isLiked ? 'gradient-rainbow' : ''}`}
                  onClick={toggleLike}
                >
                  <Icon name="ThumbsUp" size={18} />
                  {formatNumber(likes)}
                </Button>

                <Button variant="outline" onClick={() => setShowDonateDialog(true)}>
                  <Icon name="DollarSign" size={18} className="mr-2" />
                  Поддержать
                </Button>

                <Button variant="outline" onClick={() => setShowShareDialog(true)}>
                  <Icon name="Share2" size={18} className="mr-2" />
                  Поделиться
                </Button>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                <span className="flex items-center gap-1">
                  <Icon name="Eye" size={16} />
                  {formatNumber(views)} просмотров
                </span>
                <span>{uploadDate}</span>
              </div>
              <div className={`${showDescription ? '' : 'line-clamp-2'}`}>
                <p className="text-sm">{description}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-primary"
                onClick={() => setShowDescription(!showDescription)}
              >
                {showDescription ? 'Свернуть' : 'Показать ещё'}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Icon name="DollarSign" size={24} />
              Ваш заработок
            </h3>
            <p className="text-3xl font-bold mb-4">{earnings.toFixed(2)} ₽</p>
            <div className="space-y-2 text-sm opacity-90">
              <div className="flex justify-between">
                <span>За просмотры:</span>
                <span>{(views * 0.05).toFixed(2)} ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Донаты:</span>
                <span>{(earnings - views * 0.05).toFixed(2)} ₽</span>
              </div>
            </div>
            <Separator className="my-4 bg-white/20" />
            <Button className="w-full bg-white text-purple-600 hover:bg-white/90">
              Вывести средства
            </Button>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Icon name="TrendingUp" size={20} />
              Статистика видео
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Просмотры</span>
                <span className="font-semibold">{formatNumber(views)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Лайки</span>
                <span className="font-semibold">{formatNumber(likes)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Рейтинг</span>
                <span className="font-semibold">{((likes / views) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShareDialog
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        url={window.location.href}
        title={title}
      />

      <DonateDialog
        open={showDonateDialog}
        onOpenChange={setShowDonateDialog}
        creatorName={author}
        creatorAvatar={authorAvatar}
      />
    </div>
  );
}
