import { Container } from './container';
import { cn } from '@/shared/lib/utils';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Youtube, Linkedin } from 'lucide-react';
import Link from 'next/link';

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={cn('bg-primary py-8 shadow-lg shadow-black/5 mt-10', className)}>
      <Container>
        <div className="flex flex-col items-center gap-8">
          {/* Логотип и название компании */}
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Paul Pizza" className="w-8 h-8" />
            <h2 className="text-2xl font-black uppercase text-white">Paul Pizza</h2>
          </div>

          {/* Контактная информация */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <a 
              href="tel:+375291234567" 
              className="flex flex-col items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
            >
              <Phone className="text-white/80" size={20} />
              <span className="text-white/80">+375 (29) 123-45-67</span>
            </a>
            <a 
              href="mailto:info@paulpizza.by" 
              className="flex flex-col items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
            >
              <Mail className="text-white/80" size={20} />
              <span className="text-white/80">info@paulpizza.by</span>
            </a>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Минск+ул.+Якуба+Коласа+6" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
            >
              <MapPin className="text-white/80" size={20} />
              <span className="text-white/80">г. Минск, ул. Якуба Коласа, 6</span>
            </a>
          </div>

          {/* Социальные сети и призыв к действию */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-6">
              <Link href="https://facebook.com" target="_blank" className="text-white/80 hover:text-white transition-colors">
                <Facebook size={24} />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="text-white/80 hover:text-white transition-colors">
                <Instagram size={24} />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="text-white/80 hover:text-white transition-colors">
                <Twitter size={24} />
              </Link>
              <Link href="https://youtube.com" target="_blank" className="text-white/80 hover:text-white transition-colors">
                <Youtube size={24} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="text-white/80 hover:text-white transition-colors">
                <Linkedin size={24} />
              </Link>
            </div>
          </div>

          {/* Дополнительные ссылки */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/about" className="text-white/80 hover:text-white transition-colors">
              О компании
            </Link>
            <Link href="/delivery" className="text-white/80 hover:text-white transition-colors">
              Доставка
            </Link>
            <Link href="/privacy" className="text-white/80 hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="text-white/80 hover:text-white transition-colors">
              Условия использования
            </Link>
          </div>

          {/* Авторские права */}
          <div className="text-white/80 text-sm">
            © {new Date().getFullYear()} Paul Pizza. Все права защищены.
          </div>
        </div>
      </Container>
    </footer>
  );
}; 