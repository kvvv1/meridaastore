import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

export default function FAQPage() {
  const faqs = [
    {
      question: "Como faço para rastrear meu pedido?",
      answer:
        "Você pode rastrear seu pedido através da página 'Rastrear Pedido' ou acessando sua conta em 'Meus Pedidos'. Também enviamos o código de rastreamento por e-mail após o envio.",
    },
    {
      question: "Qual o prazo de entrega?",
      answer:
        "O prazo de entrega varia conforme sua localização: Região Sudeste: 2-5 dias úteis, Região Sul: 3-7 dias úteis, Demais regiões: 5-10 dias úteis. Pedidos são processados em até 2 dias úteis.",
    },
    {
      question: "Vocês fazem entrega em todo o Brasil?",
      answer: "Sim! Fazemos entregas para todo o território nacional através dos Correios e transportadoras parceiras.",
    },
    {
      question: "Como funciona o frete grátis?",
      answer:
        "Oferecemos frete grátis para compras acima de R$ 199,00 para todo o Brasil. O desconto é aplicado automaticamente no checkout.",
    },
    {
      question: "Posso trocar ou devolver um produto?",
      answer:
        "Sim! Você tem até 30 dias para solicitar troca ou devolução. O produto deve estar em perfeitas condições, com etiquetas e embalagem original. A primeira troca é gratuita.",
    },
    {
      question: "Como funciona o programa de fidelidade?",
      answer:
        "A cada compra você ganha pontos que podem ser convertidos em descontos. Temos 3 níveis: Bronze (5% de cashback), Prata (7% de cashback) e Ouro (10% de cashback).",
    },
    {
      question: "Quais formas de pagamento vocês aceitam?",
      answer:
        "Aceitamos cartões de crédito (Visa, Mastercard, Elo), PIX, boleto bancário e parcelamento em até 12x sem juros no cartão de crédito.",
    },
    {
      question: "Como sei qual tamanho escolher?",
      answer:
        "Consulte nosso Guia de Medidas completo. Em caso de dúvidas, entre em contato conosco pelo WhatsApp que te ajudamos a escolher o tamanho ideal.",
    },
    {
      question: "Vocês têm loja física?",
      answer:
        "Atualmente somos uma loja 100% online, mas oferecemos atendimento personalizado via WhatsApp, e-mail e telefone.",
    },
    {
      question: "Como posso entrar em contato?",
      answer:
        "Você pode nos contatar via WhatsApp (11) 99999-9999, e-mail contato@meridastore.com.br ou através da página de contato em nosso site.",
    },
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-4">Perguntas Frequentes</h1>
            <p className="text-lg text-muted-foreground">
              Encontre respostas para as dúvidas mais comuns sobre nossos produtos e serviços.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Dúvidas Frequentes</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Não encontrou sua resposta?</h3>
                <p className="text-muted-foreground mb-6">
                  Nossa equipe está pronta para ajudar você com qualquer dúvida.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="/contato"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Página de Contato
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
