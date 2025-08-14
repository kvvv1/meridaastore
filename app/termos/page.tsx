import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default function TermosPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-4">Termos de Uso</h1>
            <p className="text-lg text-muted-foreground">Última atualização: Janeiro de 2024</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Aceitação dos Termos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ao acessar e usar o site da MF Store Girls, você concorda em cumprir e estar vinculado a estes Termos
                  de Uso. Se você não concordar com qualquer parte destes termos, não deve usar nosso site.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Uso do Site</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Você pode usar nosso site para:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Navegar e visualizar produtos</li>
                  <li>Fazer compras</li>
                  <li>Criar e gerenciar sua conta</li>
                  <li>Entrar em contato conosco</li>
                </ul>
                <p className="text-muted-foreground">
                  Você concorda em não usar o site para atividades ilegais ou não autorizadas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Conta do Usuário</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Para fazer compras, você deve criar uma conta fornecendo informações precisas e completas. Você é
                  responsável por:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Manter a confidencialidade de sua senha</li>
                  <li>Todas as atividades que ocorrem em sua conta</li>
                  <li>Notificar-nos imediatamente sobre uso não autorizado</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Produtos e Preços</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Todos os produtos estão sujeitos à disponibilidade. Reservamo-nos o direito de:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Modificar ou descontinuar produtos</li>
                  <li>Corrigir erros de preço</li>
                  <li>Limitar quantidades de compra</li>
                  <li>Recusar pedidos</li>
                </ul>
                <p className="text-muted-foreground">Os preços podem ser alterados sem aviso prévio.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Pagamento e Entrega</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Aceitamos as formas de pagamento indicadas no site. O pagamento deve ser efetuado no momento da
                  compra. A entrega será feita no endereço fornecido, dentro dos prazos estimados.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Trocas e Devoluções</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Nossa política de trocas e devoluções está detalhada em página específica. Você tem direito de trocar
                  ou devolver produtos dentro do prazo estabelecido, seguindo as condições especificadas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Propriedade Intelectual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Todo o conteúdo do site, incluindo textos, imagens, logos e design, é propriedade da MF Store Girls e
                  está protegido por leis de direitos autorais. É proibida a reprodução sem autorização.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Limitação de Responsabilidade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  A MF Store Girls não será responsável por danos indiretos, incidentais ou consequenciais decorrentes
                  do uso do site ou produtos, exceto quando exigido por lei.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Modificações dos Termos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor
                  imediatamente após a publicação no site.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Para dúvidas sobre estes Termos de Uso, entre em contato:</p>
                <div className="space-y-2 text-muted-foreground">
                  <p>E-mail: contato@mfstoregirls.com.br</p>
                  <p>Telefone: (11) 99999-9999</p>
                  <p>WhatsApp: (11) 99999-9999</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
