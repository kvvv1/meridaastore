export interface ShippingOption {
  service: string
  name: string
  price: number
  deliveryTime: string
  company: string
}

export interface ShippingCalculation {
  zipCode: string
  weight: number
  dimensions: {
    length: number
    width: number
    height: number
  }
}

export class CorreiosAPI {
  private static readonly BASE_URL = "https://viacep.com.br/ws"
  private static readonly SHIPPING_URL = "/api/shipping/correios"

  static async getAddressByZipCode(zipCode: string) {
    try {
      const cleanZipCode = zipCode.replace(/\D/g, "")
      const response = await fetch(`${this.BASE_URL}/${cleanZipCode}/json/`)
      const data = await response.json()

      if (data.erro) {
        throw new Error("CEP não encontrado")
      }

      return {
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
        zipCode: data.cep,
      }
    } catch (error) {
      throw new Error("Erro ao buscar CEP")
    }
  }

  static async calculateShipping(data: ShippingCalculation): Promise<ShippingOption[]> {
    try {
      const response = await fetch(this.SHIPPING_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      return result.options || []
    } catch (error) {
      // Fallback shipping options
      return [
        {
          service: "PAC",
          name: "PAC - Correios",
          price: 15.9,
          deliveryTime: "8 a 12 dias úteis",
          company: "Correios",
        },
        {
          service: "SEDEX",
          name: "SEDEX - Correios",
          price: 25.9,
          deliveryTime: "2 a 4 dias úteis",
          company: "Correios",
        },
      ]
    }
  }
}
