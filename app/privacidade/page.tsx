import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-4">Política de Privacidade</h1>
            <p className="text-lg text-muted-foreground">Última atualização: Janeiro de 2024</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Informações que Coletamos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Coletamos informações que você nos fornece diretamente, como quando você:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Cria uma conta em nosso site</li>
                  <li>Faz uma compra</li>
                  <li>Se inscreve em nossa newsletter</li>
                  <li>Entra em contato conosco</li>
                  <li>Participa de promoções ou pesquisas</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Como Usamos suas Informações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Utilizamos suas informações para:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Processar e entregar seus pedidos</li>
                  <li>Fornecer atendimento ao cliente</li>
                  <li>Enviar comunicações sobre produtos e promoções</li>
                  <li>Melhorar nossos produtos e serviços</li>
                  <li>Personalizar sua experiência de compra</li>
                  <li>Cumprir obrigações legais</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Compartilhamento de Informações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto nas seguintes
                  situações:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Com prestadores de serviços que nos ajudam a operar nosso negócio</li>
                  <li>Para cumprir obrigações legais</li>
                  <li>Para proteger nossos direitos e propriedade</li>
                  <li>Com seu consentimento explícito</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Segurança dos Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger suas
                  informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
                </p>
                <p className="text-muted-foreground">
                  Utilizamos criptografia SSL para proteger dados sensíveis durante a transmissão e armazenamos
                  informações em servidores seguros.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Seus Direitos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">De acordo com a LGPD, você tem os seguintes direitos:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Acessar suas informações pessoais</li>
                  <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                  <li>Solicitar a exclusão de dados pessoais</li>
                  <li>Revogar consentimento</li>
                  <li>Solicitar a portabilidade de dados</li>
                  <li>Obter informações sobre o uso compartilhado de dados</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site, analisar o
                  tráfego e personalizar conteúdo. Você pode gerenciar suas preferências de cookies através das
                  configurações do seu navegador.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Alterações nesta Política</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças
                  significativas através do e-mail ou de um aviso em nosso site.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Se você tiver dúvidas sobre esta Política de Privacidade ou quiser exercer seus direitos, entre em
                  contato conosco:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>E-mail: privacidade@mfstoregirls.com.br</p>
                  <p>Telefone: (11) 99999-9999</p>
                  <p>Endereço: São Paulo, SP</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
