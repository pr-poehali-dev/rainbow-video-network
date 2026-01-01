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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface DonateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  creatorName: string;
  creatorAvatar: string;
}

const presetAmounts = [50, 100, 200, 500, 1000];

export default function DonateDialog({
  open,
  onOpenChange,
  creatorName,
  creatorAvatar,
}: DonateDialogProps) {
  const [amount, setAmount] = useState<number>(100);
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleDonate = () => {
    toast({
      title: 'Спасибо за поддержку! 💙',
      description: `Вы отправили ${amount} ₽ для ${creatorName}`,
    });
    onOpenChange(false);
    setAmount(100);
    setMessage('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Heart" className="text-red-500" size={24} />
            Поддержать автора
          </DialogTitle>
          <DialogDescription>Отправьте донат и поддержите любимого создателя</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Avatar className="w-12 h-12">
              <AvatarImage src={creatorAvatar} alt={creatorName} />
              <AvatarFallback>{creatorName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{creatorName}</h4>
              <p className="text-sm text-muted-foreground">Создатель контента</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Сумма доната</Label>
            <div className="grid grid-cols-5 gap-2 mb-2">
              {presetAmounts.map((preset) => (
                <Button
                  key={preset}
                  variant={amount === preset ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setAmount(preset)}
                  className={amount === preset ? 'gradient-rainbow' : ''}
                >
                  {preset}
                </Button>
              ))}
            </div>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="pr-12"
                min="1"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                ₽
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Сообщение (необязательно)</Label>
            <Textarea
              id="message"
              placeholder="Напишите приятные слова автору..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Icon name="Info" className="text-primary mt-0.5" size={18} />
              <div className="text-sm">
                <p className="font-medium mb-1">Как работают донаты?</p>
                <p className="text-muted-foreground">
                  100% суммы идёт автору. Минимальная сумма - 50 ₽. Вы можете оставить анонимный
                  донат.
                </p>
              </div>
            </div>
          </div>

          <Button
            className="w-full gradient-rainbow text-lg py-6"
            size="lg"
            onClick={handleDonate}
          >
            <Icon name="DollarSign" size={20} className="mr-2" />
            Отправить {amount} ₽
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
