import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* WhatsApp floating button (move to left on mobile to não conflitar com o chat) */}
      <div className="fixed bottom-6 left-6 md:left-auto md:right-6 z-50">
        <Button size="icon" className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg" asChild>
          <Link href="https://wa.me/5511999999999" target="_blank">
            <MessageCircle className="h-6 w-6" />
          </Link>
        </Button>
      </div>

      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-1">
              <div className="mb-4">
                <Image src="/merida-store-logo.jpg" alt="Merida Store" width={120} height={120} className="rounded-lg" />
              </div>
              <p className="text-sm opacity-80 mb-6">
                Moda feminina premium que celebra a individualidade e sofisticação da mulher moderna.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                  <Youtube className="h-5 w-5" />
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-4">Categorias</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/categoria/vestidos" className="hover:text-primary transition-colors">
                    Vestidos
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/blusas" className="hover:text-primary transition-colors">
                    Blusas
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/calcas" className="hover:text-primary transition-colors">
                    Calças
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/saias" className="hover:text-primary transition-colors">
                    Saias
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/conjuntos" className="hover:text-primary transition-colors">
                    Conjuntos
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/acessorios" className="hover:text-primary transition-colors">
                    Acessórios
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="font-semibold mb-4">Atendimento</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/contato" className="hover:text-primary transition-colors">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="/trocas-devolucoes" className="hover:text-primary transition-colors">
                    Trocas e Devoluções
                  </Link>
                </li>
                <li>
                  <Link href="/guia-medidas" className="hover:text-primary transition-colors">
                    Guia de Medidas
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/rastreamento" className="hover:text-primary transition-colors">
                    Rastrear Pedido
                  </Link>
                </li>
              </ul>

              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>(11) 99999-9999</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" />
                  <span>contato@meridastore.com.br</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>São Paulo, SP</span>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <p className="text-sm opacity-80 mb-4">Receba novidades, promoções exclusivas e dicas de moda.</p>
              <div className="space-y-3">
                <Input type="email" placeholder="Seu e-mail" className="bg-background text-foreground" />
                <Button className="w-full">Inscrever-se</Button>
              </div>
            </div>
          </div>

          {/* Payment methods and security */}
          <div className="border-t border-background/20 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-sm">Formas de Pagamento</h4>
                <div className="flex gap-2">
                  <div className="w-8 h-6 bg-background rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-foreground">VISA</span>
                  </div>
                  <div className="w-8 h-6 bg-background rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-foreground">MC</span>
                  </div>
                  <div className="w-8 h-6 bg-background rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-foreground">PIX</span>
                  </div>
                  <div className="w-8 h-6 bg-background rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-foreground">BOL</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-sm">Segurança</h4>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-6 bg-green-500 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">SSL</span>
                  </div>
                  <span className="text-xs opacity-80">Site 100% Seguro</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-background/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
            <p>&copy; 2024 Merida Store. Todos os direitos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacidade" className="hover:text-primary transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos" className="hover:text-primary transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
