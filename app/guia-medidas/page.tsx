import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ruler, Info } from "lucide-react"

export default function GuiaMedidasPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Guia de Medidas</h1>
            <p className="text-lg text-muted-foreground">
              Encontre o tamanho perfeito para você com nosso guia completo de medidas.
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Como Medir Corretamente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Busto</h4>
                  <p className="text-muted-foreground">
                    Meça na parte mais volumosa do busto, mantendo a fita métrica paralela ao chão.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Cintura</h4>
                  <p className="text-muted-foreground">
                    Meça na parte mais estreita do tronco, geralmente acima do umbigo.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Quadril</h4>
                  <p className="text-muted-foreground">
                    Meça na parte mais larga do quadril, aproximadamente 20cm abaixo da cintura.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tabela de Medidas - Blusas e Vestidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Tamanho</th>
                        <th className="text-left p-3">Busto (cm)</th>
                        <th className="text-left p-3">Cintura (cm)</th>
                        <th className="text-left p-3">Quadril (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3 font-semibold">PP</td>
                        <td className="p-3">80-84</td>
                        <td className="p-3">60-64</td>
                        <td className="p-3">86-90</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-semibold">P</td>
                        <td className="p-3">84-88</td>
                        <td className="p-3">64-68</td>
                        <td className="p-3">90-94</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-semibold">M</td>
                        <td className="p-3">88-92</td>
                        <td className="p-3">68-72</td>
                        <td className="p-3">94-98</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-semibold">G</td>
                        <td className="p-3">92-96</td>
                        <td className="p-3">72-76</td>
                        <td className="p-3">98-102</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-semibold">GG</td>
                        <td className="p-3">96-100</td>
                        <td className="p-3">76-80</td>
                        <td className="p-3">102-106</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tabela de Medidas - Calças e Saias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Tamanho</th>
                        <th className="text-left p-3">Cintura (cm)</th>
                        <th className="text-left p-3">Quadril (cm)</th>
                        <th className="text-left p-3">Comprimento (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3 font-semibold">36</td>
                        <td className="p-3">60-64</td>
                        <td className="p-3">86-90</td>
                        <td className="p-3">100</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-semibold">38</td>
                        <td className="p-3">64-68</td>
                        <td className="p-3">90-94</td>
                        <td className="p-3">102</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-semibold">40</td>
                        <td className="p-3">68-72</td>
                        <td className="p-3">94-98</td>
                        <td className="p-3">104</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-semibold">42</td>
                        <td className="p-3">72-76</td>
                        <td className="p-3">98-102</td>
                        <td className="p-3">106</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-semibold">44</td>
                        <td className="p-3">76-80</td>
                        <td className="p-3">102-106</td>
                        <td className="p-3">108</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="h-5 w-5" />
                  Dicas Importantes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Dúvidas entre tamanhos?</h4>
                  <p className="text-muted-foreground">Recomendamos escolher o tamanho maior para maior conforto.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Tecidos com elastano</h4>
                  <p className="text-muted-foreground">
                    Peças com elastano podem ter variação de até 2cm nas medidas devido à elasticidade do tecido.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Ainda com dúvidas?</h4>
                  <p className="text-muted-foreground">
                    Entre em contato conosco pelo WhatsApp (11) 99999-9999 que te ajudamos a escolher o tamanho ideal!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
