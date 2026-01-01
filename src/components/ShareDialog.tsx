import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  title: string;
}

export default function ShareDialog({ open, onOpenChange, url, title }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast({
      title: 'Ссылка скопирована',
      description: 'Теперь вы можете поделиться ей где угодно',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToSocial = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    let shareUrl = '';

    switch (platform) {
      case 'vk':
        shareUrl = `https://vk.com/share.php?url=${encodedUrl}&title=${encodedTitle}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const socialButtons = [
    { name: 'VK', icon: 'Share2', color: 'bg-blue-600 hover:bg-blue-700', platform: 'vk' },
    {
      name: 'Telegram',
      icon: 'Send',
      color: 'bg-sky-500 hover:bg-sky-600',
      platform: 'telegram',
    },
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'bg-green-600 hover:bg-green-700',
      platform: 'whatsapp',
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'bg-blue-400 hover:bg-blue-500',
      platform: 'twitter',
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-700 hover:bg-blue-800',
      platform: 'facebook',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Поделиться видео</DialogTitle>
          <DialogDescription>Выберите способ поделиться этим видео с друзьями</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input value={url} readOnly className="flex-1" />
            <Button size="icon" variant="outline" onClick={copyToClipboard}>
              <Icon name={copied ? 'Check' : 'Copy'} size={18} />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {socialButtons.map((social) => (
              <Button
                key={social.platform}
                variant="outline"
                className={`${social.color} text-white border-none`}
                onClick={() => shareToSocial(social.platform)}
              >
                <Icon name={social.icon as any} size={18} className="mr-2" />
                {social.name}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
