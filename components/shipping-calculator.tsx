"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, Clock, Calculator } from "lucide-react"
import { CorreiosAPI, type ShippingOption } from "@/lib/shipping-api"

interface ShippingCalculatorProps {
  weight?: number
  onShippingSelect?: (option: ShippingOption) => void
}

export function ShippingCalculator({ weight = 0.5, onShippingSelect }: ShippingCalculatorProps) {
  const [zipCode, setZipCode] = useState("")
  const [options, setOptions] = useState<ShippingOption[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState<ShippingOption | null>(null)

  const formatZipCode = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{5})(\d{3})/, "$1-$2")
  }

  const calculateShipping = async () => {
    if (zipCode.length < 8) return

    setLoading(true)
    try {
      const shippingOptions = await CorreiosAPI.calculateShipping({
        zipCode: zipCode.replace(/\D/g, ""),
        weight,
        dimensions: { length: 20, width: 15, height: 5 },
      })

      setOptions(shippingOptions)
    } catch (error) {
      console.error("Erro ao calcular frete:", error)
    } finally {
      setLoading(false)
    }
  }

  const selectOption = (option: ShippingOption) => {
    setSelectedOption(option)
    onShippingSelect?.(option)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="zipCode">CEP</Label>
          <Input
            id="zipCode"
            placeholder="00000-000"
            value={zipCode}
            onChange={(e) => setZipCode(formatZipCode(e.target.value))}
            maxLength={9}
          />
        </div>
        <div className="flex items-end">
          <Button onClick={calculateShipping} disabled={loading || zipCode.length < 9} size="default">
            <Calculator className="h-4 w-4 mr-2" />
            {loading ? "Calculando..." : "Calcular"}
          </Button>
        </div>
      </div>

      {options.length > 0 && (
        <div className="space-y-2">
          <Label>Opções de Entrega</Label>
          {options.map((option, index) => (
            <Card
              key={index}
              className={`cursor-pointer transition-colors ${
                selectedOption?.service === option.service
                  ? "ring-2 ring-primary bg-primary/5"
                  : "hover:bg-secondary/50"
              }`}
              onClick={() => selectOption(option)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{option.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {option.deliveryTime}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">R$ {option.price.toFixed(2).replace(".", ",")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
