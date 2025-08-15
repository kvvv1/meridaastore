"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Message {
  id: string
  text: string
  sender: "user" | "bot" | "agent"
  timestamp: Date
  type?: "text" | "quick-reply" | "product"
}

interface FAQ {
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  {
    question: "Como faço para trocar um produto?",
    answer: "Você tem até 30 dias para trocar produtos. Acesse 'Meus Pedidos' na sua conta e solicite a troca.",
    category: "Trocas e Devoluções",
  },
  {
    question: "Qual o prazo de entrega?",
    answer: "Entregamos em todo o Brasil. O prazo varia de 3 a 10 dias úteis dependendo da sua região.",
    category: "Entrega",
  },
  {
    question: "Como acompanhar meu pedido?",
    answer: "Após a confirmação do pagamento, você receberá um código de rastreamento por email.",
    category: "Pedidos",
  },
  {
    question: "Quais formas de pagamento vocês aceitam?",
    answer: "Aceitamos cartão de crédito, débito, PIX e boleto bancário. Parcelamos em até 12x sem juros.",
    category: "Pagamento",
  },
  {
    question: "Como funciona o programa de fidelidade?",
    answer: "Ganhe pontos a cada compra e troque por descontos. 1 ponto = R$ 1 gasto. Veja mais na sua conta.",
    category: "Fidelidade",
  },
]

const quickReplies = [
  "Quero falar com um atendente",
  "Problemas com meu pedido",
  "Dúvidas sobre produtos",
  "Trocas e devoluções",
  "Formas de pagamento",
]

const botResponses = {
  greeting: "Olá! Sou a assistente virtual da Merida Store. Como posso ajudar você hoje?",
  agent: "Vou conectar você com um de nossos atendentes. Por favor, aguarde um momento...",
  order:
    "Para ajudar com seu pedido, preciso do número. Você pode encontrá-lo no email de confirmação ou na sua conta.",
  products:
    "Temos uma coleção incrível! Que tipo de peça você está procurando? Vestidos, blusas, calças ou acessórios?",
  returns:
    "Nossa política de trocas é bem flexível! Você tem 30 dias para trocar qualquer produto. Posso ajudar com alguma troca específica?",
  payment:
    "Aceitamos várias formas de pagamento: cartão de crédito/débito, PIX e boleto. Parcelamos em até 12x sem juros no cartão!",
}

export function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      setTimeout(() => {
        addBotMessage(botResponses.greeting)
      }, 500)
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const addBotMessage = (text: string, type: "text" | "quick-reply" = "text") => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender: "bot",
      timestamp: new Date(),
      type,
    }
    setMessages((prev) => [...prev, message])
  }

  const addUserMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, message])
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    addUserMessage(inputValue)
    const userMessage = inputValue.toLowerCase()
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(
      () => {
        setIsTyping(false)
        let response = "Desculpe, não entendi sua pergunta. Você pode tentar reformular ou falar com um atendente?"

        if (userMessage.includes("atendente") || userMessage.includes("humano")) {
          response = botResponses.agent
        } else if (userMessage.includes("pedido") || userMessage.includes("compra")) {
          response = botResponses.order
        } else if (userMessage.includes("produto") || userMessage.includes("roupa")) {
          response = botResponses.products
        } else if (userMessage.includes("troca") || userMessage.includes("devolução")) {
          response = botResponses.returns
        } else if (userMessage.includes("pagamento") || userMessage.includes("cartão")) {
          response = botResponses.payment
        } else if (userMessage.includes("oi") || userMessage.includes("olá")) {
          response = "Olá! Como posso ajudar você hoje?"
        }

        addBotMessage(response)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleQuickReply = (reply: string) => {
    addUserMessage(reply)
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      let response = botResponses.greeting

      switch (reply) {
        case "Quero falar com um atendente":
          response = botResponses.agent
          break
        case "Problemas com meu pedido":
          response = botResponses.order
          break
        case "Dúvidas sobre produtos":
          response = botResponses.products
          break
        case "Trocas e devoluções":
          response = botResponses.returns
          break
        case "Formas de pagamento":
          response = botResponses.payment
          break
      }

      addBotMessage(response)
    }, 800)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  }

  if (!mounted) return null

  return (
    <>
      {/* Chat Toggle Button (hidden when open to avoid overlap) */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
          size="icon"
          aria-label="Abrir chat de suporte"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-x-4 bottom-20 sm:inset-auto sm:bottom-24 sm:right-6 z-[60] bg-background border rounded-lg shadow-xl h-[70vh] max-h-[80vh] sm:h-96 sm:w-80 pb-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full min-h-0 flex flex-col">
            <div className="border-b p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Suporte Merida Store</h3>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-muted-foreground">Online</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="chat" className="flex-1 min-h-0 flex flex-col p-0 m-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.sender !== "user" && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                        <div>
                          <p className="break-words">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">{formatTime(message.timestamp)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-secondary text-secondary-foreground rounded-lg px-3 py-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length === 1 && (
                <div className="p-4 pt-2 border-t">
                  <p className="text-xs text-muted-foreground mb-2">Respostas rápidas:</p>
                  <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
                    {quickReplies.map((reply) => (
                      <Button
                        key={reply}
                        variant="outline"
                        size="sm"
                        className="text-xs h-7 bg-transparent"
                        onClick={() => handleQuickReply(reply)}
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t pb-[env(safe-area-inset-bottom)]">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="faq" className="flex-1 overflow-y-auto p-4 m-0">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-2 mb-4">
                  <Card className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Telefone</span>
                    </div>
                    <p className="text-sm text-muted-foreground">(11) 99999-9999</p>
                  </Card>

                  <Card className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Email</span>
                    </div>
                    <p className="text-sm text-muted-foreground">contato@meridastore.com.br</p>
                  </Card>

                  <Card className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Horário</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Seg-Sex: 9h às 18h</p>
                  </Card>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Perguntas Frequentes</h4>
                  {faqs.map((faq, index) => (
                    <Card key={index} className="p-3">
                      <h5 className="font-medium text-sm mb-2">{faq.question}</h5>
                      <p className="text-xs text-muted-foreground mb-2">{faq.answer}</p>
                      <Badge variant="outline" className="text-xs">
                        {faq.category}
                      </Badge>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  )
}
